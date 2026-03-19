import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllArticles = (page = 1, limit = 10) =>
     api(ENDPOINTS.getAllArticles, null, "get", false, { page, limit });

const getAllBlogs = (page = 1, limit = 10) =>
     api(ENDPOINTS.getAllBlogs, null, "get", false, { page, limit });

const getAllProducts = (page = 1, limit = 10) => 
    api(ENDPOINTS.getAllProducts, null, "get", false, { page, limit });

const getAllResources = () =>
      api(ENDPOINTS.getAllResources, null, "get");

const createResource = (payload) =>
  api(ENDPOINTS.createResource, payload, "post");

const updateResource = (id, payload) =>
  api(`${ENDPOINTS.updateResource}/${id}`, payload, "put");

const deleteResource = (id) =>
  api(`${ENDPOINTS.deleteResource}/${id}`, null, "delete");

export {
  getAllArticles,
  getAllBlogs,
  getAllProducts,
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
};
