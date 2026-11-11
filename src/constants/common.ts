export const config = {
    prefixDefault: import.meta.env.VITE_DEFAULT_PREFIX || '',

    stationTestnet: import.meta.env.VITE_STATION_URL_TESTNET || '',
    stationMainnet: import.meta.env.VITE_STATION_URL_MAINNET || '',

    explorerTestnet: import.meta.env.VITE_EXPLORER_URL_TESTNET || '',
    explorerMainnet: import.meta.env.VITE_EXPLORER_URL_MAINNET || '',

    landingUrl: import.meta.env.VITE_FIRMA_VERIFY_HOST || '',
    chainServerLive: import.meta.env.VITE_CHAIN_SERVER_LIVE || '',
    chainServerDev: import.meta.env.VITE_CHAIN_SERVER_DEV || '',

    magicString: import.meta.env.VITE_FAUCET_MNEMONIC || ''
} as const;
