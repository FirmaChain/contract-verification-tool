import { Box, Container, TitleText } from 'components/styles'
import { MAIN_TITLE } from 'constants/texts'
import React from 'react'
import { isDesktop } from 'react-device-detect'

export default function Common({children}) {
    return (
        <Container
            height={"100%"}
            alignitems={"flex-start"}
            padding={isDesktop?"0":"0 20px"}
            style={{minHeight:"800px"}}>
            <Box
                height={"auto"}
                justifycontent={"flex-start"}
                direction={"column"}
                style={{margin:isDesktop?"180px 0 0":"160px 0"}}>
                <TitleText isDesktop={isDesktop}>{MAIN_TITLE}</TitleText>
                <Box
                    height={"100%"}>
                    {children}
                </Box>
            </Box>
        </Container>
    )
}
