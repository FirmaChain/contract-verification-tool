import { Wallet } from '@types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FormProps {
    chainNetwork: string; // TESTNET | MAINNET
    wallet: Wallet;
    privateKey: string;
    address: string;

    balance: string;
    handleBalance: (v: string) => void;

    handleChainNetwork: (v: string) => void;
    handleWallet: (v: Wallet) => void;
    handleWalletPrivateKey: (v: string) => void;
    handleWalletAddress: (v: string) => void;

    clearStore: () => void;
}

const useWallet = create<FormProps>()(
    persist(
        immer((set) => ({
            chainNetwork: 'TESTNET',
            wallet: {
                mnemonic: '',
                privateKey: '',
                address: ''
            },
            privateKey: '',
            address: '',

            balance: '0',
            handleBalance: (v: string) =>
                set((state) => {
                    state.balance = v;
                }),
            handleChainNetwork: (v: string) =>
                set((state) => {
                    state.chainNetwork = v;
                }),
            handleWallet: (v: Wallet) =>
                set((state) => {
                    state.wallet = v;
                }),
            handleWalletPrivateKey: (v: string) =>
                set((state) => {
                    state.privateKey = v;
                }),
            handleWalletAddress: (v: string) =>
                set((state) => {
                    state.address = v;
                }),

            clearStore: () =>
                set((state) => {
                    // state.chainNetwork = '';
                    state.wallet = {
                        mnemonic: '',
                        privateKey: '',
                        address: ''
                    };
                    state.privateKey = '';
                    state.address = '';
                    state.balance = '';
                })
        })),
        {
            version: 2,
            name: 'verification-wallet',
            //? Note: 'balance' and 'chainNetwork' are intentionally not persisted.
            //? 'balance' requires refresh on each load.
            //? For external integrations, 'chainNetwork' is always fixed to mainnet to meet integration requirements.
            partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['balance', 'chainNetwork'].includes(key))),
            onRehydrateStorage: (state) => {
                if (state) state.chainNetwork = 'MAINNET';
            },
            merge: (persistedState, currentState) => {
                return { ...currentState, ...(persistedState as any), chainNetwork: 'MAINNET' };
            }
        }
    )
);

export default useWallet;
