import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer } from '@mui/material';
import {
    SidebarContainer,
    InputWrap,
    Label,
    QueryButton,
    TopContent,
    GeneralButton,
    BottomContent,
    InputWrapRight,
    ResultContainer,
    RawLog
} from './styles';
import { useSnackbar } from 'notistack';
import { isDesktop } from 'react-device-detect';
import InputSelect from 'components/input/inputSelect';
import InputFile, { FileData_ } from 'components/input/inputFile';
import InputTextarea from 'components/input/inputTextarea';
import BalanceInfo from './balanceInfo';
import FileHashInfo from './fileHashInfo';
import { wait } from 'utils/common';
import useWallet from 'store/useWallet';
import useFirmaUtil from 'hook/useFirmaUtils';
import useModal from 'store/useModal';
import { FirmaUtil } from '@firmachain/firma-js';
import JsonViewer from 'components/jsonViewer/jsonViewer';

const SideBar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { wallet, chainNetwork } = useWallet();
    const { handleModalSwitchNetwork, handleModalLoadingProgress } = useModal();
    const {
        verifyCreateContractFile,
        verifyAddContractLog,
        verifyIsContractOwner,
        verifyGetContractListFromHash,
        verifyGetContractLog,
        verifyGetContractFile,
        verifyGetFileHashFromBuffer,
        getDefaultFee_uFCT
    } = useFirmaUtil();

    const [isOpen, setOpen] = useState(false);
    const [refreshBalance, setRefreshBalance] = useState(false);
    const [isActiveBalance, setIsActiveBalance] = useState(false);
    const [file, setFile] = useState<FileData_>({
        file: null,
        fileName: '',
        fileSize: ''
    });

    const [fileHash, setFileHash] = useState('');
    // const [isHashKeyChanged, setIsHashKeyChanged] = useState(false);
    const [isActiveInputText, setIsActiveInputText] = useState(false);
    const [inputNotiData, setInputNotiData] = useState({
        title: '',
        placeholder: ''
    });
    const [textValue, setTextValue] = useState('');
    const [queryType, setQueryType] = useState(0);
    const [queryResult, setQueryResult] = useState<string | object>('');

    const fileExist = useMemo(() => {
        if (file.file === null) return false;
        return true;
    }, [file]);

    const toggleDrawer = (openValue: boolean) => {
        if (chainNetwork !== 'TESTNET') {
            handleModalSwitchNetwork(true);
        } else {
            setOpen(openValue);
            handleQueryType(0);
            setTextValue('');
            setFileHash('');
            setFile({
                file: null,
                fileName: '',
                fileSize: ''
            });
        }
    };

    const handleQueryType = (type: number) => {
        setQueryType(type);
        setQueryResult('');
        handleInputNotiData(type);
    };

    const handleFile = async (fileData: FileData_) => {
        try {
            setFile(() => fileData);
            if (fileData.file !== null) {
                const parsed = fileData.file as any;

                const result = await verifyGetFileHashFromBuffer(parsed);
                setFileHash(result);
                // handleChangeHashKey(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const handleChangeHashKey = (change: boolean) => {
    //     setIsHashKeyChanged(change);
    // };

    const handleTextValue = useCallback((value: string) => {
        setTextValue(value);
    }, []);

    const handleQueryResult = (result: string | object) => {
        //? Could not handle all types
        setQueryResult(result);
        // setQueryResult(JSON.stringify(result, null, 4));
    };

    const handleRefreshBalance = (refresh: boolean) => {
        setRefreshBalance(refresh);
    };

    const getFileHash = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;

                const result = await verifyGetFileHashFromBuffer(parsed, false);
                handleQueryResult({
                    fileHash: result
                });
            } catch (error) {
                throw error;
            }
        }
    };

    const createContractFile = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;

                const result = await verifyCreateContractFile(wallet, parsed);
                handleQueryResult(result);
            } catch (error) {
                throw error;
            }
        }
    };

    const getContractFile = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;

                const result = await verifyGetContractFile(parsed);
                handleQueryResult(result);
            } catch (error) {
                throw error;
            }
        }
    };

    const addContractLog = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;
                const result = await verifyAddContractLog(wallet, parsed, textValue);
                handleQueryResult(result);
            } catch (error) {
                throw error;
            }
        }
    };

    const getContractLog = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;
                const result = await verifyGetContractLog(parsed);
                handleQueryResult(result);
            } catch (error) {
                throw error;
            }
        }
    };

    const getContractListFromHash = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;

                const result = await verifyGetContractListFromHash(parsed);
                handleQueryResult(result);
            } catch (error) {
                throw error;
            }
        }
    };

    const isContractOwner = async () => {
        if (file.file) {
            try {
                const parsed = file.file as any;

                const result = await verifyIsContractOwner(wallet, parsed);
                handleQueryResult({ result: result });
            } catch (error) {
                throw error;
            }
        }
    };

    useEffect(() => {
        if (file.file !== null) {
            handleFile(file);
        }
    }, [file]);

    const queryList = [
        { name: 'GetFileHash', action: getFileHash },
        { name: 'CreateContractFile', action: createContractFile }, // wallet | balance
        { name: 'GetContractFile', action: getContractFile },
        { name: 'AddContractLog', action: addContractLog }, // wallet | balance
        { name: 'GetContractLog', action: getContractLog },
        { name: 'GetContractListFromHash', action: getContractListFromHash },
        { name: 'IsContractOwner', action: isContractOwner } // wallet
    ];

    const handleInputNotiData = (type: number) => {
        switch (type) {
            case 3:
                setInputNotiData({
                    title: 'JSON',
                    placeholder: 'Please enter the data valid JSON format.'
                });
                handleRefreshBalance(true);
                setIsActiveBalance(true);
                setIsActiveInputText(true);
                return;
            case 1:
                handleRefreshBalance(true);
                setIsActiveBalance(true);
                setIsActiveInputText(false);
                return;
            case 0:
            case 2:
            case 4:
            case 5:
            case 6:
            default:
                setIsActiveBalance(false);
                setIsActiveInputText(false);
                return;
        }
    };

    const onClickButtonInQuery = useCallback(async () => {
        setQueryResult('');

        const balance = useWallet.getState().balance;
        const defaultFee = FirmaUtil.getFCTStringFromUFCT(getDefaultFee_uFCT());

        if ((queryType === 1 || queryType === 3) && Number(balance) < Number(defaultFee)) {
            enqueueSnackbar('Insufficient funds. Please check your account balance.', {
                variant: 'error',
                autoHideDuration: 5000
            });
            return;
        }

        handleModalLoadingProgress({
            loading: true,
            message: `${queryList[queryType].name} is in progress.`
        });

        await wait(500);

        try {
            if (fileExist) {
                await queryList[queryType].action();
                handleRefreshBalance(true);
                await wait(500);
            }
        } catch (error) {
            console.log(error);
            wait(500).then(() => {
                enqueueSnackbar(String(error), {
                    variant: 'error',
                    autoHideDuration: 3000
                });
            });
        } finally {
            handleModalLoadingProgress({
                loading: false,
                message: ''
            });
        }
    }, [fileExist, queryList]);

    useEffect(() => {
        if ([1, 3, 6].includes(queryType)) {
            if (wallet.address === '') {
                enqueueSnackbar('Wallet connection is required to use this feature.', {
                    variant: 'warning',
                    autoHideDuration: 5000
                });
            }
        }
    }, [queryType]);

    return (
        <Fragment>
            <QueryButton isOpen={false} isDesktop={isDesktop} onClick={() => toggleDrawer(!isOpen)}>
                API
            </QueryButton>
            <Drawer
                anchor="right"
                open={isOpen}
                ModalProps={{
                    //? There might be error like "Unknown event handler ~~" but it is not error. IT WORKS FINE.
                    //? https://stackoverflow.com/questions/53945281/warning-unknown-event-handler-property-onheaderclick-it-will-be-ignored
                    onBackdropClick: () => toggleDrawer(false)
                }}
                PaperProps={{
                    sx: {
                        width: isDesktop ? '600px' : 'calc(100% - 80px)',
                        height: 'calc(100% - 40px)',
                        padding: '20px',
                        backgroundColor: 'rgb(42, 44, 51)',
                        zIndex: '900',
                        transition: 'transform 300ms linear alter !important',
                        overflow: 'scroll'
                    }
                }}
            >
                <QueryButton isOpen={true} isDesktop={isDesktop} onClick={() => toggleDrawer(!isOpen)}>
                    API
                </QueryButton>
                <SidebarContainer>
                    <TopContent>
                        <InputWrap>
                            <Label>API</Label>
                            <InputSelect optionList={queryList} value={queryType} setValue={handleQueryType} />
                            <InputFile setFileData={handleFile} />
                            {queryType > 0 && fileHash !== '' && (
                                <FileHashInfo fileHash={fileHash} /*handleChangeHashKey={handleChangeHashKey}*/ />
                            )}
                            {isActiveInputText && (
                                <InputTextarea
                                    title={inputNotiData.title}
                                    placeholder={inputNotiData.placeholder}
                                    value={textValue}
                                    setValue={handleTextValue}
                                />
                            )}
                            {isActiveBalance && <BalanceInfo refresh={refreshBalance} handleRefreshBalance={handleRefreshBalance} />}
                        </InputWrap>
                        <GeneralButton
                            active={fileExist}
                            onClick={() => {
                                if (fileExist) onClickButtonInQuery();
                            }}
                        >
                            Run
                        </GeneralButton>
                    </TopContent>
                    {queryResult !== '' && (
                        <BottomContent>
                            <InputWrapRight>
                                <Label>Result</Label>
                                {typeof queryResult === 'object' ? (
                                    <JsonViewer data={queryResult} maxHeight="100%" />
                                ) : (
                                    <ResultContainer>
                                        <RawLog>{queryResult}</RawLog>
                                    </ResultContainer>
                                )}
                            </InputWrapRight>
                        </BottomContent>
                    )}
                </SidebarContainer>
            </Drawer>
        </Fragment>
    );
};

export default React.memo(SideBar);
