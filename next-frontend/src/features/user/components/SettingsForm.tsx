'use client'

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Loader,
    Switch
} from "@/shared/ui/components";
import {useProfile} from "@/shared/hooks";
import {UserButton, UserButtonLoading} from "@/features/user/components/UserButton";
import {useForm} from "react-hook-form";
import {SettingsSchema, SettingsSchemaType} from "@/features/user/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useUpdateProfileMutation} from "@/features/user/hooks/useUpdateProfileMutation";

export function SettingsForm() {
    const {user, isLoading} = useProfile()
    const {update, isLoadingUpdate} = useUpdateProfileMutation()

    const form = useForm<SettingsSchemaType>({
        resolver: zodResolver(SettingsSchema),
        values: {
            name: user?.displayName || '',
            email: user?.email || '',
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false
        }
    })

    const onSubmit = (values: SettingsSchemaType) => {
        update(values)
    }

    if (!user) {
        return null
    }

    return <Card className={'w-[400px]'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <CardTitle>Настройки профиля</CardTitle>
            {isLoading
                ? <UserButtonLoading/>
                : <UserButton user={user}/>
            }
        </CardHeader>
        <CardContent>
            {isLoading
                ? <Loader/>
                : <Form {...form}>
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
                                            disabled={isLoadingUpdate}
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
                                            disabled={isLoadingUpdate}
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
                            name='isTwoFactorEnabled'
                            render={({field}) => (
                                <FormItem
                                    className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>
                                            Двухфакторная аутентификация
                                        </FormLabel>
                                        <FormDescription>
                                            Включите двухфакторную
                                            аутентификацию для вашей учетной
                                            записи
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isLoadingUpdate}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isLoadingUpdate}
                        >
                            Сохранить
                        </Button>
                    </form>
                </Form>
            }
        </CardContent>
    </Card>
}
