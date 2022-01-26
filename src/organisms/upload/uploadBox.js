import React from 'react';
import { Desc, PdfImg, Title } from './styles';
import { IMG_PDF_UPLOAD } from 'constants/images';
import { UPLOAD_DESC, UPLOAD_TITLE } from 'constants/texts';
import { isDesktop } from 'react-device-detect';

export default function UploadBox() {
    return (
        <>
        <Title isDesktop={isDesktop}>{UPLOAD_TITLE}</Title>
        <Desc isDesktop={isDesktop}>{UPLOAD_DESC}</Desc>
        <PdfImg src={IMG_PDF_UPLOAD} alt={UPLOAD_DESC} />
        </>
    )
}
