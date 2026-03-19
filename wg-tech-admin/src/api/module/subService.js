import ENDPOINTS from "../endpoint";
import api from "../index";

const optionGetService = () =>
   api(ENDPOINTS.optionGetService, null, "get");

const getAllSubServices = (page = 1, limit = 10) => 
  api(ENDPOINTS.getAllSubServices, null, "get", false, { page, limit });
const createSubService = (payload) =>
  api(ENDPOINTS.createSubService, payload, "post");

const updateSubService = (id, payload) =>
  api(`${ENDPOINTS.updateSubService}/${id}`, payload, "put");

const deleteSubService = (id) =>
  api(`${ENDPOINTS.deleteSubService}/${id}`, null, "delete");

export {
  optionGetService,
  createSubService,
  updateSubService,
  deleteSubService,
  getAllSubServices,
};
