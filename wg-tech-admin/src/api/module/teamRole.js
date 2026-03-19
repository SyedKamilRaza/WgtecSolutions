import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllTeamRole = () => api(ENDPOINTS.getAllTeamRole, "get");

const createTeamRole = (payload) =>
  api(ENDPOINTS.createTeamRole, payload, "post");

const updateTeamRole = (id, payload) =>
  api(`${ENDPOINTS.updateTeamRole}/${id}`, payload, "put");

const deleteTeamRole = (id) =>
  api(`${ENDPOINTS.deleteTeamRole}/${id}`, null, "delete");

export { getAllTeamRole, createTeamRole, updateTeamRole, deleteTeamRole };
