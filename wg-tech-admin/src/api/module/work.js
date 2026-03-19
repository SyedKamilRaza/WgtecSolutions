import ENDPOINTS from "../endpoint";
import api from "../index";

const optionGetWorkService = () => {
  return api(ENDPOINTS.optionGetWorkService, null, "get");
};

const optionGetWorkSubServiceById = (id) => {
  return api(`${ENDPOINTS.getSubServiceById}/${id}`, null, "get");
};
const getAllWork = (page = 1, limit = 10) => 
  api(ENDPOINTS.getAllWork, null, "get", false, { page, limit });

const createWork = (payload) => api(ENDPOINTS.createWork, payload, "post");

const updateWork = (id, payload) =>
  api(`${ENDPOINTS.updateWork}/${id}`, payload, "put");

const deleteWork = (id) => api(`${ENDPOINTS.deleteWork}/${id}`, null, "delete");




export {
  optionGetWorkService,
  optionGetWorkSubServiceById,
  createWork,
  updateWork,
  deleteWork,
  getAllWork,
};
