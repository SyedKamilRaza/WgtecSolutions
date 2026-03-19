import ENDPOINTS from "../endPoint";
import api from "../index";

const getStory = () => api(ENDPOINTS.getStory, null, "get");

export { getStory };
