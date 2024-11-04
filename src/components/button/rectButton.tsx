import { ButtonContainer } from './styles';

interface RectButton_ {
    title: string;
    small?: boolean;
    onClickEvent?: () => void;
}

export default function RectButton({ title, onClickEvent, small = false }: RectButton_) {
    const onClick = () => {
        onClickEvent && onClickEvent();
    };

    return (
        <ButtonContainer style={small ? { width: '240px', height: '54px', fontSize: '16px' } : {}} onClick={() => onClick()}>
            {title}
        </ButtonContainer>
    );
}
