import { styled } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChipInput from 'material-ui-chip-input'

export const QueryField = styled(TextField)({
    flexGrow: 1,
});

export const ChipInputStyled = styled(ChipInput)({
    width: '99%',
    marginLeft: '4px',
    marginRight: '4px'
});

export const QuerySearchButton = styled(Button)({
    height: '55px',
    marginLeft: '15px',
    marginTop: '15px',

});

export const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '10px',
    marginRight: '10px',
});