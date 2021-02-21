import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Explore as MapIcon, SupervisorAccount as AdminIcon} from "@material-ui/icons";
import PropTypes from "prop-types";

export const iconTypes = ["map", "admin"];

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

export const DrawerItem = ({type, label}) => <ListItem button>
    <ListItemIcon>{getIcon(type)}</ListItemIcon>
    <ListItemText primary={label}/>
</ListItem>;

DrawerItem.propTypes = {
    type: PropTypes.oneOf(iconTypes).isRequired,
    label: PropTypes.string.isRequired
}
