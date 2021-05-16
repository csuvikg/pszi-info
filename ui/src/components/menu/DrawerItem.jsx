import {ListItem, ListItemIcon, ListItemText, Tooltip} from "@material-ui/core";
import {
    AddComment,
    AddLocation,
    Explore as MapIcon, ImportContacts, Mail,
    SupervisorAccount as AdminIcon
} from "@material-ui/icons";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

export const ITEM_TYPE = {
    ADD_ARTICLE: <AddComment/>,
    ADD_PROVIDER: <AddLocation/>,
    ADMIN: <AdminIcon/>,
    CONTACT: <Mail/>,
    INFO: <ImportContacts/>,
    MAP: <MapIcon/>
};

const useStyles = makeStyles((theme) => ({
    icon: {
        [theme.breakpoints.up("sm")]: {
            marginLeft: 8
        },
        transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    link: {
        textDecoration: "none"
    }
}));

export const DrawerItem = ({type, label, path}) => {
    const classes = useStyles();

    return <Tooltip title={label} aria-label={label}>
        <ListItem component={Link} to={path} button>
            <ListItemIcon className={classes.icon}>{type}</ListItemIcon>
            <ListItemText primary={label}/>
        </ListItem>
    </Tooltip>;
}

DrawerItem.propTypes = {
    type: PropTypes.oneOf(Object.values(ITEM_TYPE)).isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

// todo:
// do not resize if open (redux)
// hide tooltip if open
