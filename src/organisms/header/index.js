import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import { useSelector } from "react-redux";
import { WalletModal } from "organisms/modal";
import { Box, Container, LogoTitle } from "components/styles";
import { ICON_MENU_MOBILE, IMG_LOGO } from "constants/images";
import { DONUE_URL, EXPLORER_URL, STATION_URL } from "constants/texts";
import { MenuButton, MenuContainer, MenuText, OpenIcon, Wrapper, WrapperM } from "./styles";
import ConnectedBar from "./connectedBar";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { wallet } = useSelector(state => state.modal);

    const [open, setOpen] = useState(false);

    const menus = [
        {title: "HOME", url: "/"},
        {title: "FIRMA STATION", url: STATION_URL, newpage: true},
        {title: "BLOCK EXPLORER", url: EXPLORER_URL, newpage: true},
        {title: "DONUE", url: DONUE_URL, newpage: true},
    ];

    const handlePage = (url) => {
        setOpen(false);
        if(url.includes('http')) return window.open(url);
        if(location.pathname !== "/") return navigate("/");
    }

    return (
        <Container
            height={"auto"}
            justifycontent={"center"}
            style={{width: "100%", minHeight: "74px", position: "fixed", top: 0, zIndex: 998, opacity: 0.9, backgroundColor: '#1b1b23'}}>
                {isDesktop?
                <Box height={"100%"} style={{padding: "0 196px"}}>
                    <Wrapper style={{padding: "15px 0"}}>
                        <LogoTitle src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage("/")}/>
                        <Box
                            justifycontent={"flex-end"}
                            gap={"44px"}
                            style={{padding: "0 0 0 40px"}}>
                            {menus.map((item, index) => {
                                return (
                                    <MenuText key={index} onClick={()=>handlePage(item.url)}>
                                        {item.title}
                                        {item?.newpage && <OpenIcon />}
                                    </MenuText> 
                                )
                            })}
                        </Box>
                    </Wrapper>
                    {/* <ConnectedBar /> */}
                </Box>
                :
                <WrapperM open={open}>
                    <LogoTitle src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage("/")}/>
                    <MenuButton src={ICON_MENU_MOBILE} alt="Mobile Menu" onClick={() => setOpen(!open)}/>

                    <MenuContainer open={open}>
                        {/* <ConnectedBar /> */}
                        {menus.map((item, index) => {
                            return (
                                <MenuText key={index} onClick={()=>handlePage(item.url)}>
                                    {item.title}
                                    {item?.newpage && <OpenIcon />}
                                </MenuText> 
                            )
                        })}
                    </MenuContainer>
                </WrapperM>
                }
                {wallet && <WalletModal />}
        </Container>
    )

}

export default Header;