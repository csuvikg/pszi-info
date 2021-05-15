import {Button, Card, Typography} from "@material-ui/core";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {MapCenterHandler} from "./MapCenterHandler";
import {ProviderDetailsModal} from "./ProviderDetailsModal";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    map: {
        height: "40vh",
        [theme.breakpoints.only("xl")]: {
            height: "calc(100vh - 96px)",
        },
        [theme.breakpoints.only("lg")]: {
            height: "calc(100vh - 140px)",
        },
        [theme.breakpoints.only("md")]: {
            height: "calc(100vh - 164px)",
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
    const {filteredProviders} = useSelector(state => state.providers);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(null);

    const handleOpen = data => {
        setSelectedProvider(data);
        setDetailsModalOpen(true);
    }

    const handleClose = () => {
        setSelectedProvider(null);
        setDetailsModalOpen(false);
    }

    return <Card>
        <MapContainer center={[47.33297626746441, 19.49850283582125]} zoom={7} scrollWheelZoom={true}
                      className={classes.map}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenterHandler/>
            {filteredProviders.map(data =>
                <Marker key={data.id} position={[data.address.coords.lat, data.address.coords.lng]}>
                    <Popup>
                        <Typography>{data.name}</Typography>
                        <Typography>{`${data.address.postalCode} ${data.address.city}, ${data.address.address}`}</Typography>
                        <Button onClick={() => handleOpen(data)}>Részletek</Button>
                    </Popup>
                </Marker>)
            }
        </MapContainer>
        {selectedProvider &&
        <ProviderDetailsModal data={selectedProvider} open={detailsModalOpen} onClose={handleClose}/>
        }
    </Card>
}
