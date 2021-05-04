import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, Chip, Grid, IconButton} from "@material-ui/core";
import {Add as AddIcon} from "@material-ui/icons";
import {useState} from "react";
import {AddFilterModal} from "./forms/filters/AddFilterModal";
import {useDispatch, useSelector} from "react-redux";
import {filterProviders} from "../services";

const useStyles = makeStyles((theme) => ({
    addButton: {
        height: "48px",
        width: "48px",
        margin: "6px"
    },
    card: {
        height: "152px",
        [theme.breakpoints.up("xl")]: {
            height: "calc(100vh - 96px)",
        },
        transition: theme.transitions.create("height", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    container: {
        display: "flex",
        flexDirection: "row"
    }
}));

export const ProviderFilters = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [addModalOpen, setAddModalOpen] = useState(false);
    const {filters} = useSelector(state => state.providers);

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const handleAdd = (newFilters) => {
        if (newFilters && newFilters.length > 0) {
            const combinedFilters = filters.concat(newFilters);
            dispatch(filterProviders(combinedFilters));
        }
        closeAddModal();
    }

    const handleClick = (e) => {
        console.log(e.target.value);
    }

    const handleDelete = (id) => {
        dispatch(filterProviders(filters.filter(i => i.id !== id)));
    }

    return <>
        <Card className={classes.card}>
            <CardHeader subheader="Szűrők"/>
            <CardContent>
                <div className={classes.container}>
                    <IconButton className={classes.addButton} color="primary" onClick={openAddModal}>
                        <AddIcon/>
                    </IconButton>
                    <Grid container spacing={1}>
                        {filters.map(({id, label}) =>
                            <Grid item key={id}>
                                <Chip
                                    color="primary"
                                    label={label}
                                    onClick={handleClick}
                                    onDelete={() => handleDelete(id)}
                                />
                            </Grid>
                        )}
                    </Grid>
                </div>
            </CardContent>
        </Card>
        <AddFilterModal open={addModalOpen} onClose={closeAddModal} onAdd={handleAdd}/>
    </>
}
