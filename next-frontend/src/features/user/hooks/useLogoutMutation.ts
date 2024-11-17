import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/features/auth/services";
import {toastMessage} from "@/shared/utils";
import {toast} from "sonner";

export function useLogoutMutation() {
    const router = useRouter()

    const {mutate: logout, isPending: isLoadingLogout} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess() {
            toast.success('Вы вышли из системы')
            router.push('/auth/login')
        },
        onError(error) {
            toastMessage(error)
        }
    })

    return {logout, isLoadingLogout}
}
