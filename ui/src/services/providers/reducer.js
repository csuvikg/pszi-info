import {ACTIONS} from "../actions";

const initState = {};

export const ProvidersReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PROVIDER:
            return {
                ...state,
                provider: action.provider
            };
        default:
            return state;
    }
}
