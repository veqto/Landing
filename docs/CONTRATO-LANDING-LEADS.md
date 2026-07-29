# CONTRATO — LANDING-LEADS

Endpoint que recibe los tres formularios de la landing pública.
Implementación: `src/app/api/landing-leads/route.ts`.
Tipos ejecutables (fuente de verdad): `src/lib/landing-leads/contract.ts`.

> Este documento describe la implementación real de este repo. Los tipos del
> contrato los comparten el endpoint y el cliente, así que una desalineación
> rompe la compilación en vez de fallar en producción.

## 1. Ruta y método

```
POST /api/landing-leads
Content-Type: application/json
```

Mismo origen que la landing → **no hay CORS**. `GET`/`PUT`/etc. devuelven `405`.

## 2. ¿Uno o tres endpoints?

**Uno, con discriminador `tipo`.** La idempotencia, el límite de tasa, el
captcha, la validación y la auditoría son idénticos para los tres formularios;
así se implementan una vez. El handler despacha internamente:

| `tipo`       | Formulario           | Tabla destino |
|--------------|----------------------|---------------|
| `simulador`  | Modal del simulador  | `solicitudes` |
| `credito`    | `/solicitud-credito` | `solicitudes` |
| `aliado`     | `/solicitud-aliado`  | `aliados`     |

## 3. Payload

Campos comunes a los tres tipos:

| Campo                    | Tipo                        | Obligatorio | Notas |
|--------------------------|-----------------------------|-------------|-------|
| `tipo`                   | `'simulador'\|'credito'\|'aliado'` | sí   | Discriminador |
| `locale`                 | `'es'\|'en'`                | no (`es`)   | Idioma en que se aceptó la autorización |
| `captchaToken`           | `string`                    | condicional | Obligatorio solo si el captcha está activo |
| `aceptaTratamientoDatos` | `true`                      | **sí**      | Ley 1581 de 2012 |

`aceptaTratamientoDatos` se valida por identidad estricta: `false`, `"true"`,
`1` o ausente devuelven `422`. En `simulador` va en la raíz; en `credito` y
`aliado` va dentro de `consentimientos`.

### `tipo: 'simulador'`

Todos obligatorios salvo `captchaToken`.

| Campo | Tipo | Validación |
|---|---|---|
| `nombreCompleto` | `string` | ≥ 3 caracteres |
| `cedula` | `string` | 6–12 dígitos |
| `celular` | `string` | 10 dígitos, empieza en `3` |
| `correo` | `string` | formato correo |
| `tipoVehiculo` | `string` | etiqueta visible; el servidor la normaliza |
| `valorVehiculo` | `number` | 1.000.000 – 2.000.000.000 |
| `cuotaInicialPorcentaje` | `number` | 0 – 90 |
| `plazoMeses` | `number` | 6 – 120 |
| `rangoIngresos` | `string` | no vacío |
| `tipoEmpleo` | `'empleado'\|'independiente'` | enum |
| `historialCrediticio` | `'si'\|'no'\|'no_se'` | enum |
| `aceptaTratamientoDatos` | `true` | estricto |

### `tipo: 'credito'`

Objetos anidados: `vehiculo`, `personal`, `residencia`, `financiera`, `activos`,
`consentimientos` — con los mismos nombres de campo que ya produce el formulario
de seis pasos, para que el cliente no tenga que remapear nada.

Obligatorios: `vehiculo.{tipoSolicitud, estadoVehiculo, marca, valorVehiculo,
cuotaInicial, plazoDeseado}`, `personal.{primerNombre, primerApellido,
tipoDocumento, numeroDocumento}`, `residencia.{direccionResidencia,
departamentoResidencia, ciudadResidencia, celular, correoElectronico}`,
`financiera.actividadEconomica`, y en `consentimientos`:
`aceptaTratamientoDatos` (`true`), `autorizaCentrales`, `aceptaTerminos`,
`declaraVeracidad`, `autorizaFirmaElectronica`.

El resto es opcional. Ver `CreditoLead` en `contract.ts` para la lista exacta.

### `tipo: 'aliado'`

Objetos `negocio`, `contacto`, `consentimientos`.
Obligatorios: `negocio.{nombreEstablecimiento, nit, tipoNegocio, departamento,
ciudad, direccion}`, `contacto.{nombreContacto, celular, correo}`,
`consentimientos.{aceptaTratamientoDatos (true), aceptaTerminos}`.

## 4. Respuesta 2xx

`201 Created` en un alta nueva, `200 OK` cuando es replay de idempotencia.
**La referencia siempre viene en `referencia`.**

```json
{
  "ok": true,
  "tipo": "simulador",
  "referencia": "VEQ-2026-K7M2QP",
  "recibidoEn": "2026-07-29T14:03:11.482Z",
  "duplicado": false
}
```

Formato: `VEQ-{año}-{6}` para créditos, `ALD-{año}-{6}` para aliados.
Alfabeto sin `0/O/1/I/L` para poder dictarla por teléfono.

## 5. Errores

Shape único para todos:

```json
{ "ok": false, "error": { "codigo": "…", "mensaje": "…" } }
```

| HTTP | `codigo` | Extra | Cuándo |
|---|---|---|---|
| 400 | `CUERPO_INVALIDO` | — | El cuerpo no es JSON |
| 413 | `CUERPO_INVALIDO` | — | Cuerpo > 256 KB |
| 422 | `VALIDACION` | `campos` | Uno o más campos inválidos |
| 429 | `LIMITE_TASA` | `reintentarEnSegundos` | 5 envíos / 10 min / IP |
| 403 | `CAPTCHA_INVALIDO` | — | Token ausente, vencido o rechazado |
| 403 | `ORIGEN_NO_PERMITIDO` | — | Cabecera `Origin` no permitida |
| 500 | `ERROR_INTERNO` | — | Fallo al escribir. El detalle va al log, nunca al cliente |

`422` incluye un motivo por campo, con notación de punto en los anidados:

```json
{
  "ok": false,
  "error": {
    "codigo": "VALIDACION",
    "mensaje": "Algunos campos no pasaron la validación.",
    "campos": {
      "celular": "Celular inválido: 10 dígitos empezando en 3",
      "consentimientos.aceptaTerminos": "Requerido"
    }
  }
}
```

## 6. Idempotencia

Cabecera respetada: **`Idempotency-Key`** (la que ya manda la landing).

- Clave nueva → se procesa, se guarda `clave → referencia`.
- Clave repetida → `200` con la **misma** `referencia` y `duplicado: true`.
  No se crea una segunda solicitud.
- Sin cabecera → cada petición crea un registro nuevo.

Dos peticiones simultáneas con la misma clave las resuelve la PRIMARY KEY de
`landing_leads_idempotencia`: solo una gana y la otra recibe el replay.

## 7. Turnstile y CORS

**Turnstile.** Se activa solo si `TURNSTILE_SECRET_KEY` está presente. En ese
momento `captchaToken` pasa a ser obligatorio y un token ausente o inválido
devuelve `403`. Verificación contra
`https://challenges.cloudflare.com/turnstile/v0/siteverify`. Si Cloudflare no
responde se **rechaza** (falla cerrado). El secreto no sale del servidor; la site
key pública va en `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

**CORS.** No aplica: mismo origen. Se valida `Origin` cuando viene, contra
`LANDING_LEADS_ALLOWED_ORIGINS` o, si no está definida, contra `veqto.ai`,
`www.veqto.ai`, `NEXT_PUBLIC_APP_URL` y `localhost:3000`. Una petición sin
`Origin` (curl, QA) se acepta: el endpoint es público y sin sesión, así que no
hay CSRF que explotar; la defensa contra abuso es el captcha y el límite de tasa.

## 8. Variables de entorno

| Variable | Ámbito | Obligatoria | Para qué |
|---|---|---|---|
| `DATABASE_URL` | servidor | **sí, en runtime** | Donde se guardan las solicitudes |
| `TURNSTILE_SECRET_KEY` | servidor | no | Activa el captcha |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | navegador | no | Site key del widget |
| `LANDING_LEADS_ALLOWED_ORIGINS` | servidor | no | Orígenes permitidos, separados por coma |
| `NEXT_PUBLIC_LANDING_LEADS_BASE_URL` | navegador | no | Apuntar a otro host (preview → staging) |

`DATABASE_URL` ya no hace falta en build: el cliente Drizzle se inicializa de
forma perezosa, así que una variable ausente rompe la petición que escribe, no el
despliegue completo.

## 9. Base de datos

Delta a aplicar: `db/migrations/001_landing_leads.sql` (idempotente).
Añade `solicitudes.metadatos_landing` (jsonb) y la tabla
`landing_leads_idempotencia`.
