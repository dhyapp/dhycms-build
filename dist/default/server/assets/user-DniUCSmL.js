import { u as useGLobalStore, r as request } from "../entry-server.js";
const login = (body, error) => {
  return request("/api/v1/signin", {
    method: "POST",
    body: JSON.stringify(body),
    error
  });
};
const logout = () => {
  const globalStore = useGLobalStore();
  return request("/api/v1/signout").then((res) => {
    globalStore.user = {};
    return res;
  });
};
const updatePwd = (body) => {
  return request("/api/v1/uhub/pwd", {
    method: "PUT",
    body: JSON.stringify(body)
  });
};
const updateUsername = (body) => {
  return request("/api/v1/uhub/username", {
    method: "PUT",
    body: JSON.stringify(body)
  });
};
const getProfile = async (body, options = {}) => {
  const globalStore = useGLobalStore();
  const res = await request("/api/v1/uhub", options);
  if (res._id)
    globalStore.user = res;
  return res;
};
export {
  login as a,
  updatePwd as b,
  getProfile as g,
  logout as l,
  updateUsername as u
};
