import React from 'react';
import {StyledElementChip} from './styled';

const ElementChip =
    ({
         value,
         text,
         chip,
         handleClick,
         handleDelete,
         selected,
         toggleSelect
     },
     key) => {
        return <StyledElementChip
            key={key}
            label={text}
            onClick={(e) => {
                toggleSelect(value);
                handleClick(e);
            }}
            onDelete={handleDelete}
            color={selected && selected === value ? 'primary' : 'default'}
        />
    };

export default ElementChip;