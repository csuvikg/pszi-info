import {Card, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {listProviders} from "../services";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {ProviderFilters, ProviderListItem} from "../components";

L.Icon.Default.imagePath = "images/";

const useStyles = makeStyles(() => ({
    container: {
        justifyContent: "center"
    },
    providerList: {
        height: "calc(100vh - 72px)",
        overflowY: "scroll"
    }
}));

export const ListProviders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { providers } = useSelector(state => state.providers);
    const [isGeolocationEnabled, setGeolocationEnabled] = useState(false);

    useEffect(() => {
        if (providers.length === 0) dispatch(listProviders());
    }, [dispatch, providers]);

    useEffect(() => {
        (async () => {
            if (navigator.permissions) {
                const result = await navigator.permissions.query({name: 'geolocation'});
                setGeolocationEnabled(result.state === 'granted');
                result.onchange = e => setGeolocationEnabled(e.target.state === 'granted');
            }
        })();
    }, []);

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={6} lg={8} xl={9}>
            <Grid container>
                <Grid item xs={12} xl={3}>
                    <ProviderFilters/>
                </Grid>
                <Grid item xs={12} xl={9}>
                    <Card>
                        <MapContainer center={[47.509425, 19.1260431]} zoom={7} scrollWheelZoom={true}
                                      style={{height: "600px"}}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[47.509425, 19.1260431]}>
                                <Popup>
                                    A pretty CSS3 popup. <br/> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} className={classes.providerList}>
            <Grid container spacing={1}>
                {providers.map(provider =>
                    <Grid key={provider.id} item xs={12}>
                        <ProviderListItem data={provider}/>
                    </Grid>
                )}
            </Grid>
        </Grid>
    </Grid>
}
