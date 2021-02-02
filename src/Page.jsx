import {Fragment, useEffect, useState} from "react";
import {
    AppBar,
    Drawer,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    TextField,
    Toolbar
} from "@material-ui/core";
import {Domain as DomainIcon, Menu as MenuIcon, Search as SearchIcon} from "@material-ui/icons";
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: drawerWidth,
    },
    searchBar: {
        marginLeft: "auto"
    },
    toolbar: theme.mixins.toolbar
}))

const Page = ({title}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        document.title = title
    }, [title]);

    const handleDrawerToggle = () => setOpen(!open);

    return (
        <Fragment>
            <AppBar position="absolute">
                <Toolbar className={classes.toolbar}>
                    <IconButton onClick={handleDrawerToggle}>
                        <MenuIcon/>
                    </IconButton>
                    <TextField
                        className={classes.searchBar}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Toolbar>
            </AppBar>
            <Drawer anchor="left"
                    open={open}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true
                    }}
            >
                <List>
                    <ListItem button>
                        <ListItemIcon><DomainIcon/></ListItemIcon>
                        <ListItemText primary="Intézménykereső"/>
                    </ListItem>
                </List>
            </Drawer>
        </Fragment>
    );
};

export default Page;
