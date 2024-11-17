import {useMutation} from "@tanstack/react-query";
import {NewPasswordSchemaType} from "@/features/auth/schemes";
import {passwordRecoveryService} from "@/features/auth/services";
import {toastMessage} from "@/shared/utils";
import {toast} from "sonner";
import {useRouter, useSearchParams} from "next/navigation";

export function useNewPasswordMutation() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const {mutate: newPassword, isPending: isLoadingNew} = useMutation({
        mutationKey: ['new password'],
        mutationFn: ({
             values,
             recaptcha
        }: {
             values: NewPasswordSchemaType,
             recaptcha: string
        }) => passwordRecoveryService.new(values, token, recaptcha),
        onSuccess() {
            toast.success('Пароль успешно изменён', {
                description: 'Теперь вы можете войти в свой аккаунт.'
            })
            router.push('/auth/login')
        },
        onError(error) {
            toastMessage(error)
        }
    })

    return { newPassword, isLoadingNew }
}
