import {ACTIONS} from "../actions";

const initState = {
    cities: [],
    errorMessage: "",
    filteredProviders: [],
    filters: [],
    isLoading: false,
    providers: [],
    shouldFlyToUserPosition: false,
    targetProvider: null
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
            let cities = [...new Set(providers.filter(p => p.address && p.address.city).map(p => p.address.city))];
            cities.sort();
            cities = cities.map(city => ({label: city, value: city}));
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                providers,
                cities
            }
        case ACTIONS.FILTER_PROVIDERS:
            const {filters} = action;
            if (filters.length === 0) {
                return {
                    ...state,
                    filteredProviders: state.providers
                }
            } else {
                return {
                    ...state,
                    filters,
                    filteredProviders: state.providers.filter(p => filters.every(f => f(p)))
                }
            }
        case ACTIONS.FLY_TO_USER_POSITION_START:
            return {
                ...state,
                shouldFlyToUserPosition: true
            }
        case ACTIONS.FLY_TO_USER_POSITION_FINISH:
            return {
                ...state,
                shouldFlyToUserPosition: false
            }
        case ACTIONS.FLY_TO_PROVIDER_START:
            return {
                ...state,
                targetProvider: action.id
            }
        case ACTIONS.FLY_TO_PROVIDER_FINISH:
            return {
                ...state,
                targetProvider: null
            }
        default:
            return state;
    }
}
