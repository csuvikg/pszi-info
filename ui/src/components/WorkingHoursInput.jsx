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

export const WorkingHoursInput = ({data: {value, label, workingHours}, onChange}) => {
    return <Card style={{height: "100%"}}>
        <CardContent>
            <Typography color="textSecondary">
                {label}
            </Typography>
            {workingHours && workingHours.length > 0
                ? <List dense>
                    {workingHours.map(({from, to}) =>
                        <ListItem key={`${from}${to}`}>
                            <ListItemText primary={`${from} - ${to}`}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete working hours">
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

WorkingHoursInput.propTypes = {
    data: PropTypes.shape({
        value: PropTypes.oneOf(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).isRequired,
        label: PropTypes.string.isRequired,
        workingHours: PropTypes.arrayOf(PropTypes.shape({
            from: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
}
