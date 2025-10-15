import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { CmsConfigForm } from "@/types/models/cms-config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    data: CmsConfigForm;
    setData: (data: CmsConfigForm) => void;
    errors: Record<string, string>;
    processing: boolean;
}

export default function ConfigFormFields({ data, setData, errors, processing }: Props) {
    const configTypes = [
        { value: 'string', label: 'String' },
        { value: 'int', label: 'Integer' },
        { value: 'text', label: 'Text' },
        { value: 'date', label: 'Date' },
        { value: 'boolean', label: 'Boolean' },
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
                <Label htmlFor="alias">Alias</Label>
                <Input
                    id="alias"
                    type="text"
                    required
                    tabIndex={2}
                    autoComplete="alias"
                    value={data.alias}
                    onChange={(e) => setData({ ...data, alias: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.alias} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                    value={data.type}
                    onValueChange={(value) => setData({ ...data, type: value })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        {configTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.type} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="value">Value</Label>
                {data.type === 'text' ? (
                    <Textarea
                        id="value"
                        tabIndex={4}
                        value={data.value}
                        onChange={(e) => setData({ ...data, value: e.target.value })}
                        disabled={processing}
                    />
                ) : data.type === 'boolean' ? (
                    <Select
                        value={data.value}
                        onValueChange={(value) => setData({ ...data, value: value })}
                        disabled={processing}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a value" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">True</SelectItem>
                            <SelectItem value="0">False</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <Input
                        id="value"
                        type={data.type === 'int' ? 'number' : data.type === 'date' ? 'date' : 'text'}
                        tabIndex={4}
                        value={data.value}
                        onChange={(e) => setData({ ...data, value: e.target.value })}
                        disabled={processing}
                    />
                )}
                <InputError message={errors.value} />
            </div>
        </>
    );
}
