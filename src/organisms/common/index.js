import { Box, Container, TitleText } from 'components/styles'
import { MAIN_TITLE } from 'constants/texts'
import React from 'react'

export default function Common({children}) {
    return (
        <Container
            height={"100%"}
            alignitems={"flex-start"}
            padding={"184px 0 0"}>
            <Box
                direction={"column"}>
                <TitleText>{MAIN_TITLE}</TitleText>
                {children}
            </Box>
        </Container>
    )
}
