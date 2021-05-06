import {useEffect} from "react";
import {useMap} from "react-leaflet";
import {useSelector} from "react-redux";

export const MapCenterHandler = () => {
    const {filteredProviders} = useSelector(state => state.providers);
    const map = useMap();

    useEffect(() => {
        if (filteredProviders && filteredProviders.length) {
            const bounds = filteredProviders.reduce(([[latmin, lngmin], [latmax, lngmax]], {
                address: {
                    coords: {
                        lat,
                        lng
                    }
                }
            }) => [[Math.min(latmin, lat), Math.min(lngmin, lng)], [Math.max(latmax, lat), Math.max(lngmax, lng)]], [[1000, 1000], [0, 0]]);
            map.flyToBounds(bounds);
        }
    }, [map, filteredProviders]);

    return <></>
}
