import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import { ModalTitle, ModalContents, ButtonBox, ConnectType, TabItem, InputBox, InputTitle, TextWrapper, TextAreaBox } from './styles';
import usePreference from 'store/usePreference';
import useModal from 'store/useModal';

const EditHashKeyModal = () => {
    const ModalWidth = isDesktop ? '500px' : '100%';
    const ModalPadding = isDesktop ? '20px 40px' : '15px 20px';

    const { editHashKey } = useModal();

    const { hashPrefix: key, handleHashPrefix } = usePreference();

    const { handleModalEditHashKey } = useModal();

    const [hashKey, setHashKey] = useState(key);

    const handleEditHashKey = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setHashKey(e.target.value);
    };

    const handleConfirmEditHashKey = useCallback(() => {
        handleHashPrefix(hashKey);

        closeEditHashKeyModal();
    }, [hashKey]);

    const closeEditHashKeyModal = () => {
        handleModalEditHashKey(false);
    };

    return (
        <Modal
            visible={editHashKey}
            closable={true}
            onClose={closeEditHashKeyModal}
            width={ModalWidth}
            padding={ModalPadding}
            maskClosable={true}
        >
            <ModalTitle>EDIT HASH PREFIX</ModalTitle>
            <ModalContents>
                <TabItem>
                    <InputBox>
                        <InputTitle>{'Hash Prefix'}</InputTitle>
                        <TextWrapper>
                            <TextAreaBox onChange={handleEditHashKey} value={hashKey} />
                        </TextWrapper>
                    </InputBox>
                    <ButtonBox>
                        <ConnectType onClick={() => handleConfirmEditHashKey()}>Edit</ConnectType>
                    </ButtonBox>
                </TabItem>
            </ModalContents>
        </Modal>
    );
};

export default React.memo(EditHashKeyModal);
