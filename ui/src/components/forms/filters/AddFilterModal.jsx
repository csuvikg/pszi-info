import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {AddFilterForm} from "./AddFilterForm";

const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center"
    },
    actions: {
        padding: "2rem"
    }
}));

export const AddFilterModal = ({open, onClose}) => {
    const classes = useStyles();

    return <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal-title"
        className={classes.container}
    >
        <DialogTitle id="login-dialog-title">Szűrő hozzáadása</DialogTitle>
        <DialogContent>
            <AddFilterForm />
        </DialogContent>
        <DialogActions className={classes.actions}>
            <Button onClick={onClose} variant="contained">
                Bezárás
            </Button>
        </DialogActions>
    </Dialog>
}

AddFilterModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}
