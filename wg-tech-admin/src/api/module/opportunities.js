import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllOpportunities = (page = 1, limit = 10) => 
  api(ENDPOINTS.getAllOpportunities, null, "get", false, { page, limit });

const createOpportunities = (payload) =>
  api(ENDPOINTS.createOpportunities, payload, "post");

const updateOpportunities = (id, payload) =>
  api(`${ENDPOINTS.updateOpportunities}/${id}`, payload, "put");

const deleteOpportunities = (id) =>
  api(`${ENDPOINTS.deleteOpportunities}/${id}`, null, "delete");

export { getAllOpportunities, createOpportunities, updateOpportunities, deleteOpportunities };
