import React, { useEffect, useMemo, useState } from 'react'
import { env } from 'config';
import { isDesktop } from 'react-device-detect';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'
import { FilesActions, ModalActions, ProcessActions } from 'redux/actions';
import { convertFileSize, openCertificatePDF } from 'utils/common';
import { Box, StyledLink } from 'components/styles';
import { IMG_INVISIBLE_CONTRACT, IMG_ORIGINAL_CONTRACT } from 'constants/images'
import { ResultBox, Container, FileHash, FileHashBox, FIleInfoBox, FileInfoText, ResultImg, Title, ButtonBox } from './styles'
import OriginalContract from './originalContract';
import RectButton from 'components/button/rectButton';
import PDF from 'constants/sample_contract.pdf';
import PDF_TEST from 'constants/sample_contract_testnet.pdf';

export default function Verification() {
    const {files, wallet, process} = useSelector(state => state);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [contractInfo, setContractInfo] = useState(null);

    const isError = useMemo(() => {
        if(contractInfo){
            if(contractInfo?.error) return contractInfo.error;
            FilesActions.setMetaJson(JSON.parse(contractInfo.metaDataJsonString));
        }
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
    
    const handleCertificatePDF = async() => {
        FilesActions.setMetaJson(JSON.parse(contractInfo.metaDataJsonString));
        if(process.demo.status === true){
            ModalActions.handleModalWallet(true);
        } else {
            if(wallet.privateKey){
                try {
                    await openCertificatePDF(wallet.privateKey, files.metaJson);
                } catch (error) {
                    enqueueSnackbar(String(error), {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            } else {
                ModalActions.handleModalWallet(true);
            }
        }
    }

    const handleContractPDF = () => {
        return window.open(env === "production"?PDF:PDF_TEST, "_blank");
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
                        <FileInfoText fontsize={isDesktop?"20px":"16px"}>{files.file && files.file.name}</FileInfoText>
                        <FileInfoText fontsize={isDesktop?"16px":"12px"}>{convertFileSize(files.file?files.file.size:0)}KB</FileInfoText>
                    </FIleInfoBox>
                    {isError === false && <OriginalContract data={contractInfo} />}
                    </>
                    }
                </ResultBox>
                <ButtonBox isDesktop={isDesktop}>
                    {(process.demo.status) &&
                        <RectButton backgroundColor={'#3252d3'} backgroundColorHover={'#0062ff'} small title="OPEN CONTRACT" onClickEvent={handleContractPDF} /> 
                    }
                    {(process.demo.status || isError === false) &&
                        <RectButton backgroundColor={'#3252d3'} backgroundColorHover={'#0062ff'} small title="OPEN CERTIFICATE" onClickEvent={handleCertificatePDF} /> 
                    }
                    <StyledLink to="/">
                        <RectButton small title="HOME"/>
                    </StyledLink>
                </ButtonBox>
            </Container>
        </Box>
    )
}
