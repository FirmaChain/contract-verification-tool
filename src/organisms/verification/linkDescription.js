import { ICON_COPY } from 'constants/images'
import { EXPLORER_URL } from 'constants/texts';
import copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react'
import { isDesktop } from 'react-device-detect';
import { ContractInfoContentWrapper, ContractInfoLink, ContractInfoTitle, CopyIcon, CopyMessage, Links, LinkWrapper } from './styles'

export default function LinkDescription({title, hash, clickable = false}) {

    const hashList = Array.isArray(hash)? hash : [hash];

    const handleUrl = (value) => {
        if(clickable){
            window.open(EXPLORER_URL + "/transactions/" +value);
        }
    }

    const Copy = () => {
        const [visible, setVisible] = useState(false);

        const handleCopyHash = (value) => {
            copy(value);
            setVisible(true);
        }

        useEffect(() => {
            let timer;
            if(visible) {
                timer = setInterval(() => {
                    setVisible(false);
                    clearInterval(timer);
                }, 1000);
            }
        }, [visible]);

        return (
            <>
            <CopyIcon src={ICON_COPY} alt={hash} onClick={()=>handleCopyHash(hash)}/>
            <CopyMessage visible={visible}>Copied</CopyMessage>
            </>
        )
    }

    return (
        <ContractInfoContentWrapper>
            <ContractInfoTitle isDesktop={isDesktop}>{title}</ContractInfoTitle>
            <Links>
                {hashList.map((hash, index) => {
                    return (
                        <LinkWrapper key={index} isEmptyHash={hash === ''}>
                            <ContractInfoLink isDesktop={isDesktop} clickable={clickable} onClick={()=>handleUrl(hash)}>{hash}</ContractInfoLink>
                            <Copy />
                        </LinkWrapper>
                    )
                })}
            </Links>
        </ContractInfoContentWrapper>
    )
}
