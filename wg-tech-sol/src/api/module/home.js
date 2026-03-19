import ENDPOINTS from "../endPoint";
import api from "../index";

const getHomeData = () => api(ENDPOINTS.getHomeData, null, "get");  

export { getHomeData }; 