import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types/userSchema";


const initialState: UserSchema = {}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<UserSchema>) => {
            state.email = payload.email;
            state.id = payload.id;
            state.token = payload.token;
        },
        clearUser: (state) => {
            state.email = undefined;
            state.id = undefined;
            state.token = undefined;
        },
        setAuthError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        }
    }
});

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice;
