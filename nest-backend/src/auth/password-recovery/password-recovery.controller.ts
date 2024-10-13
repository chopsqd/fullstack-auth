import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { Recaptcha } from '@nestlab/google-recaptcha'

import { NewPasswordDTO } from '@/auth/password-recovery/dto/new-password.dto'
import { ResetPasswordDTO } from '@/auth/password-recovery/dto/reset-password.dto'

import { PasswordRecoveryService } from './password-recovery.service'

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
	constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService
	) {}

	@Recaptcha()
	@Post('reset')
	@HttpCode(HttpStatus.OK)
	public async resetPassword(@Body() dto: ResetPasswordDTO) {
		return this.passwordRecoveryService.resetPassword(dto)
	}

	@Recaptcha()
	@Post('new/:token')
	@HttpCode(HttpStatus.OK)
	public async newPassword(
		@Body() dto: NewPasswordDTO,
		@Param('token') token: string
	) {
		return this.passwordRecoveryService.newPassword(dto, token)
	}
}
