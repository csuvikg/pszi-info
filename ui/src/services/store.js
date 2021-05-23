import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {ApplicationReducer} from "./application/reducer";
import {ArticlesReducer} from "./articles/reducer";
import {FiltersReducer} from "./filters/reducer";
import {ProvidersReducer} from "./providers/reducer";

export const configureStore = (initState = {}) => {
    return createStore(combineReducers({
        application: ApplicationReducer,
        articles: ArticlesReducer,
        filters: FiltersReducer,
        providers: ProvidersReducer
    }), initState, composeWithDevTools(applyMiddleware(thunk)));
};

export const store = configureStore();
