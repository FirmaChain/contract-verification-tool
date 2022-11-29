import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { isDesktop } from 'react-device-detect';
import { useMatch, useNavigate } from 'react-router';
import { useSelector } from 'react-redux'
import { FilesActions } from 'redux/actions';
import { getVirifyResult } from 'utils/firma';
import { convertFileSize } from 'utils/common';
import { Box, StyledLink } from 'components/styles';
import { IMG_NOT_VERIFIED, IMG_VERIFIED } from 'constants/images'
import { ResultBox, Container, FileHash, FileHashBox, FIleInfoBox, FileInfoText, ResultImg, Title, ButtonBox, NotVerifiedText } from './styles'
import OriginalContract from './originalContract';
import RectButton from 'components/button/rectButton';
import { NOT_VERIFIED_NOTICE } from 'constants/texts';
import DemoButton from 'components/button/demoButton';

const { demoContract } = require('../../config');

export default function Verification() {
    const {files, process} = useSelector(state => state);
    const navigate = useNavigate();
    const match = useMatch('/verification/:id');

    const [contractInfo, setContractInfo] = useState(null);

    const FileHashFromParam = useMemo(() => {
        if(match === null) return '';
        return match.params.id;
    }, [match]);

    useEffect(() => {
        const verifyContract = async() => {
            if(FileHashFromParam !== ''){
                try {
                    const result = await getVirifyResult(null, FileHashFromParam);
                    FilesActions.setFile({
                        name: '',
                        size: 0,
                        ...result
                    });
                    FilesActions.setFileHash("");
                } catch (error) {
                    throw error;
                }
            }
        }
        verifyContract();
    }, [FileHashFromParam])

    const isError = useMemo(() => {
        if(contractInfo){
            if(contractInfo?.error) return contractInfo.error;
            FilesActions.setMetaJson(JSON.parse(contractInfo.metaDataJsonString));
        }
        return false;
    }, [contractInfo]);

    const resultTitle = useMemo(() => {
        if(isError) return "NOT VERIFIED";
        return "VERIFIED";
    }, [isError]);

    const resultImage = useMemo(() => {
        if(isError) return IMG_NOT_VERIFIED;
        return IMG_VERIFIED;
    }, [isError]);
    
    // const handleCertificatePDF = async() => {
    //     FilesActions.setMetaJson(JSON.parse(contractInfo.metaDataJsonString));
    //     if(process.demo.status === true){
    //         ModalActions.handleModalWallet(true);
    //     } else {
    //         if(wallet.privateKey){
    //             try {
    //                 await openCertificatePDF(wallet.privateKey, files.metaJson);
    //             } catch (error) {
    //                 enqueueSnackbar(String(error), {
    //                     variant: 'error',
    //                     autoHideDuration: 3000,
    //                 });
    //             }
    //         } else {
    //             ModalActions.handleModalWallet(true);
    //         }
    //     }
    // }

    const handleContractPDF = () => {
        return window.open(demoContract);
    }

    useEffect(() => {
        if(files.file === null){
            if(FileHashFromParam === ''){
                navigate("/");
                return;
            }
        } else {
            setContractInfo(files.file);
        }
    }, [FileHashFromParam, files, navigate]);

    return (
        <Box>
            <Container isDesktop={isDesktop} style={{padding: isDesktop? "0 0 180px" : "0 0 50px"}}>
                <ResultBox style={{height: "auto", margin: isDesktop?"50px 0 10px":""}}>
                    <ResultImg isDesktop={isDesktop} src={resultImage} alt={resultTitle} onError={()=>console.log('image load error')}/>
                    {contractInfo &&
                    <>
                    <Title isDesktop={isDesktop}>{resultTitle}</Title>
                    {isError &&
                        <Fragment>
                            <NotVerifiedText isDesktop={isDesktop}>{NOT_VERIFIED_NOTICE}</NotVerifiedText>
                            <FileHashBox isDesktop={isDesktop}>
                                <FileHash>FILE HASH : </FileHash>
                                <FileHash style={isDesktop?{}:{width:"150px"}}>{contractInfo.fileHash}</FileHash>
                            </FileHashBox>
                        </Fragment>
                    }
                    {FileHashFromParam === "" &&
                        <FIleInfoBox>
                            <FileInfoText fontsize={isDesktop?"20px":"14px"}>{files.file && files.file.name}</FileInfoText>
                            <FileInfoText fontsize={isDesktop?"16px":"10px"}>{convertFileSize(files.file?files.file.size:0)}KB</FileInfoText>
                        </FIleInfoBox>
                    }
                    {isError === false && <OriginalContract data={contractInfo} />}
                    </>
                    }
                </ResultBox>
                <ButtonBox isDesktop={isDesktop}>
                    {(process.demo.status) &&
                        <RectButton small title="OPEN CONTRACT" onClickEvent={handleContractPDF} /> 
                    }
                    {/* {(process.demo.status || isError === false) &&
                        <RectButton backgroundColor={'#3252d3'} backgroundColorHover={'#0062ff'} small title="OPEN CERTIFICATE" onClickEvent={handleCertificatePDF} /> 
                    } */}
                    <StyledLink to="/">
                        <DemoButton small title="HOME"/>
                    </StyledLink>
                </ButtonBox>
            </Container>
        </Box>
    )
}
