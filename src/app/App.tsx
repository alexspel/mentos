import { AppShell, Loader, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import { AppRouter } from './providers/AppRouter/AppRouter';
import { StoreProvider } from './providers/StoreProvider/StoreProvider';
import { theme } from './styles/theme';

export const App = () => (
    <MantineProvider theme={theme}>
        <BrowserRouter>
            <StoreProvider>
                <Suspense fallback={<Loader />}>
                    <AppShell>
                        <AppShell.Main>
                            <AppRouter />
                        </AppShell.Main>
                    </AppShell>
                </Suspense>
            </StoreProvider>
        </BrowserRouter>
    </MantineProvider>
);
