import { SelectWrapper } from 'components/styles';
import React from 'react';

const InputSelect = ({ optionList, value, setValue }) => {
    const onChangeEvent = (e) => {
        setValue(Number(e.target.value));
    };

    return (
        <SelectWrapper>
            <select value={value} onChange={onChangeEvent}>
                {optionList.map((option, index) => {
                    return (
                        <option key={index} value={index}>
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </SelectWrapper>
    );
};

export default React.memo(InputSelect);