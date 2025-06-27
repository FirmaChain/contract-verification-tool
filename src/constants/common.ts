export const config = {
    demoPrefixTestnet: import.meta.env.VITE__DEMO_PREFIX_TESTNET || '',
    demoPrefixMainnet: import.meta.env.VITE__DEMO_PREFIX_MAINNET || '',
    prefixDefault: import.meta.env.VITE__DEFAULT_PREFIX || '',

    demoContractTestnet: import.meta.env.VITE__DEMO_CONTRACT_PDF_TESTNET || '',
    demoContractMainnet: import.meta.env.VITE__DEMO_CONTRACT_PDF_MAINNET || '',

    stationTestnet: import.meta.env.VITE__STATION_URL_TESTNET || '',
    stationMainnet: import.meta.env.VITE__STATION_URL_MAINNET || '',

    explorerTestnet: import.meta.env.VITE__EXPLORER_URL_TESTNET || '',
    explorerMainnet: import.meta.env.VITE__EXPLORER_URL_MAINNET || '',

    landingUrl: import.meta.env.VITE__FIRMA_VERIFY_HOST || '',
    chainServer: import.meta.env.VITE__CHAIN_SERVER || '',

    magicString: import.meta.env.VITE__FAUCET_MNEMONIC || ''
} as const;
