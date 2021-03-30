import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProvidersReducer} from "./providers/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const configureStore = (initState = {}) => {
    return createStore(combineReducers({
        providers: ProvidersReducer
    }), initState, composeWithDevTools(applyMiddleware(thunk)));
};

export const store = configureStore();
