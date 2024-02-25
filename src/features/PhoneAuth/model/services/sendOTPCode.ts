import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/schema";
import { userActions } from "entities/User/model/slice/userSlice";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "shared/firebase/firebase";
import { phoneAuthActions } from "../slice/phoneAuthSlice";

interface Props {
    phone: string;
    verifier: RecaptchaVerifier;
}

export const sendOTPCode = createAsyncThunk<void, Props, ThunkConfig<string>>(
    'features/SendOTPCode',
    ({ phone, verifier }, thunk) => {
        const { dispatch, rejectWithValue } = thunk;
        signInWithPhoneNumber(auth, phone, verifier)
            .then((result) => {
                dispatch(phoneAuthActions.setConfirmation(result))
            })
            .catch((error) => {
                dispatch(userActions.clearUser());
                dispatch(userActions.setAuthError(error.message));
                rejectWithValue(error.message);
            });
    }
)
