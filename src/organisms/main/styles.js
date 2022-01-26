import styled from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.isDesktop?`
        flex-direction: row;
        gap: 70px;
        padding: 100px 0 80px;
        
        > div {
            width: 280px;
            height: 271px;
            gap: 36px;
            > img {
                width: 120px;
                height: 120px;
            }
            > div {
                font-size: 21px;
            }
        }
    `:`
        flex-direction: column;
        gap: 20px;
        padding: 30px 0 50px;

        > div {
            flex-direction: row;
            justify-content: space-evenly;
            padding: 20px;
            width: 200px;
            gap: 10px;
            > img {
                flex: 2,
                width: 50px;
                height: 50px;
            }
            > div {
                width: 100px;
                font-size: 16px;
                text-align: left;
            }
        }
    `}
`

export const CardBox = styled.div`
    border-radius: 4px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #21212f;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    transition: all 0.3s ease-in-out;
    ${props => props.focused && `
        margin-top: -20px;
    `}
`

export const CardImg = styled.img`
    object-fit: contain;
`

export const CardDesc = styled.div`
    height: 25px;
    font-family: Lato;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.21px;
    text-align: center;
    color: #ababc1;
`