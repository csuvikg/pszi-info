const SCHEME = "http"
const DOMAIN = "localhost"
const PORT = "8080"
const BASE_URL = `${SCHEME}://${DOMAIN}:${PORT}`
const PROVIDERS_PATH = "providers"

export const routes = {
    providers: {
        list: `${BASE_URL}/${PROVIDERS_PATH}`,
        version: `${BASE_URL}/${PROVIDERS_PATH}/version`
    }
}
