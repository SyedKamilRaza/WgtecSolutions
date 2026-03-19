import api from "../index";

export const getProfile = () => api("v1/users/profile", null, "GET");

export const updateProfile = (data) => api("v1/users/profile", data, "PUT");

export const updateProfilePicture = (data) =>
  api("v1/users/profile/picture", data, "PUT", true); // multipart