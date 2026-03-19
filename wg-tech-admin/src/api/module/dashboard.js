import api from "../index";
import ENDPOINTS from "../endpoint";

const getDashboardData = (startDate = null, endDate = null) => {
  let url = ENDPOINTS.getDashboardData;
  const params = [];
  
  if (startDate) {
    params.push(`startDate=${startDate}`);
  }
  if (endDate) {
    params.push(`endDate=${endDate}`);
  }
  
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  
  return api(url, null, "get");
};

export { getDashboardData };