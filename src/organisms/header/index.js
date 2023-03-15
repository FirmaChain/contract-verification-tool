import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import { useSelector } from "react-redux";
import { EditHashKeyModal, WalletConnectModal, WalletModal } from "organisms/modal";
import { Box, Container, LogoTitle } from "components/styles";
import { ICON_MENU_MOBILE, IMG_LOGO } from "constants/images";
import { FIRMA_VERIFY_URL, EXPLORER_URL, STATION_URL } from "constants/texts";
import { HeaderBox, MenuButton, MenuContainer, MenuText, OpenIcon, Wrapper, WrapperM } from "./styles";
import ConnectInfoBar from "./connectInfoBar";
import ConnectWallet from "./connectWallet";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { connect, wallet, editHashKey } = useSelector((state) => state.modal);

    const [open, setOpen] = useState(false);

    const menus = [
        { title: "FIRMA VERIFY", url: FIRMA_VERIFY_URL, newpage: true },
        { title: "FIRMA STATION", url: STATION_URL, newpage: true },
        { title: "BLOCK EXPLORER", url: EXPLORER_URL, newpage: true },
    ];

    const handlePage = (url) => {
        setOpen(false);
        if (url.includes("http")) return window.open(url);
        if (location.pathname !== "/") return navigate("/");
    };

    return (
        <Container height={"auto"} justifycontent={"center"} style={{ width: "100%", position: "fixed", top: 0, zIndex: 998, opacity: 0.9, backgroundColor: "#1b1b23" }}>
            {isDesktop ? (
                <HeaderBox>
                    <ConnectInfoBar />
                    <Box height={"100%"}>
                        <Wrapper style={{ padding: "15px 20px" }}>
                            <LogoTitle isDesktop={isDesktop} src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage("/")} />
                            <Box justifycontent={"center"} gap={"44px"}>
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
                    <WrapperM open={open}>
                        <LogoTitle isDesktop={isDesktop} src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage("/")} />
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
        </Container>
    );
};

export default Header;
