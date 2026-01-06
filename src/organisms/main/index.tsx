import { useEffect } from 'react';
import { Box, DescText, StyledLink } from '@/components/styles';
import { isDesktop } from 'react-device-detect';
import { ButtonBox } from './styles';
import RectButton from '@/components/button/rectButton';
import Cards from './cards';
import useFile from '@/store/useFile';
import useProcess from '@/store/useProcess';
import { Texts } from '@/constants/fixedString';

const Main = () => {
    const { handleFile, handleMetaJson } = useFile();
    const { setVerifyStep } = useProcess();

    useEffect(() => {
        handleFile(null);
        handleMetaJson(null);

        setVerifyStep(0);
    }, []);

    return (
        <Box direction={'column'}>
            <DescText isDesktop={isDesktop} style={{ padding: '16px 0 0' }}>
                {Texts.MAIN_DESC}
            </DescText>
            <Cards />
            <ButtonBox isDesktop={isDesktop}>
                <StyledLink to="/upload">
                    <RectButton title="VERIFICATION" small={isDesktop === false} />
                </StyledLink>
            </ButtonBox>
        </Box>
    );
};

export default Main;
