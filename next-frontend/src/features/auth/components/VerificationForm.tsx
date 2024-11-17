'use client'

import {useSearchParams} from "next/navigation";
import {useVerificationMutation} from "@/features/auth/hooks";
import {useEffect} from "react";
import {AuthWrapper} from "@/features/auth/components/AuthWrapper";
import {Loader} from "@/shared/ui/components";

export function VerificationForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const {verification} = useVerificationMutation()

    useEffect(() => {
        verification(token)
    }, [token])

    return <AuthWrapper heading={'Подтверждение почты'}>
        <div>
            <Loader/>
        </div>
    </AuthWrapper>
}
