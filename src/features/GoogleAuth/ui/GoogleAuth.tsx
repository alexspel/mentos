import { Button } from '@mantine/core';
import { useAppDispatch } from 'app/providers/StoreProvider/StoreProvider';
import { googleAuth } from '../model/services/googleAuth';

export const GoogleAuth = () => {
    const dispatch = useAppDispatch();

    const onSignIn = () => {
        dispatch(googleAuth());
    };

    return (
        <Button variant="outline" onClick={onSignIn}>
            Войти с помощью Google
        </Button>
    );
};
