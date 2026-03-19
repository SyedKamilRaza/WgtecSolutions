import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllAdvertisement = (page = 1, limit = 10) => 
  api(ENDPOINTS.getAllAdvertisement, null, "get", false, { page, limit });

const createAdvertisement = (payload) =>
  api(ENDPOINTS.createAdvertisement, payload, "post");

const updateAdvertisement = (id, payload) =>
  api(`${ENDPOINTS.updateAdvertisement}/${id}`, payload, "put");

const deleteAdvertisement = (id) =>
  api(`${ENDPOINTS.deleteAdvertisement}/${id}`, null, "delete");

export { getAllAdvertisement, createAdvertisement, updateAdvertisement, deleteAdvertisement };
