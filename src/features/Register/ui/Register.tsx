import { Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useCallback } from 'react';
import { useUser } from 'entities/User';
import { auth } from 'shared/firebase/firebase';
import { schema } from '../validation';

export type RegisterValues = {
    email: string;
    password: string;
};

export const Register = () => {
    const { setUser } = useUser();
    const form = useForm<RegisterValues>({
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
            createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
                // @ts-ignore
                .then(({ accessToken: token, user }) => {
                    const { email, uid: id } = user;
                    setUser({ email, id, token })
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
                    <Button type="submit">Зарегистрироваться</Button>
                </Group>
            </Flex>
        </form>
    );
};
