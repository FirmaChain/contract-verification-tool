import { useCallback, useEffect, useState } from 'react';
import { copyToClipboard } from 'utils/common';
import { ButtonWrap, CopyIconImg, GeneralButton, Input, InputWrap, Label, NewWalletWrap, SubTitle, TextBox, TabItem } from '../styles';
import { useSnackbar } from 'notistack';
import useWallet from 'store/useWallet';
import useFirmaUtil from 'hook/useFirmaUtils';
import useModal from 'store/useModal';
import { Texts, Types } from 'constants/fixedString';

const NewWallet = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { handleModalWallet } = useModal();

    const handleWallet = useWallet((v) => v.handleWallet);
    const { getNewWallet } = useFirmaUtil();

    const [walletInfo, setWalletInfo] = useState({
        mnemonic: '',
        privateKey: '',
        address: ''
    });

    const handleWalletInfo = useCallback(async () => {
        try {
            const result = await getNewWallet();

            //! Change how to get wallet informations
            let _mnemonic = result.getMnemonic();
            let _privateKey = result.getPrivateKey();
            let _address = await result.getAddress();

            setWalletInfo({
                mnemonic: _mnemonic,
                privateKey: _privateKey,
                address: _address
            });
        } catch (error) {
            console.log(error);
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000
            });
        }
    }, [enqueueSnackbar]);

    const handleConnectWallet = (type: string) => {
        handleWallet({
            mnemonic: walletInfo.mnemonic,
            privateKey: walletInfo.privateKey,
            address: walletInfo.address
        });

        handleModalWallet({
            isVisible: true,
            type: type
        });

        enqueueSnackbar(Texts.WALLET_CONNECT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 3000
        });
    };

    const onCopyData = (data: string, content?: string) => {
        copyToClipboard(data);

        enqueueSnackbar('Coppied ' + content, {
            variant: 'success',
            autoHideDuration: 3000
        });
    };

    useEffect(() => {
        handleWalletInfo();
    }, [handleWalletInfo]);

    return (
        <TabItem>
            <SubTitle>New Wallet</SubTitle>
            <NewWalletWrap>
                <InputWrap>
                    <Label>Mnemonic</Label>
                    <CopyIconImg left="85px" onClick={() => onCopyData(walletInfo.mnemonic, 'Mnemonic')} />
                    <Input>
                        <TextBox onClick={() => onCopyData(walletInfo.mnemonic)}>{walletInfo.mnemonic}</TextBox>
                    </Input>
                </InputWrap>

                <InputWrap>
                    <Label>Private Key</Label>
                    <CopyIconImg left="85px" onClick={() => onCopyData(walletInfo.privateKey, 'Private Key')} />
                    <Input>
                        <TextBox onClick={() => onCopyData(walletInfo.privateKey)}>{walletInfo.privateKey}</TextBox>
                    </Input>
                </InputWrap>

                <InputWrap>
                    <Label>Address</Label>
                    <CopyIconImg left="66px" onClick={() => onCopyData(walletInfo.address, 'Address')} />
                    <Input>
                        <TextBox onClick={() => onCopyData(walletInfo.address)}>{walletInfo.address}</TextBox>
                    </Input>
                </InputWrap>

                <ButtonWrap>
                    <GeneralButton onClick={() => handleWalletInfo()}>Generate</GeneralButton>
                    <GeneralButton onClick={() => handleConnectWallet(Types.CONNECTED_WALLET)}>Connect</GeneralButton>
                </ButtonWrap>
            </NewWalletWrap>
        </TabItem>
    );
};

export default NewWallet;
