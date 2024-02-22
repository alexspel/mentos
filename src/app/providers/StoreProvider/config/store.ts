import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { phoneAuthReducer } from 'features/PhoneAuth/model/slice/phoneAuthSlice';
import { api } from 'shared/api';
import { StateSchema, ThunkExtraArg } from './schema';

export function createAppStore(initialState: StateSchema) {
    const rootReducer = combineReducers({
        user: userReducer,
        phoneAuth: phoneAuthReducer,
    });

    const extraArg: ThunkExtraArg = {
        api,
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    return store;
}
