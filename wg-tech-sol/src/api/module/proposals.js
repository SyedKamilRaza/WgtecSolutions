import ENDPOINTS from "../endPoint";
import api from "../index";

const createProposal = (data) => api(ENDPOINTS.createProposal, data, "post");
export { createProposal };
