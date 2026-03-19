import ENDPOINTS from "../endPoint";
import api from "../index";

const getAllBlogs = () => api(ENDPOINTS.getAllBlogs, null, "get");
const getBlogById = (id) => api(`${ENDPOINTS.getBlogById}/${id}`, null, "get");

export { getAllBlogs, getBlogById };
