import {NewPasswordSchemaType, ResetPasswordSchemaType} from '@/features/auth/schemes'
import {API} from '@/shared/api'
import {IUser} from '../types'

class PasswordRecoveryService {
    public async reset(body: ResetPasswordSchemaType, recaptcha?: string) {
        const headers = recaptcha ? {recaptcha} : undefined

        return await API.post<IUser>('auth/password-recovery/reset', body, { headers })
    }

    public async new(body: NewPasswordSchemaType, token: string | null, recaptcha?: string) {
        const headers = recaptcha ? {recaptcha} : undefined

        return await API.post<IUser>(`auth/password-recovery/new/${token}`, body, { headers })
    }
}

export const passwordRecoveryService = new PasswordRecoveryService()
