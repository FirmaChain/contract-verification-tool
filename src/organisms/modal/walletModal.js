import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ModalActions, WalletActions } from 'redux/actions';
import { useSnackbar } from 'notistack';
import { isDesktop } from 'react-device-detect';
import { copyToClipboard } from '../../utils/common';
import { getRecoverWalletFromPrivateKey } from 'utils/firma';
import { Modal } from '../../components/modal';
import {
  ModalTitle,
  SubTitle,
  ModalContents,
  WalletTabList,
  WalletTabItem,
  NewWalletWrap,
  InputWrap,
  Label,
  Input,
  TextBox,
  TextAreaBox,
  CopyIconImg,
  ButtonWrap,
  GeneralButton,
  DisableButton,
} from './styles';

const WalletModal = () => {
  const walletModalState = useSelector(state => state.modal.wallet);
  const walletState = useSelector(state => state.wallet);
  const { enqueueSnackbar } = useSnackbar();

  const [currentWalletTab, setWalletTab] = useState(0);
  const [recoverPrivateKey, setRecoverPrivateKey] = useState('');

  const WalletModalWidth = isDesktop? "500px":"100%";
  const WalletModalPadding = isDesktop? "20px 40px":"15px 20px"

  useEffect(() => {
    if (walletState.privateKey !== '') {
      setWalletTab(1);
    }
  }, [walletModalState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentWalletTab === 1) {
      if (walletState.privateKey === '' || walletState.privateKey === undefined) {
        setWalletTab(0);
      }
    }
  }, [currentWalletTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeWalletModal = () => {
    ModalActions.handleModalWallet(false);
  };

  const onCopyData = (data, content) => {
    copyToClipboard(data);

    enqueueSnackbar('Coppied ' + content, {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };

  const onRecover = (privateKey) => {
    getRecoverWalletFromPrivateKey(privateKey)
      .then((result) => {
        onConnect(result.privateKey, result.wallet.address);
      })
      .catch((e) => {
        enqueueSnackbar(e.toString(), {
          variant: 'error',
          autoHideDuration: 3000,
        });
      });
  };

  const onConnect = (privateKey, address) => {
    WalletActions.handleWalletPrivateKey(privateKey);
    WalletActions.handleWalletAddress(address);

    setWalletTab(1);
  };

  const onDisconnect = () => {
    WalletActions.handleWalletPrivateKey('');
    WalletActions.handleWalletAddress('');

    setWalletTab(0);
    closeWalletModal();
  };

  const onChangeMnemonic = (event) => {
    setRecoverPrivateKey(event.target.value);
  };

  return (
    <Modal
      visible={walletModalState}
      closable={true}
      onClose={closeWalletModal}
      width={WalletModalWidth}
      padding={WalletModalPadding}
      maskClosable={true}
    >
      <ModalTitle>WALLET</ModalTitle>
      <ModalContents>
        <WalletTabList currentTab={currentWalletTab}>
          <WalletTabItem>
            <SubTitle>Recover Wallet</SubTitle>
            <NewWalletWrap>
              <InputWrap>
                <Label>PrivateKey</Label>
                <Input>
                  <TextAreaBox value={recoverPrivateKey} onChange={onChangeMnemonic} />
                </Input>
              </InputWrap>

              <ButtonWrap>
                <GeneralButton onClick={() => onRecover(recoverPrivateKey)}>Connect</GeneralButton>
              </ButtonWrap>
            </NewWalletWrap>
          </WalletTabItem>
          <WalletTabItem>
            <NewWalletWrap>
              <InputWrap>
                <Label>PrivateKey</Label>
                <CopyIconImg left='85px' onClick={() => onCopyData(walletState.privateKey, 'PrivateKey')} />
                <Input>
                  <TextBox onClick={() => onCopyData(walletState.privateKey)}>{walletState.privateKey}</TextBox>
                </Input>
              </InputWrap>

              <InputWrap>
                <Label>Address</Label>
                <CopyIconImg left='66px' onClick={() => onCopyData(walletState.address, 'Address')} />
                <Input>
                  <TextBox onClick={() => onCopyData(walletState.address)}>{walletState.address}</TextBox>
                </Input>
              </InputWrap>

              <InputWrap>
                <Label>FCT Balance</Label>
                <Input>
                  <TextBox>{0}</TextBox>
                </Input>
              </InputWrap>
              <ButtonWrap>
                <GeneralButton onClick={() => ModalActions.handleModalWallet(false)}>OK</GeneralButton>
                <DisableButton onClick={() => onDisconnect()}>Disconnect</DisableButton>
              </ButtonWrap>
            </NewWalletWrap>
          </WalletTabItem>
        </WalletTabList>
      </ModalContents>
    </Modal>
  );
};

export default React.memo(WalletModal);
