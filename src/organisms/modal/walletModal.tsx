import React from 'react';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import { ModalTitle, ModalContents } from './styles';
import { CONNECTED_WALLET, NEW_WALLET, RECOVER_WALLET_MNEMONIC, RECOVER_WALLET_PRIVATEKEY } from '../../constants/common';
import NewWallet from './wallet/newWallet';
import ConnectedWallet from './wallet/connectedWallet';
import RecoverWallet from './wallet/recoverWallet';
import useModal from 'store/useModal';

const WalletModal = () => {
    const { wallet: modalWallet, handleModalWallet } = useModal();

    const WalletModalWidth = isDesktop ? '500px' : '100%';
    const WalletModalPadding = isDesktop ? '20px 40px' : '15px 20px';

    const closeWalletModal = () => {
        handleModalWallet({
            isVisible: false,
            type: NEW_WALLET
        });
    };

    return (
        <Modal
            visible={modalWallet.isVisible}
            closable={true}
            onClose={closeWalletModal}
            width={WalletModalWidth}
            padding={WalletModalPadding}
            maskClosable={true}
        >
            <ModalTitle>WALLET</ModalTitle>
            <ModalContents>
                {modalWallet.type === CONNECTED_WALLET && <ConnectedWallet />}
                {modalWallet.type === NEW_WALLET && <NewWallet />}
                {(modalWallet.type === RECOVER_WALLET_MNEMONIC || modalWallet.type === RECOVER_WALLET_PRIVATEKEY) && <RecoverWallet />}
            </ModalContents>
        </Modal>
    );
};

export default React.memo(WalletModal);
