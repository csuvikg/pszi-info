import {ACTIONS} from "../actions";

export const createProvider = provider => ({
    type: ACTIONS.ADD_PROVIDER,
    provider
});
