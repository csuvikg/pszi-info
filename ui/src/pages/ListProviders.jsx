import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {listProviders} from "../services";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.imagePath="images/";

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
        <Grid item xs={12} md={8} lg={6}>
            <MapContainer center={[47.1611615, 19.5057541]} zoom={7} scrollWheelZoom={false} style={{height: "600px"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[47.1611615, 19.5057541]}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            {providers.map(provider => <div key={provider.id}>{provider.name}</div>)}
        </Grid>
    </Grid>
}
