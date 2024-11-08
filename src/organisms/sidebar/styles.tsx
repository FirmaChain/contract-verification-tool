import styled from 'styled-components';
import FileCopyIcon from '@mui/icons-material/FileCopy';

export const SidebarContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const TopContent = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const BottomContent = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const InputWrap = styled.div`
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const InputWrapRight = styled.div`
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Input = styled.div``;

export const Label = styled.div`
    font-family: Lato;
    font-weight: 600;
    font-size: 18px;
    color: #dddddd;
    margin: 20px 0 10px;
    display: flex;
    gap: 10px;
`;

export const GeneralButton = styled.div<{ active?: boolean }>`
    width: 100%;
    height: 54px;
    line-height: 54px;
    text-align: center;
    ${(props) =>
        props.active
            ? `color: white;
        background-color:  #3252d3;`
            : `color: #8d8d8d;
        background-color: rgba(52, 54, 62, 0.75);`}
    cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
    font-family: Lato;
    font-size: 18px;
    border-radius: 8px;
`;

export const SmallButton = styled.div`
    padding: 3px 6px;
    line-height: 15px;
    margin-top: -3px;
    text-align: center;
    color: white;
    background-color: #3252d3;
    cursor: pointer;
    font-size: 1.22rem;
    border-radius: 4px;
`;

export const QueryButton = styled.div<{ isOpen?: boolean; isDesktop?: boolean }>`
    position: absolute;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    z-index: ${(props) => (props.isOpen ? '1201' : '1')};
    background: ${(props) => (props.isOpen ? 'rgb(42, 44, 51);' : '#3252d3;')};
    font-family: Lato;
    font-size: 16px;
    font-weight: 550;
    writing-mode: vertical-lr;
    color: White;
    text-align: center;
    line-height: 36px;

    ${(props) =>
        props.isDesktop
            ? `
        width: 40px;
        height: 90px;
        line-height: 36px;
        top: 110px;
    `
            : `
        width: 30px;
        height: 70px;
        line-height: 26px;
        top: 80px;
    `}

    ${(props) =>
        props.isOpen
            ? `
        left: 0;
        transform: rotate(180deg) translateX(40px);
    `
            : `
        right: 0;
        transform: rotate(180deg);
    `}
`;

export const ResultContainer = styled.div`
    width: calc(100% - 40px);
    max-width: calc(100% - 40px);
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid rgba(52, 54, 62, 0.75);
    padding: 20px;
    gap: 10px;
`;

export const RawLog = styled.div`
    max-width: 100%;
    font-size: 14px;
    line-height: 18px;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #acacac;
`;

export const TextBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
`;

export const TextInput = styled.input`
    width: 100%;
    font-family: Lato;
    background: transparent;
    width: calc(100% - 20px);
    font-size: 14px;
    font-weight: 400;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid rgba(52, 54, 62, 0.75);
    border-radius: 4px;
    padding: 15px 10px;
    color: #ccc;
`;

export const TitleValue = styled.div`
    font-family: Lato;
    font-weight: 600;
    font-size: 18px;
    color: #dddddd;
`;

export const BalanceNotice = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    font-family: Lato;
    font-size: 14px;
    color: #f0c33c;
`;

export const TextValueBox = styled.div`
    width: 100%;
    height: auto;
    min-height: 50px;
    position: relative;
    background-color: rgba(52, 54, 62, 0.75);
    border: 1px solid rgba(52, 54, 62, 0.75);
    border-radius: 4px;
    color: #acacac;
`;

export const TextValue = styled.div`
    font-family: Lato;
    font-size: 16px;
    padding: 10px;
`;

export const CopyIconImg = styled(FileCopyIcon)`
    width: 18px !important;
    height: 18px !important;
    cursor: pointer;
`;

export const ModifyHashKeyButton = styled.div`
    height: 20px;
    line-height: 20px;
    font-family: Lato;
    font-size: 12px;
    color: white;
    text-align: center;
    padding: 0 10px;
    background-color: #3252d3;
    cursor: pointer;
    border-radius: 4px;
`;
