import {ACTIONS} from "../actions";

const initState = {
    cityValues: [],
    targetGroupsValues: [],
    mustBeOpen: false,
    mustHavePhoneNumber: false,
    mustHaveEmailAddress: false,
    mustHaveWebsite: false,
    isReservationNeededValues: [],
    isReferralNeededValues: [],
    acceptsUrgentCasesValues: [],
    waitingListValues: [],
    search: ""
};

export const FiltersReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.CLEAR_FILTERS:
            return initState;
        case ACTIONS.UPDATE_FILTERS:
            const {filters} = action;
            return filters;
        default:
            return state;
    }
}
