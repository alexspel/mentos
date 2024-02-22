import { Button } from '@mantine/core';
import { useAppDispatch } from 'app/providers/StoreProvider/StoreProvider';
import { gitHubAuth } from '../model/services/gitHubAuth';

export const GitHubAuth = () => {
    const dispatch = useAppDispatch();
    const onSignIn = () => {
        dispatch(gitHubAuth());
    };

    return (
        <Button variant="outline" onClick={onSignIn}>
            Войти с помощью GitHub
        </Button>
    );
};
