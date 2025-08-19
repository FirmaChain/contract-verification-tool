import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import { AttatchTextFiled, InputBox, InputFileWrapper, InputTitle } from '@/components/styles';
import { useSnackbar } from 'notistack';
import FileIcon from '@mui/icons-material/AttachFile';

export interface FileData_ {
    file: ArrayBuffer | null;
    fileName: string;
    fileSize: string;
}

interface InputFile_ {
    setFileData: (v: FileData_) => void;
}

const InputFile = ({ setFileData }: InputFile_) => {
    const { enqueueSnackbar } = useSnackbar();

    const inputRef = useRef<HTMLInputElement>(null);

    const [File, setFile] = useState<null | ArrayBufferLike>(null);
    const [FileName, setFileName] = useState<string>('');
    const [FileSize, setFileSize] = useState<string>('');

    const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        let reader = new FileReader();

        let file = event.target.files ? event.target.files[0] : undefined;

        if (file === undefined) return;

        reader.readAsArrayBuffer(file);

        reader.onload = function () {
            if (file) {
                if (file.type !== 'application/pdf') {
                    console.error('This is a file type that is not supported.');
                    enqueueSnackbar('This is a file type that is not supported.', { variant: 'error', autoHideDuration: 3000 });

                    return;
                }

                if (file.size / 1024 / 1024 > 20) {
                    console.error('Upload is not possible if the file size is more than 20MB.');
                    enqueueSnackbar('Upload is not possible if the file size is more than 20MB.', {
                        variant: 'error',
                        autoHideDuration: 3000
                    });

                    return;
                }

                setFileSize((file.size / 1024 / 1024).toFixed(2));
                setFileName(file.name);
                setFile(reader.result as ArrayBufferLike);
            } else {
                enqueueSnackbar('Failed to read file.', {
                    variant: 'error',
                    autoHideDuration: 3000
                });
            }
        };

        reader.onerror = function () {
            console.log(reader.error);
            return enqueueSnackbar(String(reader.error), {
                variant: 'error',
                autoHideDuration: 3000
            });
        };
    };

    const handleFileData = useCallback(() => {
        setFileData({
            file: File,
            fileName: FileName,
            fileSize: FileSize
        });
    }, [File, FileName, FileSize, setFileData]);

    useEffect(() => {
        if (File !== null && FileName !== '' && FileSize !== '') {
            handleFileData();
        }
    }, [File, FileName, FileSize, handleFileData]);

    return (
        <InputBox>
            <InputTitle>Attach File</InputTitle>
            <InputFileWrapper onClick={() => inputRef.current?.click()}>
                <AttatchTextFiled>{FileName + (FileName && ` (${FileSize} MB)`)}</AttatchTextFiled>
                <Divider orientation="vertical" sx={{ margin: 0, borderColor: '#555' }} />
                <IconButton sx={{ color: '#ffffff' }}>
                    <FileIcon />
                </IconButton>
                <input
                    ref={inputRef}
                    id={'file_input'}
                    style={{ display: 'none' }}
                    type="file"
                    name="pdfFile"
                    accept="application/pdf"
                    onChange={fileChangedHandler}
                />
            </InputFileWrapper>
        </InputBox>
    );
};

export default React.memo(InputFile);
