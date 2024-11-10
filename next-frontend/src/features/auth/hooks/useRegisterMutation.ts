import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/services'
import { RegisterSchemaType } from '@/features/auth/schemes'
import { toastMessage } from '@/shared/utils'

export function useRegisterMutation() {
	const {mutate: register, isPending: isLoadingRegister} = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({
			 values,
			 recaptcha
		}: {
			 values: RegisterSchemaType,
			 recaptcha: string
		}) => authService.register(values, recaptcha),
		onSuccess(data: any) {
			toastMessage(data)
		},
		onError(error) {
			toastMessage(error)
		}
	})

	return { register, isLoadingRegister }
}
