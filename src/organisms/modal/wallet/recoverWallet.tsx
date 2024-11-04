import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ButtonWrap, GeneralButton, Input, InputWrap, Label, NewWalletWrap, SubTitle, TextAreaBox, TabItem } from '../styles';
import { useSnackbar } from 'notistack';
import { CONNECTED_WALLET, RECOVER_WALLET_MNEMONIC, RECOVER_WALLET_PRIVATEKEY } from '../../../constants/common';
import { WALLET_CONNECT_SUCCESS } from 'constants/texts';
import { FirmaWalletService } from '@firmachain/firma-js';
import useWallet from 'store/useWallet';
import useFirmaUtil from 'hook/useFirmaUtils';
import useModal from 'store/useModal';

const RecoverWallet = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handleWallet = useWallet((v) => v.handleWallet);
    const { wallet: modalWallet, handleModalWallet } = useModal();
    const { getRecoverWalletFromMnemonic, getRecoverWalletFromPrivateKey } = useFirmaUtil();

    const [label, setLabel] = useState('');
    const [recoverValue, setRecoverValue] = useState('');

    const handleLabel = useCallback(() => {
        if (modalWallet.type === RECOVER_WALLET_MNEMONIC) setLabel('Mnemonic');
        if (modalWallet.type === RECOVER_WALLET_PRIVATEKEY) setLabel('Private Key');
    }, [modalWallet]);

    const onChangeRecoverValue = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setRecoverValue(event.target.value);
    }, []);

    const handleRecover = useCallback(
        async (value: string) => {
            try {
                let wallet: FirmaWalletService | null = null;
                if (modalWallet.type === RECOVER_WALLET_MNEMONIC) {
                    wallet = await getRecoverWalletFromMnemonic(value);
                }
                if (modalWallet.type === RECOVER_WALLET_PRIVATEKEY) {
                    wallet = await getRecoverWalletFromPrivateKey(value);
                }
                await handleConnectWallet(wallet);
            } catch (error) {
                console.log(error);
                enqueueSnackbar(String(error), {
                    variant: 'error',
                    autoHideDuration: 3000
                });
            }
        },
        [modalWallet.type, enqueueSnackbar]
    );

    const handleConnectWallet = async (data: FirmaWalletService | null) => {
        if (data === null) return;

        handleWallet({
            mnemonic: data.getMnemonic(),
            privateKey: data.getPrivateKey(),
            address: await data.getAddress()
        });

        handleModalWallet({
            isVisible: true,
            type: CONNECTED_WALLET
        });

        enqueueSnackbar(WALLET_CONNECT_SUCCESS, {
            variant: 'success',
            autoHideDuration: 3000
        });
    };

    useEffect(() => {
        handleLabel();
    }, [handleLabel]);

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
    );
};

export default RecoverWallet;
