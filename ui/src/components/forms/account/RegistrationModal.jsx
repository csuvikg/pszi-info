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

const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center"
    }
}));

export const RegistrationModal = ({open, onClose}) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");
    const handleRegister = async () => {
        // todo: add redux events
        // todo: add registration
        try {
            if (password !== passwordVerification) {
                throw new Error("Mismatching passwords");
            }
            setEmail("");
            setPassword("");
            setPasswordVerification("");
            onClose();
        } catch (e) {
            console.log(e);
        }
    };

    return <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="registration-modal-title"
        aria-describedby="registration-modal-description"
        className={classes.container}
    >
        <DialogTitle id="registration-dialog-title">Regisztráció</DialogTitle>
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
                <Grid item xs={12}>
                    <TextField required
                               fullWidth
                               type="password"
                               id="passwordVerification"
                               variant="outlined"
                               size="small"
                               label="Jelszó megerősítése"
                               value={passwordVerification}
                               onChange={({target: {value}}) => setPasswordVerification(value)}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions style={{padding: "2rem"}}>
            <Button onClick={onClose} variant="contained">
                Mégsem
            </Button>
            <Button onClick={handleRegister} variant="contained" color="primary">
                Regisztráció
            </Button>
        </DialogActions>
    </Dialog>
}

RegistrationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}
