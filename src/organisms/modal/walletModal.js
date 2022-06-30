import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ModalActions, ProcessActions, WalletActions } from 'redux/actions';
import { useSnackbar } from 'notistack';
import { isDesktop } from 'react-device-detect';
import { copyToClipboard, openCertificatePDF } from '../../utils/common';
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
import { testPrivateKey } from 'config';

const WalletModal = () => {
  const {wallet, modal, process, files} = useSelector(state => state);
  const { enqueueSnackbar } = useSnackbar();

  const [currentWalletTab, setWalletTab] = useState(0);
  const [recoverPrivateKey, setRecoverPrivateKey] = useState('');

  const WalletModalWidth = isDesktop? "500px":"100%";
  const WalletModalPadding = isDesktop? "20px 40px":"15px 20px";

  const isDemo = useMemo(() => {
    if(process.demo.status && files.metaJson !== null) return true;
    return false;
  }, [process.demo.status, files.metaJson])

  const setConnectWallet = (privateKey, address) => {
    WalletActions.handleWalletPrivateKey(privateKey);
    WalletActions.handleWalletAddress(address);
  }

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

  const onConnect = async(privateKey, address) => {
    if(files.metaJson){
      if(process.demo.status === false) {
        setConnectWallet(privateKey, address);
      }
      try {
        await openCertificatePDF(privateKey, files.metaJson);
        ModalActions.handleModalWallet(false);
      } catch (error) {
        enqueueSnackbar(String(error), {
            variant: 'error',
            autoHideDuration: 3000,
        });
      }
    } else {
      setConnectWallet(privateKey, address);
  
      setWalletTab(1);
    }
  };

  const onDisconnect = () => {
    setConnectWallet('', '');

    setWalletTab(0);
    closeWalletModal();
  };

  const onChangePrivateKey = (event) => {
    setRecoverPrivateKey(event.target.value);
  };
  
  useEffect(() => {
    if(isDemo){
      setRecoverPrivateKey(testPrivateKey);
      ProcessActions.setDemo({
        status: true,
        privateKey: testPrivateKey,
      })
    }
  }, [isDemo])

  useEffect(() => {
    if (wallet.privateKey !== '' && isDemo === false) {
      setWalletTab(1);
    }
  }, [modal.wallet]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentWalletTab === 1) {
      if (wallet.privateKey === '' || wallet.privateKey === undefined) {
        setWalletTab(0);
      }
    }
  }, [currentWalletTab]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      visible={modal.wallet}
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
                  <TextAreaBox disabled={isDemo} value={recoverPrivateKey} onChange={onChangePrivateKey} />
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
                <CopyIconImg left='85px' onClick={() => onCopyData(wallet.privateKey, 'PrivateKey')} />
                <Input>
                  <TextBox onClick={() => onCopyData(wallet.privateKey)}>{wallet.privateKey}</TextBox>
                </Input>
              </InputWrap>

              <InputWrap>
                <Label>Address</Label>
                <CopyIconImg left='66px' onClick={() => onCopyData(wallet.address, 'Address')} />
                <Input>
                  <TextBox onClick={() => onCopyData(wallet.address)}>{wallet.address}</TextBox>
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
