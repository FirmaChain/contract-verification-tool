import styled from "styled-components";

export const ButtonContainer = styled.div`
    width: 280px;
    height: 64px;
    border-radius: 8px;
    background-color: #5331c7;
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
        background-color: #6b43f2;
    }
`