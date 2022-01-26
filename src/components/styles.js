import { IMG_BACKGROUND } from "constants/images";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100%;
    position: relative;
    background-color: #1b1b23;
    background-image: url('${IMG_BACKGROUND}');
    background-size: 100%;
    overflow: overlay;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LogoTitle = styled.img`
    width: 168px;
    height: 33px;
    cursor: pointer;
`

export const Container = styled.div`
    width: 100%;
    height: ${props => props.height};
    display: flex;
    justify-content: ${props =>  props.justifycontent || 'center'};
    align-items: ${props => props.alignitems || 'center'};
    padding: ${props => props.padding};
`

export const Box = styled.div`
    width: 100%;
    height: ${props => props.height};
    display: flex;
    justify-content: ${props =>  props.justifycontent || 'center'};
    align-items: ${props => props.alignitems || 'center'};
    flex-direction: ${props => props.direction || 'row'};
    gap: ${props => props.gap};
`

export const TitleText = styled.div`
    ${props => props.isDesktop? `
        font-size: 46px;
        height: 63px;
        line-height: normal;
    ` : `
        word-break: keep-all;
        font-size: 30px;
        line-height: 1;
    `}
    font-family: Chakra Petch;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
`

export const DescText = styled.div`
    ${props => props.isDesktop? `
        font-size: 22px;
    `:`
        word-break: keep-all;
        font-size: 16px;
    `}
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.24px;
    text-align: center;
    color: #9090a2;
`

export const StyledLink = styled(Link)`
    vertical-align: middle;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`
