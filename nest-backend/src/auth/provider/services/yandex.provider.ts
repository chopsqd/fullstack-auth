import { YandexProfile } from '@/auth/provider/services/types/yandex-profile.types'

import { BaseOAuthService } from './base-oauth.service'
import { ProviderOptionsType } from './types/provider-options.types'
import { UserInfoType } from './types/user-info.types'

export class YandexProvider extends BaseOAuthService {
	public constructor(options: ProviderOptionsType) {
		super({
			name: 'yandex',
			authorize_url: 'https://oauth.yandex.ru/authorize',
			access_url: 'https://oauth.yandex.ru/token',
			profile_url: 'https://login.yandex.ru/info?format=json',
			scopes: options.scopes,
			client_id: options.client_id,
			client_secret: options.client_secret
		})
	}

	public async extractUserInfo(data: YandexProfile): Promise<UserInfoType> {
		return super.extractUserInfo({
			email: data.emails[0],
			name: data.display_name,
			picture: data.default_avatar_id
				? `https://avatars.yandex.net/get-yapic/${data.default_avatar_id}/islands-200`
				: undefined
		})
	}
}
