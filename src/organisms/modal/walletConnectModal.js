import React from 'react';
import { useSelector } from 'react-redux';
import { ModalActions } from 'redux/actions';
import { isDesktop } from 'react-device-detect';
import { Modal } from '../../components/modal';
import {
  ModalTitle,
  ModalContents,
  ButtonBox,
  ConnectType,
  ConnectTypeButtonBox,
  ConnectTypeIcon,
} from './styles';
import { NEW_WALLET, RECOVER_WALLET_MNEMONIC, RECOVER_WALLET_PRIVATEKEY } from 'redux/types';
import { Add, Restore, SyncAlt } from '@mui/icons-material';

const WalletConnectModal = () => {
  const {modal} = useSelector(state => state);

  const WalletModalWidth = isDesktop? "500px":"100%";
  const WalletModalPadding = isDesktop? "20px 40px":"15px 20px";

  const handleOpenWalletModal = (type) => {
    ModalActions.handleModalWallet({
      isVisible: true,
      type: type
    });
    closeWalletConnectModal();
  }
  
  const closeWalletConnectModal = () => {
    ModalActions.handleModalWalletConnect(false);
  };

  return (
    <Modal
      visible={modal.connect}
      closable={true}
      onClose={closeWalletConnectModal}
      width={WalletModalWidth}
      padding={WalletModalPadding}
      maskClosable={true}
    >
      <ModalTitle>WALLET</ModalTitle>
      <ModalContents>
        <ButtonBox>
          <ConnectTypeButtonBox onClick={()=>handleOpenWalletModal(NEW_WALLET)}>
            <Add/>
            <ConnectType>{'New\nWallet'}</ConnectType>
          </ConnectTypeButtonBox>
          <ConnectTypeButtonBox onClick={()=>handleOpenWalletModal(RECOVER_WALLET_MNEMONIC)}>
            <Restore />
            <ConnectType>{'Recover from\nMnemonic'}</ConnectType>
          </ConnectTypeButtonBox>
          <ConnectTypeButtonBox onClick={()=>handleOpenWalletModal(RECOVER_WALLET_PRIVATEKEY)}>
            <SyncAlt style={{height: '23px',transform: 'rotate(90deg)'}} />
            <ConnectType>{'Import\nPrivate Key'}</ConnectType>
          </ConnectTypeButtonBox>
        </ButtonBox>
      </ModalContents>
    </Modal>
  );
};

export default React.memo(WalletConnectModal);
