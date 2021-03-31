import {ACTIONS} from "../actions";

const initState = {
    isLoading: false
};

export const ProvidersReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PROVIDER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case ACTIONS.ADD_PROVIDER_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                isLoading: false
            }
        case ACTIONS.ADD_PROVIDER_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}
