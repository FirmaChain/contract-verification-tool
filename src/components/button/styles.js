import styled from "styled-components";

export const ButtonContainer = styled.div`
    width: 280px;
    height: 64px;
    border-radius: 4px;
    background-color: ${props => props.backgroundColor || '#316ff5'};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-family: Lato;
    font-size: 20px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.2px;
    text-align: left;
    color: #fff;

    &:hover {
        background-color: ${props => props.backgroundColorHover || '#316ff5'};
    }
`

export const DemoButtonContainer = styled.div`
    width: 280px;
    height: 64px;
    border-radius: 4px;
    border: solid 1px #3e72ed;
    background-color: #1e2126;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-family: Lato;
    font-size: 20px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.2px;
    text-align: left;
    color: #fff;

    &:hover {
        background-color: #3e72ed;
    }
`