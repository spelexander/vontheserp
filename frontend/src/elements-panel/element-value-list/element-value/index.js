import React from 'react'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardFullLength} from "./styled";

const ElementValue = (props) => <CardFullLength>
    <CardContent>
        <Typography variant="body2" component="p">
            {props && props.content}
        </Typography>
    </CardContent>
    <CardActions>
        <Typography variant="button" display="block" gutterBottom>
            {props && props.index}
        </Typography>
        <Button size="small">copy</Button>
        <Button size="small">{props && props.elementName}</Button>
        <Button size="small">{props && props.pageName}</Button>
    </CardActions>
</CardFullLength>;

export default ElementValue;