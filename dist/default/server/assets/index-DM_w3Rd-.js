import { r as request } from "../entry-server.js";
const addUser = (body) => {
  return request(`/api/v1/admin/user/add`, {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const updateUser = (id, body) => {
  return request(`/api/v1/admin/user/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(body)
  });
};
const updateUserPermission = ({ ids, body }) => {
  return request(`/api/v1/admin/user/authreset`, {
    method: "PUT",
    body: JSON.stringify({
      ids,
      ...body
    })
  });
};
export {
  addUser as a,
  updateUser as b,
  updateUserPermission as u
};
