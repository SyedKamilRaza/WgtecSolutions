import api from "../index";
import ENDPOINTS from "../endpoint";

const loginUser = (payload) => api(ENDPOINTS.loginUser, payload, "post");
export { loginUser };
