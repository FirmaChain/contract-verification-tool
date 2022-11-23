import { useCallback, useEffect, useState } from "react";
import { ModalActions, WalletActions } from "redux/actions";
import { useSelector } from "react-redux";
import { NEW_WALLET } from "redux/types";
import { getBalance, sendFCTFromFaucet } from "utils/firma";
import { copyToClipboard } from "utils/common";
import { useSnackbar } from "notistack";
import { ButtonWrap, CopyIconImg, DisableButton, GeneralButton, Input, InputWrap, Label, NewWalletWrap, TextBox, TabItem } from "../styles";
import { FAUCET_SEND_FCT } from "constants/texts";

const ConnectedWallet = () => {
    const { wallet } = useSelector(state => state.wallet);
    const { enqueueSnackbar } = useSnackbar();

    const [walletInfo, setWalletInfo] = useState({
        mnemonic: '',
        privateKey: '',
        address: '',
        balance: 0
    });

    const handleWalletInfo = useCallback(async() => {
        try {
            let _mnemonic = wallet.mnemonic;
            let _privateKey = wallet.privateKey;
            let _address = wallet.address;
            let _balance = await getBalance(_address);
            
            setWalletInfo({
                mnemonic: _mnemonic,
                privateKey: _privateKey,
                address: _address,
                balance: _balance
            })
        } catch (error) {
            console.log(error);
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [wallet, enqueueSnackbar])

    const handleFaucet = async() => {
        try {
            ModalActions.handleLoadingProgress({
                loading: true,
                message: FAUCET_SEND_FCT
            });
            let _address = wallet.address;
            await sendFCTFromFaucet(_address);
            await handleWalletInfo();
            ModalActions.handleLoadingProgress({
                loading: false,
                message: ''
            });
        } catch (error) {
            console.log(error);
            ModalActions.handleLoadingProgress({
                loading: false,
                message: ''
            });
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000,
            });         
        }
        // window.open('https://faucet-testnet.firmachain.dev/', '_blank')
    }

    const handleDisconnectWallet = () => {
        WalletActions.handleWallet({
            mnemonic: '',
            privateKey: '',
            address: '',
        })
        ModalActions.handleModalWallet({
          isVisible: false,
          type: NEW_WALLET
        });
    }

    const onCopyData = (data, content) => {
        copyToClipboard(data);

        enqueueSnackbar('Coppied ' + content, {
            variant: 'success',
            autoHideDuration: 3000,
        });
    };

    useEffect(() => {
        handleWalletInfo();
    }, [wallet, handleWalletInfo])

    return (
        <TabItem>
            <NewWalletWrap>
                <InputWrap style={{display: walletInfo.mnemonic === ''?'none':'flex'}}>
                    <Label>Mnemonic</Label>
                    <CopyIconImg left='85px' onClick={() => onCopyData(walletInfo.mnemonic, 'Mnemonic')} />
                    <Input>
                    <TextBox onClick={() => onCopyData(walletInfo.mnemonic)}>{walletInfo.mnemonic}</TextBox>
                    </Input>
                </InputWrap>

                <InputWrap>
                    <Label>Private Key</Label>
                    <CopyIconImg left='85px' onClick={() => onCopyData(walletInfo.privateKey, 'Private Key')} />
                    <Input>
                    <TextBox onClick={() => onCopyData(walletInfo.privateKey)}>{walletInfo.privateKey}</TextBox>
                    </Input>
                </InputWrap>

                <InputWrap>
                    <Label>Address</Label>
                    <CopyIconImg left='66px' onClick={() => onCopyData(walletInfo.address, 'Address')} />
                    <Input>
                    <TextBox onClick={() => onCopyData(walletInfo.address)}>{walletInfo.address}</TextBox>
                    </Input>
                </InputWrap>

                <InputWrap>
                    <Label>FCT Balance</Label>
                    <Input>
                    <TextBox>{walletInfo.balance}</TextBox>
                    </Input>
                </InputWrap>

                <ButtonWrap>
                    <GeneralButton onClick={() => handleFaucet()}>Faucet</GeneralButton>
                    <DisableButton onClick={() => handleDisconnectWallet()}>Disconnect</DisableButton>
                </ButtonWrap>
            </NewWalletWrap>
        </TabItem>
    )
}

export default ConnectedWallet;