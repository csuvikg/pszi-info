import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    ButtonGroup,
    Hidden,
    useMediaQuery, useTheme
} from "@material-ui/core";
import {AddCircle, MyLocation, RemoveCircle} from "@material-ui/icons";
import {useState} from "react";
import {AddFilterModal} from "./forms/filters/AddFilterModal";
import {useDispatch} from "react-redux";
import {flyToUserPosition, removeFilters} from "../services";
import {AddFilterForm} from "./forms/filters/AddFilterForm";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingRight: "16px"
    }
}));

export const ProviderFilters = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));
    const [addModalOpen, setAddModalOpen] = useState(false);

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const handleClear = () => {
        dispatch(removeFilters());
    }

    return <div className={classes.container}>
        <Hidden xlUp>
            <ButtonGroup fullWidth orientation={greaterThanSm ? "horizontal" : "vertical"} variant="text">
                <Button onClick={openAddModal} startIcon={<AddCircle/>}>Szűrő hozzáadása</Button>
                <Button startIcon={<RemoveCircle/>} onClick={handleClear}>Szűrők törlése</Button>
                <Button startIcon={<MyLocation/>} onClick={() => dispatch(flyToUserPosition())}>Saját pozíció</Button>
            </ButtonGroup>
        </Hidden>
        <Hidden lgDown>
            <ButtonGroup fullWidth orientation={greaterThanSm ? "horizontal" : "vertical"} variant="text">
                <Button startIcon={<RemoveCircle/>} onClick={handleClear}>Szűrő törlése</Button>
                <Button startIcon={<MyLocation/>} onClick={() => dispatch(flyToUserPosition())}>Saját pozíció</Button>
            </ButtonGroup>
            <AddFilterForm/>
        </Hidden>
        <AddFilterModal open={addModalOpen} onClose={closeAddModal}/>
    </div>
}
