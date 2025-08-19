import { Paper } from '@mui/material';
import { IMG_BACKGROUND } from '@/constants/images';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DimProgressContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #1b1b2380;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
    z-index: 999999;
`;

export const BodyContainer = styled.div<{ isDesktop?: boolean }>`
    width: 100%;
    height: 100%;
    min-height: 100%;
    position: relative;
    background-color: #1b1b23;
    background-image: url('${IMG_BACKGROUND}');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: ${(props) => (props.isDesktop ? `initial` : `center`)};
    overflow: overlay;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LogoTitle = styled.img<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        width: 140px;
        height: 32.1px;
    `
            : `
        width: 110px;
        height: 23.5px;
    `}
    object-fit: contain;
    cursor: pointer;
`;

export const Container = styled.div<{ height?: string | number; justifycontent?: string; alignitems?: string; padding?: string | number }>`
    width: 100%;
    height: ${(props) => props.height};
    display: flex;
    justify-content: ${(props) => props.justifycontent || 'center'};
    align-items: ${(props) => props.alignitems || 'center'};
    padding: ${(props) => props.padding};
`;

export const Box = styled.div<{
    height?: string | number;
    justifycontent?: string;
    alignitems?: string;
    direction?: string;
    gap?: string | number;
}>`
    width: 100%;
    height: ${(props) => props.height};
    max-width: 1528px;
    display: flex;
    justify-content: ${(props) => props.justifycontent || 'center'};
    align-items: ${(props) => props.alignitems || 'center'};
    flex-direction: ${(props) => props.direction || 'row'};
    gap: ${(props) => props.gap};
`;

export const TitleText = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        font-size: 46px;
        height: 63px;
        line-height: normal;
    `
            : `
        word-break: keep-all;
        font-size: 25px;
        line-height: 1;
    `}
    font-family: Metropolis;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
`;

export const DescText = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        font-size: 22px;
    `
            : `
        word-break: keep-all;
        font-size: 14px;
    `}
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.24px;
    text-align: center;
    color: #9090a2;
`;

export const StyledLink = styled(Link)`
    vertical-align: middle;
    color: inherit;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
        color: inherit;
    }
`;

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 20px 0 0;
`;

export const InputTitle = styled.div`
    font-family: Lato;
    font-weight: 600;
    font-size: 18px;
    color: #dddddd;
`;

export const InputFileWrapper = styled(Paper)`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 10px 0 0;
    background-color: rgba(52, 54, 62, 0.75) !important;
    border: 1px solid #555 !important;
    box-shadow: none !important;
    cursor: pointer;
`;

export const AttatchTextFiled = styled.div`
    width: 100%;
    font-family: Lato !important;
    font-size: 14px !important;
    width: 100%;
    padding: 0 10px;
    color: rgba(255, 255, 255, 0.75) !important;
`;

export const SelectWrapper = styled.div`
    width: 100%;
    height: 50px;
    line-height: 38px;
    position: relative;
    font-size: 16px;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid #555;
    border-radius: 4px;

    & > select {
        width: 100%;
        height: 100%;
        font-family: Lato;
        font-weight: 600;
        font-size: 14px;
        color: white;
        background-color: transparent;
        border: none;
        padding: 0 10px;
    }
`;

export const TextWrapper = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    cursor: pointer;
    font-size: 1.6rem;
    padding: 10px 0 0;
`;

export const TextBox = styled.input`
    width: 100%;
    font-family: Lato;
    background: transparent;
    width: calc(100% - 20px);
    font-size: 0.8rem;
    font-weight: 400;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid rgba(52, 54, 62, 0.75);
    border-radius: 4px;
    padding: 10px;
    line-height: 20px;
    color: #ccc;
`;

export const TextAreaBox = styled.textarea`
    font-family: Lato;
    background: transparent;
    width: calc(100% - 20px);
    height: 60px;
    min-height: 60px;
    font-size: 0.8rem;
    font-weight: 400;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid rgba(52, 54, 62, 0.75);
    border-radius: 4px;
    padding: 10px;
    line-height: 20px;
    resize: vertical;
    color: #ccc;
`;

export const LoadingMessage = styled.div`
    width: auto;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid rgba(52, 54, 62, 0.75);
    border-radius: 4px;
    padding: 10px 30px;
    color: #fff;
    white-space: pre-line;
`;
