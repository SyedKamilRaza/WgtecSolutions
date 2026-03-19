import api from "../index";
import ENDPOINTS from "../endpoint";

const getRollOptions = () => 
    api(ENDPOINTS.getRollOptions, null, "get");

const createOurTeam = (payload) =>
  api(ENDPOINTS.createOurTeam, payload, "post");

const updateOurTeam = (id, payload) =>
  api(`${ENDPOINTS.updateOurTeam}/${id}`, payload, "put");

const getOurTeam = (page = 1, limit = 10) => 
  api(ENDPOINTS.getOurTeam, null, "get", false, { page, limit });

const deleteOurTeam = (id) =>
  api(`${ENDPOINTS.deleteOurTeam}/${id}`, null, "delete");

export {
  getRollOptions,
  createOurTeam,
  updateOurTeam,
  getOurTeam,
  deleteOurTeam,
};
