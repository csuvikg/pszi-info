import PropTypes from "prop-types";
import {
    Card,
    CardContent,
    IconButton,
    List, ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {DAY_LABELS, DAYS} from "./consts";

export const WorkingHoursDayItem = ({day, data, onDelete}) => {
    const handleDelete = ({i}) => onDelete({
        day,
        i
    })

    return <Card style={{height: "100%"}}>
        <CardContent>
            <Typography color="textSecondary">
                {DAY_LABELS[day].label}
            </Typography>
            {data && data.length > 0
                ? <List dense>
                    {data.map(({from, to}, i) =>
                        <ListItem key={`${from}${to}`}>
                            <ListItemText primary={`${from} - ${to}`}/>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete working hours"
                                    onClick={() => handleDelete({i})}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
                : <Typography color="textSecondary">-</Typography>
            }
        </CardContent>
    </Card>
}

WorkingHoursDayItem.propTypes = {
    day: PropTypes.oneOf(Object.values(DAYS)).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    })).isRequired,
    onDelete: PropTypes.func.isRequired
}
