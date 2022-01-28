import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from 'components/styles'
import { UploadContainer } from './styles'
import { FilesActions, ProcessActions } from 'redux/actions'
import UploadBox from './uploadBox';
import ErrorBox from './errorBox';
import LoadingBox from './loadingBox';
import { useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';

export default function Upload() {
    const dragRef = useRef(null);
    const hiddenFileInput = useRef(null);

    const { file } = useSelector(state => state.files);
    const { demo, verifyStep } = useSelector(state => state.process);

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if(!demo){
            ProcessActions.setVerifyStep(0);
        }
    }, [])

    const handleClick = (e) => {
        if(verifyStep === 0) hiddenFileInput.current.click();
    };

    const onChangeFiles = (e) => {
        if(verifyStep !== 0) return;
        FilesActions.setFile(null);
        
        let uploadedFile;
        if(e.type === "drop"){
            uploadedFile = e.dataTransfer.files[0];
        } else {
            uploadedFile = e.target.files[0];
        }

        if(uploadedFile.type !== 'application/pdf'){
            setErrorMsg("This is a file type that is not supported.");
            ProcessActions.setVerifyStep(-1);
            return;
        }

        if(uploadedFile.size / 1024 / 1024 > 20){
            setErrorMsg("Upload is not possible if the file size is more than 20MB.");
            ProcessActions.setVerifyStep(-1);
            return;
        }
        
        let reader = new FileReader();
        reader.readAsArrayBuffer(uploadedFile);
        reader.onload = function() {
            const buffer = new Uint8Array(reader.result);
            const result = {
                name: uploadedFile.name,
                size: uploadedFile.size,
                buffer : buffer,
            }

            FilesActions.setFile(result);
            ProcessActions.setVerifyStep(1);
        }
        reader.onerror = function() {
            console.log(reader.error);
            setErrorMsg("Upload failed. Please upload it again.");
        }
        ProcessActions.setVerifyStep(1);
        hiddenFileInput.current.value = '';
    }

    const handleDragIn = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    
    const handleDragOut = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        onChangeFiles(e);
    }, [onChangeFiles]);
    
    const initDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragleave", handleDragOut);
            dragRef.current.addEventListener("mouseenter", handleDragIn);
            dragRef.current.addEventListener("mouseleave", handleDragOut);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener("dragenter", handleDragIn);
            dragRef.current.removeEventListener("dragleave", handleDragOut);
            dragRef.current.removeEventListener("mouseenter", handleDragIn);
            dragRef.current.removeEventListener("mouseleave", handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    useEffect(() => {
        if(verifyStep === 0) {
            setErrorMsg("");
            ProcessActions.setVerifyStep(0);
            FilesActions.setFile(null);
        }
    }, [verifyStep])
    
    useEffect(() => {
        initDragEvents();
        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    return (
        <Box>
            <UploadContainer 
                isDesktop={isDesktop}
                enableToUpload={verifyStep === 0} ref={dragRef} onClick={handleClick}>
                <input 
                    ref={hiddenFileInput} 
                    type='file' 
                    accept={'.pdf'} 
                    onChange={onChangeFiles} 
                    style={{display: 'none'}}/>
                {verifyStep === -1 && <ErrorBox desc={errorMsg}/>}
                {verifyStep === 0 && <UploadBox />}
                {verifyStep === 1 && <LoadingBox />}
            </UploadContainer>
        </Box>
    )
}
