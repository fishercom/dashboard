
import { router } from '@inertiajs/react';

export const sendVerificationEmail = (onStart: () => void, onFinish: () => void) => {
    router.post(route('verification.send'), {}, {
        onStart: onStart,
        onFinish: onFinish,
    });
};

export const updatePassword = (data: Record<string, any>, callbacks: object) => {
    router.put(route('password.update'), data, callbacks);
};
