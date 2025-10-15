import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import { CmsParameterForm, CmsParameter } from "@/types/models/cms-parameter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CmsParameterGroup } from "@/types/models/cms-parameter-group";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    data: CmsParameterForm;
    setData: (data: CmsParameterForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    groups: CmsParameterGroup[];
    parents: CmsParameter[];
}

export default function ParameterFormFields({ data, setData, errors, processing, groups, parents }: Props) {
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
                <Label htmlFor="value">Value</Label>
                <Textarea
                    id="value"
                    tabIndex={2}
                    autoComplete="value"
                    value={data.value}
                    onChange={(e) => setData({ ...data, value: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.value} />
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

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
                    tabIndex={5}
                />
                <Label htmlFor="active">Active</Label>
            </div>
        </>
    );
}
