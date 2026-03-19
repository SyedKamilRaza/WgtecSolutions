import api from "../index";
import ENDPOINTS from "../endpoint";

const fetchSettings = () => api(ENDPOINTS.fetchSettings, null, "get");

const updateSettings = (data) => api(ENDPOINTS.updateSettings, data, "put");

export { fetchSettings, updateSettings };
