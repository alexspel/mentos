import {
    GithubAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/schema";
import { userActions } from 'entities/User/model/slice/userSlice';
import {
    auth,
    githubProvider,
} from "shared/firebase/firebase";

export const gitHubAuth = createAsyncThunk<void, void, ThunkConfig<string>>(
    'features/GitHubAuth',
    async (_, thunk) => {
        const { rejectWithValue, dispatch } = thunk;

        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
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
