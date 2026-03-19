import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllReview = (page = 1, limit = 10) =>
  api(ENDPOINTS.getReview, null, "get", false, { page, limit });

const createReview = (payload) =>
  api(ENDPOINTS.createReview, payload, "post");

const updateReview = (id, payload) =>
  api(`${ENDPOINTS.updateReview}/${id}`, payload, "put");

const deleteReview = (id) =>
  api(`${ENDPOINTS.deleteReview}/${id}`, null, "delete");

export { getAllReview, createReview, updateReview, deleteReview };
