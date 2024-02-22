import { StateSchema } from "app/providers/StoreProvider/config/schema";


export const getUser = (state: StateSchema) => ({
    id: state.user.id,
    email: state.user.email,
    token: state.user.token,
})

export const isAuthorized = (state: StateSchema): boolean => Boolean(state.user.id);

export const getError = (state: StateSchema): string | undefined => state.user.error;
