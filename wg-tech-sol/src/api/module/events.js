import ENDPOINTS from "../endPoint";
import api from "../index";

const getAllEvents = () => api(ENDPOINTS.getAllEvents, null, "get");
const getEventById = (id) => api(`${ENDPOINTS.getEventById}/${id}`, null, "get");

export { getAllEvents, getEventById };