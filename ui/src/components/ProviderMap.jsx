import {Button, Card, Typography} from "@material-ui/core";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
    map: {
        height: "40vh",
        [theme.breakpoints.only("xl")]: {
            height: "calc(100vh - 96px)",
        },
        [theme.breakpoints.only("lg")]: {
            height: "calc(100vh - 256px)",
        },
        [theme.breakpoints.only("md")]: {
            height: "calc(100vh - 256px)",
        },
        [theme.breakpoints.only("sm")]: {
            height: "50vh",
        },
        transition: theme.transitions.create("height", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    }
}));

const defaultCenterValue = [47.509425, 19.1260431];

export const ProviderMap = () => {
    const classes = useStyles();
    const {filteredProviders} = useSelector(state => state.providers);
    const [center, setCenter] = useState(defaultCenterValue);

    const setCurrentUserPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setCenter([position.coords.latitude, position.coords.longitude]);
        });
    }

    useEffect(() => {
        (async () => {
            if (navigator.permissions) {
                const result = await navigator.permissions.query({name: 'geolocation'});
                if (result.state === 'granted') setCurrentUserPosition();
                result.onchange = e => e.target.state === 'granted'
                    ? setCurrentUserPosition()
                    : setCenter(defaultCenterValue);
            }
        })();
    }, []);

    return <Card>
        <MapContainer center={center} zoom={10} scrollWheelZoom={true}
                      className={classes.map}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredProviders.map(({id, name, address: {city, postalCode, address, coords: {lat, lng}}}) =>
                <Marker key={id} position={[lat, lng]}>
                    <Popup>
                        <Typography>{name}</Typography>
                        <Typography>{`${postalCode} ${city}, ${address}`}</Typography>
                        <Button>Részletek</Button>
                    </Popup>
                </Marker>)
            }
        </MapContainer>
    </Card>
}
