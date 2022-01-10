import React from 'react';
import { Box, DescText, StyledLink } from 'components/styles';
import Cards from './cards';
import RectButton from 'components/button/rectButton';
import { MAIN_DESC } from 'constants/texts';

export default function Main() {
    return (
        <Box
            direction={"column"}>
            <DescText style={{padding: "16px 0 0"}}>{MAIN_DESC}</DescText>
            <Cards />
            <StyledLink to="/upload">
                <RectButton title="VERIFICATION"/>
            </StyledLink>
        </Box>
    )
}
