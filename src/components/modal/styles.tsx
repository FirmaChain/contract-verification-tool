import { ICON_CLOSE_MODAL } from '@/constants/images';
import styled from 'styled-components';

export const ModalWrapper = styled.div<{ visible?: boolean }>`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3000;
    overflow: auto;
    outline: 0;
    height: auto;
    font-size: 1.6rem;
`;

export const ModalOverlay = styled.div<{ visible?: boolean }>`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2500;
`;

export const ModalInner = styled.div<{ width?: string | number; padding?: string | number }>`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #1e2126;
    border-radius: 4px;
    width: ${(props) => (props.width ? props.width : '300px')};
    max-width: ${(props) => (props.width ? props.width : '300px')};
    height: auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: ${(props) => (props.padding ? props.padding : '20px 40px')};
`;

export const PrevButton = styled.div`
    &:after {
        position: absolute;
        top: 6px;
        left: 8px;
        padding: 15px;
        display: inline-block;
        content: '〈 ';
        cursor: pointer;
        font-weight: 900;
        color: #888;
    }
`;

export const CloseButton = styled.div`
    position: absolute;
    width: 17px;
    height: 18px;
    top: 0px;
    right: 0px;
    display: inline-block;
    cursor: pointer;
    margin: 20px;
    background-image: url('${ICON_CLOSE_MODAL}');
    background-size: contain;
    background-repeat: no-repeat;
`;
