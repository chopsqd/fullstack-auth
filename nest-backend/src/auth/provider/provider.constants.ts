import { FactoryProvider, ModuleMetadata } from '@nestjs/common'

import { BaseOAuthService } from '@/auth/provider/services/base-oauth.service'

export const ProviderOptionsSymbol = Symbol()

export type OptionsType = {
	baseUrl: string
	services: BaseOAuthService[]
}

export type AsyncOptionsType = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<OptionsType>, 'useFactory' | 'inject'>
