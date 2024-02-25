import { AxiosInstance } from 'axios';
import { UserSchema } from 'entities/User';
import { PhoneAuthSchema } from 'features/PhoneAuth/model/types/phoneAuth';

export interface StateSchema {
    user: UserSchema;
    phoneAuth: PhoneAuthSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
