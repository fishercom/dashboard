import React, { useState } from 'react';
import { CustomField } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomFieldManagerProps {
    fields: CustomField[];
    setFields: (fields: CustomField[]) => void;
}

export default function CustomFieldManager({ fields, setFields }: CustomFieldManagerProps) {
    const [newField, setNewField] = useState<CustomField>({ key: '', name: '', type: '' });

    const addField = () => {
        if (newField.key && newField.name && newField.type) {
            setFields([...fields, newField]);
            setNewField({ key: '', name: '', type: '' });
        }
    };

    const updateField = (index: number, updatedField: CustomField) => {
        const updatedFields = fields.map((field, i) =>
            i === index ? updatedField : field
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
                    <div key={index} className="flex items-center space-x-2">
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
                            </SelectContent>
                        </Select>
                        <Button variant="destructive" type="button" onClick={() => removeField(index)}>
                            Eliminar
                        </Button>
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
                    </SelectContent>
                </Select>
                <Button type="button" onClick={addField}>Agregar Campo</Button>
            </div>
        </div>
    );
}
