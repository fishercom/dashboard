import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { AdmLogForm } from "@/types/models/adm-log";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdmEvent } from "@/types/models/adm-event";
import { User } from "@/types/models/user";

interface Props {
    data: AdmLogForm;
    setData: (data: AdmLogForm) => void;
    errors: Record<string, string>;
    processing: boolean;
    events: AdmEvent[];
    users: User[];
}

export default function LogFormFields({ data, setData, errors, processing, events, users }: Props) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="event_id">Event</Label>
                <Select
                    value={data.event_id.toString()}
                    onValueChange={(value) => setData({ ...data, event_id: Number(value) })}
                    disabled={processing}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                        {events.map((event) => (
                            <SelectItem key={event.id} value={event.id.toString()}>
                                {event.action.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.event_id} />
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
                <Label htmlFor="comment">Comment</Label>
                <Input
                    id="comment"
                    type="text"
                    tabIndex={3}
                    autoComplete="comment"
                    value={data.comment}
                    onChange={(e) => setData({ ...data, comment: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.comment} />
            </div>
        </>
    );
}
