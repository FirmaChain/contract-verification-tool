import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface InputSelect_ {
    optionList: { name: string }[];
    value: number;
    setValue: (v: number) => void;
}

const InputSelect = ({ optionList, value, setValue }: InputSelect_) => {
    const onChangeEvent = (e: SelectChangeEvent<number>) => {
        setValue(Number(e.target.value));
    };

    return (
        <FormControl
            sx={{
                m: 1,
                minWidth: '100%',
                margin: 0,
                backgroundColor: 'rgba(52, 54, 62, 0.75)',
                border: '1px solid #555',
                borderRadius: '4px',
                '& .MuiSelect-icon': {
                    fill: '#FFFFFF'
                }
            }}
            size="small"
        >
            <Select labelId="select-small" id="select-small" value={value} onChange={onChangeEvent} sx={{ color: '#ccc' }}>
                {optionList.map((option, index: number) => {
                    return (
                        <MenuItem key={index} value={index}>
                            {option.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default React.memo(InputSelect);
