import {
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/schema";
import { userActions } from 'entities/User/model/slice/userSlice';
import {
    auth,
    googleProvider,
} from "shared/firebase/firebase";

export const googleAuth = createAsyncThunk<void, void, ThunkConfig<string>>(
    'features/GoogleAuth',
    async (_, thunk) => {
        const { rejectWithValue, dispatch } = thunk;

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const { email, uid } = result.user;
                dispatch(
                    userActions.setUser({ token, email, id: uid })
                );
            }).catch((error) => {
                dispatch(userActions.clearUser());
                dispatch(userActions.setAuthError(error.message));
                rejectWithValue(error.message);
            });
    },
);
