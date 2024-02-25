import { ConfirmationResult } from "firebase/auth";

export interface PhoneAuthSchema {
    confirmation?: ConfirmationResult;
    loading: boolean;
    pin: string;
    phone: string;
}
