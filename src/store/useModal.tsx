import { Types } from 'constants/fixedString';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LoadingProgress {
    loading: boolean;
    message: string;
}

interface WalletConnect {
    isVisible: boolean;
    type: string;
}

interface FormProps {
    loadingProgress: LoadingProgress;
    data: any;
    walletConnect: boolean;
    wallet: WalletConnect;
    queueTx: boolean;
    editHashKey: boolean;
    switchNetwork: boolean;

    handleModalLoadingProgress: (v: LoadingProgress) => void;
    handleModalLoadingData: (v: any) => void;
    handleModalWalletConnect: (v: boolean) => void;
    handleModalWallet: (v: WalletConnect) => void;
    handleModalQueueTx: (v: boolean) => void;
    handleModalEditHashKey: (v: boolean) => void;
    handleModalSwitchNetwork: (v: boolean) => void;
}

const useModal = create<FormProps>()(
    immer((set) => ({
        loadingProgress: {
            loading: false,
            message: ''
        },
        data: {},
        walletConnect: false,
        wallet: {
            isVisible: false,
            type: Types.NEW_WALLET
        },
        queueTx: false,
        editHashKey: false,

        switchNetwork: false,

        handleModalLoadingProgress: (v: LoadingProgress) =>
            set((state) => {
                state.loadingProgress = v;
            }),
        handleModalLoadingData: (v: any) =>
            set((state) => {
                state.data = v;
            }),
        handleModalWalletConnect: (v: boolean) =>
            set((state) => {
                state.walletConnect = v;
            }),
        handleModalWallet: (v: WalletConnect) =>
            set((state) => {
                state.wallet = v;
            }),
        handleModalQueueTx: (v: boolean) =>
            set((state) => {
                state.queueTx = v;
            }),
        handleModalEditHashKey: (v: boolean) =>
            set((state) => {
                state.editHashKey = v;
            }),
        handleModalSwitchNetwork: (v: boolean) =>
            set((state) => {
                state.switchNetwork = v;
            })
    }))
);

export default useModal;
