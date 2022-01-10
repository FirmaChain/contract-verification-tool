import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
`

export const Box = styled.div`
    width: 904px;
    opacity: 0.95;
    padding: 60px 60px 70px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 8px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #2a2a3b;
    margin: 60px 0 0;
`

export const ResultImg = styled.img`
    width: 140px;
    height: 140px;
    object-fit: contain;

    margin-bottom: 30px;
`

export const Title = styled.div`
    font-family: Chakra Petch;
    font-size: 32px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
`

export const FIleInfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
`

export const FileInfoText = styled.div`
    font-family: Lato;
    font-size: ${props => props.fontsize};
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.2px;
    text-align: left;
    color: #ababc1;
`

export const ContractInfoBox = styled.div`
    width: 787px;
    height: auto;
    padding: 40px;
    border-radius: 8px;
    background-color: #1b1b23;
    margin-top: 50px;
    overflow: overlay;
    
    display: flex;
    flex-direction: column;
    gap: 4px;
`

export const ContractInfoContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
`

export const ContractInfoTitle = styled.div`
    width: 100px;
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.25;
    letter-spacing: -0.16px;
    text-align: left;
    color: #b5b5be;
`

export const ContractInfoDesc = styled.div`
    flex: 1;
    width: 100%;
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.25;
    letter-spacing: -0.16px;
    text-align: left;
    color: #fff;
    word-break: break-all;
`

export const Links = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex: 1;
`

export const LinkWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    position: relative;
`

export const ContractInfoLink = styled(ContractInfoDesc)`
    color: #24c4ff;
    cursor: pointer;
    float: left;
`

export const CopyIcon = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
    cursor: pointer;
    float: left;
    margin: 0 4px;
`

export const CopyMessage = styled.div`
    width: 68px;
    height: 28px;
    display: ${props => props.visible? `flex`:`none`};
    align-items: center;
    justify-content: center;
    background-color: #7447ED;
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
`

export const FileHashBox = styled.div`
    height: 35px;
    padding: 0 20px;
    border-radius: 4px;
    background-color: #21212f;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 20px;
`

export const FileHash = styled.div`
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.16px;
    text-align: left;
    color: #7c7c8e;
`