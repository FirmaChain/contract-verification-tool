import { GeneralButton } from "organisms/modal/styles";
import React from "react";
import { isDesktop } from "react-device-detect";
import { useSelector } from "react-redux";
import { ModalActions } from "redux/actions";
import { AddressText, DescText, MenuText, Wrapper } from "./styles";

const ConnectedBar = () => {
    const {wallet} = useSelector(state => state);

    const handleWalletModal = () => {
        ModalActions.handleModalWallet(true);
    };
    return (
        <Wrapper 
            style={{width:isDesktop?"auto":"300px",
                justifyContent: "center", 
                gap: isDesktop?"10px":"3px"}}>
            {wallet.privateKey?
            <>
            <DescText>Address : </DescText>
            <AddressText style={isDesktop? {}:
                {whiteSpace:"nowrap", 
                overflow:"hidden", 
                textOverflow: "ellipsis"}} onClick={() => handleWalletModal()}>{wallet.address}</AddressText>
            </>
            :
            <MenuText onClick={() => handleWalletModal()}>LOGIN</MenuText>
            }
        </Wrapper>
    )
}

export default ConnectedBar;