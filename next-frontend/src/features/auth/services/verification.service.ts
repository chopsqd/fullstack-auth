import {API} from "@/shared/api";

class VerificationService {
    public async verify(token: string | null) {
        return await API.post('auth/email-confirmation', {token})
    }
}

export const verificationService = new VerificationService()
