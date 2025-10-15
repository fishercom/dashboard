import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/types/models/profile";
import { Textarea } from "@/components/ui/textarea";

export interface UserForm {
    id?: number;
    username: string;
    email: string;
    password?: string;
    name: string;
    lastname: string;
    profile_id: number;
    metadata: Record<string, unknown>;
    active: boolean;
    default: boolean;
}

interface Props {
    data: UserForm;
    setData: (data: UserForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    profiles: Profile[];
}

export default function UserFormFields({ data, setData, errors, processing, profiles }: Props) {
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
                <Label htmlFor="lastname">Lastname</Label>
                <Input
                    id="lastname"
                    type="text"
                    tabIndex={2}
                    autoComplete="lastname"
                    value={data.lastname}
                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.lastname} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    tabIndex={3}
                    autoComplete="username"
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.username} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    required
                    tabIndex={4}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    tabIndex={5}
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="profile_id">Profile</Label>
                <Select
                    value={data.profile_id.toString()}
                    onValueChange={(value) => setData({ ...data, profile_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a profile" />
                    </SelectTrigger>
                    <SelectContent>
                        {profiles.map((profile) => (
                            <SelectItem key={profile.id} value={profile.id.toString()}>
                                {profile.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.profile_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="metadata">Metadata</Label>
                <Textarea
                    id="metadata"
                    tabIndex={7}
                    autoComplete="metadata"
                    value={JSON.stringify(data.metadata, null, 2)}
                    onChange={(e) => {
                        try {
                            setData({ ...data, metadata: JSON.parse(e.target.value) });
                        } catch (error) {
                            console.error("Invalid JSON for metadata:", error);
                        }
                    }}
                    disabled={processing}
                />
                <InputError message={errors.metadata} />
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
                    tabIndex={8}
                />
                <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="default"
                    name="default"
                    checked={Boolean(data.default)}
                    onClick={() => setData({ ...data, default: !data.default })}
                    tabIndex={9}
                />
                <Label htmlFor="default">Default</Label>
            </div>
        </>
    );
}