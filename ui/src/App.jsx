import {useEffect} from "react";
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer, Hidden,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {ChevronLeft as ChevronLeftIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {AccountManagement, DrawerItemList, ITEM_TYPE, MenuButton, SearchBar} from "./components";
import {ContentSwitch} from "./ContentSwitch";
import {HashRouter} from "react-router-dom";
import "firebase/auth";
import {useUser, AuthCheck} from "reactfire";
import {PageViewLogger} from "./loggers/PageViewLogger";
import {useDispatch, useSelector} from "react-redux";
import {closeSidebar, openSidebar} from "./services";

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
    }
}));

export const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isSidebarOpen} = useSelector(state => state.application);
    const {data: user} = useUser();
    useEffect(() => {
        (async () => user && localStorage.setItem("ID_TOKEN", await user.getIdToken()))()
    }, [user]);

    const handleDrawerToggle = () => isSidebarOpen ? dispatch(closeSidebar()) : dispatch(openSidebar());

    return (
        <HashRouter className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isSidebarOpen,
                })}
            >
                <Toolbar>
                    <MenuButton onClick={handleDrawerToggle} open={isSidebarOpen}/>
                    <Hidden xsDown>
                        <Typography variant="h6" noWrap>
                            Pszi-infó
                        </Typography>
                    </Hidden>
                    <SearchBar/>
                    <AccountManagement/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isSidebarOpen,
                    [classes.drawerClose]: !isSidebarOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isSidebarOpen,
                        [classes.drawerClose]: !isSidebarOpen,
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
