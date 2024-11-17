import {useTheme} from "next-themes";
import {useResetPasswordMutation} from "@/features/auth/hooks";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {ResetPasswordSchema, ResetPasswordSchemaType} from "@/features/auth/schemes";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {AuthWrapper} from "@/features/auth/components/AuthWrapper";
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from "@/shared/ui/components";
import ReCAPTCHA from "react-google-recaptcha";

export function ResetPasswordForm() {
    const {theme} = useTheme()
    const {reset, isLoadingReset} = useResetPasswordMutation()
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = (values: ResetPasswordSchemaType) => {
        if (recaptchaValue) {
            reset({values, recaptcha: recaptchaValue})
        } else {
            toast.error('Пожалуйста, пройдите ReCAPTCHA')
        }
    }

    return (
        <AuthWrapper
            heading='Сброс пароля'
            description='Для сброса пароля введите свою почту'
            backButtonLabel='Войти в аккаунт'
            backButtonHref='/auth/login'
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
                                        disabled={isLoadingReset}
                                        type='email'
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
                        disabled={isLoadingReset}
                    >
                        Сбросить
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}
