import { Modal } from '@mantine/core'
import { FC, useCallback } from 'react'
import { PasswordAuth } from './PasswordAuth';

interface Props {
    opened?: boolean;
    onClose?: () => void | undefined;
}

export const PasswordAuthModal: FC<Props> = ({ opened = false, onClose }) => {
    const onModalClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return (
        <Modal
            opened={opened}
            onClose={onModalClose}
        >
            <PasswordAuth />
        </Modal>
    );
}