import {ACTIONS} from "../actions";

const initState = {
    isSidebarOpen: false
}

export const ApplicationReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.OPEN_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: true
            }
        case ACTIONS.CLOSE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: false
            }
        default:
            return state;
    }
}
