import api from "../index";
import ENDPOINTS from "../endpoint";

const createStory = (payload) => api(ENDPOINTS.createStory, payload, "post");

const updateStory = (id, payload) =>
  api(`${ENDPOINTS.updateStory}/${id}`, payload, "put");

const getStory = () => api(ENDPOINTS.getStory, null, "get");

const deleteStory = (id) =>
  api(`${ENDPOINTS.deleteStory}/${id}`, null, "delete");

export { getStory, updateStory, createStory, deleteStory };
