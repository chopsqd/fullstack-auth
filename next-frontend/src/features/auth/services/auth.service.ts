import {LoginSchemaType, RegisterSchemaType} from '@/features/auth/schemes'
import {API} from '@/shared/api'
import {IUser} from '../types'

class AuthService {
	public async register(body: RegisterSchemaType, recaptcha?: string) {
		const headers = recaptcha ? {recaptcha} : undefined

		return await API.post<IUser>('auth/register', body, { headers })
	}

	public async login(body: LoginSchemaType, recaptcha?: string) {
		const headers = recaptcha ? {recaptcha} : undefined

		return await API.post<IUser>('auth/login', body, { headers })
	}

	public async oauthByProvider(provider: 'google' | 'yandex') {
		return await API.get<{ url: string }>(`auth/oauth/connect/${provider}`)
	}

	public async logout() {
		return await API.post('auth/logout')
	}
}

export const authService = new AuthService()
