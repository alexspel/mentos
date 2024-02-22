import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider/StoreProvider";
import { isAuthorized } from "../model/selectors";
import { userActions } from '../model/slice/userSlice';
import type { UserSchema } from "../model/types/userSchema";

export const useUser = () => {
    const dispatch = useAppDispatch();
    const authorized = useAppSelector(isAuthorized);

    const setUser = (user: UserSchema) => {
        dispatch(userActions.setUser(user));
    };

    const clearUser = () => {
        dispatch(userActions.clearUser());
    }

    return {
        authorized,
        setUser,
        clearUser,
    }
}
