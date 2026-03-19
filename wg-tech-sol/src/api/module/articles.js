import ENDPOINTS from "../endPoint";
import api from "../index";

const getAllArticles = () => api(ENDPOINTS.getAllArticles, null, "get");
const getArticleById = (id) => api(`${ENDPOINTS.getArticleById}/${id}`, null, "get");


export { getAllArticles, getArticleById};