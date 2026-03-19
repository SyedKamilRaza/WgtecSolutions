import ENDPOINTS from "../endPoint";
import api from "../index";

const getAllWork = () => api(ENDPOINTS.getAllWork, null, "get");

export { getAllWork };
