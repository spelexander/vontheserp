import React from 'react'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardFullLength} from "./styled";
import Highlighter from "react-highlight-words";
import {truncate} from "../../../services/utils";
import Skeleton from "react-loading-skeleton";

const ElementValue = (props) => {

    return <CardFullLength>
    <CardContent>
        <Typography variant="body2" component="p">
            {props.loading ? <Skeleton /> : <Highlighter
            searchWords={props.searchTerms}
            textToHighlight={props.content && truncate(props.content, 1000)}
        />}
        </Typography>
    </CardContent>
    <CardActions>
        <Typography variant="button" display="block">
            {props.loading ? <Skeleton /> : `rank: ${props.index}`}
        </Typography>
        <Typography display="block">
            {props.loading ? <Skeleton /> : props.elementName}
        </Typography>
        <Button size="small">{props.loading ? <Skeleton /> : props.pageName.split('/')[2]}</Button>
    </CardActions>
</CardFullLength>};

export default ElementValue;