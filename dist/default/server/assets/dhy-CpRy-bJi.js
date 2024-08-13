import { r as request } from "../entry-server.js";
const getDHYProducts = (type) => {
  return request(`/api/v1/admin/products/${type}`);
};
const switchPluginStatus = ({ name, active }) => {
  return request("/api/v1/admin/product/plugin/switch", {
    method: "POST",
    body: JSON.stringify({ name, active })
  });
};
const installPlugin = (body) => {
  return request("/api/v1/admin/product/plugin/install", {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const uninstallPlugin = (body) => {
  return request(`/api/v1/admin/product/plugin/uninstall/${body.name}`, {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const setDefaultTemplate = ({ name }) => {
  return request("/api/v1/admin/product/template/setDefault", {
    method: "POST",
    body: JSON.stringify({ name })
  });
};
const installTemplate = (body) => {
  return request("/api/v1/admin/product/template/install", {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const updateLastestVersion = (body) => {
  return request("/api/v1/admin/product/app/install", {
    method: "POST",
    body: JSON.stringify(body)
  });
};
export {
  uninstallPlugin as a,
  setDefaultTemplate as b,
  installPlugin as c,
  getDHYProducts as g,
  installTemplate as i,
  switchPluginStatus as s,
  updateLastestVersion as u
};
