import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listProviders} from "../services";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {ProviderFilters, ProviderListItem, ProviderMap} from "../components";

L.Icon.Default.imagePath = "images/";

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: "center"
    },
    providerList: {
        height: "calc(100vh - 72px)",
        overflowY: "scroll",
        [theme.breakpoints.down("sm")]: {
            overflowY: "visible"
        },
    }
}));

export const ListProviders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {filteredProviders} = useSelector(state => state.providers);

    useEffect(() => {
        dispatch(listProviders());
    }, [dispatch]);

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={6} lg={8} xl={9}>
            <Grid container spacing={1}>
                <Grid item xs={12} xl={3}>
                    <ProviderFilters/>
                </Grid>
                <Grid item xs={12} xl={9}>
                    <ProviderMap/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} className={classes.providerList}>
            <Grid container spacing={1}>
                {filteredProviders.map(provider =>
                    <Grid key={provider.id} item xs={12}>
                        <ProviderListItem data={provider}/>
                    </Grid>
                )}
            </Grid>
        </Grid>
    </Grid>
}
