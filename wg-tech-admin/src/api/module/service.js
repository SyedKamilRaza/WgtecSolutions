import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllServices = (page = 1, limit = 10) =>
  api(ENDPOINTS.getAllServices, null, "get", false, { page, limit });

const createService = (payload) =>
  api(ENDPOINTS.createService, payload, "post");

const updateService = (id, payload) =>
  api(`${ENDPOINTS.updateService}/${id}`, payload, "put");

const deleteService = (id) =>
  api(`${ENDPOINTS.deleteService}/${id}`, null, "delete");


export {getAllServices, createService, updateService, deleteService};