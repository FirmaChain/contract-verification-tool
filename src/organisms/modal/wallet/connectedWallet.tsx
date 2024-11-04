import { useEffect, useMemo } from 'react';
import { NEW_WALLET } from '../../../constants/common';
import { copyToClipboard } from 'utils/common';
import { useSnackbar } from 'notistack';
import { ButtonWrap, CopyIconImg, DisableButton, GeneralButton, Input, InputWrap, Label, NewWalletWrap, TextBox, TabItem } from '../styles';
import { FAUCET_SEND_FCT } from 'constants/texts';
import useWallet from 'store/useWallet';
import useFirmaUtil from 'hook/useFirmaUtils';
import useModal from 'store/useModal';

const ConnectedWallet = () => {
    const { wallet, balance, chainNetwork, handleWallet, handleBalance, clearStore } = useWallet();
    const { handleModalLoadingProgress, handleModalWallet } = useModal();
    const { enqueueSnackbar } = useSnackbar();
    const { sendFCTFromFaucet, getBalance } = useFirmaUtil();

    const walletInfo = useMemo(() => {
        return { ...wallet, balance };
    }, [wallet, balance]);

    const updateBalance = async () => {
        if (!wallet.address) return;

        const balance = await getBalance(wallet.address);
        handleBalance(balance);
    };

    const handleFaucet = async () => {
        if (chainNetwork === 'MAINNET') {
            enqueueSnackbar('Mainnet does not support faucet.', {
                variant: 'warning',
                autoHideDuration: 3000
            });
            return;
        }

        try {
            handleModalLoadingProgress({
                loading: true,
                message: FAUCET_SEND_FCT
            });

            await sendFCTFromFaucet(wallet.address);
            await updateBalance();

            handleModalLoadingProgress({
                loading: false,
                message: ''
            });
        } catch (error) {
            console.log(error);

            handleModalLoadingProgress({
                loading: false,
                message: ''
            });
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000
            });
        }
        // window.open('https://faucet-testnet.firmachain.dev/', '_blank')
    };

    const handleDisconnectWallet = () => {
        clearStore();

        handleModalWallet({
            isVisible: false,
            type: NEW_WALLET
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
        updateBalance();
    }, [wallet.address]);

    return (
        <TabItem>
            <NewWalletWrap>
                <InputWrap style={{ display: walletInfo.mnemonic === '' ? 'none' : 'flex' }}>
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

                <InputWrap>
                    <Label>FCT Balance</Label>
                    <Input>
                        <TextBox>{walletInfo.balance}</TextBox>
                    </Input>
                </InputWrap>

                <ButtonWrap>
                    {chainNetwork === 'TESTNET' && <GeneralButton onClick={() => handleFaucet()}>Faucet</GeneralButton>}
                    <DisableButton onClick={() => handleDisconnectWallet()}>Disconnect</DisableButton>
                </ButtonWrap>
            </NewWalletWrap>
        </TabItem>
    );
};

export default ConnectedWallet;
