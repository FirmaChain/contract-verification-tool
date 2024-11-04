import { FirmaConfig, FirmaSDK } from '@firmachain/firma-js';
import { createContext, useContext, ReactNode } from 'react';
import useWallet from 'store/useWallet';

interface FirmaSDKContextProps {
    firmaSDK: FirmaSDK;
}

const FirmaSDKContext = createContext<FirmaSDKContextProps | undefined>(undefined);

export const useFirmaSDKContext = () => {
    const context = useContext(FirmaSDKContext);
    if (!context) {
        throw new Error('useFirmaSDKContext must be used within a FirmaSDKProvider');
    }
    return context;
};

export const FirmaSDKProvider = ({ children }: { children: ReactNode }) => {
    const testSDK = new FirmaSDK(FirmaConfig.TestNetConfig);
    const mainSDK = new FirmaSDK(FirmaConfig.MainNetConfig);

    const chainNetwork = useWallet((v) => v.chainNetwork);

    const currentSDK = chainNetwork === 'TESTNET' ? testSDK : mainSDK;

    return (
        <FirmaSDKContext.Provider
            value={{
                firmaSDK: currentSDK
            }}
        >
            {children}
        </FirmaSDKContext.Provider>
    );
};
