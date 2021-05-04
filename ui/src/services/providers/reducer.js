import {ACTIONS} from "../actions";

const initState = {
    isLoading: false,
    errorMessage: "",
    providers: [],
    filters: [],
    filteredProviders: []
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
        case ACTIONS.FILTER_PROVIDERS:
            const {filters} = action;
            if (!filters || filters.length === 0) {
                return {
                    ...state,
                    filters,
                    filteredProviders: state.providers
                }
            } else {
                const combinedFilters = new Map();
                filters.forEach(({filterBy, filter}) => combinedFilters.has(filterBy)
                    ? combinedFilters.get(filterBy).push(filter)
                    : combinedFilters.set(filterBy, [filter]));

                return {
                    ...state,
                    filters,
                    filteredProviders: state.providers.filter(p => {
                        let eacc = true;
                        for (let fs of combinedFilters.values()) {
                            let iacc = false;
                            for (let f of fs) {
                                iacc = iacc || f(p);
                            }
                            eacc = eacc && iacc;
                            if (eacc === false) {
                                return false;
                            }
                        }
                        return eacc;
                    })
                }
            }
        default:
            return state;
    }
}
