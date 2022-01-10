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
`

export const LogoTitle = styled.img`
    width: 168px;
    height: 33px;
    cursor: pointer;
`

export const Container = styled.div`
    height: ${props => props.height};
    display: flex;
    justify-content: ${props =>  props.justifycontent || 'center'};
    align-items: ${props => props.alignitems || 'center'};
    padding: ${props => props.padding};
`

export const Box = styled.div`
    height: ${props => props.height};
    display: flex;
    justify-content: ${props =>  props.justifycontent || 'center'};
    align-items: ${props => props.alignitems || 'center'};
    flex-direction: ${props => props.direction || 'row'};
    gap: ${props => props.gap};
`

export const TitleText = styled.div`
    height: 63px;
    font-family: Chakra Petch;
    font-size: 46px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
`

export const DescText = styled.div`
    font-family: Lato;
    font-size: 22px;
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
