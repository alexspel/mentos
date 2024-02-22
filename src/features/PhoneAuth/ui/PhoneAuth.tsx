import { Button, Flex, Text } from '@mantine/core';
import { auth } from 'shared/firebase/firebase';
import { useCallback, useState } from 'react';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useUser } from 'entities/User';
import PhoneInput from 'react-phone-number-input';
import ReactCodeInput from 'react-code-input';

export const PhoneAuth = () => {
    const { setUser } = useUser();
    const [phone, setPhone] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [result, setResult] = useState<ConfirmationResult>();
    const [disabledPhoneInput, setDisabledPhoneInput] = useState(false);
    const [disabledPinInput, setDisabledPinInput] = useState(true);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [error, setError] = useState();


    const onSendSMS = useCallback(async () => {
        setDisabledPhoneInput(true);
        const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
        recaptchaVerifier.render();
        await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
            .then((result) => {
                setResult(result);
                setShowCodeInput(true);
                setDisabledPinInput(false);
            })
            .catch((e) => {
                setDisabledPhoneInput(false);
                setError(e.message);
                console.log(e);
            });
        recaptchaVerifier?.clear();
    }, [setDisabledPhoneInput, setResult, setShowCodeInput, phone, setError]);

    const onSendCode = useCallback(async () => {
        setDisabledPinInput(true);
        // @ts-ignore
        await result.confirm(code)
            // @ts-ignore
            .then(({ accessToken, user }) => {
                const { email, uid: id } = user;
                setUser({ token: accessToken, email, id });
            }).catch((e) => {
                setError(e.message);
                console.log(e);
                setDisabledPinInput(false);
            });

    }, [code, result, setUser, setError]);

    return (
        <Flex direction="column" gap="xs">

            <PhoneInput
                disabled={disabledPhoneInput}
                defaultCountry="RU"
                value={phone}
                onChange={(value) => { setPhone(String(value)); }}
            />
            <Button
                disabled={disabledPhoneInput}
                onClick={onSendSMS}>
                Отправить СМС с кодом
            </Button>
            <div id="recaptcha-container" />
            {showCodeInput && (
                <>
                    <ReactCodeInput
                        disabled={disabledPinInput}
                        name="pin"
                        isValid={code.length === 6}
                        type="text"
                        value={code}
                        fields={6}
                        inputMode="numeric"
                        onChange={(value) => { setCode(value); }}
                    />
                    <Button
                        disabled={disabledPinInput}
                        onClick={onSendCode}>
                        Войти
                    </Button>
                </>
            )}
            {error && <Text c="red">{error}</Text>}
        </Flex>
    );
}