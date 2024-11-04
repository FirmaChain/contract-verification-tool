import { FirmaConfig, FirmaSDK, FirmaUtil } from '@firmachain/firma-js';
import { Wallet } from '@types';
import { FAUCET_MNEMONIC } from 'constants/texts';
import { useFirmaSDKContext } from 'context/firmaSDKContext';
// import { FilesActions } from 'redux/actions';
import useFile from 'store/useFile';
import usePreference from 'store/usePreference';
import useWallet from 'store/useWallet';

const useFirmaUtil = () => {
    const { firmaSDK } = useFirmaSDKContext();
    const { hashPrefix } = usePreference();
    const { wallet, handleChainNetwork, handleBalance } = useWallet();
    const { handleOriginalContract } = useFile();

    const setChainConfig = (network: string) => {
        handleChainNetwork(network);
    };

    const getBalance = async (address: string) => {
        const balance = await firmaSDK.Bank.getBalance(address);

        return FirmaUtil.getFCTStringFromUFCT(Number(balance));
    };

    const getRecoverWalletFromPrivateKey = async (privateKey: string) => {
        try {
            let wallet = await firmaSDK.Wallet.fromPrivateKey(privateKey);
            return wallet;
        } catch (error) {
            console.log('error : ' + error);
            throw error;
        }
    };

    //! Not used for now
    // const getIpfsURL = async (privateKey: string, ipfsHash: string) => {
    //     try {
    //         const wallet = await getRecoverWalletFromPrivateKey(privateKey);
    //         const decryptHash = wallet.decryptData(ipfsHash);

    //         if (decryptHash === '' || decryptHash === undefined) return '';

    //         const url = firmaSDK.Ipfs.getURLFromHash(decryptHash);

    //         return url;
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // };

    const getRecoverWalletFromMnemonic = async (mnemonic: string) => {
        try {
            let wallet = await firmaSDK.Wallet.fromMnemonic(mnemonic);
            return wallet;
        } catch (error) {
            console.log('error : ' + error);
            throw error;
        }
    };

    const getNewWallet = async () => {
        try {
            let wallet = await firmaSDK.Wallet.newWallet();
            return wallet;
        } catch (error) {
            console.log('error : ' + error);
            throw error;
        }
    };

    const getVirifyResult = async (file: null | Uint8Array, hash = '', prefix = '') => {
        let contractFileHash = hash;

        try {
            if (file !== null) {
                contractFileHash = prefix + FirmaUtil.getFileHashFromBuffer(file);
            }

            const contract = await firmaSDK.Contract.getContractFile(contractFileHash);

            // FilesActions.setOriginalContract(true);

            handleOriginalContract(true);

            return contract;
        } catch (error) {
            console.log(error);
            // FilesActions.setOriginalContract(false);

            handleOriginalContract(false);

            return { error: true, fileHash: contractFileHash };
        }
    };

    const verifyGetFileHashFromBuffer = async (fileBuffer: Uint8Array, addKey = true) => {
        try {
            const fileHash = FirmaUtil.getFileHashFromBuffer(fileBuffer);
            const key = addKey ? hashPrefix : '';
            return key + fileHash;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const verifyCreateContractFile = async (wallet: Wallet, fileBuffer: Uint8Array) => {
        try {
            let _wallet = null;
            let _address = wallet.address;

            let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);

            if (wallet.mnemonic !== '') {
                _wallet = await getRecoverWalletFromMnemonic(wallet.mnemonic);
            } else {
                _wallet = await getRecoverWalletFromPrivateKey(wallet.privateKey);
            }

            const ownerList = [_address];

            const ipfsHash = await firmaSDK.Ipfs.addBuffer(fileBuffer);
            const encryptHash = _wallet.encryptData(ipfsHash);
            const jsonData = { storage: 'ipfs', encryptIpfsHash: [encryptHash] };
            const metaDataJsonString = JSON.stringify(jsonData);
            const timeStamp = Math.round(+new Date() / 1000);

            const gasEstimation = await firmaSDK.Contract.getGasEstimationCreateContractFile(
                _wallet,
                _fileHash,
                timeStamp,
                ownerList,
                metaDataJsonString
            );
            const txMisc = { gas: gasEstimation, fee: Math.ceil(gasEstimation * 0.1) };

            const txResult = await firmaSDK.Contract.createContractFile(
                _wallet,
                _fileHash,
                timeStamp,
                ownerList,
                metaDataJsonString,
                txMisc
            );

            return txResult;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const verifyGetContractFile = async (fileBuffer: Uint8Array) => {
        try {
            const fileHash = await verifyGetFileHashFromBuffer(fileBuffer);
            const contractFile = await firmaSDK.Contract.getContractFile(fileHash);

            return contractFile;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const verifyAddContractLog = async (wallet: Wallet, fileBuffer: Uint8Array, jsonData: string) => {
        try {
            let _wallet = null;
            let _address = wallet.address;
            let _jsonData = jsonData;
            let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);

            if (wallet.mnemonic !== '') {
                _wallet = await getRecoverWalletFromMnemonic(wallet.mnemonic);
            } else {
                _wallet = await getRecoverWalletFromPrivateKey(wallet.privateKey);
            }

            const timeStamp = Math.round(+new Date() / 1000);
            const jsonString = JSON.stringify(_jsonData);

            const gasEstimation = await firmaSDK.Contract.getGasEstimationAddContractLog(
                _wallet,
                _fileHash,
                timeStamp,
                'addContractLog',
                _address,
                jsonString
            );
            const txMisc = { gas: gasEstimation, fee: Math.ceil(gasEstimation * 0.1) };

            const txResult = await firmaSDK.Contract.addContractLog(
                _wallet,
                _fileHash,
                timeStamp,
                'addContractLog',
                _address,
                jsonString,
                txMisc
            );

            return txResult;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const verifyGetContractListFromHash = async (fileBuffer: Uint8Array) => {
        try {
            let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);
            const contractList = await firmaSDK.Contract.getContractListFromHash(_fileHash);
            return contractList;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const verifyGetContractLog = async (fileBuffer: Uint8Array) => {
        try {
            const contractList = await verifyGetContractListFromHash(fileBuffer);
            const logId = contractList[contractList.length - 1].toString();
            const singleContractLog = await firmaSDK.Contract.getContractLog(logId);

            return singleContractLog;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const verifyIsContractOwner = async (wallet: Wallet, fileBuffer: Uint8Array) => {
        try {
            let _address = wallet.address;
            let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);

            const isOwner = await firmaSDK.Contract.isContractOwner(_fileHash, _address);
            return isOwner;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const sendFCTFromFaucet = async (address: string) => {
        try {
            let FCTAmount = 1;
            let memo = 'faucet';

            let faucetWallet = await getRecoverWalletFromMnemonic(FAUCET_MNEMONIC);
            let send = await firmaSDK.Bank.send(faucetWallet, address, Number(FCTAmount), { memo: memo });

            return send;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getDefaultFee_uFCT = () => {
        const config = firmaSDK.Config; //  getChainConfig();
        // const fee = FirmaUtil.getFCTStringFromUFCT(config.defaultFee);
        return config.defaultFee;
    };

    const getChainIDList = () => {
        return [FirmaConfig.MainNetConfig.chainID.toUpperCase(), FirmaConfig.TestNetConfig.chainID.toUpperCase()];
    };

    const getCurrentNetworkID = () => {
        return firmaSDK.Config.chainID;
    };

    const getUTokenStrFromTokenStr = (numberString: string): string => {
        const decimals = '6';

        const convertDecimals = Number(decimals);
        const number = parseFloat(numberString);

        if (isNaN(number)) {
            return numberString;
        }

        const [integerPart, decimalPart] = numberString.split('.');
        const formattedInteger = parseInt(integerPart, 10).toString(); // .toLocaleString('en-US');

        let formattedDecimal = decimalPart ? decimalPart.slice(0, convertDecimals) : '';

        let formattedNumber = formattedInteger;

        if (formattedDecimal) {
            formattedNumber += '.' + formattedDecimal;
        }

        return formattedNumber;
    };

    const getTokenStrFromUTokenStr = (amount: string) => {
        const decimals = '6';

        const decimalsNumber = parseInt(decimals, 10);
        const pointIndex = amount.length - decimalsNumber;

        let result = '';
        if (pointIndex > 0) {
            result = amount.slice(0, pointIndex) + '.' + amount.slice(pointIndex);
        } else {
            result = '0.' + '0'.repeat(Math.abs(pointIndex)) + amount;
        }

        if (result.includes('.')) {
            result = result.replace(/\.?0+$/, '');
        }

        const [integerPart, decimalPart] = result.split('.');
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        result = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

        return result;
    };

    return {
        setChainConfig,
        getBalance,
        // getIpfsURL,
        getNewWallet,
        getVirifyResult,
        verifyCreateContractFile,
        verifyGetContractFile,
        verifyAddContractLog,
        verifyGetContractLog,
        verifyIsContractOwner,
        sendFCTFromFaucet,
        getRecoverWalletFromMnemonic,
        verifyGetContractListFromHash,
        verifyGetFileHashFromBuffer,
        getRecoverWalletFromPrivateKey,
        getDefaultFee_uFCT,
        getChainIDList,
        getCurrentNetworkID,
        getUTokenStrFromTokenStr,
        getTokenStrFromUTokenStr
    };
};

export default useFirmaUtil;
