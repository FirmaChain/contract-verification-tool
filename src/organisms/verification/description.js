import React from 'react'
import { ContractInfoContentWrapper, ContractInfoDesc, ContractInfoTitle } from './styles'

export default function Description({title, desc}) {
    return (
        <ContractInfoContentWrapper>
            <ContractInfoTitle>{title}</ContractInfoTitle>
            <ContractInfoDesc>{desc}</ContractInfoDesc>
        </ContractInfoContentWrapper>
    )
}
