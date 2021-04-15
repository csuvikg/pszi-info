const BASE_URL = `${process.env.API_SCHEMA}://${process.env.API_DOMAIN}:${process.env.API_PORT}`
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
