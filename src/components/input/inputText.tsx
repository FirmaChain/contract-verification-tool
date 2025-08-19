import React, { ChangeEvent } from 'react';
import { InputBox, InputTitle, TextBox, TextWrapper } from '@/components/styles';

interface InputText_ {
    title: string;
    placeholder: string;
    value: string;
    setValue: (v: string) => void;
}

const InputText = ({ title, placeholder, value, setValue }: InputText_) => {
    const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <InputBox>
            {title !== '' && <InputTitle>{title}</InputTitle>}
            <TextWrapper>
                <TextBox type={'text'} placeholder={placeholder} onChange={onChangeEvent} value={value} />
            </TextWrapper>
        </InputBox>
    );
};

export default React.memo(InputText);
