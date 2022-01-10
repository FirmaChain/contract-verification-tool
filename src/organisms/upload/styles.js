import styled from "styled-components";

export const UploadContainer = styled.div`  
    width: 904px;
    height: 500px;
    opacity: 0.95;
    border-radius: 8px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #2a2a3b;
    margin: 60px 0 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: ${props => props.enableToUpload && 'pointer'};
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
    color: #ababc1;
    margin: 0 0 10px;
`

export const Desc = styled.div`
    font-family: Lato;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.18px;
    text-align: center;
    color: #ababc1;
    margin: 0 0 50px;
`

export const ErrorDesc = styled.div`
    font-family: Lato;
    font-size: 26px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffc542;
    margin: 0 0 60px;
`

export const LoadingTitle = styled.div`
    font-family: Chakra Petch;
    font-size: 32px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ababc1;
    margin: 0 0 33px;
`

export const Filename = styled.div`
    font-family: Lato;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.2px;
    text-align: left;
    color: #ababc1;
    margin: 0 0 8px;
`

export const Filesize = styled.div`
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: left;
    color: #ababc1;
`

export const PdfImg = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
`

export const ErrorImg = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin: 0 0 24px;
`

export const ProgressBox = styled.div`
    width: 160px;
    height: 160px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 33px;
`

export const Percentage = styled.div`
    width: 100px;
    font-family: Chakra Petch;
    font-size: 30px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    text-align: center;
    color: #fff;
`

export const DoneIcon = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
`