import { r as request } from "../entry-server.js";
const getSystemInfo = () => {
  return request("/api/v1/admin/system");
};
export {
  getSystemInfo as g
};
