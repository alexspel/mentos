import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/schema";
import { userActions } from "entities/User/model/slice/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "shared/firebase/firebase";

interface Props {
    email: string;
    password: string;
}

export const passwordAuth = createAsyncThunk<void, Props, ThunkConfig<string>>(
    'features/PasswordAuth', ({ password, email }, thunk) => {
        const { dispatch, rejectWithValue } = thunk;
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                const { email, uid: id } = user;
                // @ts-ignore
                const token = user?.accessToken;
                dispatch(userActions.setUser({ email, id, token }))
            }).catch((error) => {
                dispatch(userActions.clearUser());
                dispatch(userActions.setAuthError(error.message));
                rejectWithValue(error.message);
            });
    }
)
