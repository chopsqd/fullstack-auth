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
import { useLoginMutation } from '@/features/auth/hooks'

export function LoginForm() {
	const {theme} = useTheme()
	const {login, isLoadingLogin} = useLoginMutation()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	})

	const onSubmit = (values: LoginSchemaType) => {
		if (recaptchaValue) {
			login({ values, recaptcha: recaptchaValue })
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
						name='email'
						render={({field}) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input
										placeholder='ivan@example.com'
										disabled={isLoadingLogin}
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
										disabled={isLoadingLogin}
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
						disabled={isLoadingLogin}
					>
						Войти в аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
