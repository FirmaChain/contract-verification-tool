import { useLocation, useNavigate } from "react-router-dom";
import { Box, Container, LogoTitle } from "components/styles";
import { ICON_MENU_MOBILE, IMG_LOGO } from "constants/images";
import { MenuButton, MenuContainer, MenuItemBox, MenuText, OpenIcon, Wrapper, WrapperM } from "./styles";
import { DONUE_URL, EXPLORER_URL, STATION_URL } from "constants/texts";
import { isDesktop } from "react-device-detect";
import { useState } from "react";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const menus = [
        {title: "HOME", url: "/"},
        {title: "FIRMA STATION", url: STATION_URL, newpage: true},
        {title: "BLOCK EXPLORER", url: EXPLORER_URL, newpage: true},
        {title: "DONUE", url: DONUE_URL, newpage: true},
    ];

    const handlePage = (url) => {
        if(url.includes('http')) return window.open(url);
        if(location.pathname !== "/") return navigate("/");
    }

    return (
        <Container
            height={"74px"}
            justifycontent={"space-between"}
            style={{width: "100%", position: "fixed", top: 0, zIndex: 9999}}>
                {isDesktop?
                <Wrapper>
                    <LogoTitle src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage("/")}/>
                    <Box
                        justifycontent={"flex-end"}
                        gap={"44px"}>
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
                :
                <WrapperM open={open}>
                    <LogoTitle src={IMG_LOGO} alt="Firmachain" onClick={() => handlePage("/")}/>
                    <MenuButton src={ICON_MENU_MOBILE} alt="Mobile Menu" onClick={() => setOpen(!open)}/>


                    <MenuContainer open={open}>
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
        </Container>
    )

}

export default Header;