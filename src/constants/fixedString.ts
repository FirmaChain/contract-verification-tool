export enum Types {
    NEW_WALLET = 'NEW_WALLET',
    RECOVER_WALLET_MNEMONIC = 'RECOVER_WALLET_MNEMONIC',
    RECOVER_WALLET_PRIVATEKEY = 'RECOVER_WALLET_PRIVATEKEY',
    CONNECTED_WALLET = 'CONNECTED_WALLET',

    MAIN_NET = 'MAINNET',
    TEST_NET = 'TESTNET'
}

export enum Texts {
    MAIN_TITLE = 'FIRMACHAIN VERIFICATION SERVICE',
    MAIN_DESC = 'Verification FIRMACHAIN by matching the hash value of the contract on mainnet with files.',

    UPLOAD_TITLE = 'DRAG AND DROP FILE HERE',
    UPLOAD_DESC = 'Please upload the file to be verified.',
    LOADING_TITLE = 'VALIDATION CHECK',

    WALLET_CONNECT_SUCCESS = 'Wallet has been successfully connected.',
    FAUCET_SEND_FCT = 'FIRMA Faucet is sending 1FCT.\nIt may take 6 to 8 seconds.',

    FILEHASH_INPUT_TITLE = 'ENTER FILE HASH',
    PREFIX_TOOLTIP = "Prefix entered when Hash was created. The default is 'FIRMA_VERIFY_', and if you used a different prefix, use the [Edit] function.",
    HASH_TOOLTIP = 'It refers to the HASH value recorded on the chain through the VERIFY service, and forgery can be verified by entering the HASH value.\nHASH values can be created with sha256,512, etc., and complexity can be increased by adding user-defined values through Prefix.',
    NOT_VERIFIED_NOTICE = 'This is an unverified file. Please retry after checking.'
}
