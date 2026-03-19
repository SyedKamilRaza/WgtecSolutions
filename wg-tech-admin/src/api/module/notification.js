import api from "../index";
import ENDPOINTS from "../endpoint";

const getNotifications = () => api(ENDPOINTS.getNotifications, null, "get");
const acceptNotification = (id) =>
  api(`${ENDPOINTS.acceptNotification}/${id}`, null, "put");
const rejectNotification = (id) =>
  api(`${ENDPOINTS.rejectNotification}/${id}`, null, "put");

export { getNotifications, acceptNotification, rejectNotification };
