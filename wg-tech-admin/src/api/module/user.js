import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllUsers = () => api(ENDPOINTS.getAllUsers, {}, "get");
const deleteUser = (id) => api(`${ENDPOINTS.deleteUser}/${id}`, {}, "delete");
const updateUser = (id, data) => api(`${ENDPOINTS.updateUser}/${id}`, data, "put");
const createUser = (data) => api(ENDPOINTS.createUser, data, "post");
const getUserById = (id) => api(`${ENDPOINTS.getUserById}/${id}`, {}, "get");
export { getAllUsers, deleteUser, updateUser, createUser, getUserById };