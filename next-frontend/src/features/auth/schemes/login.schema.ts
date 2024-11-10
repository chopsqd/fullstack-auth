import { z } from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	password: z.string().min(6, {
		message: 'Пароль должен быть минимум 6 символов'
	})
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
