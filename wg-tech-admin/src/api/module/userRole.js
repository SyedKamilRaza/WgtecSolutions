import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllUserRole = () => api(ENDPOINTS.getAllUserRole, {}, "get");
const deleteUserRole = (id) => api(ENDPOINTS.deleteUserRole, { id }, "delete");
const updateUserRole = (id, data) =>
  api(`${ENDPOINTS.updateUserRole}/${id}`, data, "put");
const createUserRole = (data) => api(ENDPOINTS.createUserRole, data, "post");

export { getAllUserRole, deleteUserRole, updateUserRole, createUserRole };
