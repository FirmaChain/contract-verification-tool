import { FilesActions } from "redux/actions";

const { FirmaSDK, FirmaConfig, FirmaUtil } = require("@firmachain/firma-js");

const {firmaConfig} = require('../config');

const SDK = new FirmaSDK(firmaConfig);

export async function getVirifyResult(file) {
    let contractFileHash = ""
    try {
        contractFileHash = await FirmaUtil.getFileHashFromBuffer(file);

        // const contract = await SDK.Contract.getContractFile("0xklsdjflaksjflaksjf1641539315");
        const contract = await SDK.Contract.getContractFile(contractFileHash);

        FilesActions.setOriginalContract(true);
        return contract;
    } catch (error) {
        console.log(error);
        FilesActions.setOriginalContract(false);
        return {error:true, fileHash: contractFileHash};
    }
}