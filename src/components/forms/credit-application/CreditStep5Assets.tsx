'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';
import FormField, { TextInput, SelectInput } from '@/components/forms/FormField';
import FormSection from '@/components/forms/FormSection';
import { fundSources } from '@/data/colombianData';
import { cn } from '@/lib/utils';
import type { Step5Data, FormErrors, PropertyItem, VehicleItem, ReferenceItem } from './types';

interface Props {
  data: Step5Data;
  errors: FormErrors;
  onChange: (updates: Partial<Step5Data>) => void;
}

const emptyProperty: PropertyItem = { tipo: '', valor: 0, ciudad: '' };
const emptyVehicle: VehicleItem = { marca: '', modelo: '', valorComercial: 0 };
const emptyReference: ReferenceItem = { nombre: '', parentesco: '', telefono: '', ciudad: '' };

const CreditStep5Assets: React.FC<Props> = ({ data, errors, onChange }) => {
  const { locale } = useTranslation();

  const updateProperty = (index: number, updates: Partial<PropertyItem>) => {
    const updated = [...data.inmuebles];
    updated[index] = { ...updated[index], ...updates };
    onChange({ inmuebles: updated });
  };

  const updateVehicle = (index: number, updates: Partial<VehicleItem>) => {
    const updated = [...data.vehiculos];
    updated[index] = { ...updated[index], ...updates };
    onChange({ vehiculos: updated });
  };

  const updateReference = (index: number, updates: Partial<ReferenceItem>) => {
    const updated = [...data.referencias];
    updated[index] = { ...updated[index], ...updates };
    onChange({ referencias: updated });
  };

  return (
    <div className="space-y-6">
      {/* Properties */}
      <FormSection title={locale === 'es' ? 'Inmuebles (opcional)' : 'Properties (optional)'}>
        {data.inmuebles.map((prop, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">{locale === 'es' ? `Inmueble ${i + 1}` : `Property ${i + 1}`}</span>
              {data.inmuebles.length > 0 && (
                <button type="button" onClick={() => onChange({ inmuebles: data.inmuebles.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField label={locale === 'es' ? 'Tipo' : 'Type'} name={`inmueble-tipo-${i}`}>
                <SelectInput name={`inmueble-tipo-${i}`} value={prop.tipo} onChange={(v) => updateProperty(i, { tipo: v })} options={[
                  { value: 'casa', label: 'Casa' }, { value: 'apartamento', label: 'Apartamento' },
                  { value: 'local', label: 'Local' }, { value: 'oficina', label: 'Oficina' }, { value: 'lote', label: 'Lote' },
                ]} />
              </FormField>
              <FormField label={locale === 'es' ? 'Valor comercial' : 'Market value'} name={`inmueble-valor-${i}`}>
                <TextInput name={`inmueble-valor-${i}`} value={prop.valor ? prop.valor.toLocaleString('es-CO') : ''} onChange={(v) => updateProperty(i, { valor: parseInt(v.replace(/\D/g, '')) || 0 })} inputMode="numeric" placeholder="$0" />
              </FormField>
              <FormField label={locale === 'es' ? 'Ciudad' : 'City'} name={`inmueble-ciudad-${i}`}>
                <TextInput name={`inmueble-ciudad-${i}`} value={prop.ciudad} onChange={(v) => updateProperty(i, { ciudad: v })} placeholder="Bogotá" />
              </FormField>
            </div>
          </div>
        ))}
        {data.inmuebles.length < 2 && (
          <button type="button" onClick={() => onChange({ inmuebles: [...data.inmuebles, { ...emptyProperty }] })} className="flex items-center gap-1.5 text-aurora text-sm font-semibold hover:text-aurora-dark">
            <Plus size={14} /> {locale === 'es' ? 'Agregar inmueble' : 'Add property'}
          </button>
        )}
      </FormSection>

      {/* Vehicles */}
      <FormSection title={locale === 'es' ? 'Vehículos actuales (opcional)' : 'Current vehicles (optional)'}>
        {data.vehiculos.map((veh, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">{locale === 'es' ? `Vehículo ${i + 1}` : `Vehicle ${i + 1}`}</span>
              {data.vehiculos.length > 0 && (
                <button type="button" onClick={() => onChange({ vehiculos: data.vehiculos.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField label={locale === 'es' ? 'Marca' : 'Brand'} name={`vehiculo-marca-${i}`}>
                <TextInput name={`vehiculo-marca-${i}`} value={veh.marca} onChange={(v) => updateVehicle(i, { marca: v })} placeholder="Chevrolet" />
              </FormField>
              <FormField label={locale === 'es' ? 'Modelo (año)' : 'Year'} name={`vehiculo-modelo-${i}`}>
                <TextInput name={`vehiculo-modelo-${i}`} value={veh.modelo} onChange={(v) => updateVehicle(i, { modelo: v })} placeholder="2023" />
              </FormField>
              <FormField label={locale === 'es' ? 'Valor comercial' : 'Market value'} name={`vehiculo-valor-${i}`}>
                <TextInput name={`vehiculo-valor-${i}`} value={veh.valorComercial ? veh.valorComercial.toLocaleString('es-CO') : ''} onChange={(v) => updateVehicle(i, { valorComercial: parseInt(v.replace(/\D/g, '')) || 0 })} inputMode="numeric" placeholder="$0" />
              </FormField>
            </div>
          </div>
        ))}
        {data.vehiculos.length < 2 && (
          <button type="button" onClick={() => onChange({ vehiculos: [...data.vehiculos, { ...emptyVehicle }] })} className="flex items-center gap-1.5 text-aurora text-sm font-semibold hover:text-aurora-dark">
            <Plus size={14} /> {locale === 'es' ? 'Agregar vehículo' : 'Add vehicle'}
          </button>
        )}
      </FormSection>

      {/* References */}
      <FormSection title={locale === 'es' ? 'Referencias personales (mínimo 3)' : 'Personal references (min. 3)'}>
        {errors.referencias && <p className="text-red-500 text-xs">{errors.referencias}</p>}
        {data.referencias.map((ref, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-500">
                {locale === 'es' ? `Referencia ${i + 1}` : `Reference ${i + 1}`}
                {i < 3 && <span className="text-coral ml-1">*</span>}
              </span>
              {i >= 3 && (
                <button type="button" onClick={() => onChange({ referencias: data.referencias.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField label={locale === 'es' ? 'Nombre completo' : 'Full name'} name={`ref-nombre-${i}`}>
                <TextInput name={`ref-nombre-${i}`} value={ref.nombre} onChange={(v) => updateReference(i, { nombre: v })} placeholder="Nombre completo" />
              </FormField>
              <FormField label={locale === 'es' ? 'Parentesco / Relación' : 'Relationship'} name={`ref-parentesco-${i}`}>
                <SelectInput name={`ref-parentesco-${i}`} value={ref.parentesco} onChange={(v) => updateReference(i, { parentesco: v })} options={[
                  { value: 'familiar', label: 'Familiar' }, { value: 'amigo', label: 'Amigo(a)' },
                  { value: 'compañero', label: 'Compañero(a) de trabajo' }, { value: 'vecino', label: 'Vecino(a)' },
                  { value: 'otro', label: 'Otro' },
                ]} />
              </FormField>
              <FormField label={locale === 'es' ? 'Teléfono' : 'Phone'} name={`ref-telefono-${i}`}>
                <TextInput name={`ref-telefono-${i}`} value={ref.telefono} onChange={(v) => updateReference(i, { telefono: v.replace(/\D/g, '') })} placeholder="3101234567" inputMode="numeric" />
              </FormField>
              <FormField label={locale === 'es' ? 'Ciudad' : 'City'} name={`ref-ciudad-${i}`}>
                <TextInput name={`ref-ciudad-${i}`} value={ref.ciudad} onChange={(v) => updateReference(i, { ciudad: v })} placeholder="Bogotá" />
              </FormField>
            </div>
          </div>
        ))}
        {data.referencias.length < 4 && (
          <button type="button" onClick={() => onChange({ referencias: [...data.referencias, { ...emptyReference }] })} className="flex items-center gap-1.5 text-aurora text-sm font-semibold hover:text-aurora-dark">
            <Plus size={14} /> {locale === 'es' ? 'Agregar referencia' : 'Add reference'}
          </button>
        )}
      </FormSection>

      {/* Declarations */}
      <FormSection title={locale === 'es' ? 'Declaraciones' : 'Declarations'}>
        <div className="space-y-3">
          {[
            { key: 'declaraRenta' as const, label: locale === 'es' ? '¿Declara renta?' : 'Do you file income tax?' },
            { key: 'esPEP' as const, label: locale === 'es' ? '¿Es Persona Expuesta Políticamente (PEP)?' : 'Are you a Politically Exposed Person (PEP)?' },
            { key: 'manejaRecursosPublicos' as const, label: locale === 'es' ? '¿Maneja recursos públicos?' : 'Do you manage public resources?' },
            { key: 'tienePoderPublico' as const, label: locale === 'es' ? '¿Ejerce algún grado de poder público?' : 'Do you exercise public power?' },
          ].map((decl) => (
            <label key={decl.key} className="flex items-center gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={data[decl.key]}
                onChange={(e) => onChange({ [decl.key]: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-aurora accent-aurora"
              />
              <span className="text-sm text-negro">{decl.label}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* Fund sources */}
      <FormSection title={locale === 'es' ? 'Origen de fondos' : 'Source of funds'}>
        {errors.origenFondos && <p className="text-red-500 text-xs mb-2">{errors.origenFondos}</p>}
        <div className="flex flex-wrap gap-2">
          {fundSources.map((src) => (
            <button
              key={src.value}
              type="button"
              onClick={() => {
                const current = data.origenFondos;
                const updated = current.includes(src.value) ? current.filter((v) => v !== src.value) : [...current, src.value];
                onChange({ origenFondos: updated });
              }}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-all border',
                data.origenFondos.includes(src.value)
                  ? 'border-aurora bg-aurora/10 text-aurora'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              )}
            >
              {src.label}
            </button>
          ))}
        </div>
      </FormSection>

      {/* Client origin */}
      <FormField label={locale === 'es' ? '¿Cómo conociste a Veqto?' : 'How did you find Veqto?'} name="origenCliente">
        <SelectInput name="origenCliente" value={data.origenCliente} onChange={(v) => onChange({ origenCliente: v })} options={[
          { value: 'redes_sociales', label: 'Redes sociales' }, { value: 'referido', label: 'Referido' },
          { value: 'concesionario', label: 'Concesionario / Compraventa' }, { value: 'google', label: 'Google' },
          { value: 'publicidad', label: 'Publicidad' }, { value: 'otro', label: 'Otro' },
        ]} />
      </FormField>
    </div>
  );
};

export default CreditStep5Assets;
