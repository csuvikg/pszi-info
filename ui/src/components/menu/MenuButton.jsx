import {IconButton} from "@material-ui/core";
import clsx from "clsx";
import {Menu as MenuIcon} from "@material-ui/icons";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: 36,
        transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    hide: {
        visibility: "hidden",
        marginRight: -36
    },
}));

export const MenuButton = ({onClick, open}) => {
    const classes = useStyles();

    return <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onClick}
        edge="start"
        className={clsx(classes.menuButton, {
            [classes.hide]: open,
        })}
    >
        <MenuIcon/>
    </IconButton>
}

MenuButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}
