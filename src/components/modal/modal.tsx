import React, { MouseEventHandler, useEffect } from 'react';
import Portal from './portal';
import { ModalOverlay, ModalWrapper, ModalInner, PrevButton, CloseButton } from './styles';

interface Modal_ {
    onClose: () => void;
    closable?: boolean;
    visible: boolean;
    prev?: MouseEventHandler<HTMLDivElement>;
    width?: string | number;
    padding?: string | number;
    maskClosable?: boolean;
    children: any;
}

const Modal = ({ onClose, closable, visible, prev, width, padding, maskClosable = false, children }: Modal_) => {
    const close = () => {
        if (onClose) {
            onClose();
        }
    };

    const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (maskClosable) {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }
    };

    useEffect(() => {
        document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = `position: ""; top: "";`;
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        };
    }, []);

    return (
        <Portal elementId="modal-root">
            <ModalOverlay visible={visible} />
            <ModalWrapper tabIndex={-1} visible={visible} onClick={onMaskClick}>
                <ModalInner tabIndex={0} width={width} padding={padding}>
                    {prev && <PrevButton onClick={prev} />}
                    {closable && <CloseButton onClick={close} />}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </Portal>
    );
};

export default Modal;
