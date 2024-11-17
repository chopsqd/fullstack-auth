import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'

import {verificationService} from '../services'

export function useVerificationMutation() {
    const router = useRouter()

    const { mutate: verification } = useMutation({
        mutationKey: ['verification'],
        mutationFn: (token: string | null) =>
            verificationService.verify(token),
        onSuccess() {
            toast.success('Почта успешно подтверждена')
            router.push('/dashboard/settings')
        },
        onError() {
            router.push('/auth/login')
        }
    })

    return { verification }
}
