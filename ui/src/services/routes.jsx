const BASE_URL = `${process.env.REACT_APP_API_SCHEMA}://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`
const ARTICLES_PATH = "articles"
const PROVIDERS_PATH = "providers"

export const routes = {
    articles: {
        list: `${BASE_URL}/${ARTICLES_PATH}`,
        version: `${BASE_URL}/${ARTICLES_PATH}/version`
    },
    providers: {
        list: `${BASE_URL}/${PROVIDERS_PATH}`,
        version: `${BASE_URL}/${PROVIDERS_PATH}/version`
    }
}
