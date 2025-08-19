import React from 'react';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import { ModalTitle, ModalContents } from './styles';
import NewWallet from './wallet/newWallet';
import ConnectedWallet from './wallet/connectedWallet';
import RecoverWallet from './wallet/recoverWallet';
import useModal from '@/store/useModal';
import { Types } from '@/constants/fixedString';

const WalletModal = () => {
    const { wallet: modalWallet, handleModalWallet } = useModal();

    const WalletModalWidth = isDesktop ? '500px' : '100%';
    const WalletModalPadding = isDesktop ? '20px 40px' : '15px 20px';

    const closeWalletModal = () => {
        handleModalWallet({
            isVisible: false,
            type: Types.NEW_WALLET
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
                {modalWallet.type === Types.CONNECTED_WALLET && <ConnectedWallet />}
                {modalWallet.type === Types.NEW_WALLET && <NewWallet />}
                {(modalWallet.type === Types.RECOVER_WALLET_MNEMONIC || modalWallet.type === Types.RECOVER_WALLET_PRIVATEKEY) && (
                    <RecoverWallet />
                )}
            </ModalContents>
        </Modal>
    );
};

export default React.memo(WalletModal);
