import {ACTIONS} from "../actions";

const initState = {
    isLoading: false,
    errorMessage: "",
    providers: []
};

export const ProvidersReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PROVIDER_REQUEST:
        case ACTIONS.LIST_PROVIDERS_REQUEST:
            return {
                ...state,
                errorMessage: "",
                isLoading: true
            };
        case ACTIONS.ADD_PROVIDER_FAILED:
        case ACTIONS.LIST_PROVIDERS_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                isLoading: false
            }
        case ACTIONS.ADD_PROVIDER_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false
            }
        case ACTIONS.LIST_PROVIDERS_SUCCESS:
            const {providers} = action;
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                providers
            }
        default:
            return state;
    }
}
