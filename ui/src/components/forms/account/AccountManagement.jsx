import {IconButton, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {LoginModal} from "./LoginModal";
import {RegistrationModal} from "./RegistrationModal";
import {useAuth} from "reactfire";
import {AuthCheck} from "reactfire";

const useStyles = makeStyles(() => ({
    menuIcon: {
        color: "#fff"
    }
}));

export const AccountManagement = () => {
    const classes = useStyles();
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLoginModalOpen = () => setLoginModalOpen(true);
    const handleLoginModalClose = () => {
        handleMenuClose();
        setLoginModalOpen(false);
    }
    const handleRegistrationModalOpen = () => setRegistrationModalOpen(true);
    const handleRegistrationModalClose = () => {
        handleMenuClose();
        setRegistrationModalOpen(false);
    }
    const handleLogout = async () => {
        handleMenuClose();
        localStorage.removeItem("ID_TOKEN");
        await auth.signOut();
    };

    return <>
        <IconButton
            aria-controls="account-menu"
            aria-haspopup="true"
            className={classes.menuIcon}
            onClick={handleMenuClick}
        >
            <AccountCircle/>
        </IconButton>

        <AuthCheck
            fallback={
                <Menu id="account-menu" open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
                    <MenuItem onClick={handleLoginModalOpen}>Bejelentkezés</MenuItem>
                    <MenuItem onClick={handleRegistrationModalOpen}>Regisztráció</MenuItem>
                </Menu>
            }>
            <Menu id="account-menu" open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
                {auth && auth.currentUser &&
                <MenuItem disabled>{auth.currentUser.email}</MenuItem>
                }
                <MenuItem onClick={handleLogout}>Kijelentkezés</MenuItem>
            </Menu>
        </AuthCheck>

        <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose}/>
        <RegistrationModal open={isRegistrationModalOpen} onClose={handleRegistrationModalClose}/>
    </>
}
