import React from 'react';
import TinyMCEEditor from '@/components/tinymce-editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { CustomField } from '@/types';
import { DayPicker } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
// react-day-picker base styles. If Tailwind purges them, consider importing via CSS entry.
import 'react-day-picker/style.css';
// Using the core widget to avoid React peer dependency issues
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import uploadcare from 'uploadcare-widget';
// Eliminamos TinyMCE React por conflicto de versiones; usaremos textarea por ahora

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
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(new Date(value as string), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <DayPicker
                mode="single"
                selected={typeof value === 'string' && value ? new Date(value) : undefined}
                onSelect={(d) => onChange(field.key, d ? d.toISOString().slice(0, 10) : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case 'url':
        return <Input type="url" {...common} />;
      case 'textarea':
        return <textarea {...(common as any)} rows={4} />;
      case 'html_editor':
        return (
          <TinyMCEEditor
            id={field.key}
            value={typeof value === 'string' ? value : ''}
            onChange={(html) => onChange(field.key, html)}
          />
        );
      case 'embed':
        return <textarea {...(common as any)} rows={4} />;
      case 'image':
        return (
          <div className="space-y-2">
            <Input type="text" placeholder="URL de imagen" {...common} />
            <button
              type="button"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm"
              onClick={() => {
                const dialog = uploadcare.openDialog(null, {
                  publicKey: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
                  imagesOnly: true,
                });
                dialog.done((file: any) => {
                  file.done((fileInfo: any) => onChange(field.key, fileInfo?.cdnUrl || ''));
                });
              }}
            >Seleccionar imagen</button>
          </div>
        );
      case 'document':
        return (
          <div className="space-y-2">
            <Input type="text" placeholder="URL de documento" {...common} />
            <button
              type="button"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm"
              onClick={() => {
                const dialog = uploadcare.openDialog(null, {
                  publicKey: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
                  inputAcceptTypes: 'application/*,text/*,application/pdf',
                });
                dialog.done((file: any) => {
                  file.done((fileInfo: any) => onChange(field.key, fileInfo?.cdnUrl || ''));
                });
              }}
            >Seleccionar documento</button>
          </div>
        );
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


