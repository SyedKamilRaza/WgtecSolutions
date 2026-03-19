import ENDPOINTS from "../endpoint";
import api from "../index";

const getAllAboutUS = (page = 1, limit = 10) => 
  api(ENDPOINTS.getAllAboutUS, null, "get", false, { page, limit });
const createAboutUS = (payload) =>
  api(ENDPOINTS.createAboutUS, payload, "post");

const updateAboutUs = (id, payload) =>
  api(`${ENDPOINTS.updateAboutUs}/${id}`, payload, "put");

const deleteAboutUS = (id) =>
  api(`${ENDPOINTS.deleteAboutUS}/${id}`, null, "delete");

export { getAllAboutUS, createAboutUS, updateAboutUs, deleteAboutUS };
