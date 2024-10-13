import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { EmailConfirmationModule } from '@/auth/email-confirmation/email-confirmation.module'
import { ProviderModule } from '@/auth/provider/provider.module'
import { TwoFactorAuthService } from '@/auth/two-factor-auth/two-factor-auth.service'
import { getProvidersConfig } from '@/config/providers.config'
import { getRecaptchaConfig } from '@/config/recaptcha.config'
import { MailService } from '@/libs/mail/mail.service'
import { UserService } from '@/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [
		ProviderModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getProvidersConfig,
			inject: [ConfigService]
		}),
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getRecaptchaConfig,
			inject: [ConfigService]
		}),
		forwardRef(() => EmailConfirmationModule)
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, MailService, TwoFactorAuthService],
	exports: [AuthService]
})
export class AuthModule {}
