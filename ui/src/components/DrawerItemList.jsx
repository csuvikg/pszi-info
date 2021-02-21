import PropTypes from "prop-types";
import {DrawerItem, iconTypes} from "./DrawerItem";
import {List} from "@material-ui/core";

export const DrawerItemList = ({items}) => <List>
    {items.map(item => <DrawerItem key={item.label} label={item.label} type={item.type}/>)}
</List>;

DrawerItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(iconTypes),
        label: PropTypes.string
    })).isRequired
}
