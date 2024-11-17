import {API} from "@/shared/api";
import {IUser} from "@/features/auth/types";
import {SettingsSchemaType} from "@/features/user/schemas";

class UserService {
    public async findProfile() {
        return await API.get<IUser>('users/profile')
    }

    public async updateProfile(body: SettingsSchemaType) {
        return await API.patch<IUser>('users/profile', body)
    }
}

export const userService = new UserService()
