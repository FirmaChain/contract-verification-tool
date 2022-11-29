import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalActions } from 'redux/actions';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import {
  ModalTitle,
  ModalContents,
  ButtonBox,
  ConnectType,
  TabItem,
  InputBox,
  InputTitle,
  TextWrapper,
  TextInputBox,
  TextAreaBox,
} from './styles';
import { getGlobalHashPrefix, setGlobalHashPrefix } from 'utils/firma';

const EditHashKeyModal = () => {
    const ModalWidth = isDesktop? "500px":"100%";
    const ModalPadding = isDesktop? "20px 40px":"15px 20px";
    const {modal} = useSelector(state => state);

    let key = getGlobalHashPrefix();
    const [hashKey, setHashKey] = useState(key);

    const handleEditHashKey = (e) => {
        console.log(e);
        setHashKey(e.target.value);
    }

    const handleConfirmEditHashKey = useCallback(() => {
        setGlobalHashPrefix(hashKey);
        closeEditHashKeyModal();
    }, [hashKey]);
    
    const closeEditHashKeyModal = () => {
        ModalActions.handleModalEditHashKey(false);
    };

    return (
        <Modal
        visible={modal.editHashKey}
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
                        <ConnectType onClick={()=>handleConfirmEditHashKey()}>Edit</ConnectType>
                    </ButtonBox>
                </TabItem>
            </ModalContents>
        </Modal>
    );
};

export default React.memo(EditHashKeyModal);
