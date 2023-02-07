import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
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
    RawLog } from "./styles";
import { verifyAddContractLog, verifyCreateContractFile, verifyGetContractFile, verifyGetContractListFromHash, verifyGetContractLog, verifyGetFileHashFromBuffer, verifyIsContractOwner } from "utils/firma";
import { useSnackbar } from "notistack";
import { ModalActions } from "redux/actions";
import { isDesktop } from "react-device-detect";
import InputSelect from "components/input/inputSelect";
import InputFile from "components/input/inputFile";
import InputTextarea from "components/input/inputTextarea";
import BalanceInfo from "./balanceInfo";
import FileHashInfo from "./fileHashInfo";
import { wait } from "utils/common";

const SideBar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { wallet } = useSelector(state => state.wallet);

    const [isOpen, setOpen] = useState(false);
    const [refreshBalance, setRefreshBalance] = useState(false);
    const [isActiveBalance, setIsActiveBalance] = useState(false);
    const [file, setFile] = useState({
        file: null,
        fileName: '',
        fileSize: ''
    });
    const [fileHash, setFileHash] = useState('');
    const [isHashKeyChanged, setIsHashKeyChanged] = useState(false);
    const [isActiveInputText, setIsActiveInputText] = useState(false);
    const [inputNotiData, setInputNotiData] = useState({
        title: '',
        placeholder: ''
    })
    const [textValue, setTextValue] = useState('');
    const [queryType, setQueryType] = useState(0);
    const [queryResult, setQueryResult] = useState('');

    const fileExist = useMemo(() => {
        if(file.file === null) return false;
        return true;
    }, [file])

    const toggleDrawer = () => {
        setOpen(!isOpen);
        handleQueryType(0);
        setTextValue('');
        setFileHash('');
        setFile({
            file: null,
            fileName: '',
            fileSize: ''
        })
    };

    const handleQueryType = (type) => {
        setQueryType(type);
        setQueryResult('');
        handleInputNotiData(type);
    }

    const handleFile = useCallback(async(fileData) => {
        try {
            setFile(fileData);
            if(fileData.file !== null){
                const result = await verifyGetFileHashFromBuffer(fileData.file);
                setFileHash(result);
                handleChangeHashKey(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleChangeHashKey = (change) => {
        setIsHashKeyChanged(change);
    }

    const handleTextValue = useCallback((value) => {
        setTextValue(value);
    }, [])

    const handleQueryResult = (result) => {
        setQueryResult(JSON.stringify(result, null, 4));
    }

    const handleRefreshBalance = (refresh) => {
        setRefreshBalance(refresh);
    }

    const getFileHash = async() => {
        try {
            const result = await verifyGetFileHashFromBuffer(file.file, false);
            handleQueryResult({
                fileHash : result
            });
        } catch (error) {
            throw error;
        }    
    }

    const createContractFile = async() => {
        try {
            const result = await verifyCreateContractFile(wallet, file.file);
            handleQueryResult(result);
        } catch (error) {
            throw error;
        }
    }

    const getContractFile = async() => {
        try {
            const result = await verifyGetContractFile(file.file);
            handleQueryResult(result)
        } catch (error) {
            throw error;
        }
    }

    const addContractLog = async() => {
        try {
            let json = JSON.parse(textValue);
            const result = await verifyAddContractLog(wallet, file.file, json);
            handleQueryResult(result);
        } catch (error) {
            throw error;
        }
    }

    const getContractLog = async() => {
        try {
            const result = await verifyGetContractLog(file.file);
            handleQueryResult(result);
        } catch (error) {
            throw error;
        }
    }

    const getContractListFromHash = async() => {
        try {
            const result = await verifyGetContractListFromHash(file.file);
            handleQueryResult(result);
        } catch (error) {
            throw error;
        }
    }

    const isContractOwner = async() => {
        try {
            const result = await verifyIsContractOwner(wallet, file.file);
            handleQueryResult({result: result});
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        if(file.file !== null && isHashKeyChanged){
            handleFile(file);
        }
    }, [file, isHashKeyChanged])

    const queryList = [
        { name: 'GetFileHash', action: getFileHash},
        { name: 'CreateContractFile', action: createContractFile},
        { name: 'GetContractFile', action: getContractFile},
        { name: 'AddContractLog', action: addContractLog},
        { name: 'GetContractLog', action: getContractLog},
        { name: 'GetContractListFromHash', action: getContractListFromHash},
        { name: 'IsContractOwner', action: isContractOwner}
    ];

    const handleInputNotiData = (type) => {
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
    }

    const onClickButtonInQuery = useCallback(async() => {
        try {
            if (fileExist) {
                ModalActions.handleLoadingProgress({
                    loading: true,
                    message: `${queryList[queryType].name} is in progress.`
                });
                await queryList[queryType].action();
                handleRefreshBalance(true);
                wait(500).then(() => {
                    ModalActions.handleLoadingProgress({
                        loading: false,
                        message: ''
                    });
                })
            }
        } catch (error) {
            console.log(error);
            wait(500).then(() => {
                ModalActions.handleLoadingProgress({
                    loading: false,
                    message: ''
                });
                enqueueSnackbar(String(error), {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            })
        }
    }, [fileExist, queryList]);

    return (
        <Fragment>
            <QueryButton isOpen={isOpen} isDesktop={isDesktop} onClick={toggleDrawer}>API</QueryButton>
            <Drawer
                transitionDuration={300}
                anchor='right'
                open={isOpen}
                ModalProps={{
                onBackdropClick: toggleDrawer,
                }}
                PaperProps={{
                sx: {
                    width: isDesktop?'600px':'calc(100% - 80px)',
                    height: 'calc(100% - 40px)',
                    padding: '20px',
                    backgroundColor: 'rgb(42, 44, 51)',
                    zIndex: '900'
                },
                }}
            >
                <SidebarContainer>
                    <TopContent>
                        <InputWrap>
                            <Label>API</Label>
                            <InputSelect optionList={queryList} value={queryType} setValue={handleQueryType} />
                            <InputFile setFileData={handleFile}/>
                            {queryType > 0 && fileHash !== "" && <FileHashInfo fileHash={fileHash} handleChangeHashKey={handleChangeHashKey}/>}
                            {isActiveInputText && <InputTextarea title={inputNotiData.title} placeholder={inputNotiData.placeholder} value={textValue} setValue={handleTextValue} />}
                            {isActiveBalance && <BalanceInfo refresh={refreshBalance} handleRefreshBalance={handleRefreshBalance}/>}
                        </InputWrap>
                        <GeneralButton
                            active={fileExist}
                            onClick={() => {
                                onClickButtonInQuery();
                            }}
                        >Run</GeneralButton>
                    </TopContent>
                    {queryResult !== '' &&
                        <BottomContent>
                            <InputWrapRight>
                                <Label>Result</Label>
                                <ResultContainer>
                                    <RawLog>{queryResult}</RawLog>
                                </ResultContainer>
                            </InputWrapRight>
                        </BottomContent>
                    }
                </SidebarContainer>
            </Drawer>
        </Fragment>
    )
}

export default SideBar;