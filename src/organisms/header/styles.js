import { ICON_OPEN_IN_HOVER, ICON_OPEN_IN_NEW } from "constants/images";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 196px;
    
    opacity: 0.8;
    background-color: #1b1b23;
`

export const MenuText = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: center;
    color: #b5b5be;
    cursor: pointer;

    &:hover {
        color: #fff;
        > div {
            background-image: url('${ICON_OPEN_IN_HOVER}');
        }
    }
`

export const OpenIcon = styled.div`
    width: 24px;
    height: 24px;
    background-image: url('${ICON_OPEN_IN_NEW}');
    background-size: 24px;
`