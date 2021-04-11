import {ACTIONS} from "../actions";

const initState = {
    isLoading: false,
    errorMessage: "",
    articles: []
};

export const ArticlesReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_ARTICLE_REQUEST:
        case ACTIONS.LIST_ARTICLES_REQUEST:
            return {
                ...state,
                errorMessage: "",
                isLoading: true
            };
        case ACTIONS.ADD_ARTICLE_FAILED:
        case ACTIONS.LIST_ARTICLES_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                isLoading: false
            }
        case ACTIONS.ADD_ARTICLE_SUCCESS:
            return {
                ...state,
                errorMessage: "",
                isLoading: false
            }
        case ACTIONS.LIST_ARTICLES_SUCCESS:
            const {articles} = action;
            return {
                ...state,
                errorMessage: "",
                isLoading: false,
                articles
            }
        default:
            return state;
    }
}
