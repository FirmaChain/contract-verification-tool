import config from 'config';
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
            hashPrefix: config.preFix,
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
