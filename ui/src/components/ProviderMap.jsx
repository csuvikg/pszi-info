import {Card} from "@material-ui/core";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {makeStyles} from "@material-ui/core/styles";

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

export const ProviderMap = () => {
    const classes = useStyles();

    return <Card>
        <MapContainer center={[47.509425, 19.1260431]} zoom={7} scrollWheelZoom={true}
                      className={classes.map}>
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
}
