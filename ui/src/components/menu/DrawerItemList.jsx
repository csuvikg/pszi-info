import PropTypes from "prop-types";
import {DrawerItem} from "./DrawerItem";
import {List} from "@material-ui/core";

export const DrawerItemList = ({items}) => <List>
    {items.map(item => <DrawerItem key={item.label} label={item.label} type={item.type} path={item.path}/>)}
</List>;

DrawerItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(DrawerItem.propTypes)).isRequired
}
