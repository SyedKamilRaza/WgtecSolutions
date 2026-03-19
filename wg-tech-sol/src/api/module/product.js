import ENDPOINTS from "../endPoint";
import api from "../index";

const getAllProducts = () => api(ENDPOINTS.getAllProducts, null, "get");
const getProductById = (id) => api(`${ENDPOINTS.getProductById}/${id}`, null, "get");

export { getAllProducts, getProductById};