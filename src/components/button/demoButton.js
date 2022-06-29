import React from 'react'
import { DemoButtonContainer } from './styles'

export default function DemoButton({title, small = false, onClickEvent}) {
    const onClick = async() => {
        onClickEvent && onClickEvent();
    }

    return (
        <DemoButtonContainer
            style={small?{width: "240px", height: "54px"}:{}}
            onClick={() => onClick()}>
            {title}
        </DemoButtonContainer>
    )
}
