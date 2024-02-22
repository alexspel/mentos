import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types/userSchema";


const initialState: UserSchema = {}

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema>) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.email = undefined;
            state.id = undefined;
            state.token = undefined;
        },
    }
});

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice;