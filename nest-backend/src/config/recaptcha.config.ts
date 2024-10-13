import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'

import { isDev } from '@/libs/common/utils/is-dev.utils'

export const getRecaptchaConfig = async (
	configService: ConfigService
): Promise<GoogleRecaptchaModuleOptions> => ({
	secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
	response: request => request.headers.recaptcha,
	skipIf: isDev(configService)
})