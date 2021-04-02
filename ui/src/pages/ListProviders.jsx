import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listProviders} from "../services";

const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center",
        justifyContent: "center"
    }
}));

export const ListProviders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const providers = useSelector(state => state.providers.providers);

    useEffect(() => {
        if (providers.length === 0) dispatch(listProviders());
    }, [dispatch, providers]);

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={8} lg={6}>
            {providers.map(provider => <div key={provider.id}>{provider.name}</div>)}
        </Grid>
    </Grid>
}
