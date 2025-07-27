import React, { useState } from 'react';
import { CustomField } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';


interface CustomFieldManagerProps {
    fields: CustomField[];
    setFields: (fields: CustomField[]) => void;
}

export default function CustomFieldManager({ fields, setFields }: CustomFieldManagerProps) {
    const [newField, setNewField] = useState<CustomField>({ key: '', name: '', type: '' });

    const addField = () => {
        if (newField.key && newField.name && newField.type) {
            setFields([...fields, { ...newField, fields: newField.type === 'repeater' ? [] : undefined }]);
            setNewField({ key: '', name: '', type: '' });
        }
    };

    const updateField = (index: number, updatedField: CustomField) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? updatedField : field
        );
        setFields(updatedFields);
    };

    const updateRepeaterFields = (index: number, newRepeaterFields: CustomField[]) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? { ...field, fields: newRepeaterFields } : field
        );
        setFields(updatedFields);
    };

    const removeField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Campos Personalizados</h3>
            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div key={index} className="space-y-2 rounded-md border p-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                className="flex-1"
                                value={field.key}
                                onChange={(e) => updateField(index, { ...field, key: e.target.value.replace(/[^a-zA-Z0-9]/g, '') })}
                                placeholder="Key"
                            />
                            <Input
                                className="flex-1"
                                value={field.name}
                                onChange={(e) => updateField(index, { ...field, name: e.target.value })}
                                placeholder="Nombre"
                            />
                            <Select onValueChange={(value) => updateField(index, { ...field, type: value })} value={field.type}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Texto</SelectItem>
                                    <SelectItem value="number">Numero</SelectItem>
                                    <SelectItem value="date">Fecha</SelectItem>
                                    <SelectItem value="url">Enlace</SelectItem>
                                    <SelectItem value="textarea">Area de Texto</SelectItem>
                                    <SelectItem value="image">Imagen</SelectItem>
                                    <SelectItem value="document">Documento</SelectItem>
                                    <SelectItem value="repeater">Repeater</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="destructive" type="button" onClick={() => removeField(index)} size="icon">
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                        </div>
                        {field.type === 'repeater' && (
                            <div className="ml-4 border-l pl-4">
                                <CustomFieldManager
                                    fields={field.fields || []}
                                    setFields={(newRepeaterFields) => updateRepeaterFields(index, newRepeaterFields)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-2">
                <Input
                    className="flex-1"
                    value={newField.key}
                    onChange={(e) => setNewField({ ...newField, key: e.target.value.replace(/[^a-zA-Z0-9]/g, '') })}
                    placeholder="Nueva Key"
                />
                <Input
                    className="flex-1"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    placeholder="Nuevo Nombre"
                />
                <Select onValueChange={(value) => setNewField({ ...newField, type: value })} value={newField.type}>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Nuevo Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="text">Texto</SelectItem>
                        <SelectItem value="number">Numero</SelectItem>
                        <SelectItem value="date">Fecha</SelectItem>
                        <SelectItem value="url">Enlace</SelectItem>
                        <SelectItem value="textarea">Area de Texto</SelectItem>
                        <SelectItem value="image">Imagen</SelectItem>
                        <SelectItem value="document">Documento</SelectItem>
                        <SelectItem value="repeater">Repeater</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="button" onClick={addField} size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Agregar Campo</span>
                </Button>
            </div>
        </div>
    );
}
