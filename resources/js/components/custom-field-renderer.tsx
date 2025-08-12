import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { CustomField } from '@/types';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue }
interface JsonArray extends Array<JsonValue> {}

interface CustomFieldRendererProps {
  fields: CustomField[];
  values: Record<string, JsonValue>;
  onChange: (key: string, value: JsonValue) => void;
}

export default function CustomFieldRenderer({ fields, values, onChange }: CustomFieldRendererProps) {
  const renderSimpleField = (field: CustomField) => {
    const value = (values?.[field.key] as JsonValue) ?? '';
    const common = {
      id: field.key,
      value: (typeof value === 'string' || typeof value === 'number') ? String(value) : '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(field.key, e.target.value),
      className: 'w-full'
    };

    switch (field.type) {
      case 'number':
        return <Input type="number" {...common} />;
      case 'date':
        return <Input type="date" {...common} />;
      case 'url':
        return <Input type="url" {...common} />;
      case 'textarea':
      case 'html_editor':
      case 'embed':
        return <textarea {...common as any} rows={4} />;
      case 'text':
      default:
        return <Input type="text" {...common} />;
    }
  };

  const renderContainer = (field: CustomField) => {
    const containerValues = (values?.[field.key] as JsonObject) || {};
    const updateContainer = (subKey: string, subValue: JsonValue) => {
      const next: JsonObject = { ...containerValues, [subKey]: subValue };
      onChange(field.key, next);
    };
    return (
      <div className="space-y-4 border rounded-md p-4">
        <div className="text-sm font-medium">{field.label}</div>
        <CustomFieldRenderer fields={field.fields || []} values={containerValues} onChange={updateContainer} />
      </div>
    );
  };

  const renderRepeater = (field: CustomField) => {
    const items = (values?.[field.key] as JsonArray) as JsonObject[] | undefined || [];
    const addItem = () => {
      const empty: JsonObject = {};
      onChange(field.key, [...items, empty]);
    };
    const removeItem = (idx: number) => {
      const next = items.filter((_, i) => i !== idx);
      onChange(field.key, next);
    };
    const updateItem = (idx: number, subKey: string, subValue: JsonValue) => {
      const next = items.map((it, i) => (i === idx ? { ...it, [subKey]: subValue } : it));
      onChange(field.key, next);
    };
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{field.label}</div>
          <Button type="button" size="sm" onClick={addItem}>Añadir</Button>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2 rounded-md border p-3">
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">Item {idx + 1}</div>
              <Button type="button" variant="destructive" size="sm" onClick={() => removeItem(idx)}>Eliminar</Button>
            </div>
            <CustomFieldRenderer
              fields={field.fields || []}
              values={(item as JsonObject) || {}}
              onChange={(subKey, subValue) => updateItem(idx, subKey, subValue)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {fields?.map((field) => (
        <div key={field.key} className="space-y-2">
          {field.type !== 'container' && field.type !== 'repeater' && (
            <Label htmlFor={field.key}>{field.label}</Label>
          )}
          {field.type === 'container' && renderContainer(field)}
          {field.type === 'repeater' && renderRepeater(field)}
          {field.type !== 'container' && field.type !== 'repeater' && renderSimpleField(field)}
        </div>
      ))}
    </div>
  );
}


