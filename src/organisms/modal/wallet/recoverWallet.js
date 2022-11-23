import { useCallback, useEffect, useState } from "react";
import { getRecoverWalletFromMnemonic, getRecoverWalletFromPrivateKey } from "utils/firma";
import { ButtonWrap, GeneralButton, Input, InputWrap, Label, NewWalletWrap, SubTitle, TextAreaBox, TabItem } from "../styles";
import { useSnackbar } from "notistack";
import { CONNECTED_WALLET, RECOVER_WALLET_MNEMONIC, RECOVER_WALLET_PRIVATEKEY } from "redux/types";
import { useSelector } from "react-redux";
import { ModalActions, WalletActions } from "redux/actions";
import { WALLET_CONNECT_SUCCESS } from "constants/texts";

const RecoverWallet = () => {
    const {modal} = useSelector(state => state);
    const { enqueueSnackbar } = useSnackbar();

    const [label, setLabel] = useState('');
    const [recoverValue, setRecoverValue] = useState('');

    const handleLabel = useCallback(() => {
        if(modal.wallet.type === RECOVER_WALLET_MNEMONIC) setLabel('Mnemonic');
        if(modal.wallet.type === RECOVER_WALLET_PRIVATEKEY) setLabel('Private Key');
    }, [modal.wallet])

    const onChangeRecoverValue = useCallback((event) => {
        setRecoverValue(event.target.value);
    }, []);

    const handleRecover = useCallback(async(value) => {
        try {
            let wallet = null;
            if(modal.wallet.type === RECOVER_WALLET_MNEMONIC) {
                wallet = await getRecoverWalletFromMnemonic(value);
            }
            if(modal.wallet.type === RECOVER_WALLET_PRIVATEKEY) {
                wallet = await getRecoverWalletFromPrivateKey(value);
            }
            handleConnectWallet(wallet);
        } catch (error) {
            console.log(error);
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [modal.wallet.type, enqueueSnackbar])

    const handleConnectWallet = (data) => {
        if(data === null) return;
        WalletActions.handleWallet({
            mnemonic: data.mnemonic,
            privateKey: data.privateKey,
            address: data.wallet.address,
        })
        
        ModalActions.handleModalWallet({
          isVisible: true,
          type: CONNECTED_WALLET
        });

        enqueueSnackbar(WALLET_CONNECT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 3000,
        });
    }

    useEffect(() => {
        handleLabel();
    }, [handleLabel])

    return (
        <TabItem>
            <SubTitle>Recover Wallet</SubTitle>
            <NewWalletWrap>
            <InputWrap>
                <Label>{label}</Label>
                <Input>
                <TextAreaBox value={recoverValue} onChange={onChangeRecoverValue} />
                </Input>
            </InputWrap>

            <ButtonWrap>
                <GeneralButton onClick={() => handleRecover(recoverValue)}>Connect</GeneralButton>
            </ButtonWrap>
            </NewWalletWrap>
        </TabItem>
    )
}

export default RecoverWallet;