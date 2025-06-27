import { useEffect, useMemo, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { ContractInfoBox, ContractInfoContainer } from './styles';
import axios from 'axios';
import Description from './description';
import LinkDescription from './linkDescription';
import { format, fromUnixTime } from 'date-fns';
import { config } from 'constants/common';

export default function OriginalContract({ data }: any) {
    const [transactionHash, setTransactionHash] = useState('');

    const handleTimestamp = (value: number) => {
        return format(fromUnixTime(value), 'yyyy-MM-dd HH:mm:ss');
    };

    const fileHash = useMemo(() => {
        if (data?.fileHash === undefined) return '';
        return data.fileHash;
    }, [data]);

    const contractHash = useMemo(() => {
        if (data?.metaDataJsonString === undefined) return '';
        let json = JSON.parse(data.metaDataJsonString);
        let hash = json.contractHash;
        return hash;
    }, [data]);

    useEffect(() => {
        if (fileHash !== '' && contractHash !== '') {
            axios
                .get(config.chainServer + '/getTxHash', {
                    params: {
                        contractHash: contractHash,
                        fileHash: fileHash
                    }
                })
                .then((response) => {
                    if (response.data.code === 1) {
                        let result = response.data.payload;
                        if (result.length > 0) {
                            setTransactionHash(result[0]);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [fileHash, contractHash]);

    return (
        <ContractInfoContainer>
            <ContractInfoBox isDesktop={isDesktop}>
                <LinkDescription title={'CREATOR'} hash={data.creator} />
                {transactionHash !== '' && <LinkDescription title={'TX HASH'} hash={transactionHash} clickable={true} />}
                <Description title={'FILE HASH'} desc={fileHash} />
                <Description title={'META DATA'} desc={data.metaDataJsonString} isMetadata />
                <LinkDescription title={'OWNER LIST'} hash={data.ownerList} />
                <Description title={'TIME STAMP'} desc={handleTimestamp(data.timeStamp)} />
            </ContractInfoBox>
        </ContractInfoContainer>
    );
}
