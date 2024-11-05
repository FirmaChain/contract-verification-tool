import { isDesktop } from 'react-device-detect';
import { ContractInfoContentWrapper, ContractInfoDesc, ContractInfoTitle } from './styles';
import JsonViewer from 'components/jsonViewer/jsonViewer';
import { useMemo } from 'react';

export default function Description({ title, desc, isMetadata }: { title: string; desc: string; isMetadata?: boolean }) {
    const parsedMetadata = useMemo(() => {
        if (isMetadata) {
            try {
                return JSON.parse(desc);
            } catch (error) {
                return desc;
            }
        } else {
            return desc;
        }
    }, [desc, isMetadata]);

    return (
        <ContractInfoContentWrapper>
            <ContractInfoTitle isDesktop={isDesktop}>{title}</ContractInfoTitle>
            {isMetadata && typeof parsedMetadata === 'object' ? (
                <JsonViewer data={parsedMetadata} />
            ) : (
                <ContractInfoDesc isDesktop={isDesktop}>{desc}</ContractInfoDesc>
            )}
        </ContractInfoContentWrapper>
    );
}
