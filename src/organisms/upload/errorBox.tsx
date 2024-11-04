import RectButton from 'components/button/rectButton';
import { ICON_ERROR_YELLOW } from 'constants/images';
import { ErrorDesc, ErrorImg } from './styles';
import { isDesktop } from 'react-device-detect';
import useProcess from 'store/useProcess';

export default function ErrorBox({ desc }: { desc: string }) {
    const { setVerifyStep } = useProcess();

    const handleVerifyStep = () => {
        setVerifyStep(0);
    };

    return (
        <>
            <ErrorImg src={ICON_ERROR_YELLOW} alt={desc} />
            <ErrorDesc isDesktop={isDesktop}>{desc}</ErrorDesc>
            <RectButton small title="RETRY" onClickEvent={() => handleVerifyStep()} />
        </>
    );
}
