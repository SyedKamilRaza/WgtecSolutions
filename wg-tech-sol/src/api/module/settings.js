import ENDPOINTS from "../endPoint";
import api from "../index";

const getSettings = () => api(ENDPOINTS.getSetting, null, "get");  

export { getSettings }; 