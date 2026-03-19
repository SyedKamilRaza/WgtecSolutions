import axios from "axios";

// Locally run this
export let baseUrl = "http://localhost:8003/api/";
// export let baseUrl = "https://wg-tech-sol-backend.vercel.app/api/";

const api = async (path, params, method, isMultipart = false, queryParams = null) => {
  const userToken = localStorage.getItem("token");

  // Build URL with query parameters
  let url = baseUrl + path;
  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += (url.includes("?") ? "&" : "?") + queryString;
  }

  // Prepare headers
  const headers = {};
  if (userToken) headers.Authorization = `Bearer ${userToken}`;
  if (!isMultipart) headers["Content-Type"] = "application/json"; // ✅ Only for JSON

  const options = {
    method,
    headers,
    ...(params && { data: isMultipart ? params : JSON.stringify(params) }),
  };

  try {
    const response = await axios(url, options);
    return response;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    return error.response || { status: 500, data: { message: "Unknown error" } };
  }
};

export default api;