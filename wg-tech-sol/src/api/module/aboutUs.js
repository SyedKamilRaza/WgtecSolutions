import ENDPOINTS from "../endPoint";
import api from "../index";

const getAboutUs = () => api(ENDPOINTS.getAboutUs, null, "get");

export { getAboutUs };
