import { Check, ModeEdit } from '@mui/icons-material';
import { Divider, IconButton, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import { copyToClipboard } from 'utils/common';
import { CopyIconImg, TextBox, TextInput, TextValue, TextValueBox, TitleValue } from './styles';
import usePreference from 'store/usePreference';

interface FileHashInfo_ {
    fileHash: string;
    handleChangeHashKey: (v: boolean) => void;
}

const FileHashInfo = ({ fileHash, handleChangeHashKey }: FileHashInfo_) => {
    const { enqueueSnackbar } = useSnackbar();
    const [hashKey, setHashKey] = useState('');
    const [editable, setEditable] = useState(false);

    const { hashPrefix: key, handleHashPrefix } = usePreference();

    const onCopyData = (data: string) => {
        copyToClipboard(data);

        enqueueSnackbar('Coppied File Hash', {
            variant: 'success',
            autoHideDuration: 3000
        });
    };

    const handleEditable = (enable: boolean) => {
        setEditable(enable);
    };

    const handleHashKey = (e: ChangeEvent<HTMLInputElement>) => {
        setHashKey(e.target.value);
    };

    const confirmChangeHashKey = () => {
        handleHashPrefix(hashKey);
        handleChangeHashKey(true);
        handleEditable(false);
    };

    useEffect(() => {
        if (editable === false) {
            const key = usePreference.getState().hashPrefix;
            setHashKey(key);
        }
    }, [editable]);

    return (
        <Stack>
            <TextBox style={{ padding: '20px 0 0' }}>
                <Stack sx={{ width: '100%' }} justifyContent={'space-between'} alignItems={'center'} gap={'10px'} flexDirection={'row'}>
                    <TitleValue>Hash Prefix</TitleValue>
                </Stack>
                <TextValueBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextInput
                        disabled={editable === false}
                        value={hashKey}
                        style={{ color: editable ? '#fff' : '#bbb' }}
                        onChange={handleHashKey}
                    />
                    <Divider orientation="vertical" sx={{ margin: 0, borderColor: '#555' }} />
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
                        onClick={() => confirmChangeHashKey()}
                    >
                        <Check />
                    </IconButton>
                </TextValueBox>
            </TextBox>
            <TextBox style={{ padding: '20px 0 0' }}>
                <Stack sx={{ width: '100%' }} justifyContent={'space-between'} alignItems={'center'} gap={'10px'} flexDirection={'row'}>
                    <Stack justifyContent={'flex-start'} alignItems={'center'} gap={'10px'} flexDirection={'row'}>
                        <TitleValue>File Hash</TitleValue>
                        <CopyIconImg onClick={() => onCopyData(fileHash)} />
                    </Stack>
                </Stack>
                <TextValueBox>
                    <TextValue style={{ fontSize: '14px' }}>{fileHash}</TextValue>
                </TextValueBox>
            </TextBox>
        </Stack>
    );
};

export default FileHashInfo;
