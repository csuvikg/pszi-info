const BASE_URL = "https://api.pszi.info.hu"

export const routes = {
    articles: {
        list: `${BASE_URL}/articles`,
        version: `${this.routes.articles.list}/version`
    },
    providers: {
        list: `${BASE_URL}/providers`,
        version: `${this.routes.providers.list}/version`
    }
}
