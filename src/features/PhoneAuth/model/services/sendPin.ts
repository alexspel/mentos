import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/schema";
import { userActions } from "entities/User/model/slice/userSlice";
import { getConfirmation } from "../selectors";

interface Props {
    pin: string;
}

export const sendPin = createAsyncThunk<void, Props, ThunkConfig<string>>(
    'features/SendPin',
    async ({ pin }, thunk) => {
        const { dispatch, getState, rejectWithValue } = thunk;
        const confirmation = getConfirmation(getState());

        await confirmation?.confirm(pin)
            // @ts-ignore
            .then(({ user, accessToken }) => {
                dispatch(userActions.setUser({
                    email: user?.email,
                    id: user?.uid,
                    token: accessToken,
                }))
            }).catch((error) => {
                dispatch(userActions.clearUser());
                dispatch(userActions.setAuthError(error.message));
                rejectWithValue(error.message);
            });
    }
)
