import { useAppDispatch } from "app/providers/StoreProvider/StoreProvider"
import { useSelector } from "react-redux"
import { useCallback } from "react";
import { isAuthorized } from "../model/selectors";
import { userActions } from '../model/slice/userSlice';
import type { UserSchema } from "../model/types/userSchema";

export const useUser = () => {
    const dispatch = useAppDispatch();
    const authorized = useSelector(isAuthorized);

    const setUser = useCallback((user: UserSchema) => {
        dispatch(userActions.setUser(user));
    }, [dispatch]);

    const clearUser = useCallback(() => {
        dispatch(userActions.clearUser());
    }, [dispatch]);

    return {
        authorized,
        setUser,
        clearUser,
    }
}