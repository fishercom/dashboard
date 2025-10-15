import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import { CmsLangForm } from "@/types/models/cms-lang";

interface Props {
    data: CmsLangForm;
    setData: (data: CmsLangForm) => void;
    errors: Record<string, string>;
    processing: boolean;
}

export default function LangFormFields({ data, setData, errors, processing }: Props) {
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
                <Label htmlFor="iso">ISO</Label>
                <Input
                    id="iso"
                    type="text"
                    required
                    tabIndex={2}
                    autoComplete="iso"
                    value={data.iso}
                    onChange={(e) => setData({ ...data, iso: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.iso} />
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
    );
}
