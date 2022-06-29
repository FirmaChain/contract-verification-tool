import { FilesActions } from "redux/actions";

const { FirmaSDK, FirmaUtil } = require("@firmachain/firma-js");

const {firmaConfig, hashKey} = require('../config');

const SDK = new FirmaSDK(firmaConfig);

export async function getVirifyResult(file) {
    let contractFileHash = ""
    try {
        contractFileHash = FirmaUtil.getFileHashFromBuffer(file);

        const contract = await SDK.Contract.getContractFile(hashKey + contractFileHash);

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

export const getRecoverWalletFromPrivateKey = async(privateKey) => {
    try {
        let wallet = await SDK.Wallet.fromPrivateKey(privateKey);
        return wallet;
    } catch (error) {
        console.log('error : ' + error);
        throw error;
    }
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