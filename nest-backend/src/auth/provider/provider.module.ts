import {DynamicModule, Module} from '@nestjs/common'
import {AsyncOptionsType, OptionsType, ProviderOptionsSymbol} from "@/auth/provider/provider.constants";
import {ProviderService} from "@/auth/provider/provider.service";

@Module({})
export class ProviderModule {
	public static register(options: OptionsType): DynamicModule {
		return {
			module: ProviderModule,
			providers: [
				{
					useValue: options.services,
					provide: ProviderOptionsSymbol
				},
				ProviderService
			],
			exports: [ProviderService]
		}
	}

	public static registerAsync(options: AsyncOptionsType): DynamicModule {
		return {
			module: ProviderModule,
			imports: options.imports,
			providers: [
				{
					useFactory: options.useFactory,
					provide: ProviderOptionsSymbol,
					inject: options.inject
				},
				ProviderService
			],
			exports: [ProviderService]
		}
	}
}
