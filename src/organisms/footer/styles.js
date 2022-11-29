import styled from "styled-components";

export const Box = styled.div`
    padding: 0 20px;
    ${props => props.isDesktop?`
    `:`
        > div,a {
            font-size: 11px;
        }
    `}
    width: 100%;
    height: 100%;
    max-width: 1528px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Text = styled.div`
    font-family: Lato;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #7c7c8e;
`

export const Contact = styled.a`
    font-family: Lato;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    text-decoration: none;
    color: #7c7c8e;
`