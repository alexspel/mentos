import { Button } from '@mantine/core';
import { useUser } from 'entities/User';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, githubProvider } from 'shared/firebase/firebase'

export const GitHubAuth = () => {
    const { setUser } = useUser();
    const a = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                // @ts-ignore
                const token = credential.accessToken;
                // The signed-in user info.
                const { email, uid: id } = result.user;
                setUser({ email, id, token });
            });
    }
    return (
        <Button variant="outline" onClick={a}>Войти с помощью GitHub</Button>
    )
}