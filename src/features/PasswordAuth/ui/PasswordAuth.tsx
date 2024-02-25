import { Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useAppDispatch } from 'app/providers/StoreProvider/StoreProvider';
import { FormEvent } from 'react';
import { passwordAuth } from '../model/passwordAuth';
import { schema } from '../validation';

export type SignInValues = {
    email: string;
    password: string;
};

export const PasswordAuth = () => {
    const dispatch = useAppDispatch();
    const form = useForm<SignInValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: yupResolver(schema),
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.validate().hasErrors) {
            return;
        }
        dispatch(
            passwordAuth({
                email: form.values?.email,
                password: form.values?.password,
            }),
        );
    };

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
