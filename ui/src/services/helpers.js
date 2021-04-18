export const getHeaders = () => {
    let headers = {"Content-Type": "application/json"};
    const id_token = localStorage.getItem("ID_TOKEN");
    if (id_token && id_token !== "") {
        headers["Authorization"] = `Bearer ${id_token}`
    }
    return headers;
}
