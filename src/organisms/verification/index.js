import React, { useEffect, useMemo, useState } from 'react'
import { IMG_INVISIBLE_CONTRACT, IMG_ORIGINAL_CONTRACT } from 'constants/images'
import { Box, Container, FileHash, FileHashBox, FIleInfoBox, FileInfoText, ResultImg, Title } from './styles'
import { useSelector } from 'react-redux'
import { getVirifyResult } from 'utils/verificationContract';
import { convertFileSize } from 'utils/common';
import { StyledLink } from 'components/styles';
import RectButton from 'components/button/rectButton';
import { useNavigate } from 'react-router';
import OriginalContract from './originalContract';

export default function Verification() {
    const { file } = useSelector(state => state.files);
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
        <Container style={isError?{}:{padding: "0 0 180px"}}>
            <Box style={{height: "auto"}}>
                <ResultImg src={resultImage} alt={resultTitle}/>
                {contractInfo &&
                <>
                <Title>{resultTitle}</Title>
                {isError &&
                    <FileHashBox>
                        <FileHash>FILE HASH : </FileHash>
                        <FileHash>{contractInfo.fileHash}</FileHash>
                    </FileHashBox>
                }
                <FIleInfoBox>
                    <FileInfoText fontsize={"20px"}>{file.name}</FileInfoText>
                    <FileInfoText fontsize={"16px"}>{convertFileSize(file.size)}KB</FileInfoText>
                </FIleInfoBox>
                {isError === false && <OriginalContract data={contractInfo} />}
                </>
                }
            </Box>
            <StyledLink to="/">
                <RectButton small title="HOME"/>
            </StyledLink>
        </Container>
    )
}
