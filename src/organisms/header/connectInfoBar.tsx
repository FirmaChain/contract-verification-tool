import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { copyToClipboard } from '@/utils/common';
import {
    ChainInfo,
    ChainInfoDot,
    ChainInfoWrap,
    InfoBox,
    InfoContainer,
    NetworkBox,
    NetworkContainer,
    NetworkItem,
    WalletAddress
} from './styles';
import { isDesktop } from 'react-device-detect';
import useWallet from '@/store/useWallet';
import useFirmaUtil from '@/hook/useFirmaUtils';
import { Types } from '@/constants/fixedString';

const ConnectInfoBar = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { setChainConfig, getChainIDList, getCurrentNetworkID } = useFirmaUtil();

    const { chainNetwork, wallet } = useWallet();

    const chainIdList = getChainIDList();

    const address = wallet.address;
    const chainId = getCurrentNetworkID();

    const handleChangeNetwork = (index: number) => {
        let network = index === 0 ? Types.MAIN_NET : Types.TEST_NET;
        if (chainNetwork === network) return;

        setChainConfig(network);
    };

    const onCopyData = useCallback(() => {
        copyToClipboard(address);

        enqueueSnackbar('Coppied address', {
            variant: 'success',
            autoHideDuration: 3000
        });
    }, [address, enqueueSnackbar]);

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
                                    <NetworkItem key={index} onClick={() => handleChangeNetwork(index)}>
                                        {value}
                                    </NetworkItem>
                                );
                            })}
                        </NetworkBox>
                    </NetworkContainer>
                </ChainInfoWrap>
            </InfoBox>
        </InfoContainer>
    );
};

export default ConnectInfoBar;
