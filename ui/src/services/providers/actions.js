import {ACTIONS} from "../actions";
import {routes} from "../routes";
import {getHeaders} from "../helpers";
import dayjs from "dayjs";

const createProviderRequest = () => ({
    type: ACTIONS.ADD_PROVIDER_REQUEST
});

const createProviderFailed = errorMessage => ({
    type: ACTIONS.ADD_PROVIDER_FAILED,
    errorMessage
});

const createProviderSuccess = () => ({
    type: ACTIONS.ADD_PROVIDER_SUCCESS
});

export const createProvider = provider => async dispatch => {
    dispatch(createProviderRequest());
    try {
        await fetch(routes.providers.list, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(provider)
        });
        dispatch(createProviderSuccess())
    } catch (error) {
        dispatch(createProviderFailed(error.message));
    }
}

const listProvidersRequest = () => ({
    type: ACTIONS.LIST_PROVIDERS_REQUEST
});

const listProvidersFailed = errorMessage => ({
    type: ACTIONS.LIST_PROVIDERS_FAILED,
    errorMessage
});

const listProvidersSuccess = providers => ({
    type: ACTIONS.LIST_PROVIDERS_SUCCESS,
    providers
});

export const listProviders = () => async (dispatch, getState) => {
    dispatch(listProvidersRequest());
    const cache = await caches.open("providers");
    if (navigator.onLine) {
        try {
            const response = await fetch(routes.providers.version);
            const {version} = await response.json();
            const {version: localVersion, downloadedAt} = JSON.parse(localStorage.getItem("providers_version"));

            if (version !== parseInt(localVersion) || dayjs().format("YYYYMMDD") !== downloadedAt) {
                await cache.add(new Request(routes.providers.list));
                localStorage.setItem("providers_version", JSON.stringify({
                    version,
                    downloadedAt: dayjs().format("YYYYMMDD")
                }));
            }
        } catch (error) {
            // todo: handle
            console.log(error.message);
        }
    }
    const response = await cache.match(routes.providers.list);
    if (response) {
        const data = await response.json();
        dispatch(listProvidersSuccess(data));
        dispatch(filterProviders(getState().providers.filters));
    } else {
        dispatch(listProvidersFailed("Could not retrieve providers from cache"));
    }
}

export const filterProviders = filters => ({
    type: ACTIONS.FILTER_PROVIDERS,
    filters
});

export const flyToUserPosition = () => ({
    type: ACTIONS.FLY_TO_USER_POSITION_START
});

export const flyToUserPositionFinish = () => ({
    type: ACTIONS.FLY_TO_USER_POSITION_FINISH
});

export const flyToProvider = id => ({
    type: ACTIONS.FLY_TO_PROVIDER_START,
    id
});

export const flyToProviderFinish = () => ({
    type: ACTIONS.FLY_TO_PROVIDER_FINISH
});