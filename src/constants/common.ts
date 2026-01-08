export const config = {
    prefixDefault: import.meta.env.VITE_DEFAULT_PREFIX || '',

    stationTestnet: import.meta.env.VITE_STATION_URL_TESTNET || '',
    stationMainnet: import.meta.env.VITE_STATION_URL_MAINNET || '',

    explorerTestnet: import.meta.env.VITE_EXPLORER_URL_TESTNET || '',
    explorerMainnet: import.meta.env.VITE_EXPLORER_URL_MAINNET || '',

    landingUrl: import.meta.env.VITE_FIRMA_VERIFY_HOST || '',
    chainServer: import.meta.env.VITE_CHAIN_SERVER || '',

    magicString: import.meta.env.VITE_FAUCET_MNEMONIC || ''
} as const;
