import styled from 'styled-components';

export const ButtonBox = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        flex-direction: row;
    `
            : `
        flex-direction: column;
    `}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const CardContainer = styled.div<{ isDesktop?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) =>
        props.isDesktop
            ? `
        flex-direction: row;
        gap: 64px;
        padding: 90px 0;
        
        > div {
            width: 280px;
            height: 271px;
            gap: 32px;
            > img {
                width: 120px;
                height: 120px;
            }
            > div {
                font-size: 20px;
            }
        }
    `
            : `
        flex-direction: column;
        gap: 10px;
        padding: 20px 0 50px;

        > div {
            flex-direction: row;
            justify-content: space-evenly;
            padding: 10px 20px 10px;
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
`;

export const CardBox = styled.div<{ focused?: boolean }>`
    border-radius: 4px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #1e2126;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    transition: all 0.3s ease-in-out;
    ${(props) =>
        props.focused &&
        `
        margin-top: -20px;
    `}
`;

export const CardImg = styled.img`
    object-fit: contain;
`;

export const CardDesc = styled.div`
    font-family: Lato;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.21px;
    white-space: pre-line;
    text-align: center;
    color: #b3b3b3;
`;
