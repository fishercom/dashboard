import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import { CmsDirectoryForm } from "@/types/models/cms-directory";
import { CmsFileType } from "@/types/models/cms-filetype";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    data: CmsDirectoryForm;
    setData: (data: CmsDirectoryForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    fileTypes: CmsFileType[];
}

export default function DirectoryFormFields({ data, setData, errors, processing, fileTypes }: Props) {
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
                <Label htmlFor="path">Path</Label>
                <Input
                    id="path"
                    type="text"
                    required
                    tabIndex={3}
                    autoComplete="path"
                    value={data.path}
                    onChange={(e) => setData({ ...data, path: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.path} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="type_id">File Type</Label>
                <Select
                    value={data.type_id.toString()}
                    onValueChange={(value) => setData({ ...data, type_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a file type" />
                    </SelectTrigger>
                    <SelectContent>
                        {fileTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.type_id} />
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
                    tabIndex={4}
                />
                <Label htmlFor="active">Active</Label>
            </div>
        </>
    );
}
