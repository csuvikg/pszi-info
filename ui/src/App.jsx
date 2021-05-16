import {useEffect, useState} from "react";
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer, Hidden,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {ChevronLeft as ChevronLeftIcon, Search as SearchIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {AccountManagement, DrawerItemList, ITEM_TYPE, MenuButton} from "./components";
import {ContentSwitch} from "./ContentSwitch";
import {HashRouter} from "react-router-dom";
import "firebase/auth";
import {useUser, AuthCheck} from "reactfire";
import {PageViewLogger} from "./loggers/PageViewLogger";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down("xs")]: {
            width: 0,
        },
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(9) + 1,
        [theme.breakpoints.only("xs")]: {
            width: 0,
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        marginLeft: theme.spacing(9) + 1,
        [theme.breakpoints.only("xs")]: {
            marginLeft: 0
        },
        transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        padding: theme.spacing(2),
    },
    searchBar: {
        marginLeft: "auto",
        "& .MuiInputBase-input": {
            color: "#fff",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#fff",
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#fff",
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        }
    },
    searchIcon: {
        color: "#fff"
    }
}));

export const App = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {data: user} = useUser();
    useEffect(() => {
        (async () => user && localStorage.setItem("ID_TOKEN", await user.getIdToken()))()
    }, [user]);

    const handleDrawerToggle = () => setOpen(!open);

    return (
        <HashRouter className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <MenuButton onClick={handleDrawerToggle} open={open}/>
                    <Hidden xsDown>
                        <Typography variant="h6" noWrap>
                            Pszi-infó
                        </Typography>
                    </Hidden>
                    <TextField
                        className={classes.searchBar}
                        placeholder="Keresés"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon className={classes.searchIcon}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <AccountManagement/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerToggle}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <DrawerItemList items={[
                    {label: "Intézménykereső", type: ITEM_TYPE.MAP, path: "/providers"},
                    {label: "Tudásbázis", type: ITEM_TYPE.INFO, path: "/articles"},
                    {label: "Kapcsolat", type: ITEM_TYPE.CONTACT, path: "/contact"}
                ]}/>
                <AuthCheck fallback={null}>
                    <Divider/>
                    <DrawerItemList items={
                        [
                            {label: "Intézmény hozzáadása", type: ITEM_TYPE.ADD_PROVIDER, path: "/providers/add"},
                            {label: "Cikk hozzáadása", type: ITEM_TYPE.ADD_ARTICLE, path: "/articles/add"},
                            {label: "Admin", type: ITEM_TYPE.ADMIN, path: "/admin"}
                        ]
                    }/>
                </AuthCheck>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <ContentSwitch/>
            </main>
            <PageViewLogger/>
        </HashRouter>
    );
};
