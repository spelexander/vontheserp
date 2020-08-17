import React from 'react';
import {styled} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper";

export const StyledChip = styled(Chip)({
    margin: `2px`,
    backgroundColor: "#f5f5f5",
});

export const SelectedStyledChip = styled(Chip)({
    margin: `2px`,
});

export const StyledChipArray = styled(Paper)({
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    listStyle: 'none',
    borderStyle: 'none',
    padding: `4px`,
});