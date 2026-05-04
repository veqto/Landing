/* ───── Colombian Data for Forms ───── */

export const documentTypes = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PA', label: 'Pasaporte' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
  { value: 'NIT', label: 'NIT' },
];

export const departments: { name: string; cities: string[] }[] = [
  { name: 'Amazonas', cities: ['Leticia', 'Puerto Nariño'] },
  { name: 'Antioquia', cities: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro', 'Apartadó', 'Turbo', 'Caucasia'] },
  { name: 'Arauca', cities: ['Arauca', 'Saravena', 'Tame'] },
  { name: 'Atlántico', cities: ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga'] },
  { name: 'Bogotá D.C.', cities: ['Bogotá'] },
  { name: 'Bolívar', cities: ['Cartagena', 'Magangué', 'Turbaco', 'El Carmen de Bolívar'] },
  { name: 'Boyacá', cities: ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá'] },
  { name: 'Caldas', cities: ['Manizales', 'La Dorada', 'Villamaría', 'Chinchiná'] },
  { name: 'Caquetá', cities: ['Florencia', 'San Vicente del Caguán'] },
  { name: 'Casanare', cities: ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena'] },
  { name: 'Cauca', cities: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada'] },
  { name: 'Cesar', cities: ['Valledupar', 'Aguachica', 'Bosconia', 'Codazzi'] },
  { name: 'Chocó', cities: ['Quibdó', 'Istmina', 'Tadó'] },
  { name: 'Córdoba', cities: ['Montería', 'Cereté', 'Lorica', 'Sahagún'] },
  { name: 'Cundinamarca', cities: ['Soacha', 'Girardot', 'Zipaquirá', 'Facatativá', 'Fusagasugá', 'Chía', 'Mosquera'] },
  { name: 'Guainía', cities: ['Inírida'] },
  { name: 'Guaviare', cities: ['San José del Guaviare'] },
  { name: 'Huila', cities: ['Neiva', 'Pitalito', 'Garzón', 'La Plata'] },
  { name: 'La Guajira', cities: ['Riohacha', 'Maicao', 'Uribia'] },
  { name: 'Magdalena', cities: ['Santa Marta', 'Ciénaga', 'Fundación'] },
  { name: 'Meta', cities: ['Villavicencio', 'Acacías', 'Granada'] },
  { name: 'Nariño', cities: ['Pasto', 'Tumaco', 'Ipiales'] },
  { name: 'Norte de Santander', cities: ['Cúcuta', 'Ocaña', 'Pamplona', 'Los Patios'] },
  { name: 'Putumayo', cities: ['Mocoa', 'Puerto Asís'] },
  { name: 'Quindío', cities: ['Armenia', 'Calarcá', 'Montenegro', 'La Tebaida'] },
  { name: 'Risaralda', cities: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'] },
  { name: 'San Andrés y Providencia', cities: ['San Andrés', 'Providencia'] },
  { name: 'Santander', cities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja'] },
  { name: 'Sucre', cities: ['Sincelejo', 'Corozal', 'San Marcos'] },
  { name: 'Tolima', cities: ['Ibagué', 'Espinal', 'Melgar', 'Honda'] },
  { name: 'Valle del Cauca', cities: ['Cali', 'Buenaventura', 'Palmira', 'Tuluá', 'Buga', 'Cartago', 'Jamundí'] },
  { name: 'Vaupés', cities: ['Mitú'] },
  { name: 'Vichada', cities: ['Puerto Carreño'] },
];

export const vehicleBrands = [
  'Chevrolet', 'Renault', 'Mazda', 'Kia', 'Toyota', 'Nissan', 'Hyundai',
  'Suzuki', 'Ford', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'JAC',
  'Chery', 'Great Wall', 'Mitsubishi', 'Jeep', 'Dodge', 'Subaru',
  'Peugeot', 'Citroën', 'Fiat', 'Honda', 'Yamaha', 'Bajaj', 'AKT',
  'Auteco', 'Hero', 'TVS', 'Otra',
];

export const vehicleClasses = [
  { value: 'automovil', label: 'Automóvil' },
  { value: 'camioneta', label: 'Camioneta' },
  { value: 'suv', label: 'SUV' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'van', label: 'Van / Microbus' },
  { value: 'moto', label: 'Motocicleta' },
  { value: 'campero', label: 'Campero' },
  { value: 'comercial', label: 'Vehículo comercial liviano' },
];

export const employmentTypes = [
  { value: 'empleado', label: 'Empleado' },
  { value: 'independiente', label: 'Independiente' },
  { value: 'pensionado', label: 'Pensionado' },
  { value: 'rentista', label: 'Rentista de capital' },
  { value: 'contratista', label: 'Contratista' },
  { value: 'socio', label: 'Socio / Accionista' },
];

export const contractTypes = [
  { value: 'indefinido', label: 'Término indefinido' },
  { value: 'fijo', label: 'Término fijo' },
  { value: 'obra_labor', label: 'Obra o labor' },
  { value: 'prestacion', label: 'Prestación de servicios' },
  { value: 'no_aplica', label: 'No aplica' },
];

export const educationLevels = [
  { value: 'primaria', label: 'Primaria' },
  { value: 'bachillerato', label: 'Bachillerato' },
  { value: 'tecnico', label: 'Técnico' },
  { value: 'tecnologo', label: 'Tecnólogo' },
  { value: 'profesional', label: 'Profesional' },
  { value: 'especializacion', label: 'Especialización' },
  { value: 'maestria', label: 'Maestría' },
  { value: 'doctorado', label: 'Doctorado' },
];

export const maritalStatuses = [
  { value: 'soltero', label: 'Soltero(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'union_libre', label: 'Unión libre' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viudo', label: 'Viudo(a)' },
  { value: 'separado', label: 'Separado(a)' },
];

export const genders = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Otro' },
  { value: 'prefiero_no_decir', label: 'Prefiero no decir' },
];

export const housingTypes = [
  { value: 'propia', label: 'Propia' },
  { value: 'arrendada', label: 'Arrendada' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'otra', label: 'Otra' },
];

export const fundSources = [
  { value: 'salario', label: 'Salario / Ingresos laborales' },
  { value: 'actividad_comercial', label: 'Actividad comercial' },
  { value: 'venta_activos', label: 'Venta de activos' },
  { value: 'herencia', label: 'Herencia / Donación' },
  { value: 'ahorros', label: 'Ahorros' },
  { value: 'rendimientos', label: 'Rendimientos financieros' },
  { value: 'otro', label: 'Otro' },
];

export const allyBusinessTypes = [
  { value: 'concesionario', label: 'Concesionario' },
  { value: 'vitrina', label: 'Vitrina / Showroom' },
  { value: 'aliado_comercial', label: 'Aliado comercial' },
  { value: 'asesor_comercial', label: 'Asesor comercial' },
  { value: 'vendedor_independiente', label: 'Vendedor independiente' },
  { value: 'taller', label: 'Taller automotriz' },
  { value: 'aseguradora', label: 'Aseguradora' },
  { value: 'otro', label: 'Otro' },
];

/** Helper to get cities for a department name */
export function getCitiesForDepartment(departmentName: string): string[] {
  const dept = departments.find((d) => d.name === departmentName);
  return dept?.cities ?? [];
}

/** Format COP currency */
export const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
