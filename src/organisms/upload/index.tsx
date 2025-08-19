import { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { Box } from '@/components/styles';
import { Container } from './styles';
import UploadBox from './uploadBox';
import ErrorBox from './errorBox';
import LoadingBox from './loadingBox';
import useFile from '@/store/useFile';
import useProcess from '@/store/useProcess';

export default function Upload() {
    const { handleFile } = useFile();
    const [errorMsg, setErrorMsg] = useState('');

    const { metaJson } = useFile();
    const { demo, verifyStep, setVerifyStep } = useProcess();

    const handleErrorMsg = (msg: string) => {
        setErrorMsg(msg);
    };

    useEffect(() => {
        if (!demo) {
            setVerifyStep(0);
        } else {
            if (metaJson) {
                setVerifyStep(0);
            }
        }
    }, []);

    useEffect(() => {
        if (verifyStep === 0) {
            handleErrorMsg('');

            handleFile(null);
            setVerifyStep(0);
        }
    }, [verifyStep]);

    return (
        <Box>
            {verifyStep === 0 && <UploadBox handleErrorMsg={handleErrorMsg} />}
            {verifyStep === -1 && (
                <Container isDesktop={isDesktop}>
                    <ErrorBox desc={errorMsg} />
                </Container>
            )}
            {verifyStep === 1 && (
                <Container isDesktop={isDesktop}>
                    <LoadingBox />
                </Container>
            )}
        </Box>
    );
}
