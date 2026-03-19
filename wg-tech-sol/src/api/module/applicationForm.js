import api from "../index";
import ENDPOINTS from "../endPoint";

const createApplication = (data) =>
  api(ENDPOINTS.createApplication, data, "post");

export { createApplication };
