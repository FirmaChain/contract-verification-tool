import { useCallback, useEffect, useState } from 'react';
import { FirmaUtil } from '@firmachain/firma-js';
import { useSnackbar } from 'notistack';
import { TextValue, TextBox, BalanceNotice, TextValueBox, TitleValue } from './styles';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import useWallet from 'store/useWallet';
import useFirmaUtil from 'hook/useFirmaUtils';

interface BalanceInfo_ {
    refresh: boolean;
    handleRefreshBalance: (v: boolean) => void;
}

const BalanceInfo = ({ refresh, handleRefreshBalance }: BalanceInfo_) => {
    const { enqueueSnackbar } = useSnackbar();
    const { getBalance, getDefaultFee_uFCT } = useFirmaUtil();

    const { wallet, balance, handleBalance } = useWallet();

    const [defaultFee, setDefaultFee] = useState('0');

    const handleDefaultFee = useCallback(() => {
        let feeInUFCT = getDefaultFee_uFCT();
        let fee = FirmaUtil.getFCTStringFromUFCT(feeInUFCT);
        setDefaultFee(fee);
    }, []);

    const handleWalletInfo = useCallback(async () => {
        if (wallet.address) {
            try {
                let _address = wallet.address;
                let _balance = await getBalance(_address);

                handleBalance(_balance);
                handleRefreshBalance(false);
            } catch (error) {
                console.log(error);
                handleRefreshBalance(false);
                enqueueSnackbar(String(error), {
                    variant: 'error',
                    autoHideDuration: 3000
                });
            }
        }
    }, [wallet, enqueueSnackbar]);

    useEffect(() => {
        if (refresh) {
            handleDefaultFee();
            handleWalletInfo();
        }
    }, [handleWalletInfo, handleDefaultFee, refresh]);

    return (
        <TextBox>
            <TitleValue>Balance</TitleValue>
            <TextValueBox>
                <TextValue>{`${balance} FCT`}</TextValue>
            </TextValueBox>
            <BalanceNotice>
                <ErrorOutlineOutlined sx={{ width: '16px', height: '16px' }} />
                {`A minimum fee of ${defaultFee} FCT will be incurred.`}
            </BalanceNotice>
        </TextBox>
    );
};

export default BalanceInfo;
