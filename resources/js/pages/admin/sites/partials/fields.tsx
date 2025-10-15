import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import { CmsSiteForm } from "@/types/models/cms-site";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CmsSchemaGroup } from "@/types/models/cms-schema-group";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    data: CmsSiteForm;
    setData: (data: CmsSiteForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    schemaGroups: CmsSchemaGroup[];
}

export default function SiteFormFields({ data, setData, errors, processing, schemaGroups }: Props) {
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
                <Label htmlFor="segment">Segment</Label>
                <Input
                    id="segment"
                    type="text"
                    tabIndex={2}
                    autoComplete="segment"
                    value={data.segment}
                    onChange={(e) => setData({ ...data, segment: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.segment} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="site_url">Site URL</Label>
                <Input
                    id="site_url"
                    type="url"
                    required
                    tabIndex={3}
                    autoComplete="site_url"
                    value={data.site_url}
                    onChange={(e) => setData({ ...data, site_url: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.site_url} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="schema_group_id">Schema Group</Label>
                <Select
                    value={data.schema_group_id.toString()}
                    onValueChange={(value) => setData({ ...data, schema_group_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a schema group" />
                    </SelectTrigger>
                    <SelectContent>
                        {schemaGroups.map((group) => (
                            <SelectItem key={group.id} value={group.id.toString()}>
                                {group.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.schema_group_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="metadata">Metadata</Label>
                <Textarea
                    id="metadata"
                    tabIndex={5}
                    autoComplete="metadata"
                    value={JSON.stringify(data.metadata, null, 2)}
                    onChange={(e) => {
                        try {
                            setData({ ...data, metadata: JSON.parse(e.target.value) });
                        } catch (error) {
                            // Handle invalid JSON input
                            console.error("Invalid JSON for metadata:", error);
                        }
                    }}
                    disabled={processing}
                />
                <InputError message={errors.metadata} />
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="default"
                    name="default"
                    checked={Boolean(data.default)}
                    onClick={() => setData({ ...data, default: !data.default })}
                    tabIndex={6}
                />
                <Label htmlFor="default">Default</Label>
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
                    tabIndex={7}
                />
                <Label htmlFor="active">Active</Label>
            </div>
        </>
    );
}
