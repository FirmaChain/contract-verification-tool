import React from 'react';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import { ModalTitle, ModalContents, ButtonBox, ConnectType, ConnectTypeButtonBox } from './styles';
import { NEW_WALLET, RECOVER_WALLET_MNEMONIC, RECOVER_WALLET_PRIVATEKEY } from '../../constants/common';
import { Add, Restore, SyncAlt } from '@mui/icons-material';
import useModal from 'store/useModal';

const WalletConnectModal = () => {
    const { walletConnect: connect, handleModalWallet, handleModalWalletConnect } = useModal();

    const WalletModalWidth = isDesktop ? '500px' : '100%';
    const WalletModalPadding = isDesktop ? '20px 40px' : '15px 20px';

    const handleOpenWalletModal = (type: string) => {
        handleModalWallet({
            isVisible: true,
            type: type
        });

        closeWalletConnectModal();
    };

    const closeWalletConnectModal = () => {
        handleModalWalletConnect(false);
    };

    return (
        <Modal
            visible={connect}
            closable={true}
            onClose={closeWalletConnectModal}
            width={WalletModalWidth}
            padding={WalletModalPadding}
            maskClosable={true}
        >
            <ModalTitle>WALLET</ModalTitle>
            <ModalContents>
                <ButtonBox>
                    <ConnectTypeButtonBox onClick={() => handleOpenWalletModal(NEW_WALLET)}>
                        <Add />
                        <ConnectType>{'New\nWallet'}</ConnectType>
                    </ConnectTypeButtonBox>
                    <ConnectTypeButtonBox onClick={() => handleOpenWalletModal(RECOVER_WALLET_MNEMONIC)}>
                        <Restore />
                        <ConnectType>{'Recover from\nMnemonic'}</ConnectType>
                    </ConnectTypeButtonBox>
                    <ConnectTypeButtonBox onClick={() => handleOpenWalletModal(RECOVER_WALLET_PRIVATEKEY)}>
                        <SyncAlt style={{ height: '23px', transform: 'rotate(90deg)' }} />
                        <ConnectType>{'Import\nPrivate Key'}</ConnectType>
                    </ConnectTypeButtonBox>
                </ButtonBox>
            </ModalContents>
        </Modal>
    );
};

export default React.memo(WalletConnectModal);
