import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req
} from '@nestjs/common'
import { Request } from 'express'

import { ConfirmationDTO } from '@/auth/email-confirmation/dto/confirmation.dto'

import { EmailConfirmationService } from './email-confirmation.service'

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService
	) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	public async newVerification(
		@Req() req: Request,
		@Body() dto: ConfirmationDTO
	) {
		return this.emailConfirmationService.newVerification(req, dto)
	}
}
