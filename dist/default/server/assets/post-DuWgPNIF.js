import { r as request } from "../entry-server.js";
import { q as query2str } from "./common-ZcIx5rAG.js";
const getPosts = (query = {}) => {
  return request(`/api/v1/posts?${query2str(query)}`);
};
const getPost = (id) => {
  return request(`/api/v1/post/${id}`);
};
export {
  getPost as a,
  getPosts as g
};
