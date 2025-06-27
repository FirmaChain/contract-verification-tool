import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isDesktop } from 'react-device-detect';
import { EditHashKeyModal, WalletConnectModal, WalletModal } from 'organisms/modal';
import { Box, Container, LogoTitle } from 'components/styles';
import { ICON_MENU_MOBILE, IMG_LOGO } from 'constants/images';
import { HeaderBox, MenuButton, MenuContainer, MenuText, OpenIcon, Wrapper, WrapperM } from './styles';
import ConnectInfoBar from './connectInfoBar';
import ConnectWallet from './connectWallet';
import useWallet from 'store/useWallet';
import SwitchNetworkModal from 'organisms/modal/switchNetworkModal';
import useModal from 'store/useModal';
import { config } from 'constants/common';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { chainNetwork } = useWallet();

    const { walletConnect: connect, wallet, editHashKey, switchNetwork } = useModal();

    const [open, setOpen] = useState<boolean>(false);

    const stationUrl = useMemo(() => {
        if (chainNetwork === 'TESTNET') return config.stationTestnet;
        else return config.stationMainnet;
    }, [chainNetwork]);

    const explorerUrl = useMemo(() => {
        if (chainNetwork === 'TESTNET') return config.explorerTestnet;
        else return config.explorerMainnet;
    }, [chainNetwork]);

    const menus = [
        { title: 'FIRMA VERIFY', url: config.landingUrl, newpage: true },
        { title: 'FIRMA STATION', url: stationUrl, newpage: true },
        { title: 'BLOCK EXPLORER', url: explorerUrl, newpage: true }
    ];

    const handlePage = (url: string) => {
        setOpen(false);
        if (url.includes('http')) return window.open(url);
        if (location.pathname !== '/') return navigate('/');
    };

    return (
        <Container
            height={'auto'}
            justifycontent={'center'}
            style={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 998, opacity: 0.9, backgroundColor: '#1b1b23' }}
        >
            {isDesktop ? (
                <HeaderBox>
                    <ConnectInfoBar />
                    <Box height={'100%'}>
                        <Wrapper style={{ padding: '15px 20px' }}>
                            <LogoTitle isDesktop={isDesktop} src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage('/')} />
                            <Box justifycontent={'center'} gap={'44px'}>
                                {menus.map((item, index) => {
                                    return (
                                        <MenuText key={index} onClick={() => handlePage(item.url)}>
                                            {item.title}
                                            {item?.newpage && <OpenIcon />}
                                        </MenuText>
                                    );
                                })}
                            </Box>
                            <ConnectWallet />
                        </Wrapper>
                    </Box>
                </HeaderBox>
            ) : (
                <HeaderBox>
                    <ConnectInfoBar />
                    {/* //! Remove open value : WrapperM does not have this property */}
                    <WrapperM /*open={open}*/>
                        <LogoTitle isDesktop={isDesktop} src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage('/')} />
                        <MenuButton src={ICON_MENU_MOBILE} alt="Mobile Menu" onClick={() => setOpen(!open)} />
                        <MenuContainer open={open}>
                            <ConnectWallet />
                            {menus.map((item, index) => {
                                return (
                                    <MenuText key={index} onClick={() => handlePage(item.url)}>
                                        {item.title}
                                        {item?.newpage && <OpenIcon />}
                                    </MenuText>
                                );
                            })}
                        </MenuContainer>
                    </WrapperM>
                </HeaderBox>
            )}
            {connect && <WalletConnectModal />}
            {wallet.isVisible && <WalletModal />}
            {editHashKey && <EditHashKeyModal />}
            {switchNetwork && <SwitchNetworkModal />}
        </Container>
    );
};

export default Header;
