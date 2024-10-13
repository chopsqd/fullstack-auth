import { IsEmail, IsNotEmpty } from 'class-validator'

export class ResetPasswordDTO {
	@IsEmail({}, { message: 'Введите корректный адрес электронной почты.' })
	@IsNotEmpty({ message: 'Поле email не может быть пустым.' })
	email: string
}
