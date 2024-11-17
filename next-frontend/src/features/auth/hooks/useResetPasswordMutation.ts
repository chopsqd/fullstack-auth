import {useMutation} from "@tanstack/react-query";
import {ResetPasswordSchemaType} from "@/features/auth/schemes";
import {passwordRecoveryService} from "@/features/auth/services";
import {toastMessage} from "@/shared/utils";
import {toast} from "sonner";

export function useResetPasswordMutation() {
    const {mutate: reset, isPending: isLoadingReset} = useMutation({
        mutationKey: ['reset password'],
        mutationFn: ({
             values,
             recaptcha
        }: {
             values: ResetPasswordSchemaType,
             recaptcha: string
        }) => passwordRecoveryService.reset(values, recaptcha),
        onSuccess() {
            toast.success('Проверьте почту', {
                description: 'На вашу почту была отправлена ссылка для подтверждения.'
            })
        },
        onError(error) {
            toastMessage(error)
        }
    })

    return { reset, isLoadingReset }
}
