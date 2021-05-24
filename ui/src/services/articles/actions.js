import {ACTIONS} from "../actions";
import {routes} from "../routes";
import {getHeaders} from "../helpers";
import dayjs from "dayjs";

const createArticleRequest = () => ({
    type: ACTIONS.ADD_ARTICLE_REQUEST
});

const createArticleFailed = errorMessage => ({
    type: ACTIONS.ADD_ARTICLE_FAILED,
    errorMessage
});

const createArticleSuccess = () => ({
    type: ACTIONS.ADD_ARTICLE_SUCCESS
});

export const createArticle = article => async dispatch => {
    dispatch(createArticleRequest());
    try {
        await fetch(routes.articles.list, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(article)
        });
        dispatch(createArticleSuccess())
    } catch (error) {
        dispatch(createArticleFailed(error.message));
    }
}

const listArticlesRequest = () => ({
    type: ACTIONS.LIST_ARTICLES_REQUEST
});

const listArticlesFailed = errorMessage => ({
    type: ACTIONS.LIST_ARTICLES_FAILED,
    errorMessage
});

const listArticlesSuccess = articles => ({
    type: ACTIONS.LIST_ARTICLES_SUCCESS,
    articles
});

export const listArticles = () => async dispatch => {
    dispatch(listArticlesRequest());
    const cache = await caches.open("articles");
    if (navigator.onLine) {
        try {
            const response = await fetch(routes.articles.version);
            const {version} = await response.json();
            const {version: localVersion, downloadedAt} = JSON.parse(localStorage.getItem("articles_version"));

            if (version !== parseInt(localVersion) || dayjs().format("YYYYMMDD") !== downloadedAt) {
                await cache.add(routes.articles.list);
                localStorage.setItem("articles_version", JSON.stringify({
                    version,
                    downloadedAt: dayjs().format("YYYYMMDD")
                }));
            }
        } catch (error) {
            // todo: handle
            console.log(error.message);
        }
    }
    const response = await cache.match(routes.articles.list);
    if (response) {
        const data = await response.json();
        dispatch(listArticlesSuccess(data));
    } else {
        dispatch(listArticlesFailed("Could not retrieve articles from cache"));
    }
}
