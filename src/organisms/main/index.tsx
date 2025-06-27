import { useEffect } from 'react';
import { Box, DescText, StyledLink } from 'components/styles';
import { isDesktop } from 'react-device-detect';
import { ButtonBox } from './styles';
import RectButton from 'components/button/rectButton';
import DemoButton from 'components/button/demoButton';
import Cards from './cards';
import { useNavigate } from 'react-router';
import useFirmaUtil from 'hook/useFirmaUtils';
import useFile from 'store/useFile';
import useProcess from 'store/useProcess';
import useWallet from 'store/useWallet';
import { Texts, Types } from 'constants/fixedString';
import { config } from 'constants/common';

const Main = () => {
    const navigate = useNavigate();
    const { getVirifyResult } = useFirmaUtil();
    const { handleFile, handleMetaJson } = useFile();
    const { setVerifyStep, setDemo } = useProcess();
    const { chainNetwork } = useWallet();

    const isTestnet = chainNetwork === Types.TEST_NET;

    const demoContract = isTestnet ? config.demoContractTestnet : config.demoContractMainnet;
    const demoPrefix = isTestnet ? config.demoPrefixTestnet : config.demoPrefixMainnet;

    useEffect(() => {
        handleFile(null);
        handleMetaJson(null);

        setVerifyStep(0);
        setDemo({
            status: false,
            privateKey: ''
        });
    }, []);

    const handleDemo = async () => {
        const response = await fetch(demoContract);
        const data = await response.blob();
        const meta = {
            type: 'application/pdf'
        };
        const fileName = 'sample_contract.pdf';
        const file = new File([data], fileName, meta);
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = async function () {
            if (reader.result) {
                try {
                    const buffer = new Uint8Array(reader.result as ArrayBufferLike);

                    const result = {
                        name: file.name,
                        size: file.size,
                        buffer: buffer
                    };

                    await verifyContract(result);
                    setDemo({
                        status: true,
                        privateKey: ''
                    });
                    setVerifyStep(1);

                    navigate('/upload');
                } catch (error) {
                    console.error('ERROR: Error while reading file.');
                }
            } else {
                console.error('ERROR: Failed to read file.');
            }
        };
    };

    const verifyContract = async (file: { name: string; size: number; buffer: Uint8Array }) => {
        try {
            const result = await getVirifyResult(file.buffer, '', demoPrefix);

            handleFile({
                name: file.name,
                size: file.size,
                ...result
            });
        } catch (error) {
            throw error;
        }
    };

    return (
        <Box direction={'column'}>
            <DescText isDesktop={isDesktop} style={{ padding: '16px 0 0' }}>
                {Texts.MAIN_DESC}
            </DescText>
            <Cards />
            <ButtonBox isDesktop={isDesktop}>
                <DemoButton title="DEMO" small={isDesktop === false} onClickEvent={handleDemo} />
                <StyledLink to="/upload">
                    <RectButton title="VERIFICATION" small={isDesktop === false} />
                </StyledLink>
            </ButtonBox>
        </Box>
    );
};

export default Main;
