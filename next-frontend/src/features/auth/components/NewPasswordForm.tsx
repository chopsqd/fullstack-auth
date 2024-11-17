import {useTheme} from "next-themes";
import {useNewPasswordMutation} from "@/features/auth/hooks";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {NewPasswordSchema, NewPasswordSchemaType} from "@/features/auth/schemes";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {AuthWrapper} from "@/features/auth/components";
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from "@/shared/ui/components";
import ReCAPTCHA from "react-google-recaptcha";

export function NewPasswordForm() {
    const {theme} = useTheme()
    const {newPassword, isLoadingNew} = useNewPasswordMutation()
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

    const form = useForm<NewPasswordSchemaType>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ''
        }
    })

    const onSubmit = (values: NewPasswordSchemaType) => {
        if (recaptchaValue) {
            newPassword({values, recaptcha: recaptchaValue})
        } else {
            toast.error('Пожалуйста, пройдите ReCAPTCHA')
        }
    }

    return (
        <AuthWrapper
            heading='Новый пароль'
            description='Придумайте новый пароль для вашего аккаунта'
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
                        name='password'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Новый пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='******'
                                        disabled={isLoadingNew}
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
                        disabled={isLoadingNew}
                    >
                        Продолжить
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    )
}
