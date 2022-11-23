import React from 'react';
import { InputBox, InputTitle, TextBox, TextWrapper } from 'components/styles';

const InputText = ({ title, placeholder, value, setValue }) => {
    const onChangeEvent = (e) => {
        setValue(e.target.value);
    };

    return (
        <InputBox>
            {title !== "" && <InputTitle>{title}</InputTitle>}
            <TextWrapper>
                <TextBox type={'text'} placeholder={placeholder} onChange={onChangeEvent} value={value} />
            </TextWrapper>
        </InputBox>
    );
};

export default React.memo(InputText);