const SCHEME = "http"
const DOMAIN = "localhost"
const PORT = "8080"
const BASE_URL = `${SCHEME}://${DOMAIN}:${PORT}`
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
