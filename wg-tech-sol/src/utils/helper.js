import { baseUrl } from "../api/index";

export const upload = async (file, options = {}) => {
  const { endpoint = "v1/upload/file", fieldName = "file" } = options;
  const files = Array.isArray(file) ? file : [file];

  const results = await Promise.all(
    files.map(async (f) => {
      const formData = new FormData();
      formData.append(fieldName, f);

      const token = localStorage.getItem("token");
      const response = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      // Check response structure: data.data.url or data.url
      return data.data?.url || data.url || data.secure_url || null;
    })
  );

  return Array.isArray(file) ? results : results[0];
};