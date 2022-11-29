import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FirmaUtil } from "@firmachain/firma-js";
import { useSnackbar } from "notistack";
import { getBalance, getChainConfig } from "utils/firma";
import { TextValue, TextBox, BalanceNotice, TextValueBox, TitleValue } from "./styles";
import { ErrorOutlineOutlined } from "@mui/icons-material";

const BalanceInfo = ({refresh, handleRefreshBalance}) => {
    const { enqueueSnackbar } = useSnackbar();

    const { wallet } = useSelector(state => state.wallet);

    const [defaultFee, setDefaultFee] = useState('0');
    const [balance, setBalance] = useState(0);

    const handleDefaultFee = useCallback(() => {
        let config = getChainConfig();
        let fee = FirmaUtil.getFCTStringFromUFCT(config.defaultFee)
        setDefaultFee(fee);
    }, [])

    const handleWalletInfo = useCallback(async() => {
        try {
            let _address = wallet.address;
            let _balance = await getBalance(_address);
            
            setBalance(_balance);
            handleRefreshBalance(false);
        } catch (error) {
            console.log(error);
            handleRefreshBalance(false);
            enqueueSnackbar(String(error), {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [wallet, enqueueSnackbar])

    useEffect(() => {
        if(refresh) {
            handleDefaultFee();
            handleWalletInfo();
        }
    }, [handleWalletInfo, handleDefaultFee, refresh])

    return (
        <TextBox>
            <TitleValue>Balance</TitleValue>
            <TextValueBox>
                <TextValue>{`${balance} FCT`}</TextValue>
            </TextValueBox>
            <BalanceNotice>
                <ErrorOutlineOutlined sx={{width: '16px', height: '16px'}}/>
                {`A minimum fee of ${defaultFee} FCT will be incurred.`}
            </BalanceNotice>
        </TextBox>
    )
}

export default BalanceInfo;