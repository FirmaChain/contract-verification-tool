import { DemoButtonContainer } from './styles';

interface DemoButton_ {
    title: string;
    small?: boolean;
    onClickEvent?: () => void;
}

export default function DemoButton({ title, small = false, onClickEvent }: DemoButton_) {
    const onClick = async () => {
        onClickEvent && onClickEvent();
    };

    return (
        <DemoButtonContainer style={small ? { width: '240px', height: '54px', fontSize: '16px' } : {}} onClick={() => onClick()}>
            {title}
        </DemoButtonContainer>
    );
}
