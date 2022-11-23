import { FAUCET_MNEMONIC } from "constants/texts";
import { FilesActions, WalletActions } from "redux/actions";
import { MAIN_NET, TEST_NET } from "redux/types";
const { FirmaSDK, FirmaUtil, FirmaConfig } = require("@firmachain/firma-js");
const { preFix } = require('../config');

let SDK;
let HASH_PREFIX = preFix;

export const setGlobalHashPrefix = (key) => {
    HASH_PREFIX = key;
}

export const getGlobalHashPrefix = () => {
    return HASH_PREFIX;
}

export const setChainConfig = (network) => {
    WalletActions.handleChainNetwork(network);
    if(network === MAIN_NET){
        SDK = new FirmaSDK(FirmaConfig.MainNetConfig);
        WalletActions.handleWallet({
            mnemonic: '',
            privateKey: '',
            address: '',
        })
    }
    if(network === TEST_NET){
        SDK = new FirmaSDK(FirmaConfig.TestNetConfig);
    }
}
 
export const getChainConfig = () => {
    console.log(SDK.Config);
    return SDK.Config;
}

export async function getVirifyResult(file = null, hash = "", prefix = "") {
    let contractFileHash = hash;
    try {
        if(file !== null){
            contractFileHash = prefix + FirmaUtil.getFileHashFromBuffer(file);
        }

        const contract = await SDK.Contract.getContractFile(contractFileHash);
        FilesActions.setOriginalContract(true);

        return contract;
    } catch (error) {
        console.log(error);
        FilesActions.setOriginalContract(false);

        return {error:true, fileHash: contractFileHash};
    }
}

export const getNewWallet = async() => {
    try {
        let wallet = await SDK.Wallet.newWallet();
        return wallet;
    } catch (error) {
        console.log('error : ' + error);
        throw error;
    }
}

export const getRecoverWalletFromMnemonic = async(mnemonic) => {
    try {
        let wallet = await SDK.Wallet.fromMnemonic(mnemonic);
        return wallet;
    } catch (error) {
        console.log('error : ' + error);
        throw error;
    }
}

export const getRecoverWalletFromPrivateKey = async(privateKey) => {
    try {
        let wallet = await SDK.Wallet.fromPrivateKey(privateKey);
        return wallet;
    } catch (error) {
        console.log('error : ' + error);
        throw error;
    }
}

export const getBalance = async(address) => {
    let balance = await SDK.Bank.getBalance(address);
    return FirmaUtil.getFCTStringFromUFCT(balance);       
}

export const getIpfsURL = async(privateKey, ipfsHash) => {
    try {
        const wallet = await getRecoverWalletFromPrivateKey(privateKey);
        const decryptHash = wallet.decryptData(ipfsHash);

        if(decryptHash === '' || decryptHash === undefined) return '';

        const url = SDK.Ipfs.getURLFromHash(decryptHash);

        return url;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyGetFileHashFromBuffer = async(fileBuffer, addKey = true) => {
    try {
        const fileHash = FirmaUtil.getFileHashFromBuffer(fileBuffer);
        const key = addKey? getGlobalHashPrefix() : "";
        return key + fileHash;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyCreateContractFile = async(wallet, fileBuffer) => {
    try {
        let _wallet = null;
        let _address = wallet.address;

        let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);
        
        if(wallet.mnemonic !== ''){ _wallet = await getRecoverWalletFromMnemonic(wallet.mnemonic); }
        else { _wallet = await getRecoverWalletFromPrivateKey(wallet.privateKey); }
        
        const ownerList = [_address];
        const ipfsHash = await SDK.Ipfs.addBuffer(fileBuffer);
		const encryptHash = _wallet.encryptData(ipfsHash);
        const jsonData = { storage: "ipfs", encryptIpfsHash: [encryptHash] };
        const metaDataJsonString = JSON.stringify(jsonData);
        const timeStamp = Math.round(+new Date() / 1000);

        const gasEstimation = await SDK.Contract.getGasEstimationCreateContractFile(_wallet, _fileHash, timeStamp, ownerList, metaDataJsonString);
        const txMisc = { gas: gasEstimation, fee: Math.ceil(gasEstimation * 0.1) };

        const txResult = await SDK.Contract.createContractFile(_wallet, _fileHash, timeStamp, ownerList, metaDataJsonString, txMisc);

        return txResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyGetContractFile = async(fileBuffer) => {
    try {
        const fileHash = await verifyGetFileHashFromBuffer(fileBuffer);
        const contractFile = await SDK.Contract.getContractFile(fileHash);

        return contractFile;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyAddContractLog = async(wallet, fileBuffer, jsonData) => {
    try {
        let _wallet = null;
        let _address = wallet.address;
        let _jsonData = jsonData;
        let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);

        if(wallet.mnemonic !== ''){ _wallet = await getRecoverWalletFromMnemonic(wallet.mnemonic); }
        else { _wallet = await getRecoverWalletFromPrivateKey(wallet.privateKey); }

        const timeStamp = Math.round(+new Date() / 1000);
        const jsonString = JSON.stringify(_jsonData);

        const gasEstimation = await SDK.Contract.getGasEstimationCreateContractFile(_wallet, _fileHash, timeStamp, "createContract", _address, jsonString);
        const txMisc = { gas: gasEstimation, fee: Math.ceil(gasEstimation * 0.1) };

        const txResult = await SDK.Contract.addContractLog(_wallet, _fileHash, timeStamp, "createContract", _address, jsonString, txMisc);

        return txResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyGetContractLog = async(fileBuffer) => {
    try {
        const contractList = await verifyGetContractListFromHash(fileBuffer);
        const logId = (contractList[contractList.length - 1]).toString();
        const singleContractLog = await SDK.Contract.getContractLog(logId);

        return singleContractLog;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyGetContractListFromHash = async(fileBuffer) => {
    try {
        let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);
        const contractList = await SDK.Contract.getContractListFromHash(_fileHash);
        return contractList;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const verifyIsContractOwner = async(wallet, fileBuffer) => {
    try {
        let _address = wallet.address;
        let _fileHash = await verifyGetFileHashFromBuffer(fileBuffer);
        
        const isOwner = await SDK.Contract.isContractOwner(_fileHash, _address);
        return isOwner;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const sendFCTFromFaucet = async(address) => {
    try {
        let FCTAmount = 1;
        let memo = 'faucet';
        
        let faucetWallet = await getRecoverWalletFromMnemonic(FAUCET_MNEMONIC);
        let send = await SDK.Bank.send(faucetWallet, address, Number(FCTAmount), {memo: memo});
    
        return send;
    } catch (error) {
        console.log(error);
        throw error;
    }
}