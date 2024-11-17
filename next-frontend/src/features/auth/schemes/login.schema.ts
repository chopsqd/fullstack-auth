import { z } from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Некорректная почта'
	}),
	password: z.string().min(6, {
		message: 'Пароль должен быть минимум 6 символов'
	}),
	code: z.optional(z.string())
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
