import { config } from '@/constants/common';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface FormProps {
    hashPrefix: string;
    handleHashPrefix: (v: string) => void;
}

const usePreference = create<FormProps>()(
    persist(
        immer((set) => ({
            hashPrefix: config.prefixDefault,
            handleHashPrefix: (v: string) =>
                set((state) => {
                    state.hashPrefix = v;
                })
        })),
        {
            name: 'verification-preferences'
        }
    )
);

export default usePreference;
