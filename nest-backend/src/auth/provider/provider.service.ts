import { Inject, Injectable, OnModuleInit } from '@nestjs/common'

import {
	OptionsType,
	ProviderOptionsSymbol
} from '@/auth/provider/provider.constants'
import { BaseOAuthService } from '@/auth/provider/services/base-oauth.service'

@Injectable()
export class ProviderService implements OnModuleInit {
	public constructor(
		@Inject(ProviderOptionsSymbol) private readonly options: OptionsType
	) {}

	public onModuleInit() {
		for (const provider of this.options.services) {
			provider.baseUrl = this.options.baseUrl
		}
	}

	public findByService(service: string): BaseOAuthService | null {
		return this.options.services.find(s => s.name === service)
	}
}
