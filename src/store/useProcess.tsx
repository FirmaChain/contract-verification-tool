import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FormProps {
    verifyStep: number;
    showVerification: boolean;

    setVerifyStep: (v: number) => void;
    setVerification: (v: boolean) => void;
}

const useProcess = create<FormProps>()(
    immer((set) => ({
        verifyStep: 0,
        showVerification: false,

        setVerifyStep: (v: number) =>
            set((state) => {
                state.verifyStep = v;
            }),
        setVerification: (v: boolean) =>
            set((state) => {
                state.showVerification = v;
            })
    }))
);

export default useProcess;
