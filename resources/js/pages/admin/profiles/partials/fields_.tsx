
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import { ProfileForm } from "@/types";
import { AdmModule } from "@/types/models/adm-module";
import { AdmEvent } from "@/types/models/adm-event";

interface Props {
    data: ProfileForm;
    setData: (data: ProfileForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    modules: AdmModule[];
}

export default function ProfileFormFields({ data, setData, errors, processing, modules }: Props) {

    const handleCheckboxChange = (eventId: number) => {
        const newPermissions = [...(data.permissions || [])];
        const permissionIndex = newPermissions.findIndex(p => p === eventId);

        if (permissionIndex > -1) {
            newPermissions.splice(permissionIndex, 1);
        } else {
            newPermissions.push(eventId);
        }

        setData({ ...data, permissions: newPermissions });
    };

    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
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

            <div className="grid gap-4">
                <h3 className="text-lg font-medium">Permisos</h3>
                {modules.map((module) => (
                    <div key={module.id} className="p-2 border rounded-md">
                        <h4 className="font-medium mb-2">{module.name}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                            {module.events.map((event: AdmEvent) => (
                                <div key={event.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`event-${event.id}`}
                                        checked={data.permissions?.includes(event.id)}
                                        onCheckedChange={() => handleCheckboxChange(event.id)}
                                    />
                                    <Label htmlFor={`event-${event.id}`}>{event.action.name}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
                    tabIndex={3}
                />
                <Label htmlFor="active">Activo</Label>
            </div>
        </>
    );
}
