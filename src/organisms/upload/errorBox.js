import React from 'react'
import RectButton from 'components/button/rectButton'
import { ICON_ERROR_YELLOW } from 'constants/images'
import { ErrorDesc, ErrorImg } from './styles'
import { ProcessActions } from 'redux/actions'
import { isDesktop } from 'react-device-detect'

export default function ErrorBox({desc}) {

    const handleVerifyStep = () => {
        ProcessActions.setVerifyStep(0);
    }

    return (
        <>
        <ErrorImg src={ICON_ERROR_YELLOW} alt={desc} />
        <ErrorDesc isDesktop={isDesktop}>{desc}</ErrorDesc>
        <RectButton small title="RETRY" onClickEvent={() => handleVerifyStep()}/>
        </>
    )
}
