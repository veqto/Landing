# CONTRATO — LANDING-LEADS

Endpoint que recibe los tres formularios de la landing pública.

> **Dónde vive.** El endpoint definitivo lo implementa la **PLATAFORMA**
> (`app.veqto.ai`): los leads deben caer en la vista de Leads que usa operación,
> no en una base paralela de la landing. **Este documento es LA especificación
> que la plataforma tiene que cumplir.**
>
> En este repo hay dos cosas, y solo dos:
> - `src/lib/landing-leads/contract.ts` — los tipos ejecutables del contrato,
>   compartidos por el cliente y el mock, de modo que una desalineación rompe la
>   compilación en vez de fallar en producción.
> - `src/app/api/landing-leads/route.ts` — un **mock de desarrollo**. Implementa
>   el contrato completo en memoria, **no toca ninguna base** y devuelve 404
>   salvo que se cumplan las dos condiciones: `NODE_ENV !== 'production'` **y**
>   `LANDING_LEADS_MOCK=1`. Para levantarlo:
>   `LANDING_LEADS_MOCK=1 npm run dev`
>
> La landing **no** configura `DATABASE_URL` ni aplica migraciones.

## 1. Ruta y método

```
POST /api/landing-leads
Content-Type: application/json
```

Ruta relativa al host de la plataforma: en producción la landing envía a
`https://app.veqto.ai/api/landing-leads`. `GET`/`PUT`/etc. devuelven `405`.

Al vivir en otro dominio, **la petición es cross-origin y dispara preflight** —
ver §7.

## 2. ¿Uno o tres endpoints?

**Uno, con discriminador `tipo`.** La idempotencia, el límite de tasa, el
captcha, la validación y la auditoría son idénticos para los tres formularios;
así se implementan una vez. El endpoint despacha internamente:

| `tipo`       | Formulario de origen | Naturaleza del lead |
|--------------|----------------------|---------------------|
| `simulador`  | Modal del simulador  | Solicitud de crédito, datos mínimos |
| `credito`    | `/solicitud-credito` | Solicitud de crédito completa (6 pasos) |
| `aliado`     | `/solicitud-aliado`  | Registro de aliado comercial (B2B) |

Los tres tienen que aparecer en la vista de Leads de operación. Dónde los
almacene la plataforma es decisión suya.

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
| 500 | `ERROR_INTERNO` | — | Fallo al registrar. El detalle va al log, **nunca** al cliente: el payload lleva PII |

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

Dos peticiones simultáneas con la misma clave deben resolverse de forma atómica
(una PRIMARY KEY sobre la clave es suficiente): solo una crea el lead, la otra
recibe el replay. **No basta con un “comprobar y luego insertar”**, que bajo
concurrencia crea dos solicitudes del mismo titular.

Esto importa de verdad: la landing reusa la clave al reintentar tras un timeout,
que es exactamente el caso en que no sabe si el primer intento llegó.

## 7. Turnstile y CORS

**Turnstile.** El token viaja en `captchaToken` y lo verifica **la plataforma**
contra `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Un token
ausente, vencido o rechazado devuelve `403`. Si Cloudflare no responde, se
recomienda **rechazar** (fallar cerrado): un fallo del verificador no debe
convertirse en una puerta abierta.

`TURNSTILE_SECRET_KEY` vive **solo en la plataforma**. La landing únicamente
necesita la site key pública (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) para pintar el
widget — que **todavía no está montado**, ver §10.

**CORS.** Sí aplica: landing y endpoint están en dominios distintos, y un `POST`
con `Content-Type: application/json` **dispara preflight**. La plataforma debe:

- Responder al `OPTIONS` con `204`.
- `Access-Control-Allow-Origin: https://veqto.ai` (y `https://www.veqto.ai`).
- `Access-Control-Allow-Methods: POST, OPTIONS`.
- `Access-Control-Allow-Headers: Content-Type, Idempotency-Key`.

Sin esto el navegador bloquea la petición antes de enviarla y el cliente lo
reporta como `network`: **no distingue un preflight fallido de una caída de red**.
Es el primer sitio donde mirar si los formularios fallan tras el despliegue.

## 8. Variables de entorno

### En la LANDING (este repo)

| Variable | Ámbito | Obligatoria | Para qué |
|---|---|---|---|
| `NEXT_PUBLIC_LANDING_LEADS_BASE_URL` | navegador | **sí, en producción** | `https://app.veqto.ai`. Sin ella el cliente no envía y muestra error |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | navegador | no | Site key para pintar el widget |
| `LANDING_LEADS_MOCK` | servidor | no | `1` habilita el mock local. **Nunca en Vercel** |

`DATABASE_URL` **no se configura en la landing**. No hay build ni runtime que la
necesite: el cliente Drizzle es perezoso y ningún camino de la app lo invoca.

### En la PLATAFORMA (quien implemente el endpoint)

| Variable | Para qué |
|---|---|
| `TURNSTILE_SECRET_KEY` | Verificar el token. **El secreto no vive en la landing** |
| conexión a base | Persistir el lead en la vista de Leads de operación |
| orígenes permitidos | Aceptar `Origin: https://veqto.ai` — ver §7 |

## 9. Notas para quien implemente el endpoint en la plataforma

**CORS.** Al vivir en otro dominio, la petición **sí** es cross-origin y `POST`
con `Content-Type: application/json` **dispara preflight**. La plataforma tiene
que responder al `OPTIONS` y permitir `https://veqto.ai` (y `www`), el método
`POST`, y las cabeceras `Content-Type` e `Idempotency-Key`. Si el preflight
falla, el cliente lo reporta como `network` y ofrece reintentar — no distingue
CORS de una caída de red.

**Derivaciones que la landing NO hace** y espera del backend:

- `simulador.nombreCompleto` llega como un solo campo. Si el modelo separa nombre
  y apellidos, el corte lo hace la plataforma; conviene conservar el original.
- `simulador.tipoVehiculo` es una etiqueta visible (`"Carro usado"`,
  `"Motorcycle"`), no un enum. Normalizar allá y guardar el valor crudo.
- `simulador.rangoIngresos` es un rango textual (`"$3M - $5M"`), no un número.
- `historialCrediticio` (`si`/`no`/`no_se`) es autodeclarado, no verificado.
- Los totales de ingresos y egresos del formulario largo **no** vienen sumados;
  llegan los componentes por separado.
- `cuotaInicial` / `cuotaInicialPorcentaje` es un **porcentaje**, no un monto.

`db/migrations/001_landing_leads.sql` tiene el DDL que se había escrito cuando el
endpoint iba a vivir aquí. Lleva una cabecera **NO APLICAR** y no se aplica a
ninguna base desde este repo; queda como referencia histórica del modelo de
idempotencia y de los campos extra del lead.

## 10. Estado del cableado en la landing

| Formulario | Envía al contrato | Pendiente |
|---|---|---|
| Modal del simulador | sí — `tipo: 'simulador'` | widget Turnstile |
| `/solicitud-credito` | sí — `tipo: 'credito'` | widget Turnstile |
| `/solicitud-aliado` | sí — `tipo: 'aliado'` | widget Turnstile |

Los tres comparten `src/lib/landing-leads/client.ts`: estado de carga, error con
reintento, clave de idempotencia por envío, y pantalla de éxito **solo** con un
2xx. La referencia mostrada es siempre la que devuelve la plataforma; si el 2xx
no la trae, se confirma sin mostrar número.

**El widget de Turnstile no está montado en ninguno de los tres.** El campo
`captchaToken` ya existe en el contrato y en el cliente, así que añadirlo no
cambia el contrato. Mientras no esté, la plataforma no puede exigir el token sin
romper los tres formularios.
