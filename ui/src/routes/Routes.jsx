const SCHEME = "http"
const DOMAIN = "localhost"
const PORT = "8080"
const BASE_URL = `${SCHEME}://${DOMAIN}:${PORT}`
const INSTITUTIONS_PATH = "institutions"

export const Routes = {
    institutions: {
        list: `${BASE_URL}/${INSTITUTIONS_PATH}`
    }
}
