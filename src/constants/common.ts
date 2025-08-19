export const config = {
    demoPrefixTestnet: import.meta.env.VITE_DEMO_PREFIX_TESTNET || '',
    demoPrefixMainnet: import.meta.env.VITE_DEMO_PREFIX_MAINNET || '',
    prefixDefault: import.meta.env.VITE_DEFAULT_PREFIX || '',

    demoContractTestnet: import.meta.env.VITE_DEMO_CONTRACT_PDF_TESTNET || '',
    demoContractMainnet: import.meta.env.VITE_DEMO_CONTRACT_PDF_MAINNET || '',

    stationTestnet: import.meta.env.VITE_STATION_URL_TESTNET || '',
    stationMainnet: import.meta.env.VITE_STATION_URL_MAINNET || '',

    explorerTestnet: import.meta.env.VITE_EXPLORER_URL_TESTNET || '',
    explorerMainnet: import.meta.env.VITE_EXPLORER_URL_MAINNET || '',

    landingUrl: import.meta.env.VITE_FIRMA_VERIFY_HOST || '',
    chainServer: import.meta.env.VITE_CHAIN_SERVER || '',

    magicString: import.meta.env.VITE_FAUCET_MNEMONIC || ''
} as const;
