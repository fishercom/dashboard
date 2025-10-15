
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import { CmsNotifyForm } from "@/types/models/cms-notify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CmsForm } from "@/types/models/cms-form";
import { User } from "@/types/models/user";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    data: CmsNotifyForm;
    setData: (data: CmsNotifyForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    forms: CmsForm[];
    users: User[];
}

export default function NotifyFormFields({ data, setData, errors, processing, forms, users }: Props) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="form_id">Form</Label>
                <Select
                    value={data.form_id.toString()}
                    onValueChange={(value) => setData({ ...data, form_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a form" />
                    </SelectTrigger>
                    <SelectContent>
                        {forms.map((form) => (
                            <SelectItem key={form.id} value={form.id.toString()}>
                                {form.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.form_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="user_id">User</Label>
                <Select
                    value={data.user_id.toString()}
                    onValueChange={(value) => setData({ ...data, user_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.user_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Textarea
                    id="recipients"
                    tabIndex={3}
                    autoComplete="recipients"
                    value={data.recipients}
                    onChange={(e) => setData({ ...data, recipients: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.recipients} />
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
