import { r as request } from "../entry-server.js";
import { q as query2str } from "./common-ZcIx5rAG.js";
const getEncodeSetting = (query, options = {}) => {
  return request(`/api/v1/admin/setting/encode?${query2str(query)}`, {
    ...options
  });
};
const setEncodeSetting = (body, options = {}) => {
  return request(`/api/v1/admin/setting/encode`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const getSitemap = () => {
  return request("/api/v1/admin/setting/0sitemap");
};
const resetSitemap = () => {
  return request("/api/v1/admin/setting/0sitemap", {
    method: "DELETE"
  });
};
const saveSitemap = (body) => {
  return request("/api/v1/admin/setting/0sitemap", {
    method: "PUT",
    body: JSON.stringify({ data: body })
  });
};
const addSitemapURLs = (body) => {
  return request("/api/v1/admin/setting/0sitemap", {
    method: "POST",
    body: JSON.stringify({ urls: body })
  });
};
const dhyAuth = (body) => {
  return request("/api/v1/admin/setting/auth", {
    method: "POST",
    body: JSON.stringify(body)
  });
};
export {
  getSitemap as a,
  addSitemapURLs as b,
  saveSitemap as c,
  dhyAuth as d,
  getEncodeSetting as g,
  resetSitemap as r,
  setEncodeSetting as s
};
