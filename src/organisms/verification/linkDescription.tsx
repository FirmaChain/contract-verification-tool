import { ICON_COPY } from 'constants/images';
import { useEffect, useMemo, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { ContractInfoContentWrapper, ContractInfoLink, ContractInfoTitle, CopyIcon, CopyMessage, Links, LinkWrapper } from './styles';
import useWallet from 'store/useWallet';
import config from '../../config';
import { copyToClipboard } from 'utils/common';

interface LinkDescription_ {
    title: string;
    hash: string;
    clickable?: boolean;
}

export default function LinkDescription({ title, hash, clickable = false }: LinkDescription_) {
    const hashList = Array.isArray(hash) ? hash : [hash];

    const { chainNetwork } = useWallet();

    const explorerUrl = useMemo(() => {
        if (chainNetwork === 'TESTNET') return config.explorerUrl['TESTNET'];
        else return config.explorerUrl['MAINNET'];
    }, [chainNetwork]);

    const handleUrl = (value: string) => {
        if (clickable) {
            window.open(explorerUrl + '/transactions/' + value);
        }
    };

    const Copy = ({ value }: { value: string }) => {
        const [visible, setVisible] = useState(false);

        const handleCopyHash = (value: string) => {
            copyToClipboard(value);
            // copy(value);
            setVisible(true);
        };

        useEffect(() => {
            let timer: NodeJS.Timeout;
            if (visible) {
                timer = setInterval(() => {
                    setVisible(false);
                    clearInterval(timer);
                }, 1000);
            }
        }, [visible]);

        return (
            <>
                <CopyIcon src={ICON_COPY} alt={hash} onClick={() => handleCopyHash(value)} />
                <CopyMessage visible={visible}>Copied</CopyMessage>
            </>
        );
    };

    return (
        <ContractInfoContentWrapper>
            <ContractInfoTitle isDesktop={isDesktop}>{title}</ContractInfoTitle>
            <Links>
                {hashList.map((hash, index) => {
                    return (
                        <LinkWrapper key={index} isEmptyHash={hash === ''}>
                            <ContractInfoLink
                                // className="clamp-single-line"
                                isDesktop={isDesktop}
                                clickable={clickable}
                                onClick={() => handleUrl(hash)}
                            >
                                {hash}
                            </ContractInfoLink>
                            <Copy value={hash} />
                        </LinkWrapper>
                    );
                })}
            </Links>
        </ContractInfoContentWrapper>
    );
}
