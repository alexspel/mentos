import { FC, ReactNode } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { StateSchema } from './config/schema';
import { createAppStore } from './config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: Partial<StateSchema>;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {
    const store = createAppStore(initialState as StateSchema);
    return <Provider store={store}>{children}</Provider>;
};

export type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
