import { styled } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";

export const ApplicationResultsRow = styled('div')({
    marginTop: '4px',
    display: 'flex',
});

export const ApplicationResultsColumn = styled('div')({
    flex: '35%',
    height: '89vh',
    overflow: 'scroll',
});

export const ApplicationElementsColumn = styled('div')({
    flex: '65%',
    maxWidth: '65%',
    flexGrow: 0,
    marginLeft: '4px'
});

export const ExportButton = styled(Fab)({
    position: 'absolute',
    bottom: '20px',
    right: '15px',
});