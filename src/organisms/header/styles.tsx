import { ICON_OPEN_IN_HOVER, ICON_OPEN_IN_NEW } from '@/constants/images';
import styled from 'styled-components';

export const HeaderBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    min-width: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const AddressText = styled.div`
    height: 24px;
    line-height: 22px;
    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: center;
    color: #20b0e5;
    background-color: #21212f;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        color: #1989b2;
    }
`;

export const MenuText = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: center;
    color: #b5b5be;
    cursor: pointer;

    &:hover {
        color: #fff;
        > div {
            background-image: url('${ICON_OPEN_IN_HOVER}');
        }
    }
`;

export const DescText = styled.div`
    min-width: 70px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Lato;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.16px;
    text-align: center;
    padding: 5px 0;
    color: #b5b5be;
`;

export const OpenIcon = styled.div`
    width: 24px;
    height: 24px;
    background-image: url('${ICON_OPEN_IN_NEW}');
    background-size: 24px;
`;

export const WrapperM = styled.div`
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #1b1b23;
    transition: all 0.3s ease-in-out;
    opacity: 1;
`;

export const MenuButton = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
`;

export const MenuContainer = styled.div<{ open?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: -20px;
    gap: 20px;
    padding: 0 20px 0;

    opacity: 1;
    background-color: #1b1b23;
    transition: all 0.3s ease-in-out;

    ${(props) =>
        props.open
            ? `
        max-height: 1000px;
        padding: 10px 20px 20px;
    `
            : `
        max-height: 0;
        > div {
            overflow: hidden;
        }
    `}
`;

export const SettingButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
`;

export const Icon = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
`;

export const InfoContainer = styled.div<{ isDesktop?: boolean }>`
    width: 100%;
    display flex;
    align-items: center;
    justify-content: center;
    background-color: #27273180;
    ${(props) =>
        props.isDesktop
            ? `
        height: 38px;
        > div {
            justify-content: flex-end;
            gap: 20px;
        }
    `
            : `
        height: 28px;
        > div {
            justify-content: center;
            flex-direction: column-reverse;
        }
    `}
`;

export const InfoBox = styled.div`
    width: 100%;
    max-width: 1528px;
    padding: 0 20px;
    display: flex;
    align-items: center;
`;

export const WalletAddress = styled.div`
    color: rgb(80, 181, 255);
    font-family: Lato;
    font-weight: 550;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

export const ChainInfoWrap = styled.div<{ isDesktop?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 50px;
    border: solid 1px #3ccf9e;
    cursor: pointer;
    position: relative;

    ${(props) =>
        props.isDesktop
            ? `
        padding: 4px 12px 5px;
    `
            : `
        padding: 2px 10px 2px;
        > div:nth-child(2) {
            font-size: 9px;
        }
    `}

    &:hover {
        > div:nth-child(3) {
            display: block;
        }
    }
`;

export const ChainInfoDot = styled.div`
    width: 6px;
    height: 6px;
    background-color: #3ccf9e;
    border-radius: 6px;
`;

export const ChainInfo = styled.div`
    color: #3ccf9e;
    font-family: Lato;
    font-weight: 500;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.17px;
    font-size: 11px;
`;

export const NetworkContainer = styled.div`
    width: 100%;
    min-width: 130px;
    padding: 30px 0 0;
    position: absolute;
    top: 0px;
    display: none;
    z-index: 10;
`;

export const NetworkBox = styled.div`
    width: 100%;
    padding: 8px 0;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 #00000030;
    background-color: #333538;
`;

export const NetworkItem = styled.div`
    padding: 12px 0 11px;
    background-color: #333538;
    font-family: Lato;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.21px;
    text-align: center;
    color: #999;
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: #606369;
    }
`;
