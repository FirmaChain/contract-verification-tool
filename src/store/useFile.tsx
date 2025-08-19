import { ContractFileType } from '@firmachain/firma-js';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FileError {
    error: boolean;
    fileHash: string;
}

interface File extends Partial<ContractFileType & FileError> {
    name: string;
    size: number;
}

interface FormProps {
    file: null | File;
    fileHash: string;
    originalContract: boolean;
    metaJson: any;

    handleFile: (v: null | File) => void;
    handleFileHash: (v: string) => void;
    handleOriginalContract: (v: boolean) => void;
    handleMetaJson: (v: null | any) => void;
}

const useFile = create<FormProps>()(
    immer((set) => ({
        file: null,
        fileHash: '',
        originalContract: false,
        metaJson: null,

        handleFile: (v: null | any) =>
            set((state) => {
                state.file = v;
            }),
        handleFileHash: (v: string) =>
            set((state) => {
                state.fileHash = v;
            }),
        handleOriginalContract: (v: boolean) =>
            set((state) => {
                state.originalContract = v;
            }),
        handleMetaJson: (v: null | any) =>
            set((state) => {
                state.metaJson = v;
            })
    }))
);

export default useFile;
