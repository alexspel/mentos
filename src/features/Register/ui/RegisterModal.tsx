import { Modal } from '@mantine/core'
import { FC, useCallback } from 'react'
import { Register } from './Register';

interface Props {
    opened?: boolean;
    onClose?: () => void | undefined;
}

export const RegisterModal: FC<Props> = ({ opened = false, onClose }) => {
    const onModalClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return (
        <Modal
            opened={opened}
            onClose={onModalClose}
        >
            <Register />
        </Modal>
    );
}