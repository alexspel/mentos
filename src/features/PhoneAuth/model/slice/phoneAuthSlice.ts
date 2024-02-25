import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ConfirmationResult } from 'firebase/auth';
import { sendOTPCode } from '../services/sendOTPCode';
import { PhoneAuthSchema } from '../types/phoneAuth';

const initialState: PhoneAuthSchema = {
    loading: false,
    confirmation: undefined,
    pin: '',
    phone: '',
}

const phoneAuth = createSlice({
    name: 'PhoneAuthSlice',
    initialState,
    reducers: {
        setConfirmation: (state, { payload }: PayloadAction<ConfirmationResult>) => {
            state.confirmation = payload;
        },
        setPhone: (state, { payload }: PayloadAction<string>) => {
            state.phone = payload;
        },
        setPin: (state, { payload }: PayloadAction<string>) => {
            state.pin = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendOTPCode.pending, (state) => {
            state.loading = true;
        }).addCase(sendOTPCode.fulfilled, (state) => {
            state.loading = false;
        }).addCase(sendOTPCode.rejected, (state) => {
            state.loading = false;
        });
    },
})

export const {
    reducer: phoneAuthReducer,
    actions: phoneAuthActions,
} = phoneAuth;
