export const config = {
    demoPrefixTestnet: process.env.REACT_APP_DEMO_PREFIX_TESTNET || '',
    demoPrefixMainnet: process.env.REACT_APP_DEMO_PREFIX_MAINNET || '',
    prefixDefault: process.env.REACT_APP_DEFAULT_PREFIX || '',

    demoContractTestnet: process.env.REACT_APP_DEMO_CONTRACT_PDF_TESTNET || '',
    demoContractMainnet: process.env.REACT_APP_DEMO_CONTRACT_PDF_MAINNET || '',

    stationTestnet: process.env.REACT_APP_STATION_URL_TESTNET || '',
    stationMainnet: process.env.REACT_APP_STATION_URL_MAINNET || '',

    explorerTestnet: process.env.REACT_APP_EXPLORER_URL_TESTNET || '',
    explorerMainnet: process.env.REACT_APP_EXPLORER_URL_MAINNET || '',

    landingUrl: process.env.REACT_APP_FIRMA_VERIFY_HOST || '',
    chainServer: process.env.REACT_APP_CHAIN_SERVER || '',

    magicString: process.env.REACT_APP_FAUCET_MNEMONIC || ''
} as const;
