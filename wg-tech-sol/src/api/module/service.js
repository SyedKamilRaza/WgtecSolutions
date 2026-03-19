import ENDPOINTS from "../endPoint";
import api from "../index";

const getServices = () => api(ENDPOINTS.getServices, null, "get");
const getAllServices = () => api(ENDPOINTS.getAllServices, null, "get");
const getSubServicesbyServiceId = (serviceId) =>
  api(`${ENDPOINTS.getSubServicesbyServiceId}/${serviceId}`, null, "get");

export { getServices, getAllServices, getSubServicesbyServiceId  };
