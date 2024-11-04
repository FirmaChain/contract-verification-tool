import React, { ChangeEvent } from 'react';
import { InputBox, InputTitle, TextAreaBox, TextWrapper } from 'components/styles';

interface InputTextarea_ {
    title: string;
    placeholder: string;
    value: string;
    setValue: (v: string) => void;
}

const InputTextarea = ({ title, placeholder, value, setValue }: InputTextarea_) => {
    const onChangeEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <InputBox>
            {title !== '' && <InputTitle>{title}</InputTitle>}
            <TextWrapper>
                {/*//! Remove type=textarea : textarea does not have this option */}
                <TextAreaBox /*type={'textarea'}*/ placeholder={placeholder} onChange={onChangeEvent} value={value} />
            </TextWrapper>
        </InputBox>
    );
};

export default React.memo(InputTextarea);
