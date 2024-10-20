'use client'

import React, { useState } from 'react'
import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginSchemaType, RegisterSchemaType } from '@/features/auth/schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui/components'
import { useTheme } from 'next-themes'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'sonner'

export function LoginForm() {
	const {theme} = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	})

	const onSubmit = (values: LoginSchemaType) => {
		if (recaptchaValue) {
			console.log(values)
		} else {
			toast.error('Пожалуйста, пройдите ReCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Войти'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Еще нет аккаунта? Регистрация'
			backButtonHref='/auth/register'
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

					<Button type='submit'>Войти в аккаунт</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
