import { Box, Container, TitleText } from 'components/styles'
import { MAIN_TITLE } from 'constants/texts'
import React from 'react'
import { isDesktop } from 'react-device-detect'

export default function Common({children}) {
    return (
        <Container
            height={"100%"}
            alignitems={"flex-start"}
            padding={isDesktop?"0":"0 20px 0"}>
            <Box
                height={"100%"}
                justifycontent={"flex-start"}
                direction={"column"}>
                <TitleText isDesktop={isDesktop}>{MAIN_TITLE}</TitleText>
                <Box
                    height={isDesktop?"560px":"430px"}>
                    {children}
                </Box>
            </Box>
        </Container>
    )
}
