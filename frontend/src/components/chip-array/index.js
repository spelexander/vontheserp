import React from 'react';
import {StyledChipArray, StyledChip, ChipArrayTitle, ChipArrayWrapper, SelectedStyledChip} from "./styled";

const toLabel = (chipData) => chipData.label;
const toChipData = (label, key) => ({
    key,
    label,
});

const ChipsArray = ({labels, selectedLabels, setSelectedLabels}) => {
    const chipData = labels.map(toChipData);
    const selectedChipData = selectedLabels.map(toChipData);

    const handleDelete = (chipToDelete) => () => {
        setSelectedLabels(
            selectedChipData.filter((chip) => chip.label !== chipToDelete.label)
                .map(toLabel)
        );
    };

    const handleSelect = (chipToSelect) => () => {
        setSelectedLabels(
            [...selectedChipData, chipToSelect]
                .map(toLabel)
        );
    };

    return (
        <>
            {/*<ChipArrayTitle>{title}</ChipArrayTitle>*/}
            <StyledChipArray elevation={0} >
                {chipData.map((data) => {
                    if (selectedLabels.includes(data.label)) {
                        return <li key={data.key}>
                            <SelectedStyledChip
                                label={data.label}
                                onDelete={handleDelete(data)}
                            />
                        </li>;
                    }

                    return <li key={data.key}>
                        <StyledChip
                            label={data.label}
                            onClick={handleSelect(data)}
                        />
                    </li>;
                })}
            </StyledChipArray>
        </>
    );
};

ChipsArray.defaultProps = {
    title: null,
};

export default ChipsArray;