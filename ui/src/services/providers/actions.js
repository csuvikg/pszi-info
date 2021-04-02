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
        dispatch(createProviderFailed(error.response));
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
    try {
        const {data} = await axios.get(routes.providers.list);
        dispatch(listProvidersSuccess(data));
    } catch (error) {
        dispatch(listProvidersFailed(error.response));
    }
}
