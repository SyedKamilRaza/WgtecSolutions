import ENDPOINTS from "../endpoint";
import api from "../index";

const getAllPhases = () => api(ENDPOINTS.getAllPhases, null, "get");
const createPhases = (payload) => api(ENDPOINTS.createPhases, payload, "post");

const updatePhases = (id, payload) =>
  api(`${ENDPOINTS.updatePhases}/${id}`, payload, "put");

const deletePhases = (id) =>
  api(`${ENDPOINTS.deletePhases}/${id}`, null, "delete");

export { createPhases, deletePhases, getAllPhases, updatePhases };

