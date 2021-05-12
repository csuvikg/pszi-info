import {useEffect, useState} from "react";
import {useMap} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux";
import {flyToUserPositionFinish} from "../services";

export const MapCenterHandler = () => {
    const map = useMap();
    const {filteredProviders, shouldFlyToUserPosition} = useSelector(state => state.providers);
    const [isInitialized, setInitialized] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (filteredProviders && filteredProviders.length > 0) {
            if (!isInitialized) {
                setInitialized(true);
                return;
            }

            const bounds = filteredProviders.reduce(([[latmin, lngmin], [latmax, lngmax]], {
                address: {
                    coords: {
                        lat,
                        lng
                    }
                }
            }) => [[Math.min(latmin, lat), Math.min(lngmin, lng)], [Math.max(latmax, lat), Math.max(lngmax, lng)]], [[1000, 1000], [0, 0]]);
            map.invalidateSize();
            map.flyToBounds(bounds);
        }
    }, [isInitialized, map, filteredProviders]);

    useEffect(() => {
        if (shouldFlyToUserPosition) {
            navigator.geolocation.getCurrentPosition(position => {
                map.flyTo([position.coords.latitude, position.coords.longitude], 12);
            });
            dispatch(flyToUserPositionFinish());
        }
    }, [map, dispatch, shouldFlyToUserPosition]);

    return <></>
}
