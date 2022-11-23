import React from 'react';
import { InputBox, InputTitle, TextAreaBox, TextWrapper } from 'components/styles';

const InputTextarea = ({ title, placeholder, value, setValue }) => {
    const onChangeEvent = (e) => {
        setValue(e.target.value);
    };

    return (
        <InputBox>
            {title !== "" && <InputTitle>{title}</InputTitle>}
            <TextWrapper>
                <TextAreaBox type={'textarea'} placeholder={placeholder} onChange={onChangeEvent} value={value} />
            </TextWrapper>
        </InputBox>
    );
};

export default React.memo(InputTextarea);