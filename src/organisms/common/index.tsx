import { ReactNode } from 'react';
import { isDesktop } from 'react-device-detect';
import { Box, Container, TitleText } from '@/components/styles';
import { Texts } from '@/constants/fixedString';

export default function Common({ children }: { children: ReactNode }) {
    return (
        <Container height={'100%'} alignitems={'flex-start'} padding={isDesktop ? '0' : '0 20px'} style={{ minHeight: '800px' }}>
            <Box height={'auto'} justifycontent={'flex-start'} direction={'column'} style={{ margin: '162px 0 0' }}>
                <TitleText isDesktop={isDesktop}>{Texts.MAIN_TITLE}</TitleText>
                <Box height={'100%'}>{children}</Box>
            </Box>
        </Container>
    );
}
