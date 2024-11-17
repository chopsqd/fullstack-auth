import { z } from 'zod'

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Пароль должен быть минимум 6 символов'
    })
})

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>
