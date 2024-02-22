import { Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useCallback } from 'react';
import { useUser } from 'entities/User';
import { auth } from 'shared/firebase/firebase';
import { schema } from '../validation';

export type SignInValues = {
    email: string;
    password: string;
};

export const PasswordAuth = () => {
    const { setUser } = useUser();

    const form = useForm<SignInValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: yupResolver(schema),
    });

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (form.validate().hasErrors) {
                return;
            }

            signInWithEmailAndPassword(auth, form.values.email, form.values.password)
                .then(async ({ user }) => {
                    setUser({
                        id: user.uid,
                        email: user.email,
                        // @ts-ignore
                        token: user.accessToken,
                    });
                })
                .catch((a) => {
                    console.log(a);
                });
        },
        [form, setUser],
    );

    return (
        <form onSubmit={onSubmit}>
            <Flex align="flex-start" direction="column" gap="xs">
                <TextInput
                    label="Email"
                    placeholder="tim.jennings@example.com"
                    {...form.getInputProps('email')}
                />
                <TextInput label="Password" {...form.getInputProps('password')} />
                <Group justify="flex-start">
                    <Button type="submit">Войти</Button>
                </Group>
            </Flex>
        </form>
    );
};
