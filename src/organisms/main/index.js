import React, { useEffect } from 'react';
import { Box, DescText, StyledLink } from 'components/styles';
import { FilesActions, ProcessActions } from 'redux/actions';
import { MAIN_DESC } from 'constants/texts';
import { isDesktop } from 'react-device-detect';
import { ButtonBox } from './styles';
import RectButton from 'components/button/rectButton';
import DemoButton from 'components/button/demoButton';
import Cards from './cards';
import PDF from 'constants/sample_contract.pdf';
import { useNavigate } from 'react-router';

export default function Main() {
    const navigate = useNavigate();
    
    useEffect(() => {
        ProcessActions.setDemo(false);
    }, []);

    const handleDemo = async() => {
        const response = await fetch(PDF);
        const data = await response.blob();
        const meta = {
            type: "application/pdf"
        }
        const file = new File([data], "sample_contract.pdf", meta);
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function() {
            const buffer = new Uint8Array(reader.result);

            const result = {
                name: file.name,
                size: file.size,
                buffer : buffer,
            }
            FilesActions.setFile(result);
            ProcessActions.setDemo(true);
            ProcessActions.setVerifyStep(1);
            navigate('/upload');
        }
    }
    
    return (
        <Box
            direction={"column"}>
            <DescText isDesktop={isDesktop} style={{padding: "16px 0 0"}}>{MAIN_DESC}</DescText>
            <Cards />
            <ButtonBox isDesktop={isDesktop}>
                <DemoButton title="DEMO" onClickEvent={handleDemo}/>
                <StyledLink to="/upload">
                    <RectButton title="VERIFICATION"/>
                </StyledLink>
            </ButtonBox>
        </Box>
    )
}
