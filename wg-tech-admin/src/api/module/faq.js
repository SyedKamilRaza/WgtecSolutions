import ENDPOINTS from "../endpoint";
import api from "../index";

const createFaq = (payload) => api(ENDPOINTS.createFaq, payload, "post");

const updateFaq = (id, payload) =>
  api(`${ENDPOINTS.updateFaq}/${id}`, payload, "put");

const getFaq = (page = 1, limit = 10) => 
  api(ENDPOINTS.getAllFaq, null, "get", false, { page, limit });

const deleteFaq = (id) => api(`${ENDPOINTS.deleteFaq}/${id}`, null, "delete");

export { deleteFaq, getFaq, createFaq, updateFaq };
