import { BodyContainer } from "components/styles";
import { isDesktop } from "react-device-detect";

const Body = ({ children }) => {
    return <BodyContainer isDesktop={isDesktop}>{children}</BodyContainer>;
};

export default Body;
