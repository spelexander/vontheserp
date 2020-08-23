import { styled } from '@material-ui/core/styles';

export const CenteredWrapper = styled('div')({
    position: 'relative',
});

export const Centered = styled('div')({
    position: 'absolute',
    left: '50%',
    marginTop: '20%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
});