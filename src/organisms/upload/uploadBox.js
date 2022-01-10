import React from 'react';
import { Desc, PdfImg, Title } from './styles';
import { IMG_PDF_UPLOAD } from 'constants/images';
import { UPLOAD_DESC, UPLOAD_TITLE } from 'constants/texts';

export default function UploadBox() {
    return (
        <>
        <Title>{UPLOAD_TITLE}</Title>
        <Desc>{UPLOAD_DESC}</Desc>
        <PdfImg src={IMG_PDF_UPLOAD} alt={UPLOAD_DESC} />
        </>
    )
}
