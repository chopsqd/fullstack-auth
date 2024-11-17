import type {Metadata} from "next";
import {VerificationForm} from "@/features/auth/components";

export const metadata: Metadata = {
    title: 'Подтверждение почты'
}

export default function VerificationPage() {
    return <VerificationForm/>
}
