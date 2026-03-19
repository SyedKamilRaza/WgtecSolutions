import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllAppliedForms = (page = 1, limit = 10) =>
  api(ENDPOINTS.getAllAppliedForms, null, "get", false, { page, limit });

const updateStatus = (id, status) =>
  api(`${ENDPOINTS.updateStatus}/${id}`, { status }, "put");

const getAppliedFormById = (id) =>
  api(`${ENDPOINTS.getAppliedFormById}/${id}`, null, "get");

export { getAllAppliedForms, updateStatus, getAppliedFormById };

