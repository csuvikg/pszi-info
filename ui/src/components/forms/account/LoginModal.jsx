import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "reactfire";

const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center"
    }
}));

export const LoginModal = ({open, onClose}) => {
    const auth = useAuth();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        // todo: add redux events
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail("");
            setPassword("");
            onClose();
        } catch (e) {
            console.log(e);
        }
    };

    return <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        className={classes.container}
    >
        <DialogTitle id="login-dialog-title">Bejelentkezés</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField required
                               fullWidth
                               type="email"
                               id="email"
                               variant="outlined"
                               size="small"
                               label="Email cím"
                               value={email}
                               onChange={({target: {value}}) => setEmail(value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required
                               fullWidth
                               type="password"
                               id="password"
                               variant="outlined"
                               size="small"
                               label="Jelszó"
                               value={password}
                               onChange={({target: {value}}) => setPassword(value)}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{padding: "2rem"}}>
            <Button onClick={onClose} variant="contained">
                Mégsem
            </Button>
            <Button onClick={handleLogin} variant="contained" color="primary">
                Bejelentkezés
            </Button>
        </DialogActions>
    </Dialog>
}

LoginModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}
