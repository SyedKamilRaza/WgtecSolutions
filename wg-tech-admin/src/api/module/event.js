import api from "../index";
import ENDPOINTS from "../endpoint";

const getAllUpcomingEvents = () =>
     api(ENDPOINTS.getAllUpcomingEvents, null, "get");

const getAllArchiveEvents = () =>
     api(ENDPOINTS.getAllArchiveEvents, null, "get");

const getAllEvents = (page = 1, limit = 10) =>
      api(ENDPOINTS.getAllEvents, null, "get", false, { page, limit });

const createEvents = (payload) =>
  api(ENDPOINTS.createEvents, payload, "post");

const updateEvents = (id, payload) =>
  api(`${ENDPOINTS.updateEvents}/${id}`, payload, "put");

const deleteEvents = (id) =>
  api(`${ENDPOINTS.deleteEvents}/${id}`, null, "delete");

export {
  getAllUpcomingEvents,
  getAllArchiveEvents,
  getAllEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};
