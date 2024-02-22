import { Button } from '@mantine/core';
import { useUser } from 'entities/User';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from 'shared/firebase/firebase';

export const GoogleAuth = () => {
    const { setUser } = useUser();
    const onSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // @ts-ignore
                const token = credential.accessToken;
                // The signed-in user info.
                const { email, uid } = result.user;
                setUser({ email, id: uid, token })
            });
    }
    return (
        <Button variant="outline" onClick={onSignIn}>Войти с помощью Google</Button>
    )
}