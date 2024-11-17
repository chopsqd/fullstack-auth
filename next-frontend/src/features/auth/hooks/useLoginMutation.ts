import {Dispatch, SetStateAction} from "react";
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {useMutation} from '@tanstack/react-query'
import {authService} from '@/features/auth/services'
import {LoginSchemaType} from '@/features/auth/schemes'
import {toastMessage} from '@/shared/utils'

export function useLoginMutation(
	setIsShowTwoFactor: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()

	const {mutate: login, isPending: isLoadingLogin} = useMutation({
		mutationKey: ['login user'],
		mutationFn: ({
			 values,
			 recaptcha
		}: {
			 values: LoginSchemaType,
			 recaptcha: string
		}) => authService.login(values, recaptcha),
		onSuccess(data: any) {
			if (data.message) {
				toastMessage(data)
				setIsShowTwoFactor(true)
			} else {
				toast.success('Успешная авторизация')
				router.push('/dashboard/settings')
			}
		},
		onError(error) {
			toastMessage(error)
		}
	})

	return { login, isLoadingLogin }
}
