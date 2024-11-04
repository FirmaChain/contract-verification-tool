import { isDesktop } from 'react-device-detect';
import { ContractInfoContentWrapper, ContractInfoDesc, ContractInfoTitle } from './styles';

export default function Description({ title, desc }: { title: string; desc: string }) {
    return (
        <ContractInfoContentWrapper>
            <ContractInfoTitle isDesktop={isDesktop}>{title}</ContractInfoTitle>
            <ContractInfoDesc isDesktop={isDesktop}>{desc}</ContractInfoDesc>
        </ContractInfoContentWrapper>
    );
}
