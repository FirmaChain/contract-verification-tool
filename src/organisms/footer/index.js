import { Container } from 'components/styles'
import React from 'react'
import { isDesktop } from 'react-device-detect'
import { Box, Contact, Text } from './styles'

export default function Footer() {
    return (
        <Container
            height={"50px"}
            style={{width: "100%", position: "fixed", bottom: 0}}>
            <Box isDesktop={isDesktop}>
                <Text>Copyrightⓒ 2022 FirmaChain Pte. Ltd.</Text>
                <Contact href="mailto:contact@firmachain.org">contact@firmachain.org</Contact>
            </Box>
        </Container>
    )
}
