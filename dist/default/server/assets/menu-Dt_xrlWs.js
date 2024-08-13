import { r as request } from "../entry-server.js";
import { q as query2str } from "./common-ZcIx5rAG.js";
const getMenu = (query = {}, options = {}) => {
  return request(`/api/v1/menu?${query2str(query)}`, options);
};
export {
  getMenu as g
};
