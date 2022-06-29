import React, { useEffect, useMemo, useState } from 'react'
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'
import { ModalActions } from 'redux/actions';
import { getIpfsURL } from 'utils/firma';
import { convertFileSize } from 'utils/common';
import { Box, StyledLink } from 'components/styles';
import { IMG_INVISIBLE_CONTRACT, IMG_ORIGINAL_CONTRACT } from 'constants/images'
import { ResultBox, Container, FileHash, FileHashBox, FIleInfoBox, FileInfoText, ResultImg, Title, ButtonBox } from './styles'
import OriginalContract from './originalContract';
import RectButton from 'components/button/rectButton';
import { useSnackbar } from 'notistack';

export default function Verification() {
    const {files, wallet} = useSelector(state => state);
    const { enqueueSnackbar } = useSnackbar();
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

    const openCertificatePDF = async() => {
        if(wallet.privateKey){
            let url = '';
            const metaJson = JSON.parse(contractInfo.metaDataJsonString);

            for(var i=0; i<metaJson.encryptIpfsHash.length; i++){
                url = await getIpfsURL(wallet.privateKey, metaJson.encryptIpfsHash[i]);
                if(url !== '') return window.open(url, "_blank");;
            }

            if(url === ''){
                enqueueSnackbar("Invalid private key", {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            }
        } else {
            ModalActions.handleModalWallet(true);
        }
    }

    useEffect(() => {
        if(files.file === null){
            navigate("/");
            return;
        } else {
            setContractInfo(files.file);
        }
    }, [files]);

    return (
        <Box>
            <Container isDesktop={isDesktop} style={isError?{}:{padding: isDesktop? "0 0 180px" : "0 0 100px"}}>
                <ResultBox style={{height: "auto", margin: isDesktop?"0 0 50px":""}}>
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
                        <FileInfoText fontsize={isDesktop?"20px":"16px"}>{files.file.name}</FileInfoText>
                        <FileInfoText fontsize={isDesktop?"16px":"12px"}>{convertFileSize(files.file.size)}KB</FileInfoText>
                    </FIleInfoBox>
                    {isError === false && <OriginalContract data={contractInfo} />}
                    </>
                    }
                </ResultBox>
                <ButtonBox isDesktop={isDesktop}>
                    {isError === false &&
                        <RectButton backgroundColor={'#3252d3'} backgroundColorHover={'#0062ff'} small title="OPEN CERTIFICATE" onClickEvent={openCertificatePDF} /> 
                    }
                    <StyledLink to="/">
                        <RectButton small title="HOME"/>
                    </StyledLink>
                </ButtonBox>
            </Container>
        </Box>
    )
}
