import { Loader } from '@mantine/core';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from './config';

export const AppRouter = () => (
    <Routes>
        {Object.values(RouteConfig).map(({ path, element }) => (
            <Route
                key={path}
                path={path}
                element={<Suspense fallback={<Loader />}>{element}</Suspense>}
            />
        ))}
    </Routes>
);
