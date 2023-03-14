import React, { useMemo } from "react";
import { ICON_LOGIN, ICON_SETTING } from "constants/images";
import { isDesktop } from "react-device-detect";
import { useSelector } from "react-redux";
import { FilesActions, ModalActions } from "redux/actions";
import { CONNECTED_WALLET, MAIN_NET } from "redux/types";
import { MenuText, Icon, Wrapper } from "./styles";
import { Fragment } from "react";

const ConnectWallet = () => {
    const { wallet, chainNetwork } = useSelector(state => state.wallet);

    const WalletExist = useMemo(() => {
        if(wallet === undefined) return false;
        return wallet.address !== "";
    }, [wallet])

    const handleWalletConnectModal = () => {
        if(chainNetwork === MAIN_NET) return;
        FilesActions.setMetaJson(null);
        ModalActions.handleModalWalletConnect(true);
    };

    const handleWalletModal = () => {
        if(chainNetwork === MAIN_NET) return;
        ModalActions.handleModalWallet({
            isVisible: true,
            type: CONNECTED_WALLET
        })
    };

    return (
        <Wrapper 
            style={{width:isDesktop?"auto":"300px",
                opacity: chainNetwork === MAIN_NET? 0 : 1,
                cursor: chainNetwork === MAIN_NET? 'default' : 'pointer',
                zIndex: chainNetwork === MAIN_NET? -999 : 0,
                justifyContent: "center", 
                gap: isDesktop?"2px":"3px"}}>
            {WalletExist?
            <MenuText onClick={() => handleWalletModal()}>
                {isDesktop? 
                <Icon src={ICON_SETTING} alt={'Wallet'} />
                :
                <MenuText onClick={() => handleWalletModal()}>WALLET</MenuText>
                }
            </MenuText>
            :
            <Fragment>
                <MenuText onClick={() => handleWalletConnectModal()}>LOGIN</MenuText>
                <Icon src={ICON_LOGIN} alt={'LOGIN'} />
            </Fragment>
            }
        </Wrapper>
    )
}

export default ConnectWallet;