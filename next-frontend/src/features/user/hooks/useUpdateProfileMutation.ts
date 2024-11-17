import {useMutation} from "@tanstack/react-query";
import {userService} from "@/features/user/services";
import {SettingsSchemaType} from "@/features/user/schemas";
import {toast} from "sonner";
import {toastMessage} from "@/shared/utils";

export function useUpdateProfileMutation() {
    const {mutate: update, isPending: isLoadingUpdate} = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: SettingsSchemaType) => userService.updateProfile(data),
        onSuccess() {
            toast.success('Профиль успешно обновлён')
        },
        onError(error) {
            toastMessage(error)
        }
    })

    return {update, isLoadingUpdate}
}
