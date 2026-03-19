import axios from "axios";

export let baseUrl = "http://localhost:8003/api/";

const api = async (path, params, method, isMultipart = false) => {
let userToken = localStorage.getItem("token");

const headers = {
...(userToken && { Authorization: `Bearer ${userToken}` }),
};

// Only set JSON header when not uploading files
if (!isMultipart) {
headers["Content-Type"] = "application/json";
}

const options = {
headers,
method,
...(params && { data: params }), // no JSON.stringify
};

try {
const response = await axios(baseUrl + path, options);
return response;
} catch (error) {
console.error("❌ API Error:", error);
return error.response || { status: 500, data: { message: "Unknown error" } };
}
};

export default api;
