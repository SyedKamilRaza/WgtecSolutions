import ENDPOINTS from "../endPoint";
import api from "../index";

const getOpportunitiesData = () => api(ENDPOINTS.getOpportunitiesData, null, "get");

export { getOpportunitiesData };