import { Button, Flex } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/StoreProvider';
import { RecaptchaVerifier } from 'firebase/auth';
import { E164Number } from 'libphonenumber-js/core';
import ReactCodeInput from 'react-code-input';
import PhoneInput from 'react-phone-number-input';
import { auth } from 'shared/firebase/firebase';
import { getConfirmation, getLoading, getPhone, getPin } from '../model/selectors';
import { sendOTPCode } from '../model/services/sendOTPCode';
import { sendPin } from '../model/services/sendPin';
import { phoneAuthActions } from '../model/slice/phoneAuthSlice';

export const PhoneAuth = () => {
    const dispatch = useAppDispatch();

    const confirmation = useAppSelector(getConfirmation);
    const loading = useAppSelector(getLoading);
    const pin = useAppSelector(getPin);
    const phone = useAppSelector(getPhone);

    const onEnterPhone = (value: E164Number) => {
        dispatch(phoneAuthActions.setPhone(String(value)));
    };

    const onEnterPin = (value: string) => {
        dispatch(phoneAuthActions.setPin(value));
    };

    const onSendSMS = () => {
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
        verifier.render();
        dispatch(sendOTPCode({ phone, verifier }));
        verifier.clear();
    };

    const onSendPin = () => {
        dispatch(sendPin({ pin }));
    };

    return (
        <Flex direction="column" gap="xs">
            <PhoneInput
                disabled={loading || Boolean(confirmation)}
                defaultCountry="RU"
                value={phone}
                onChange={onEnterPhone}
            />
            <Button disabled={loading || Boolean(confirmation)} onClick={onSendSMS}>
                Отправить СМС с кодом
            </Button>
            <div id="recaptcha-container" />
            {confirmation && (
                <>
                    <ReactCodeInput
                        disabled={loading}
                        name="pin"
                        isValid={pin.length === 6}
                        type="text"
                        value={pin}
                        fields={6}
                        inputMode="numeric"
                        onChange={onEnterPin}
                    />
                    <Button disabled={loading} onClick={onSendPin}>
                        Войти
                    </Button>
                </>
            )}
        </Flex>
    );
};
