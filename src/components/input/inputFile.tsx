import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import { AttatchTextFiled, InputBox, InputFileWrapper, InputTitle } from 'components/styles';
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

    const [File, setFile] = useState<null | ArrayBufferLike>(null);
    const [FileName, setFileName] = useState<string>('');
    const [FileSize, setFileSize] = useState<string>('');

    const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        let reader = new FileReader();

        let file = event.target.files ? event.target.files[0] : undefined;

        if (file === undefined) return;

        // if(file.size / 1024 / 1024 > 20){
        //     // file limit
        //     // handleAlertOpen('File size exceeds the allowable limit of 20MB', 3000, 'error');
        //     event.target.value = null;
        //     return enqueueSnackbar('File size exceeds the allowable limit of 20MB', {
        //         variant: 'error',
        //         autoHideDuration: 3000,
        //     });
        // }

        reader.readAsArrayBuffer(file);

        reader.onload = function () {
            if (file) {
                setFileSize((file.size / 1024 / 1024).toFixed(2));
                setFileName(file.name);
                setFile(reader.result as ArrayBufferLike);
            } else {
                console.error('ERROR: File not found.');
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
            <InputFileWrapper>
                <AttatchTextFiled value={FileName + (FileName && ` (${FileSize} MB)`)} />
                <Divider orientation="vertical" sx={{ margin: 0, borderColor: '#555' }} />
                <IconButton component="label" sx={{ color: '#ffffff' }}>
                    <FileIcon />
                    <input id={'file_input'} style={{ display: 'none' }} type="file" name="imageFile" onChange={fileChangedHandler} />
                </IconButton>
            </InputFileWrapper>
        </InputBox>
    );
};

export default React.memo(InputFile);
