import React from 'react';
import { useSelector } from 'react-redux';
import { ModalActions } from 'redux/actions';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import {
  ModalTitle,
  ModalContents,
} from './styles';
import { CONNECTED_WALLET, NEW_WALLET, RECOVER_WALLET_MNEMONIC, RECOVER_WALLET_PRIVATEKEY } from 'redux/types';
import NewWallet from './wallet/newWallet';
import ConnectedWallet from './wallet/connectedWallet';
import RecoverWallet from './wallet/recoverWallet';

const WalletModal = () => {
  const { modal } = useSelector(state => state);

  const WalletModalWidth = isDesktop? "500px":"100%";
  const WalletModalPadding = isDesktop? "20px 40px":"15px 20px";

  const closeWalletModal = () => {
    ModalActions.handleModalWallet({
      isVisible: false,
      type: NEW_WALLET
    });
  };

  return (
    <Modal
      visible={modal.wallet.isVisible}
      closable={true}
      onClose={closeWalletModal}
      width={WalletModalWidth}
      padding={WalletModalPadding}
      maskClosable={true}
    >
      <ModalTitle>WALLET</ModalTitle>
      <ModalContents>
        {modal.wallet.type === CONNECTED_WALLET && <ConnectedWallet />}
        {modal.wallet.type === NEW_WALLET && <NewWallet />}
        {(modal.wallet.type === RECOVER_WALLET_MNEMONIC || modal.wallet.type === RECOVER_WALLET_PRIVATEKEY) && <RecoverWallet />}
      </ModalContents>
    </Modal>
  );
};

export default React.memo(WalletModal);
