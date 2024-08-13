import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import os from "os";
const getLocalIP = () => {
  const osType = os.type();
  const netInfo = os.networkInterfaces();
  let ip = "";
  if (osType === "Windows_NT") {
    for (let dev in netInfo) {
      if (dev === "本地连接" || dev === "以太网") {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === "IPv4") {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }
  } else if (osType === "Linux") {
    ip = netInfo.eth0[0].address;
  } else
    ;
  return ip;
};
const asyncData = async ({ store, server, ctx }) => {
  var _a, _b, _c, _d, _e;
  const ssrStore = useSsrFetch(store);
  const globalStore = useGLobalStore(store);
  const [cloud, sites] = await Promise.all([
    server.db.ego.models.Setting.findOne({ key: "cloud" }).catch((e) => console.error(e)),
    server.db.common.models.Sites.find({ status: "active" }).catch((e) => console.error(e))
  ]);
  try {
    if (cloud == null ? void 0 : cloud.value) {
      const staticDomains = ((_a = cloud.value.staticDomains) == null ? void 0 : _a.split("\n")) || [];
      const sdIdx = Math.floor(Math.random() * staticDomains.length);
      globalStore.cloud = {
        tgDomain: ((_b = server.config.tgBot) == null ? void 0 : _b.gateway) || "",
        staticDomain: staticDomains[sdIdx] || "",
        key: cloud.value.secret,
        encoded: cloud.value.encoded,
        type: cloud.value.type
      };
      if ((_c = ctx.state) == null ? void 0 : _c.preadmin) {
        globalStore.cloud.tgToken = ((_d = cloud.value) == null ? void 0 : _d.tgToken) || "";
        globalStore.cloud.tgChatID = ((_e = cloud.value) == null ? void 0 : _e.tgChatID) || "";
        globalStore.cloud.types = server.config.cloud.fileTypes || {};
      }
    }
    globalStore.siteinfo = server.siteInfo || {};
  } catch (e) {
    console.error(e);
  }
  if (server.authInfo) {
    try {
      globalStore.webID = server.authInfo.umamiWebID;
      globalStore.authLevel = server.authInfo.authLevel;
    } catch (e) {
      console.warn("Parse Umami webID failed.");
      console.warn(e);
    }
  }
  if (ctx.state.preadmin) {
    const localIP = getLocalIP();
    globalStore.user = ctx.state.user || {};
    ssrStore.appname = ctx.state.appname;
    ssrStore.config.dhy = server.config.dhy;
    ssrStore.templates = server.templates;
    ssrStore.roleAuth = ctx.state.roleAuth;
    ssrStore.plugins = server.plugins || [];
    ssrStore.localIP = localIP;
    ssrStore.sites = (sites == null ? void 0 : sites.map((v) => {
      if (v.domains) {
        v.domains = v.domains.split("\n");
        v._doc.origin += `https://${v.domains[0]}`;
      } else {
        v._doc.origin = `http://${localIP}:${v.port}`;
      }
      return v;
    })) || [];
  }
};
export {
  asyncData as a
};
