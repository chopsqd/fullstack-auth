'use client'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { useForm } from 'react-hook-form'
import { RegisterSchema, RegisterSchemaType } from '@/features/auth/schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui/components'
import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'sonner'
import { useRegisterMutation } from '@/features/auth/hooks'

export function RegisterForm() {
	const {theme} = useTheme()
	const {register, isLoadingRegister} = useRegisterMutation()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const onSubmit = (values: RegisterSchemaType) => {
		if (recaptchaValue) {
			register({values, recaptcha: recaptchaValue})
		} else {
			toast.error('Пожалуйста, пройдите ReCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='name'
						render={({field}) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Иван'
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({field}) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input
										placeholder='ivan@example.com'
										disabled={isLoadingRegister}
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({field}) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										placeholder='******'
										disabled={isLoadingRegister}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({field}) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
								<FormControl>
									<Input
										placeholder='******'
										disabled={isLoadingRegister}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>

					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>

					<Button
						type='submit'
						disabled={isLoadingRegister}
					>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
