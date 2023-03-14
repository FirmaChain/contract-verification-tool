import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { copyToClipboard } from "utils/common";
import { getChainConfig, setChainConfig } from "utils/firma";
import { ChainInfo, ChainInfoDot, ChainInfoWrap, InfoBox, InfoContainer, NetworkBox, NetworkContainer, NetworkItem, WalletAddress } from "./styles";
import { isDesktop } from "react-device-detect";
import { FirmaConfig } from "@firmachain/firma-js";
import { MAIN_NET, TEST_NET } from "redux/types";

const ConnectInfoBar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { chainNetwork, wallet } = useSelector(state => state.wallet);

    const chainIdList = [
        FirmaConfig.MainNetConfig.chainID.toUpperCase(),
        FirmaConfig.TestNetConfig.chainID.toUpperCase()
    ]
    const [address, setAddress] = useState('');
    const [chainId, setChainId] = useState('');

    const handleWalletAddress = useCallback(() => {
        if(wallet === undefined) {
            setAddress('');
        } else {
            setAddress(wallet.address);
        }
    }, [wallet]);

    const handleChainId = useCallback(() => {
        let config = getChainConfig();
        setChainId(config.chainID);
    }, [chainNetwork]);

    const handleChangeNetwork = (index) => {
        let network = index === 0? MAIN_NET : TEST_NET;
        if(chainNetwork === network) return;
        setChainConfig(network);
    };

    const onCopyData = useCallback(() => {
        copyToClipboard(address);

        enqueueSnackbar('Coppied address', {
            variant: 'success',
            autoHideDuration: 3000,
        });
    }, [address, enqueueSnackbar]);

    useEffect(() => {
        handleWalletAddress();
    }, [wallet, handleWalletAddress])

    useEffect(() => {
        handleChainId();
    }, [chainNetwork])

    return (
        <InfoContainer isDesktop={isDesktop}>
            <InfoBox>
                {isDesktop && <WalletAddress onClick={onCopyData}>{address}</WalletAddress>}
                <ChainInfoWrap isDesktop={isDesktop}>
                    <ChainInfoDot />
                    <ChainInfo>{chainId.toUpperCase()}</ChainInfo>
                    <NetworkContainer>
                        <NetworkBox>
                            {chainIdList.map((value, index) => {
                                return (
                                    <NetworkItem key={index} onClick={() => handleChangeNetwork(index)}>{value}</NetworkItem>
                                )
                            })}
                        </NetworkBox>
                    </NetworkContainer>
                </ChainInfoWrap>
            </InfoBox>
        </InfoContainer>
    )
}

export default ConnectInfoBar;