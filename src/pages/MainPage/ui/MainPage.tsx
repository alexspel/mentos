import { Button, Flex, Text } from '@mantine/core';
import { useAppSelector } from 'app/providers/StoreProvider/StoreProvider';
import { getError as getAuthError, useUser } from 'entities/User';
import { GitHubAuth } from 'features/GitHubAuth';
import { GoogleAuth } from 'features/GoogleAuth';
import { PasswordAuth } from 'features/PasswordAuth';
import { PhoneAuth } from 'features/PhoneAuth';
import { Register } from 'features/Register';
import { useState } from 'react';

type FormType = 'password' | 'phone' | 'register';

export const MainPage = () => {
    const { authorized, clearUser } = useUser();
    const [authType, setAuthType] = useState<FormType>('password');
    const authError = useAppSelector(getAuthError);
    return (
        <>
            {authorized && (
                <Flex direction="row" align="center" justify="center" gap="sm">
                    <span>Вход выполнен</span>
                    <Button onClick={clearUser}>Sign Out</Button>
                </Flex>
            )}
            {!authorized && (
                <Flex direction="column" align="center" justify="center" gap="sm">
                    {authType === 'password' && <PasswordAuth />}
                    {authType === 'phone' && <PhoneAuth />}
                    {authType === 'register' && <Register />}
                    <Flex wrap="wrap" gap="xs">
                        <GoogleAuth />
                        <GitHubAuth />
                    </Flex>
                    <Flex wrap="wrap" gap="xs">
                        {authType !== 'phone' && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setAuthType('phone');
                                }}
                            >
                                Войти по номеру телефона
                            </Button>
                        )}
                        {authType !== 'password' && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setAuthType('password');
                                }}
                            >
                                Войти по логину
                            </Button>
                        )}
                        {authType !== 'register' && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setAuthType('register');
                                }}
                            >
                                Зарегистрироваться
                            </Button>
                        )}
                    </Flex>
                    {authError && <Text c="red">{authError}</Text>}
                </Flex>
            )}
        </>
    );
};
