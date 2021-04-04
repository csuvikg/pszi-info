import {ACTIONS} from "../actions";
import axios from "axios";
import {routes} from "../routes";

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
        await axios.post(routes.providers.list, provider);
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

export const listProviders = () => async dispatch => {
    dispatch(listProvidersRequest());
    const cache = await caches.open("providers");
    if (navigator.onLine) {
        try {
            const response = await fetch(routes.providers.version);
            const {version} = await response.json();
            const localVersion = parseInt(localStorage.getItem("version"));

            if (version !== localVersion) {
                await cache.add(routes.providers.list);
                localStorage.setItem("version", version);
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
    } else {
        dispatch(listProvidersFailed("Could not retrieve providers from cache"));
    }
}
