import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { CmsSchemaForm, CmsSchema } from '@/types/models/cms-schema';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomFieldManager from '@/components/custom-field-manager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CmsSchemaGroup } from '@/types/models/cms-schema-group';

interface Props {
    data: CmsSchemaForm;
    setData: (data: CmsSchemaForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    groups: CmsSchemaGroup[];
    parents: CmsSchema[];
}

export default function SchemaFields({ data, setData, errors, processing, groups, parents }: Props) {
    const schemaTypes = [
        { value: 'PAGE', label: 'Page' },
        { value: 'HOME', label: 'Home' },
        { value: 'OPTIONS', label: 'Options' },
    ];

    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="group_id">Group</Label>
                <Select
                    value={data.group_id.toString()}
                    onValueChange={(value) => setData({ ...data, group_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                        {groups.map((group) => (
                            <SelectItem key={group.id} value={group.id.toString()}>
                                {group.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.group_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="parent_id">Parent</Label>
                <Select
                    value={data.parent_id?.toString() || ''}
                    onValueChange={(value) => setData({ ...data, parent_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a parent" />
                    </SelectTrigger>
                    <SelectContent>
                        {parents.map((parent) => (
                            <SelectItem key={parent.id} value={parent.id.toString()}>
                                {parent.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.parent_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                    value={data.type}
                    onValueChange={(value) => setData({ ...data, type: value as 'PAGE' | 'HOME' | 'OPTIONS' })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        {schemaTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.type} />
            </div>

            <CustomFieldManager
                fields={data.fields || []}
                setFields={(newFields) => setData({ ...data, fields: newFields })}
            />

            <div className="grid gap-2">
                <Label htmlFor="iterations">Iterations</Label>
                <Input
                    id="iterations"
                    type="number"
                    autoComplete="iterations"
                    value={data.iterations}
                    onChange={(e) => setData({ ...data, iterations: parseInt(e.target.value) })}
                    disabled={processing}
                />
                <InputError message={errors.iterations} />
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
                    tabIndex={3}
                />
                <Label htmlFor="active">Active</Label>
            </div>
        </>
    )
}
