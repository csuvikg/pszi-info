const BASE_URL = "https://api.pszi.info.hu"
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
