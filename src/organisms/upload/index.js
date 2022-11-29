import React, { useEffect, useState } from 'react'
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { FilesActions, ProcessActions } from 'redux/actions'
import { Box } from 'components/styles'
import { Container } from './styles'
import UploadBox from './uploadBox';
import ErrorBox from './errorBox';
import LoadingBox from './loadingBox';

export default function Upload() {
    const {process, files} = useSelector(state => state);
    const [errorMsg, setErrorMsg] = useState("");

    const handleErrorMsg = (msg) => {
        setErrorMsg(msg);
    }

    useEffect(() => {
        if(!process.demo){
            ProcessActions.setVerifyStep(0);
        } else {
            if(files.metaJson) {
                ProcessActions.setVerifyStep(0);
            }
        }
    }, [])

    useEffect(() => {
        if(process.verifyStep === 0) {
            handleErrorMsg("");
            ProcessActions.setVerifyStep(0);
            FilesActions.setFile(null);
        }
    }, [process.verifyStep])

    return (
        <Box>
            {process.verifyStep === 0 && <UploadBox handleErrorMsg={handleErrorMsg}/>}
            {process.verifyStep === -1 && 
            <Container isDesktop={isDesktop}>
                <ErrorBox desc={errorMsg}/>
            </Container>}
            {process.verifyStep === 1 && 
            <Container isDesktop={isDesktop}>
                <LoadingBox />
            </Container>}
        </Box>
    )
}
