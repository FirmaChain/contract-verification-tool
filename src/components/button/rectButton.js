import React from 'react'
import { ButtonContainer } from './styles'

export default function RectButton({title, onClickEvent, small = false}) {

    const onClick = () => {
        onClickEvent && onClickEvent();
    }

    return (
        <ButtonContainer
            style={small?{width: "240px", height: "54px", fontSize: "16px"}:{}}
            onClick={() => onClick()}>
            {title}
        </ButtonContainer>
    )
}
