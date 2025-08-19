import React, { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { ICON_TOOLTIP, IMG_PDF_UPLOAD } from '@/constants/images';
import {
    ActiveTabBackground,
    Desc,
    GeneralButton,
    HashUploadContainer,
    PdfImg,
    TabBox,
    TabItem,
    TabWrapper,
    TextInput,
    Title,
    UploadContainer,
    UploadFileWrapper,
    UploadContentBox,
    TooltipWrap,
    IconTooltip,
    TooltipText,
    VerifyButtonBox,
    PrefixInputBox
} from './styles';
import { Divider, IconButton } from '@mui/material';
import { Check, ModeEdit } from '@mui/icons-material';
import usePreference from '@/store/usePreference';
import useFirmaUtil from '@/hook/useFirmaUtils';
import useFile from '@/store/useFile';
import useProcess from '@/store/useProcess';
import { useSnackbar } from 'notistack';
import { Texts } from '@/constants/fixedString';

export default function UploadBox({ handleErrorMsg }: { handleErrorMsg: (v: string) => void }) {
    const { hashPrefix, handleHashPrefix } = usePreference();
    const { handleFileHash, handleFile } = useFile();
    const { verifyStep, setVerifyStep } = useProcess();

    const { getVirifyResult } = useFirmaUtil();
    const { enqueueSnackbar } = useSnackbar();

    const dragRef = useRef<HTMLDivElement>(null);
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const Tab = ['FILE', 'HASH'];

    const [prefix, setPrefix] = useState(hashPrefix);
    const [editable, setEditable] = useState(false);
    const [fileHash, setFileHash] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    const handleSelectTab = (index: number) => {
        handleEditable(false);
        setSelectedTab(index);
        setFileHash('');

        // Reset value if not saved
        setPrefix(hashPrefix);
    };

    const handleEditable = (enable: boolean) => {
        setEditable(enable);

        if (enable === false) handleHashPrefix(prefix);
    };

    const handlePrefix = (e: ChangeEvent<HTMLInputElement>) => {
        setPrefix(e.target.value);
    };

    const handleVerifyFileHash = useCallback(() => {
        if (fileHash.length > 0) {
            handleFileHash(fileHash);

            setVerifyStep(1);
        }
    }, [fileHash]);

    const handleClick = () => {
        handleEditable(false);
        if (verifyStep === 0) hiddenFileInput.current?.click();
    };

    const onChangeFiles = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
            if (verifyStep !== 0) return;
            handleEditable(false);

            handleFile(null);

            let uploadedFile: File;
            if (e.type === 'drop') {
                //? When Drag-Drop
                const dropEvent = e as React.DragEvent<HTMLDivElement>;
                uploadedFile = dropEvent.dataTransfer.files[0];
            } else {
                //? When file selected
                const changeEvent = e as React.ChangeEvent<HTMLInputElement>;
                if (changeEvent.target.files) {
                    uploadedFile = changeEvent.target.files[0];
                } else {
                    return;
                }
            }

            if (uploadedFile.type !== 'application/pdf') {
                console.error('This is a file type that is not supported.');
                enqueueSnackbar('This is a file type that is not supported.', { variant: 'error', autoHideDuration: 3000 });

                return;
            }

            if (uploadedFile.size / 1024 / 1024 > 20) {
                console.error('Upload is not possible if the file size is more than 20MB.');
                enqueueSnackbar('Upload is not possible if the file size is more than 20MB.', { variant: 'error', autoHideDuration: 3000 });

                return;
            }

            const reader = new FileReader();
            reader.readAsArrayBuffer(uploadedFile);

            reader.onload = async function () {
                if (uploadedFile.type !== 'application/pdf') {
                    console.error('This is a file type that is not supported.');
                    enqueueSnackbar('This is a file type that is not supported.', { variant: 'error', autoHideDuration: 3000 });

                    return;
                }

                if (uploadedFile.size / 1024 / 1024 > 20) {
                    console.error('Upload is not possible if the file size is more than 20MB.');
                    enqueueSnackbar('Upload is not possible if the file size is more than 20MB.', {
                        variant: 'error',
                        autoHideDuration: 3000
                    });

                    return;
                }

                const buffer = new Uint8Array(reader.result as ArrayBuffer);
                const result = {
                    name: uploadedFile.name,
                    size: uploadedFile.size,
                    buffer: buffer
                };
                await verifyContract(result);
            };

            reader.onerror = function () {
                console.log(reader.error);
                handleErrorMsg('Upload failed. Please select it again.');
            };

            // setVerifyStep(1);

            if (hiddenFileInput.current) {
                hiddenFileInput.current.value = '';
            }
        },
        [verifyStep, hashPrefix]
    );

    const verifyContract = async (file: { name: string; size: number; buffer: Uint8Array }) => {
        try {
            const result = await getVirifyResult(file.buffer, '', prefix);

            handleFile({
                name: file.name,
                size: file.size,
                ...result
            });

            setVerifyStep(1);
        } catch (error) {
            throw error;
        }
    };

    const handleDragIn = useCallback((e: DragEvent | MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOut = useCallback((e: DragEvent | MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOver = useCallback((e: DragEvent | MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        //? Could not handle all types
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            onChangeFiles(e);
        },
        [onChangeFiles]
    );

    const initDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current?.addEventListener('dragenter', handleDragIn);
            dragRef.current?.addEventListener('dragleave', handleDragOut);
            dragRef.current?.addEventListener('mouseenter', handleDragIn);
            dragRef.current?.addEventListener('mouseleave', handleDragOut);
            dragRef.current?.addEventListener('dragover', handleDragOver);
            dragRef.current?.addEventListener('drop', handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current?.removeEventListener('dragenter', handleDragIn);
            dragRef.current?.removeEventListener('dragleave', handleDragOut);
            dragRef.current?.removeEventListener('mouseenter', handleDragIn);
            dragRef.current?.removeEventListener('mouseleave', handleDragOut);
            dragRef.current?.removeEventListener('dragover', handleDragOver);
            dragRef.current?.removeEventListener('drop', handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const onChangeButtonPosition = (index: number) => {
        let gap = isDesktop ? 172 : 100;
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
                            <TabItem key={index} active={selectedTab === index} onClick={() => handleSelectTab(index)}>
                                {value}
                            </TabItem>
                        );
                    })}
                </TabWrapper>
            </TabBox>
            {selectedTab === 0 && (
                <UploadContainer isDesktop={isDesktop}>
                    <UploadContentBox>
                        <Title isDesktop={isDesktop} style={{ color: '#fff', margin: '0 0 16px' }}>
                            HASH Prefix
                        </Title>
                        <PrefixInputBox>
                            <TextInput
                                disabled={editable === false}
                                value={prefix}
                                style={{ color: editable ? '#fff' : '#bbb' }}
                                onChange={handlePrefix}
                            />
                            <Divider orientation="vertical" sx={{ margin: 0, borderColor: '#555', height: '52px' }} />
                            <IconButton
                                component="label"
                                sx={{ color: '#ffffff', display: editable ? 'none' : 'block' }}
                                onClick={() => handleEditable(true)}
                            >
                                <ModeEdit />
                            </IconButton>
                            <IconButton
                                component="label"
                                sx={{ color: '#ffffff', display: editable ? 'block' : 'none' }}
                                onClick={() => handleEditable(false)}
                            >
                                <Check />
                            </IconButton>
                        </PrefixInputBox>
                        <TooltipWrap>
                            <IconTooltip src={ICON_TOOLTIP} alt={'tooltip'} />
                            <TooltipText>{Texts.PREFIX_TOOLTIP}</TooltipText>
                        </TooltipWrap>
                        <UploadFileWrapper ref={dragRef} enableToUpload={verifyStep === 0} onClick={handleClick}>
                            <input
                                ref={hiddenFileInput}
                                type="file"
                                accept="application/pdf"
                                onChange={onChangeFiles}
                                style={{ display: 'none' }}
                            />
                            <Title isDesktop={isDesktop}>{Texts.UPLOAD_TITLE}</Title>
                            <Desc isDesktop={isDesktop}>{Texts.UPLOAD_DESC}</Desc>
                            <PdfImg src={IMG_PDF_UPLOAD} alt={Texts.UPLOAD_DESC} />
                        </UploadFileWrapper>
                    </UploadContentBox>
                </UploadContainer>
            )}
            {selectedTab === 1 && (
                <Fragment>
                    <UploadContainer isDesktop={isDesktop}>
                        <UploadContentBox>
                            <Title isDesktop={isDesktop} style={{ color: '#fff', margin: '0 0 16px' }}>
                                HASH Value
                            </Title>
                            <PrefixInputBox>
                                <TextInput
                                    placeholder={'Please endter the hash key value'}
                                    value={fileHash}
                                    onChange={(e) => setFileHash(e.target.value)}
                                />
                            </PrefixInputBox>
                            <TooltipWrap>
                                <IconTooltip src={ICON_TOOLTIP} alt={'tooltip'} />
                                <TooltipText>{Texts.HASH_TOOLTIP}</TooltipText>
                            </TooltipWrap>
                        </UploadContentBox>
                    </UploadContainer>
                    <VerifyButtonBox>
                        <GeneralButton style={{ maxWidth: '280px' }} active={fileHash.length > 0} onClick={handleVerifyFileHash}>
                            Verify
                        </GeneralButton>
                    </VerifyButtonBox>
                </Fragment>
            )}
        </HashUploadContainer>
    );
}
