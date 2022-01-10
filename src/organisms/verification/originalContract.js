import moment from 'moment'
import React from 'react'
import Description from './description'
import LinkDescription from './linkDescription'
import { ContractInfoBox } from './styles'

export default function OriginalContract({data}) {

    const handleTimestamp = (value) => {
        return moment.unix(value).format("YYYY-MM-DD HH:mm:ss");
    }

    return (
        <ContractInfoBox>
            <LinkDescription title={"CREATOR"} hash={data.creator} />
            <Description title={"FILE HASH"} desc={data.fileHash} />
            <Description title={"META DATA"} desc={data.metaDataJsonString} />
            <LinkDescription title={"OWNER LIST"} hash={data.ownerList} />
            <Description title={"TIME STAMP"} desc={handleTimestamp(data.timeStamp)} />
        </ContractInfoBox>
    )
}
