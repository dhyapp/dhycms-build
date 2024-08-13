import { r as request } from "../entry-server.js";
import { s as sleep, q as query2str } from "./common-ZcIx5rAG.js";
import { message } from "ant-design-vue";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
const checkIsRestart = async ({ maxRetry = 10, baseUrl = "" }) => {
  const checkHandle = () => {
    return new Promise((resolve) => {
      try {
        fetch(`${baseUrl}/api/v1/__dhycms_restart_heart`).then(async (res) => await res.text()).then((res) => {
          res == 1 ? resolve(true) : resolve(false);
        }).catch(() => {
          resolve(false);
        });
      } catch (e) {
        resolve(false);
      }
    });
  };
  for (let i = 0; i < maxRetry; i++) {
    const ok = await checkHandle();
    if (ok)
      return true;
    else
      await sleep(5e3);
  }
  return false;
};
const addSite = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/add", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const stopSite = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1stop", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const startSite = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1start", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const restartSite = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1restart", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const deleteSite = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1del", {
    method: "DELETE",
    body: JSON.stringify(body),
    ...options
  });
};
const syncSitesSave = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1sync", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const restartAllActivedSites = () => {
  return new Promise(async (resolve, reject) => {
    const hide = message.loading("系统重启中...");
    try {
      await request("/api/v1/admin/sites/1restartall", {
        method: "POST"
      }).then(async () => {
        await checkIsRestart({}).then(() => {
          message.success("系统重启成功");
          resolve();
        }).catch((e) => {
          const msg = (e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "系统重启失败";
          message.error(msg);
          reject(e);
        });
      });
    } finally {
      hide();
    }
  });
};
const restartThisSite = () => {
  return new Promise(async (resolve, reject) => {
    const hide = message.loading("站点重启中...");
    try {
      const ssrStore = useSsrFetch();
      restartSite({ name: ssrStore.appname });
      await checkIsRestart({}).then(() => {
        message.success("站点重启成功");
        resolve();
      }).catch((e) => {
        const msg = (e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "系统重启失败";
        message.error(msg);
        reject(e);
      });
    } finally {
      hide();
    }
  });
};
const updateDomains = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1domain", {
    method: "PUT",
    body: JSON.stringify(body),
    ...options
  });
};
const updateNginx = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1nginx", {
    method: "PUT",
    body: JSON.stringify(body),
    ...options
  });
};
const getNginx = (query) => {
  return request(`/api/v1/admin/sites/1nginx?${query2str(query)}`);
};
const setSSL = (body = {}, options = {}) => {
  return request("/api/v1/admin/sites/1ssl", {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
export {
  restartAllActivedSites as a,
  updateNginx as b,
  setSSL as c,
  stopSite as d,
  startSite as e,
  restartSite as f,
  getNginx as g,
  deleteSite as h,
  addSite as i,
  restartThisSite as r,
  syncSitesSave as s,
  updateDomains as u
};
