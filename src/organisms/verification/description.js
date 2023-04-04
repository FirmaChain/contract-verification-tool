import React from "react";
import { isDesktop } from "react-device-detect";
import { ContractInfoContentWrapper, ContractInfoDesc, ContractInfoTitle } from "./styles";

export default function Description({ title, desc }) {
    return (
        <ContractInfoContentWrapper>
            <ContractInfoTitle>{title}</ContractInfoTitle>
            <ContractInfoDesc isDesktop={isDesktop}>{desc}</ContractInfoDesc>
        </ContractInfoContentWrapper>
    );
}
