import {useEffect, useState} from "react";
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {ChevronLeft as ChevronLeftIcon, Search as SearchIcon} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {DrawerItemList, ITEM_TYPE, MenuButton} from "./components";
import {ContentSwitch} from "./ContentSwitch";
import {HashRouter} from "react-router-dom";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    // todo: scrollbar
    // maybe only to specific containers?
    // "@global": {
    //     "*::-webkit-scrollbar": {
    //         height: "8px",
    //         width: "6px"
    //         // width: "0.4em"
    //     },
    //     "*::-webkit-scrollbar-track-piece": {
    //         background: "#F0F0F0"
    //     },
    //     // "*::-webkit-scrollbar-track": {
    //     //     "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    //     // },
    //     // "*::-webkit-scrollbar-thumb": {
    //     //     backgroundColor: "rgba(0,0,0,.1)",
    //     //     outline: "1px solid slategrey"
    //     // }
    //     "*::-webkit-scrollbar-thumb:vertical": {
    //         background: "#E5E5E5",
    //         borderRadius: "20px"
    //     },
    //     "*::-webkit-scrollbar-thumb:horizontal": {
    //         background: "#E5E5E5",
    //         borderRadius: "20px"
    //     }
    // },
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
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
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
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(9) + 1,
        },
        transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        padding: theme.spacing(2),
    },
    searchBar: {
        marginLeft: "auto",
        '& .MuiInputBase-input': {
            color: '#fff',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#fff8',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#fff',
        }
    },
    searchIcon: {
        color: "#fff"
    }
}));

export const App = ({title}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        document.title = title
    }, [title]);

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
                    <Typography variant="h6" noWrap>
                        Ellátótérkép
                    </Typography>
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
                <DrawerItemList items={[{label: "Intézménykereső", type: ITEM_TYPE.MAP, path: "/providers"}]}/>
                <Divider/>
                <DrawerItemList items={
                    [
                        {label: "Intézmény hozzáadása", type: ITEM_TYPE.ADD, path: "/providers/add"},
                        {label: "Admin", type: ITEM_TYPE.ADMIN, path: "/admin"}
                    ]
                }/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <ContentSwitch/>
            </main>
        </HashRouter>
    );
};
