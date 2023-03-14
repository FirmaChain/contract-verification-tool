import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { FilesActions, ProcessActions } from 'redux/actions';
import { isDesktop } from 'react-device-detect';
import { ICON_TOOLTIP, IMG_PDF_UPLOAD } from 'constants/images';
import { HASH_TOOLTIP, PREFIX_TOOLTIP, UPLOAD_DESC, UPLOAD_TITLE } from 'constants/texts';
import { ActiveTabBackground, Desc, GeneralButton, HashUploadContainer, PdfImg, TabBox, TabItem, TabWrapper, TextInput, Title, UploadContainer, UploadFileWrapper, UploadContentBox, TooltipWrap, IconTooltip, TooltipText, VerifyButtonBox, PrefixInputBox } from './styles';
import { getGlobalHashPrefix, getVirifyResult } from 'utils/firma';
import { useSelector } from 'react-redux';
import { Divider, IconButton } from '@mui/material';
import { Check, ModeEdit } from '@mui/icons-material';

export default function UploadBox({handleErrorMsg}) {
    const { process } = useSelector(state => state);

    const dragRef = useRef(null);
    const hiddenFileInput = useRef(null);

    const Tab = ['FILE', 'HASH'];
    const defaultPrefix = getGlobalHashPrefix();
    const [prefix, setPrefix] = useState(defaultPrefix);
    const [editable, setEditable] = useState(false);
    const [fileHash, setFileHash] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    const handleSelectTab = (index) => {
        handleEditable(false);
        setSelectedTab(index);
        setFileHash('');
        setPrefix(defaultPrefix);
    }

    const handleEditable = (enable) => {
        setEditable(enable);
    }

    const handlePrefix = (e) => {
        setPrefix(e.target.value);
    }

    const handleFileHash = (e) => {
        setFileHash(e.target.value);
    }
    const handleVerifyFileHash = useCallback(() => {
        FilesActions.setFileHash(fileHash)
        ProcessActions.setVerifyStep(1);
    }, [fileHash])

    const handleClick = (e) => {
        handleEditable(false);
        if(process.verifyStep === 0) hiddenFileInput.current.click();
    };

    const onChangeFiles = useCallback((e) => {
        if(process.verifyStep !== 0) return;
        handleEditable(false);
        FilesActions.setFile(null);
        
        let uploadedFile;
        if(e.type === "drop"){
            uploadedFile = e.dataTransfer.files[0];
        } else {
            uploadedFile = e.target.files[0];
        }

        // if(uploadedFile.type !== 'application/pdf'){
        //     setErrorMsg("This is a file type that is not supported.");
        //     ProcessActions.setVerifyStep(-1);
        //     return;
        // }

        // if(uploadedFile.size / 1024 / 1024 > 20){
        //     handleErrorMsg("Upload is not possible if the file size is more than 20MB.");
        //     ProcessActions.setVerifyStep(-1);
        //     return;
        // }
        
        let reader = new FileReader();
        reader.readAsArrayBuffer(uploadedFile);
        reader.onload = async function() {
            const buffer = new Uint8Array(reader.result);
            const result = {
                name: uploadedFile.name,
                size: uploadedFile.size,
                buffer : buffer,
            }
            await verifyContract(result);
        }
        reader.onerror = function() {
            console.log(reader.error);
            handleErrorMsg("Upload failed. Please select it again.");
        }

        ProcessActions.setVerifyStep(1);
        if(hiddenFileInput.current !== null){
            hiddenFileInput.current.value = '';
        }
    }, [process.verifyStep])

    const verifyContract = async(file) => {
        try {
            const result = await getVirifyResult(file.buffer, "", prefix);
            FilesActions.setFile({
                name: file.name,
                size: file.size,
                ...result
            });
        } catch (error) {
            throw error;
        }
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

    const onChangeButtonPosition = (index) => {
        let gap = isDesktop? 172 : 100;
        return { left: `${index * gap}px` };
    };
    
    useEffect(() => {
        initDragEvents();
        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    return (
        <HashUploadContainer>
            <TabBox>
                <TabWrapper isDesktop={isDesktop}>
                    <ActiveTabBackground style={onChangeButtonPosition(selectedTab)} />
                    {Tab.map((value, index) => {
                        return (
                            <TabItem key={index} active={selectedTab === index} onClick={()=>handleSelectTab(index)}>{value}</TabItem>
                        )
                    })}
                </TabWrapper>
            </TabBox>
            {selectedTab === 0 &&
                <UploadContainer isDesktop={isDesktop}>
                    <UploadContentBox>
                        <Title isDesktop={isDesktop} style={{color: '#fff', margin: '0 0 16px'}}>HASH Prefix</Title>
                        <PrefixInputBox>
                            <TextInput disabled={editable === false} value={prefix} style={{color: editable?'#fff':'#bbb'}} onChange={handlePrefix}/>
                            <Divider orientation="vertical" sx={{margin: 0, borderColor: '#555', height: '52px'}} />
                            <IconButton component="label"  sx={{color: '#ffffff', display: editable? 'none':'block'}} onClick={()=>handleEditable(true)}>
                                <ModeEdit />
                            </IconButton>
                            <IconButton component="label" sx={{color: '#ffffff', display: editable? 'block':'none'}} onClick={()=>handleEditable(false)}>
                                <Check />
                            </IconButton>
                        </PrefixInputBox>
                        <TooltipWrap>
                            <IconTooltip src={ICON_TOOLTIP} alt={'tooltip'} />
                            <TooltipText>{PREFIX_TOOLTIP}</TooltipText>
                        </TooltipWrap>
                        <UploadFileWrapper 
                        ref={dragRef} 
                        enableToUpload={process.verifyStep === 0}
                        onClick={handleClick}>
                            <input 
                                ref={hiddenFileInput} 
                                type='file' 
                                onChange={onChangeFiles} 
                                style={{display: 'none'}}/>
                            <Title isDesktop={isDesktop}>{UPLOAD_TITLE}</Title>
                            <Desc isDesktop={isDesktop}>{UPLOAD_DESC}</Desc>
                            <PdfImg src={IMG_PDF_UPLOAD} alt={UPLOAD_DESC} />
                        </UploadFileWrapper>
                    </UploadContentBox>
                </UploadContainer>
            }
            {selectedTab === 1 &&
                <Fragment>
                    <UploadContainer isDesktop={isDesktop}>
                        <UploadContentBox>
                            <Title isDesktop={isDesktop} style={{color: '#fff', margin: '0 0 16px'}}>HASH Value</Title>
                            <PrefixInputBox>
                                <TextInput placeholder={"Please endter the hash key value"} value={fileHash} onChange={handleFileHash}/>
                            </PrefixInputBox>
                            <TooltipWrap>
                                <IconTooltip src={ICON_TOOLTIP} alt={'tooltip'} />
                                <TooltipText>{HASH_TOOLTIP}</TooltipText>
                            </TooltipWrap>
                        </UploadContentBox>
                    </UploadContainer>
                    <VerifyButtonBox>
                        <GeneralButton style={{maxWidth: '280px'}} active={fileHash.length > 0} onClick={handleVerifyFileHash}>Verify</GeneralButton>
                    </VerifyButtonBox>
                </Fragment>
            }
        </HashUploadContainer>
    )
}
