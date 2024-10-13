import { BaseOAuthService } from '@/auth/provider/services/base-oauth.service'
import { GoogleProfile } from '@/auth/provider/services/types/google-profile.types'
import { ProviderOptionsType } from '@/auth/provider/services/types/provider-options.types'
import { UserInfoType } from '@/auth/provider/services/types/user-info.types'

export class GoogleProvider extends BaseOAuthService {
	public constructor(options: ProviderOptionsType) {
		super({
			name: 'google',
			authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
			access_url: 'https://oauth2.googleapis.com/token',
			profile_url: 'https://www.googleapis.com/oauth2/v3/userinfo',
			scopes: options.scopes,
			client_id: options.client_id,
			client_secret: options.client_secret
		})
	}

	public async extractUserInfo(data: GoogleProfile): Promise<UserInfoType> {
		return super.extractUserInfo({
			email: data.email,
			name: data.name,
			picture: data.picture
		})
	}
}
