import { useCallback, useEffect, useState } from "react";
import { getNewWallet } from "utils/firma";
import { copyToClipboard } from "utils/common";
import { ButtonWrap, CopyIconImg, GeneralButton, Input, InputWrap, Label, NewWalletWrap, SubTitle, TextBox, TabItem } from "../styles";
import { useSnackbar } from "notistack";
import { CONNECTED_WALLET } from "redux/types";
import { ModalActions, WalletActions } from "redux/actions";
import { WALLET_CONNECT_SUCCESS } from "constants/texts";

const NewWallet = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [walletInfo, setWalletInfo] = useState({
        mnemonic: '',
        privateKey: '',
        address: '',
    })

    const handleWalletInfo = useCallback(async() => {
        try {
            const result = await getNewWallet();

            let _mnemonic = result.mnemonic;
            let _privateKey = result.privateKey;
            let _address = result.wallet.address;

            setWalletInfo({
                mnemonic: _mnemonic,
                privateKey: _privateKey,
                address: _address,
            })
        } catch (error) {
            console.log(error);
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [enqueueSnackbar])

    const handleConnectWallet = (type) => {
        WalletActions.handleWallet({
            mnemonic: walletInfo.mnemonic,
            privateKey: walletInfo.privateKey,
            address: walletInfo.address,
        })

        ModalActions.handleModalWallet({
          isVisible: true,
          type: type
        });

        enqueueSnackbar(WALLET_CONNECT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 3000,
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
    }, [handleWalletInfo])

    return (
        <TabItem>
            <SubTitle>New Wallet</SubTitle>
            <NewWalletWrap>
                <InputWrap>
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

                <ButtonWrap>
                    <GeneralButton onClick={() => handleWalletInfo()}>Generate</GeneralButton>
                    <GeneralButton onClick={()=> handleConnectWallet(CONNECTED_WALLET)}>Connect</GeneralButton>
                </ButtonWrap>
            </NewWalletWrap>
        </TabItem>
    )
}

export default NewWallet;