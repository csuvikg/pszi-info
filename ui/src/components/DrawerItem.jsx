import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Explore as MapIcon, SupervisorAccount as AdminIcon} from "@material-ui/icons";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

export const iconTypes = ["map", "admin"];

const useStyles = makeStyles((theme) => ({
    icon: {
        [theme.breakpoints.up("sm")]: {
            marginLeft: 8
        },
        transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    }
}));

const getIcon = (type) => {
    switch (type) {
        case "map":
            return <MapIcon/>;
        case "admin":
            return <AdminIcon/>;
        default:
            throw new Error(`Unknown icon type: ${type}`);
    }
}

export const DrawerItem = ({type, label}) => {
    const classes = useStyles();

    return <ListItem button>
        <ListItemIcon className={classes.icon}>{getIcon(type)}</ListItemIcon>
        <ListItemText primary={label}/>
    </ListItem>;
}

DrawerItem.propTypes = {
    type: PropTypes.oneOf(iconTypes).isRequired,
    label: PropTypes.string.isRequired
}

// do not resize if open (redux)
