import { Button, Flex, Group, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useAppDispatch } from 'app/providers/StoreProvider/StoreProvider';
import { FormEvent } from 'react';
import { register } from '../model/services/register';
import { schema } from '../validation';

export type RegisterValues = {
    email: string;
    password: string;
};

export const Register = () => {
    const dispatch = useAppDispatch();

    const form = useForm<RegisterValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: yupResolver(schema),
    });

    const onRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.validate().hasErrors) {
            return;
        }
        const { email, password } = form.values;
        dispatch(register({ email, password }));
    };

    return (
        <form onSubmit={onRegister}>
            <Flex align="flex-start" direction="column" gap="xs">
                <TextInput
                    label="Email"
                    placeholder="tim.jennings@example.com"
                    {...form.getInputProps('email')}
                />
                <TextInput type="password" label="Password" {...form.getInputProps('password')} />
                <Group justify="flex-start">
                    <Button type="submit">Зарегистрироваться</Button>
                </Group>
            </Flex>
        </form>
    );
};
