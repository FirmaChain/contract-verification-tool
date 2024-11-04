import { BodyContainer } from 'components/styles';
import { isDesktop } from 'react-device-detect';

const Body = (props: React.PropsWithChildren) => {
    return <BodyContainer isDesktop={isDesktop}>{props.children}</BodyContainer>;
};

export default Body;
