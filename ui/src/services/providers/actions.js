import {ACTIONS} from "../actions";
import axios from "axios";
import {routes} from "../routes";

export const createProviderRequest = () => ({
    type: ACTIONS.ADD_PROVIDER_REQUEST
});

export const createProviderFailed = errorMessage => ({
    type: ACTIONS.ADD_PROVIDER_FAILED,
    errorMessage
});

export const createProviderSuccess = () => ({
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
