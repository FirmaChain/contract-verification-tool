import { useMemo } from 'react';
import { ICON_LOGIN, ICON_SETTING } from '@/constants/images';
import { isDesktop } from 'react-device-detect';
import { MenuText, Icon, Wrapper } from './styles';
import useWallet from '@/store/useWallet';
import useFile from '@/store/useFile';
import useModal from '@/store/useModal';
import { Types } from '@/constants/fixedString';

const ConnectWallet = () => {
    const { wallet, chainNetwork } = useWallet();
    const { handleMetaJson } = useFile();
    const { handleModalWalletConnect: handleWalletConnect, handleModalWallet: handleWallet } = useModal();

    const WalletExist = useMemo(() => {
        if (wallet === undefined) return false;
        return wallet.address !== '';
    }, [wallet]);

    const handleWalletConnectModal = () => {
        if (chainNetwork === Types.MAIN_NET) return;

        handleMetaJson(null);

        handleWalletConnect(true);
    };

    const handleWalletModal = () => {
        if (chainNetwork === Types.MAIN_NET) return;

        handleWallet({
            isVisible: true,
            type: Types.CONNECTED_WALLET
        });
    };

    return (
        <Wrapper
            style={{
                width: isDesktop ? 'auto' : '300px',
                opacity: chainNetwork === Types.MAIN_NET ? 0 : 1,
                cursor: chainNetwork === Types.MAIN_NET ? 'default' : 'pointer',
                zIndex: chainNetwork === Types.MAIN_NET ? -999 : 0,
                justifyContent: 'center',
                gap: isDesktop ? '2px' : '3px'
            }}
        >
            {WalletExist ? (
                <MenuText onClick={() => handleWalletModal()}>
                    {isDesktop ? (
                        <Icon src={ICON_SETTING} alt={'Wallet'} />
                    ) : (
                        <MenuText onClick={() => handleWalletModal()}>WALLET</MenuText>
                    )}
                </MenuText>
            ) : (
                <Wrapper onClick={() => handleWalletConnectModal()}>
                    <MenuText>LOGIN</MenuText>
                    <Icon src={ICON_LOGIN} alt={'LOGIN'} />
                </Wrapper>
            )}
        </Wrapper>
    );
};

export default ConnectWallet;
