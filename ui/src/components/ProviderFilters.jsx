// import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    ButtonGroup,
    Hidden,
    useMediaQuery, useTheme
} from "@material-ui/core";
import {AddCircle, MyLocation, RemoveCircle} from "@material-ui/icons";
import {useState} from "react";
import {AddFilterModal} from "./forms/filters/AddFilterModal";
import {useDispatch, useSelector} from "react-redux";
import {filterProviders, flyToUserPosition, removeFilters} from "../services";
import {AddFilterForm} from "./forms/filters/AddFilterForm";

// const useStyles = makeStyles((theme) => ({
//     addButton: {
//         height: "48px",
//         width: "48px",
//         margin: "6px"
//     },
//     card: {
//         height: "152px",
//         [theme.breakpoints.up("xl")]: {
//             height: "calc(100vh - 96px)",
//         },
//         transition: theme.transitions.create("height", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         })
//     },
//     container: {
//         display: "flex",
//         flexDirection: "row"
//     }
// }));

export const ProviderFilters = () => {
    // const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));
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

    // const handleClick = (e) => {
    //     console.log(e.target.value);
    // }

    // const handleDelete = (id) => {
    //     dispatch(filterProviders(filters.filter(i => i.id !== id)));
    // }

    const handleClear = () => {
        dispatch(removeFilters());
    }

    return <>
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

        {/*<Card className={classes.card}>*/}
        {/*    <CardHeader subheader="Szűrők" onClick={openAddModal}/>*/}
        {/*    <CardContent>*/}
        {/*        <div className={classes.container}>*/}
        {/*            <Button*/}
        {/*                variant="contained"*/}
        {/*                color="primary"*/}
        {/*                startIcon={<AddIcon />}*/}
        {/*            >*/}
        {/*                Hozzáadás*/}
        {/*            </Button>*/}
        {/*            <IconButton className={classes.addButton} color="primary" onClick={openAddModal}>*/}
        {/*                <AddIcon/>*/}
        {/*            </IconButton>*/}
        {/*            <Grid container spacing={1}>*/}
        {/*                {filters.map(({id, label}) =>*/}
        {/*                    <Grid item key={id}>*/}
        {/*                        <Chip*/}
        {/*                            color="primary"*/}
        {/*                            label={label}*/}
        {/*                            onClick={handleClick}*/}
        {/*                            onDelete={() => handleDelete(id)}*/}
        {/*                        />*/}
        {/*                    </Grid>*/}
        {/*                )}*/}
        {/*            </Grid>*/}
        {/*        </div>*/}
        {/*    </CardContent>*/}
        {/*</Card>*/}
        <AddFilterModal open={addModalOpen} onClose={closeAddModal} onAdd={handleAdd}/>
    </>
}
