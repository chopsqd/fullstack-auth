import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { getRecaptchaConfig } from '@/config/recaptcha.config'
import { UserService } from '@/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import {ProviderModule} from "@/auth/provider/provider.module";
import {getProvidersConfig} from "@/config/providers.config";

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
		})
	],
	controllers: [AuthController],
	providers: [AuthService, UserService]
})
export class AuthModule {}
