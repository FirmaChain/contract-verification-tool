import styled from "styled-components";

export const CardContainer = styled.div`
    padding: 100px 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 70px;
`

export const CardBox = styled.div`
    width: 280px;
    height: 271px;
    border-radius: 4px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #21212f;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 36px;
    
    transition: all 0.3s ease-in-out;
    ${props => props.focused && `
        margin-top: -20px;
    `}
`

export const CardImg = styled.img`
    width: 120px;
    height: 120px;
    object-fit: contain;
`

export const CardDesc = styled.div`
    height: 25px;
    font-family: Lato;
    font-size: 21px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.21px;
    text-align: center;
    color: #ababc1;
`