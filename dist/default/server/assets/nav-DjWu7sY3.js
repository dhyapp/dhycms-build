import { d as decrypt, r as request } from "../entry-server.js";
const navExport = (body = [], options = {}) => {
  return request("/api/v1/admin/nav/export", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const navImport = (formdata) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(decrypt(xhr.response));
          if (res.err) {
            reject(res);
          } else {
            resolve(res);
          }
        } catch (e) {
          console.error(e);
          reject(e);
        }
      } else {
        reject({ msg: xhr.statusText });
      }
    };
    xhr.open("post", "/api/v1/admin/nav/import");
    xhr.send(formdata);
  });
};
export {
  navExport as a,
  navImport as n
};
