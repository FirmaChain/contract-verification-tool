import styled from "styled-components";

export const Container = styled.div`  
    ${props => props.isDesktop?`
        width: 904px;
        margin: 50px 0 0;
        height: 460px;
    `:`    
        width: 100%;
        margin: 30px 0 0;
        padding: 35px 0;
        height: 100%;
    `}
    opacity: 0.95;
    border-radius: 8px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #24272e;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const Title = styled.div`
    ${props => props.isDesktop? `
        font-size: 24px;
    `:`
        font-size: 18px;
    `}
    font-family: Metropolis;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #b3b3b3;
    margin: 0 0 10px;
`

export const Desc = styled.div`
    ${props => props.isDesktop? `    
        font-size: 16px;
    `:`
        font-size: 14px;
    `}
    font-family: Lato;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.18px;
    text-align: center;
    color: #b3b3b3;
    margin: 0 0 30px;
`

export const ErrorDesc = styled.div`
    ${props => props.isDesktop? `    
        font-size: 26px;
    `:`
        font-size: 18px;
        word-break: keep-all;
    `}
    font-family: Lato;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffc542;
    margin: 0 0 60px;
`

export const LoadingTitle = styled.div`
    ${(props) => props.isDesktop?`
        font-size: 32px;
    `:`
        font-size: 22px;
    `}
    font-family: Metropolis;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #b3b3b3;
    margin: 0 0 33px;
`

export const Filename = styled.div`
    ${(props) => props.isDesktop?`
        font-size: 20px;
    `:`
        font-size: 16px;
    `}
    font-family: Lato;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.2px;
    text-align: left;
    color: #b3b3b3;
    margin: 0 0 8px;
`

export const Filesize = styled.div`
    ${(props) => props.isDesktop?`
        font-size: 16px;
    `:`
        font-size: 12px;
    `}
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: left;
    color: #b3b3b3;
`

export const PdfImg = styled.img`
    width: 32px;
    height: 32px;
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
    font-family: Metropolis;
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

export const HashUploadContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 24px 0 0;
`

export const TabBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TabWrapper = styled.div`
    border-radius: 50px;
    background-color: #565f6940;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => props.isDesktop?`
        width: 344px;
        height: 44px;
        > div {
            width: 172px;
            height: 44px;
            line-height: 44px;
            font-size: 18px;
        }
    `:`
        width: 200px;
        height: 30px;
        > div {
            width: 100px;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
        }
    `}
`

export const ActiveTabBackground = styled.div`
    border-radius: 50px;
    background-color: #185ff5;
    position: absolute;
    z-index: 1;

    transition: all 0.2s;
    transition-timing-function: ease-in;
`;

export const TabItem = styled.div`
    font-family: Metropolis;
    font-size: 18px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.27px;
    text-align: center;
    cursor: pointer;
    color: ${props => props.active?`#fff`:`#999`};
    z-index: 10;

    transition: all 0.2s;
    transition-timing-function: ease-in;
`

export const UploadContainer = styled.div`  
    ${props => props.isDesktop?`
        width: 904px;
        margin: 40px 0 0;
        > div {
            padding: 36px 32px 40px;
        }
    `:`    
        width: 100%;
        margin: 20px 0 30px;
        height: 100%;
        > div {
            padding: 36px 32px 40px;
        }
    `}
    opacity: 0.95;
    border-radius: 8px;
    box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
    background-color: #24272e;

    display: flex;
    align-items: flex-start;
    justify-content: center;
`

export const UploadContentBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`

export const HashInputWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #00000030;
    border-radius: 4px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const InputWrapper = styled.div`
    width: 100%;
`


export const PrefixInputBox = styled.div`
    width: 100%;
    height: auto;
    min-height: 52px;
    position: relative;
    background-color: rgba(52, 54, 62, 0.75);
    border-radius: 4px;
    color: #acacac;
    display: flex; 
    align-items: center; 
    justify-content: space-between;
`;

export const TextInput = styled.input`
    width: 100%;
    font-family: Lato;
    background: transparent;
    width: calc(100% - 20px);
    font-size: 14px;
    font-weight: 400;
    border: none;
    border-radius: 4px;
    padding: 15px 10px;
    color: #ccc;
`

export const UploadFileWrapper = styled.div`
    width: 100%;
    margin: 24px 0 0;
    padding: 58px 0;
    border-radius: 8px;
    border: solid 1px #585858;
    background-color: rgba(255, 255, 255, 0.04);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: ${props => props.enableToUpload && 'pointer'};
`

export const GeneralButton = styled.div`
    width: 100%;
    height: 54px;
    line-height: 54px;
    text-align: center;
    ${(props) =>
    props.active
        ? `color: white;
        background-color:  #316ff5;`
        : `color: #8d8d8d;
        background-color: rgba(52, 54, 62, 0.75);`}
    cursor: pointer;
    font-family: Lato;
    font-size: 18px;
    border-radius: 8px;
`;

export const TooltipWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 6px;
    margin: 14px 0 0;
`

export const IconTooltip = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
    padding: 1px 0 0;
`

export const TooltipText = styled.div`
    font-family: Lato;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.23;
    letter-spacing: -0.2px;
    text-align: left;
    white-space: pre-line;
    color: #009dff;
`

export const VerifyButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0 0;
`