import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {v4} from "uuid";

const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center"
    },
    actions: {
        padding: "2rem"
    }
}));

export const AddFilterModal = ({open, onClose, onAdd}) => {
    const classes = useStyles();
    const {providers} = useSelector(state => state.providers);
    const [cityOptions, setCityOptions] = useState([]);
    const [city, setCity] = useState(null);

    useEffect(() => {
        setCityOptions(Array.from(new Set(providers.map(p => p.address.city))));
    }, [providers]);

    const handleAdd = () => {
        const filters = []
        if (city && city !== "") {
            filters.push({
                id: v4(),
                label: `Település: ${city}`,
                filterBy: "city",
                value: city, // Is it needed?
                filter: provider => provider.address.city === city
            });
        }
        onAdd(filters);
    }

    return <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal-title"
        className={classes.container}
    >
        <DialogTitle id="login-dialog-title">Szűrő hozzáadása</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Autocomplete
                    fullWidth
                    options={cityOptions}
                    value={city}
                    onChange={(_, value) => setCity(value)}
                    renderInput={(params) =>
                        <TextField {...params} label="Település" margin="normal"/>
                    }/>
            </Grid>
        </DialogContent>
        <DialogActions className={classes.actions}>
            <Button onClick={onClose} variant="contained">
                Mégsem
            </Button>
            <Button onClick={handleAdd} variant="contained" color="primary">
                Hozzáadás
            </Button>
        </DialogActions>
    </Dialog>
}

AddFilterModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
}
