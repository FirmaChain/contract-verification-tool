import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Demo {
    status: boolean;
    privateKey: string;
}

interface FormProps {
    demo: Demo;
    verifyStep: number;
    showVerification: boolean;

    setDemo: (v: Demo) => void;
    setVerifyStep: (v: number) => void;
    setVerification: (v: boolean) => void;
}

const useProcess = create<FormProps>()(
    immer((set) => ({
        demo: {
            status: false,
            privateKey: ''
        },
        verifyStep: 0,
        showVerification: false,

        setDemo: (v: Demo) =>
            set((state) => {
                state.demo = v;
            }),
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
