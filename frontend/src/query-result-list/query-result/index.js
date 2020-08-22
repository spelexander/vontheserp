import React from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import LaunchIcon from '@material-ui/icons/Launch';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

const QueryResult = (props) => {

    const displayLink = props.link.split('/')[2];

    return <ListItem alignItems="flex-start"
                     selected={props.selected}
                     onClick={() => props.setSelectedResults()}
    >
        <ListItemAvatar>
            <Avatar variant="rounded" alt="result value">{props.index + 1}</Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={props.name}
            secondary={
                <React.Fragment>
                    {displayLink}
                </React.Fragment>
            }
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="goto" href={props.link} target="_blank" rel="noopener noreferrer">
                <LaunchIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
};

export default QueryResult;