import styled from 'styled-components';

export const Container = styled.div<{ isDesktop?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${(props) =>
        props.isDesktop
            ? `
        gap: 20px;
        > div:nth-child(1) {
            width: 904px;
            padding: 60px 60px 70px;
            margin: 60px 0 0;
        }
    `
            : `
        max-width: 300px;
        gap: 30px;
        > div:nth-child(1) {
            width: 100%;
            padding: 20px;
            margin: 30px 0 0;
        }
    `}
`;

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

export const ResultBox = styled.div`
    opacity: 0.95;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 8px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #24272e;
`;

export const ResultImg = styled.img<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        width: 120px;
        height: 120px;
        margin-bottom: 10px;
    `
            : `
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
    `}
    object-fit: contain;
`;

export const Title = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        font-size: 32px;
        margin-bottom: 20px;
    `
            : `
        font-size: 22px;
        margin-bottom: 10px;
    `}
    font-family: Metropolis;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
`;

export const NotVerifiedText = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        font-size: 16px;
        margin-bottom: 20px;
    `
            : `
        font-size: 12px;
        margin-bottom: 10px;
    `}
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.16px;
    text-align: center;
    color: #ffc542;
    margin-top: -4px;
`;

export const FIleInfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
`;

export const FileInfoText = styled.div<{ fontsize?: string | number }>`
    font-family: Lato;
    font-size: ${(props) => props.fontsize};
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.2px;
    text-align: left;
    color: #ababc1;
`;

export const ContractInfoContainer = styled.div`
    width: 100%;
`;

export const ContractInfoBox = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        width: 787px;
        padding: 40px;
        margin-top: 50px;
    `
            : `
        padding: 10px;
        margin-top: 25px;

        > div {
            flex-direction: column;
            padding-bottom: 10px;
            gap: 0px;
        }
    `}
    height: auto;
    border-radius: 8px;
    background-color: #1b1b23;
    overflow: overlay;

    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ContractInfoContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
`;

export const ContractInfoTitle = styled.div<{ isDesktop?: boolean }>`
    width: 100px;
    min-width: 100px;
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.25;
    letter-spacing: -0.16px;
    text-align: left;
    color: #b5b5be;

    ${(props) =>
        props.isDesktop
            ? `
        font-size: 16px;
    `
            : `
        font-size: 12px;
    `}
`;

export const ContractInfoDesc = styled.div<{ isDesktop?: boolean }>`
    flex: 1;
    width: 100%;
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: left;
    color: #fff;
    word-break: break-all;

    ${(props) =>
        props.isDesktop
            ? `
        font-size: 16px;
        line-height: 2.25;
    `
            : `
        font-size: 12px;
        line-height: 1.2;
    `}
`;

export const Links = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex: 1;
`;

export const LinkWrapper = styled.div<{ isEmptyHash?: boolean }>`
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    position: relative;

    ${(props) =>
        props.isEmptyHash
            ? `
        display: none;
    `
            : `
        display: flex;
    `}
`;

export const ContractInfoLink = styled(ContractInfoDesc)<{ clickable?: boolean }>`
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    float: left;

    ${(props) =>
        props.clickable
            ? `
        color: #24c4ff;
        cursor: pointer;
    `
            : `
        color: #fff;
    `}
    ${(props) =>
        props.isDesktop
            ? `
        font-size: 16px;
        line-height: 2.25;
    `
            : `
        font-size: 12px;
        line-height: 1.2;
    `}
`;

export const CopyIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
    cursor: pointer;
    margin: 0 4px;
`;

export const CopyMessage = styled.div<{ visible?: boolean }>`
    width: 68px;
    height: 28px;
    display: ${(props) => (props.visible ? `flex` : `none`)};
    align-items: center;
    justify-content: center;
    background-color: #7447ed;
    border-radius: 4px;

    font-family: Lato;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: -0.48px;
    text-align: left;
    color: #fff;

    position: absolute;
    top: -30px;
    right: -20px;
`;

export const FileHashBox = styled.div<{ isDesktop?: boolean }>`
    ${(props) =>
        props.isDesktop
            ? `
        > div {
            font-size: 16px;
        }
    `
            : `
        > div {
            font-size: 12px;
        }
    `}
    height: 35px;
    padding: 0 20px;
    border-radius: 4px;
    background-color: #21212f;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 20px;
`;

export const FileHash = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.16px;
    text-align: left;
    color: #7c7c8e;
`;
