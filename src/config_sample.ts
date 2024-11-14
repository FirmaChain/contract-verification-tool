type Config = {
    demoPrefix: Record<string, string>;
    preFix: string;
    demoContract: Record<string, string>;
    stationUrl: Record<string, string>;
    explorerUrl: Record<string, string>;
    landingUrl: string;
    chainServerUrl: string;
    faucetMnemonic: string;
};

const config: Config = {
    demoPrefix: { TESTNET: '', MAINNET: '' },
    preFix: '',
    demoContract: {
        MAINNET: '',
        TESTNET: ''
    },
    stationUrl: {
        TESTNET: '',
        MAINNET: ''
    },
    explorerUrl: {
        TESTNET: '',
        MAINNET: ''
    },
    landingUrl: '',
    chainServerUrl: '',
    faucetMnemonic: ''
};

export default config;
