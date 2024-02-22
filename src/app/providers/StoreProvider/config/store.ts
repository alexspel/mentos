import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from 'shared/api';
import { userReducer } from 'entities/User';
import { StateSchema, ThunkExtraArg } from './schema';

export function createAppStore(initialState: StateSchema) {
    const rootReducer = combineReducers({
        user: userReducer,
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
