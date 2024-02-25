import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/schema";
import { userActions } from "entities/User/model/slice/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "shared/firebase/firebase";

interface Props {
    email: string;
    password: string;
}

export const register = createAsyncThunk<void, Props, ThunkConfig<string>>(
    'features/Register',
    ({ email, password }, thunk) => {
        const { dispatch, rejectWithValue } = thunk;
        createUserWithEmailAndPassword(auth, email, password)
            // @ts-ignore
            .then(({ accessToken: token, user }) => {
                const { email, uid: id } = user;
                dispatch(
                    userActions.setUser({ token, email, id })
                );
            }).catch((error) => {
                dispatch(userActions.clearUser());
                dispatch(userActions.setAuthError(error.message));
                rejectWithValue(error.message);
            });
    }
);
