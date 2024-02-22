import { Button, Flex } from '@mantine/core';
import { GoogleAuth } from 'features/GoogleAuth';
import { PasswordAuth } from 'features/PasswordAuth';
import { GitHubAuth } from 'features/GitHubAuth';
import { PhoneAuth } from 'features/PhoneAuth';
import { Register } from 'features/Register';
import { useUser } from 'entities/User';
import { useState } from 'react';

type FormType = 'password' | 'phone' | 'register';

export const MainPage = () => {
    const { authorized, clearUser } = useUser();
    const [authType, setAuthType] = useState<FormType>('password')
    const [showRegister, setShowRegister] = useState(false);
    const [showPhoneAuth, setShowPhoneAuth] = useState(false);
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
                    {showRegister && <Register />}
                    <Flex wrap="wrap" gap="xs">
                        <GoogleAuth />
                        <GitHubAuth />
                    </Flex>
                    <Flex wrap="wrap" gap="xs">
                        {authType !== 'phone' && (
                            <Button
                                variant="outline"
                                onClick={() => { setAuthType('phone'); }}>
                                Войти по номеру телефона
                            </Button>
                        )}
                        {authType !== 'password' && (
                            <Button
                                variant="outline"
                                onClick={() => { setAuthType('password'); }}>
                                Войти по логину
                            </Button>
                        )}
                    </Flex>
                </Flex>
            )}
        </>
    );
}