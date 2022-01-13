import { useLocation, useNavigate } from "react-router-dom";
import { Box, Container, LogoTitle } from "components/styles";
import { IMG_LOGO } from "constants/images";
import { MenuText, OpenIcon, Wrapper } from "./styles";
import { DONUE_URL, EXPLORER_URL, STATION_URL } from "constants/texts";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

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
        </Container>
    )

}

export default Header;