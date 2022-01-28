import React, { useEffect, useMemo, useState } from 'react'
import { IMG_INVISIBLE_CONTRACT, IMG_ORIGINAL_CONTRACT } from 'constants/images'
import { ResultBox, Container, FileHash, FileHashBox, FIleInfoBox, FileInfoText, ResultImg, Title, ButtonBox } from './styles'
import { useSelector } from 'react-redux'
import { getVirifyResult } from 'utils/verificationContract';
import { convertFileSize } from 'utils/common';
import { Box, StyledLink } from 'components/styles';
import RectButton from 'components/button/rectButton';
import { useNavigate } from 'react-router';
import OriginalContract from './originalContract';
import { isDesktop } from 'react-device-detect';
import DemoButton from 'components/button/demoButton';
import PDF from 'constants/sample_contract.pdf';

export default function Verification() {
    const { file } = useSelector(state => state.files);
    const { demo } = useSelector(state => state.process);
    const navigate = useNavigate();

    const [contractInfo, setContractInfo] = useState(null);

    const isError = useMemo(() => {
        if(contractInfo?.error) return contractInfo.error;
        return false;
    }, [contractInfo]);

    const resultTitle = useMemo(() => {
        if(isError) return "INVISIBLE CONTRACT";
        return "ORIGINAL CONTRACT";
    }, [isError]);

    const resultImage = useMemo(() => {
        if(isError) return IMG_INVISIBLE_CONTRACT;
        return IMG_ORIGINAL_CONTRACT;
    }, [isError]);

    const openDemoPDF = () => {
        window.open(PDF, "_blank");
    }

    useEffect(() => {
        const handleVerification = async() => {
            if(file === null){
                navigate("/");
                return;
            } else {
                if(file != null) {
                    await getVirifyResult(file.buffer).then(res => {
                        setContractInfo(res);
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }
        }

        handleVerification();
    }, [file]);

    return (
        <Box>
            <Container isDesktop={isDesktop} style={isError?{}:{padding: isDesktop? "0 0 180px" : "0 0 100px"}}>
                <ResultBox style={{height: "auto"}}>
                    <ResultImg isDesktop={isDesktop} src={resultImage} alt={resultTitle}/>
                    {contractInfo &&
                    <>
                    <Title isDesktop={isDesktop}>{resultTitle}</Title>
                    {isError &&
                        <FileHashBox>
                            <FileHash>FILE HASH : </FileHash>
                            <FileHash style={isDesktop?{}:{width:"150px"}}>{contractInfo.fileHash}</FileHash>
                        </FileHashBox>
                    }
                    <FIleInfoBox>
                        <FileInfoText fontsize={isDesktop?"20px":"16px"}>{file.name}</FileInfoText>
                        <FileInfoText fontsize={isDesktop?"16px":"12px"}>{convertFileSize(file.size)}KB</FileInfoText>
                    </FIleInfoBox>
                    {isError === false && <OriginalContract data={contractInfo} />}
                    </>
                    }
                </ResultBox>
                <ButtonBox isDesktop={isDesktop}>
                    {demo &&
                        <DemoButton small title="OPEN CONTRACT" onClickEvent={openDemoPDF} />
                    }
                    <StyledLink to="/">
                        <RectButton small title="HOME"/>
                    </StyledLink>
                </ButtonBox>
            </Container>
        </Box>
    )
}
