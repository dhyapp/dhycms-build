import { basename } from "node:path";
import { ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, renderToString } from "vue/server-renderer";
import { computed, defineAsyncComponent, shallowRef, watch, onBeforeMount, resolveComponent, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, KeepAlive, createCommentVNode, useSSRContext, createSSRApp } from "vue";
import { useRoute, createRouter as createRouter$1, createMemoryHistory, createWebHistory } from "vue-router";
import { ConfigProvider } from "ant-design-vue";
import { defineStore, createPinia } from "pinia";
import CryptoJS from "crypto-js";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const useGLobalStore = defineStore("global", {
  state: () => {
    return {
      _ssrLoaded: false,
      version: "1.0.0",
      isMobile: false,
      installed: true,
      locale: {},
      theme: "light",
      appearance: {},
      webID: "",
      authLevel: 0,
      user: {},
      preadmin: "",
      template: "default",
      menu: [],
      siteinfo: {},
      notice: {},
      thirdstat: {},
      cloud: {}
    };
  },
  actions: {
    // 全局预取数据，仅在服务端执行
    async ssrDataInit({ ctx }) {
      this.preadmin = ctx.state.preadmin;
      this.template = ctx.state.template;
      this.installed = ctx.state.installed;
      this.version = ctx.state.version;
      this.siteinfo = ctx.state.siteinfo;
      const queue = [];
      await Promise.allSettled(queue);
    },
    permission(authkey) {
      if (!authkey)
        return true;
      let { editabledRoleAuth, id, viewabledRoleAuth } = this.user;
      if (id == 1e4)
        return true;
      const editable = editabledRoleAuth.includes(authkey);
      const viewable = viewabledRoleAuth.includes(authkey);
      if (viewable || editable)
        return true;
      return;
    }
  }
});
const _sfc_main$2 = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const route = useRoute();
    const antTheme = {};
    const theme = computed({
      get() {
        return globalStore.theme;
      },
      set(v) {
        globalStore.theme = v;
      }
    });
    const layoutComponents = {
      "Default": defineAsyncComponent(() => import("./assets/Default-C0dBdqb8.js")),
      "Blank": defineAsyncComponent(() => import("./assets/Blank-DMuCe5mI.js")),
      "Admin": defineAsyncComponent(() => import("./assets/Admin-CGqD8Dan.js")),
      "Install": defineAsyncComponent(() => import("./assets/Install-CIW4RAfW.js"))
    };
    const curLayoutComponent = shallowRef(layoutComponents[route.meta.layout || "Default"]);
    watch(() => route.path, () => {
      curLayoutComponent.value = layoutComponents[route.meta.layout || "Default"];
    });
    onBeforeMount(() => {
      theme.value = localStorage.getItem("theme") || "light";
      document.body.setAttribute("theme", theme.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(ssrRenderComponent(unref(ConfigProvider), mergeProps({
        theme: antTheme,
        locale: unref(globalStore).locale
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(curLayoutComponent.value), {
              hideTab: unref(route).meta.hideTab
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_router_view, null, {
                    default: withCtx(({ Component, route: comRoute }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(``);
                        if (comRoute.meta.keepAlive) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(Component), {
                            key: comRoute.name
                          }, null), _parent4, _scopeId3);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (!comRoute.meta.keepAlive) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(Component), {
                            key: comRoute.name
                          }, null), _parent4, _scopeId3);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          (openBlock(), createBlock(KeepAlive, null, [
                            comRoute.meta.keepAlive ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                              key: comRoute.name
                            })) : createCommentVNode("", true)
                          ], 1024)),
                          !comRoute.meta.keepAlive ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                            key: comRoute.name
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_router_view, null, {
                      default: withCtx(({ Component, route: comRoute }) => [
                        (openBlock(), createBlock(KeepAlive, null, [
                          comRoute.meta.keepAlive ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                            key: comRoute.name
                          })) : createCommentVNode("", true)
                        ], 1024)),
                        !comRoute.meta.keepAlive ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                          key: comRoute.name
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(curLayoutComponent.value), {
                hideTab: unref(route).meta.hideTab
              }, {
                default: withCtx(() => [
                  createVNode(_component_router_view, null, {
                    default: withCtx(({ Component, route: comRoute }) => [
                      (openBlock(), createBlock(KeepAlive, null, [
                        comRoute.meta.keepAlive ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                          key: comRoute.name
                        })) : createCommentVNode("", true)
                      ], 1024)),
                      !comRoute.meta.keepAlive ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
                        key: comRoute.name
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["hideTab"]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useRoutes = ({ ssr, server }) => {
  var _a;
  const globalStore = useGLobalStore();
  let template = ssr ? ((_a = server.config) == null ? void 0 : _a.template) || "" : globalStore.template;
  const appInstalled = ssr ? server.installed || "" : globalStore.installed;
  const layoutName = template ? `${template[0].toUpperCase()}${template.slice(1)}` : "Default";
  const routes = appInstalled ? [
    {
      path: "/",
      name: "home",
      component: () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../views/dark/index.vue": () => import("./assets/index-BmYciPDM.js"), "../views/default/index.vue": () => import("./assets/index-DQQO_tdb.js") }), `../views/${template}/index.vue`),
      meta: { title: "首页", layout: layoutName, keepAlive: true }
    },
    {
      path: "/autoin",
      name: "autoin",
      component: () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../views/default/autoin.vue": () => import("./assets/autoin-B6snvHrx.js") }), `../views/${template}/autoin.vue`),
      meta: { title: "友链自助收录", layout: layoutName }
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../views/default/post.vue": () => import("./assets/post-C25oo4Yh.js") }), `../views/${template}/post.vue`),
      meta: { title: "文章详情", layout: layoutName }
    },
    {
      path: "/404",
      name: "404",
      component: () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../views/admin/404.vue": () => import("./assets/404-DW8aj2ZW.js"), "../views/default/404.vue": () => import("./assets/404-DjEoUjwt.js") }), `../views/${template}/404.vue`),
      meta: { title: "找不到页面 - 404", layout: layoutName }
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
      hidden: true
    }
  ] : [
    {
      path: "/_install",
      name: "_install",
      component: () => import("./assets/install-BjTgZ_WA.js"),
      meta: { title: "安装引导-导航蚁", layout: "Install" }
    },
    {
      path: "/404",
      name: "404",
      component: () => import("./assets/404-ByyEqMCR.js"),
      meta: { title: "找不到页面 - 404", layout: "Install" }
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
      hidden: true
    }
  ];
  return routes;
};
const useAdminMenu = (preadmin) => {
  const globalStore = useGLobalStore();
  preadmin = preadmin ?? globalStore.preadmin;
  return [
    { name: "控制台", to: `/${preadmin}`, icon: "dashboard", component: () => import("./assets/index-D-eWpS3b.js") },
    { name: "链接管理", to: `/${preadmin}/nav`, icon: "link", component: () => import("./assets/index-Cpqd9b4Q.js"), meta: { authkey: "nav", keepAlive: true } },
    { name: "文章管理", to: `/${preadmin}/post`, icon: "edit", component: () => import("./assets/index-CttLaz0Z.js"), meta: { authkey: "post", keepAlive: true } },
    { name: "菜单分类", to: `/${preadmin}/menu`, icon: "category", component: () => import("./assets/index-DTpt_b7t.js"), meta: { authkey: "menu" } },
    { name: "自助收录", to: `/${preadmin}/selfreg`, icon: "friendlink", component: () => import("./assets/index-BPw7eejv.js"), meta: { authkey: "selfreg", keepAlive: true } },
    { name: "广告推广", to: `/${preadmin}/ads`, icon: "coins-fill", component: () => import("./assets/index-C4nc9eso.js"), meta: { keepAlive: true, authkey: "ad" } },
    { name: "统计报表", to: `/${preadmin}/stat`, icon: "areachart", component: () => import("./assets/index-BXiCiWIq.js"), meta: { authkey: "stat" }, children: [
      {
        path: "visit/:metric",
        meta: { title: "访问统计", authkey: "stat" },
        component: () => import("./assets/index-CfrPGFmo.js"),
        to: `/${preadmin}/stat/visit/url`
      },
      {
        path: "nav/:code?",
        meta: { title: "链接报表", authkey: "stat" },
        component: () => import("./assets/index-DbKCWieb.js"),
        to: `/${preadmin}/stat/nav`
      }
    ] },
    { name: "插件管理", to: `/${preadmin}/plugins`, icon: "plugin", notice: 0, noticeType: "success", component: () => import("./assets/index-HwAk4DfF.js"), meta: { authkey: "plugin" } },
    { name: "模板管理", to: `/${preadmin}/templates`, icon: "layout", notice: 0, noticeType: "success", component: () => import("./assets/index-DrQFRY8g.js"), meta: { authkey: "template" } },
    { name: "用户管理", to: `/${preadmin}/users`, icon: "group", component: () => import("./assets/index-Djhy_DS0.js"), meta: { authkey: "user" } },
    { name: "安全", to: `/${preadmin}/security`, redirect: `/${preadmin}/security/ipblacklist`, icon: "security-fill", meta: { authkey: "security" }, children: [
      {
        path: "ipblacklist",
        meta: { title: "IP黑名单", authkey: "security" },
        component: () => import("./assets/ip-rA39U8Bb.js"),
        to: `/${preadmin}/security/ipblacklist`
      },
      {
        path: "domainblacklist",
        meta: { title: "域名黑名单", authkey: "security" },
        component: () => import("./assets/domain-ACIg7yIh.js"),
        to: `/${preadmin}/security/domainblacklist`
      }
    ] },
    { name: "云盘", to: `/${preadmin}/cloud`, icon: "cloud", component: () => import("./assets/index-BgaKQHMe.js"), meta: { authkey: "clouddisk" } },
    { name: "日志", to: `/${preadmin}/logs`, icon: "searchfile", noticeType: "error", component: () => import("./assets/index-DgupM2nj.js"), meta: { authkey: "log" } },
    { name: "系统设置", to: `/${preadmin}/setting`, icon: "setting", component: () => import("./assets/index-B4jJST9S.js"), meta: { authkey: "setting" }, children: [
      {
        path: "siteinfo",
        meta: { title: "站点信息", meta: { authkey: "setting" } },
        component: () => import("./assets/siteinfo-B5AgsRzf.js"),
        to: `/${preadmin}/setting/siteinfo`
      },
      {
        path: "auth",
        meta: { title: "官方授权", meta: { authkey: "setting" } },
        component: () => import("./assets/auth-C5DQD-Nc.js"),
        to: `/${preadmin}/setting/auth`
      },
      {
        path: "selfreg",
        meta: { title: "自助收录", meta: { authkey: "setting" } },
        component: () => import("./assets/selfreg-D0B7RSnM.js"),
        to: `/${preadmin}/setting/selfreg`
      },
      {
        path: "notice",
        meta: { title: "公告", meta: { authkey: "setting" } },
        component: () => import("./assets/notice-zI-6BAiD.js"),
        to: `/${preadmin}/setting/notice`
      },
      {
        path: "thirdstat",
        meta: { title: "第三方统计", meta: { authkey: "setting" } },
        component: () => import("./assets/thirdstat-CvMLWcjZ.js"),
        to: `/${preadmin}/setting/thirdstat`
      },
      {
        path: `cloud`,
        meta: { title: "云盘", meta: { authkey: "setting" } },
        component: () => import("./assets/cloud-39dE5-Lm.js"),
        to: `/${preadmin}/setting/cloud`
      },
      {
        path: `sitemap`,
        meta: { title: "网站地图", meta: { authkey: "setting" } },
        component: () => import("./assets/sitemap-C7VeBiiq.js"),
        to: `/${preadmin}/setting/sitemap`
      }
    ] }
  ];
};
const useAdminRoutes = ({ ssr, ctx, server }) => {
  var _a;
  const globalStore = useGLobalStore();
  const template = ssr ? ((_a = server.config) == null ? void 0 : _a.template) || "" : globalStore.template;
  let admin = ssr ? ctx.state.preadmin : globalStore.preadmin;
  const routes = admin ? [
    {
      path: `/${admin}/login`,
      component: () => import("./assets/login-BswfVfsf.js"),
      meta: { title: "登录", layout: "Blank" }
    },
    {
      path: `/${admin}/404`,
      component: () => import("./assets/404-DW8aj2ZW.js"),
      meta: { title: "找不到页面", layout: "Admin" }
    },
    {
      path: `/${admin}/401`,
      component: () => import("./assets/401-y8FSsrf7.js"),
      meta: { title: "无访问权限", layout: "Admin" }
    },
    {
      path: `/${admin}/500`,
      component: () => import("./assets/500-CAQCUrTq.js"),
      meta: { title: "服务器错误", layout: "Admin" }
    },
    ...useAdminMenu(admin).map((m) => {
      const route = {
        path: m.to,
        component: m.component,
        meta: { title: m.name, layout: "Admin", ...m.meta || {} },
        children: m.children || []
      };
      if (m.redirect)
        route.redirect = m.redirect;
      return route;
    }),
    {
      path: `/${admin}/nav/edit/:id?`,
      meta: { title: "链接编辑", layout: "Admin", meta: { authkey: "nav" } },
      component: () => import("./assets/edit-C_u1MSXA.js")
    },
    {
      path: `/${admin}/post/edit/:id?`,
      meta: { title: "文章编辑", layout: "Admin", meta: { authkey: "post" } },
      component: () => import("./assets/edit-LmIjU1aX.js")
    },
    {
      path: `/${admin}/selfreg/edit/:id?`,
      meta: { title: "收录编辑", layout: "Admin", meta: { authkey: "selfreg" } },
      component: () => import("./assets/edit-DUIYNilF.js")
    },
    {
      path: `/${admin}/ads/edit/:id?`,
      meta: { title: "广告编辑", layout: "Admin", meta: { authkey: "ad" } },
      component: () => import("./assets/edit-DcgAlvan.js")
    },
    {
      path: `/${admin}/users/edit/:id?`,
      meta: { title: "用户编辑", layout: "Admin", meta: { authkey: "user" } },
      component: () => import("./assets/edit-DMVbtZz3.js")
    },
    {
      path: `/${admin}/plugins/market`,
      meta: { title: "插件市场", layout: "Admin", meta: { authkey: "plugin" } },
      component: () => import("./assets/market-D4xRK2Eb.js")
    },
    {
      path: `/${admin}/plugin/setting`,
      meta: { title: "插件设置", layout: "Admin", meta: { authkey: "plugin" } },
      component: () => import("./assets/setting-heeYWYcV.js")
    },
    {
      path: `/${admin}/templates/market`,
      meta: { title: "模板市场", layout: "Admin", meta: { authkey: "template" } },
      component: () => import("./assets/market-Ba9D4KbJ.js")
    },
    {
      path: `/${admin}/templates/theme/:templateName`,
      meta: { title: "主题设置", layout: "Admin", meta: { authkey: "template" } },
      component: () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../views/default/admin/template/theme.vue": () => import("./assets/theme-DNnscIlb.js") }), `../views/${template}/admin/template/theme.vue`)
    },
    {
      path: `/${admin}/uhub`,
      meta: { title: "个人中心", layout: "Admin", meta: { authkey: "user" } },
      component: () => import("./assets/index-bKRGyWE_.js")
    },
    {
      path: `/${admin}/sites`,
      meta: { title: "站点管理", layout: "Admin", keepAlive: true, meta: { authkey: "sites" } },
      component: () => import("./assets/index-DKjnwVlp.js")
    },
    {
      path: `/${admin}/sites/edit/:id?`,
      meta: { title: "站点编辑", layout: "Admin", meta: { authkey: "sites" } },
      component: () => import("./assets/edit-MU95ujw1.js")
    },
    // {
    //   path: `/${admin}/stat/nav/:code`,
    //   meta: { title: '链接报表详情', layout:'Admin', meta:{authkey:'stat'} },
    //   component: () => import('@/views/admin/stat/nav/detail.vue'),
    // },
    {
      path: `/${admin}/:pathMatch(.*)`,
      redirect: `/${admin}/404`,
      hidden: true
    }
  ] : [];
  return routes;
};
let progressEl = null, endTimer = null;
const remove = () => {
  if (progressEl) {
    if (endTimer)
      clearTimeout(endTimer);
    document.body.removeChild(progressEl);
    progressEl = null;
  }
};
const NProgress = {
  start() {
    remove();
    const child = document.createElement("div");
    let percent = 5;
    progressEl = document.createElement("div");
    progressEl.append(child);
    progressEl.style.cssText = "position:fixed;top:0;left:0;width:100%;height:1px;z-index:9999";
    child.style.cssText = `background:var(--primary);transition:all .3s;width:${percent}%;height:1px`;
    document.body.append(progressEl);
    const progressTimer = setInterval(() => {
      if (!progressEl || percent > 80 || child.style.width === "100%") {
        return clearInterval(progressTimer);
      }
      percent += 5;
      progressEl.children[0].style.width = `${percent}%`;
    }, 1e3);
  },
  end() {
    if (progressEl) {
      progressEl.children[0].style.width = "100%";
      endTimer = setTimeout(() => {
        remove();
      }, 300);
    }
  }
};
const createRouter = ({ store, ssr, server, ctx }) => {
  const router = createRouter$1({
    // ssr history 必须为 memory 模式
    history: ssr ? createMemoryHistory() : createWebHistory(),
    routes: [
      ...useRoutes({ store, ssr, server, ctx }),
      ...useAdminRoutes({ store, ssr, server, ctx })
    ]
  });
  router.beforeEach((to, from, next) => {
    var _a;
    const routeAuthRole = (_a = to.meta) == null ? void 0 : _a.authkey;
    const isLoginPage = to.path.endsWith("/login");
    const { user, preadmin } = store.state.value.global;
    const { editabledRoleAuth, viewabledRoleAuth, id } = user;
    if (preadmin && id != 1e4 && routeAuthRole && !isLoginPage) {
      if (![...Array.from(new Set(editabledRoleAuth)), ...Array.from(new Set(viewabledRoleAuth))].includes(routeAuthRole)) {
        return next(`/${preadmin}/403`);
      }
    }
    if (to.path.endsWith("/index.html")) {
      return next(to.path.replace(/(.*)\/index\.html$/, "$1"));
    }
    if (!ssr) {
      NProgress.start();
    }
    next();
  });
  router.afterEach((to, from) => {
    if (!ssr) {
      NProgress.end();
      window.scrollTo(0, 0);
      if (window == null ? void 0 : window._paq) {
        _paq.push(["setCustomUrl", to.fullPath]);
        _paq.push(["trackPageView"]);
      }
      if (window == null ? void 0 : window._hmt) {
        _hmt.push(["_trackPageview", to.fullPath]);
      }
    }
  });
  return router;
};
const lazy = (el, callback) => {
  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver((entries, observer2) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const _el = entry.target;
          callback(_el);
          observer2.unobserve(_el);
        }
      });
    });
    observer.observe(el);
  } else {
    callback();
  }
};
const registerLazyimg = (app) => {
  app.directive("lazyimg", {
    mounted(el, binding) {
      const imgurl = binding.value;
      if (!imgurl)
        return;
      lazy(el, (imgEl) => {
        imgEl.src = imgurl;
      });
    }
  });
};
class Tasker {
  /**
   * 队列执行器
   * @param {Number} options.maxTasks 最大线程 
   * @param {Number} options.maxRetry 执行失败时，最大尝试次数
   */
  constructor(options = {}) {
    options = {
      maxTasks: 5,
      maxRetry: 3,
      tasks: [],
      runCount: 0,
      ...options
    };
    for (const k in options) {
      this[k] = options[k];
    }
  }
  /**
   * 加入执行队列
   * @param {Function} fn 必须为待执行函数
   */
  add(fn, maxRetry) {
    const task = {
      resolve: null,
      reject: null,
      exec: fn,
      retryCount: 0,
      maxRetry: maxRetry ?? this.maxRetry
    };
    const promise = new Promise((resolve, reject) => {
      task.resolve = resolve;
      task.reject = reject;
    });
    this.tasks.push(task);
    this.run();
    return promise;
  }
  async run() {
    if (!this.tasks.length || this.runCount >= this.maxTasks)
      return;
    this.runCount++;
    const task = this.tasks.splice(0, 1)[0];
    const errorHandle = (e) => {
      if (task.retryCount < task.maxRetry) {
        task.retryCount += 1;
        this.tasks.unshift(task);
      } else {
        task.reject(e);
      }
    };
    try {
      await task.exec().then((res) => {
        task.resolve(res);
      }).catch(errorHandle);
    } catch (e) {
      console.error(e);
    } finally {
      this.runCount--;
      this.run();
    }
  }
}
const tasker = new Tasker({
  maxRetry: 0
});
const headCode = "code!";
const getFileHeader = (arrBuffer, bytesToRead) => {
  const u8arr = new Uint8Array(arrBuffer, 0, bytesToRead);
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(u8arr);
};
const word2u8Array = function(wordArray) {
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  var u8 = new Uint8Array(sigBytes);
  for (var i = 0; i < sigBytes; i++) {
    var byte = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
    u8[i] = byte;
  }
  return u8;
};
const decryptU8arr = (u8arr, key) => {
  const iv = CryptoJS.enc.Utf8.parse([...key].reverse().join(""));
  const wordArray = CryptoJS.lib.WordArray.create(u8arr);
  const dcBase64String = wordArray.toString(CryptoJS.enc.Base64);
  key = CryptoJS.enc.Utf8.parse(key);
  const decrypt2 = CryptoJS.AES.decrypt(dcBase64String, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return word2u8Array(decrypt2);
};
const decryptFile = ({ file, key, withU8Arr = false }) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const headInfo = getFileHeader(reader.result, headCode.length);
      if (headCode === headInfo) {
        const fileContent = new Uint8Array(reader.result, headCode.length);
        const decryptedContent = decryptU8arr(fileContent, key);
        if (withU8Arr)
          return resolve(decryptedContent);
        file = new Blob([decryptedContent], { type: file.type });
      } else if (withU8Arr) {
        return resolve(new Uint8Array(reader.result));
      }
      resolve(file);
    };
    reader.onerror = reject;
  });
};
const decodePicture = ({ url, key, fileName }) => {
  return tasker.add(async () => {
    const fileRes = await fetch(url);
    const blob = await fileRes.blob();
    const decryptBlob = await decryptFile({
      file: blob,
      key
    });
    const blobUrl = URL.createObjectURL(new File([decryptBlob], fileName || url.split("/").pop(), {}));
    return blobUrl;
  });
};
const registerDepic = (app, store) => {
  app.directive("depic", {
    mounted(el, binding) {
      const globalStore = useGLobalStore(store);
      const { key, staticDomain, tgDomain } = globalStore.cloud;
      let url = binding.value;
      if (!url)
        return;
      if (url.startsWith("tg/")) {
        url = `${staticDomain || tgDomain || ""}/${url}`;
      } else if (url.startsWith("blob:http")) {
        return el.src = url;
      }
      let imgEl;
      if (el.tagName !== "IMG") {
        imgEl = el.querySelector("img");
      }
      lazy(el, () => {
        decodePicture({
          url,
          key
        }).then((bloburl) => {
          (imgEl || el).src = bloburl;
        }).catch((e) => {
          console.error(e);
        });
      });
    }
  });
};
const registerPermission = (app, store) => {
  app.directive("permission", {
    mounted(el, binding) {
      const authkey = binding.value;
      let { editabledRoleAuth, id, viewabledRoleAuth } = store.state.value.global.user;
      if (id == 1e4)
        return;
      const editable = editabledRoleAuth.includes(authkey);
      const viewable = viewabledRoleAuth.includes(authkey);
      if (!viewable && !editable)
        el.remove();
    }
  });
};
const KEY = "NHboiHOeLxFQ401C";
const IV = "a7Je3EILVrj2i9xN";
function encrypt(data, k = KEY, i = IV) {
  try {
    const key = CryptoJS.enc.Utf8.parse(k);
    const iv = CryptoJS.enc.Utf8.parse(i);
    var srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  } catch (error) {
    console.log(error);
  }
}
function decrypt(data, k = KEY, i = IV) {
  try {
    const key = CryptoJS.enc.Utf8.parse(k);
    const iv = CryptoJS.enc.Utf8.parse(i);
    var decrypt2 = CryptoJS.AES.decrypt(data, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt2.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  } catch (error) {
    console.log(error);
  }
}
const baseUrl = "";
const request = (url, options = {}, datatype) => {
  const globalStore = useGLobalStore();
  options = {
    ...options,
    headers: {
      "Content-Type": datatype ?? "application/json",
      ...options.headers || {}
    }
  };
  url = (options.baseUrl || baseUrl) + url;
  return new Promise(async (resolve, reject) => {
    const fetchHandle = async (res) => {
      if (res.status === 401) {
        globalStore.showLogin = true;
        return reject(res);
      } else if (res.status === 403) {
        return reject(res);
      } else if (res.status === 412) {
        return reject(res);
      } else if (res.status === 413) {
        return reject(res);
      } else if (res.status >= 500) {
        return reject(res);
      } else if (res.status >= 429) {
        return reject(res);
      } else if (res.status >= 400) {
        return reject(res);
      }
      const contentType = res.headers.get("content-type") || "";
      const isJsonRes = contentType.indexOf("application/json") > -1;
      const isTextRes = contentType.indexOf("text/plain") > -1;
      const isHtmlRes = contentType.indexOf("text/html") > -1;
      if (isJsonRes) {
        let decode = JSON.parse(decrypt(await res.text()));
        if (decode.err >= 1) {
          if (options.error) {
            options.error(decode);
          }
          reject(decode);
        } else {
          resolve(decode);
        }
      } else if (isHtmlRes || isTextRes) {
        const resText = await res.text();
        resolve(resText);
      } else {
        resolve(res);
      }
    };
    let fetch2;
    {
      fetch2 = (await import("node-fetch")).default;
    }
    fetch2(url, options).then(fetchHandle).catch((e) => {
      console.error(e);
      reject(e);
    });
  });
};
const encodeData = (body) => {
  const globalStore = useGLobalStore();
  return JSON.stringify({
    _: encrypt(JSON.stringify({
      payload: {
        hostname: window.location.hostname,
        language: navigator.language,
        referrer: document.referrer,
        screen: `${window.screen.width}x${window.screen.height}`,
        title: encodeURIComponent(document.title),
        url: window.location.pathname,
        website: globalStore.webID,
        ...body
      }
    }))
  });
};
const sendStat = (body) => {
  return request("/api/v1/stat", {
    method: "POST",
    body: encodeData(body)
  });
};
const registerNavexpos = (app) => {
  let logs = {};
  let sending = false;
  const MAX = 500;
  const send = async () => {
    if (sending)
      return;
    const logsCopy = { ...logs };
    logs = {};
    try {
      sending = true;
      await sendStat({
        name: "nav-exposure-stat",
        data: logsCopy
      });
    } catch (e) {
      logs = {
        ...logsCopy,
        ...logs
      };
      console.error(e);
    } finally {
      sending = false;
    }
  };
  const addLog = (code) => {
    logs[code] = "";
    if (Object.keys(logs).length >= MAX) {
      send();
    }
  };
  app.directive("navexpos", {
    mounted(el, binding) {
      const code = binding.value;
      if (!code)
        return;
      lazy(el, () => {
        addLog(code);
      });
    }
  });
};
const registerNavclick = (app) => {
  let logs = {};
  let sending = false;
  const MAX = 50;
  const send = async () => {
    if (sending)
      return;
    const logsCopy = { ...logs };
    logs = {};
    console.log(logsCopy);
    try {
      sending = true;
      await sendStat({
        name: "nav-click-stat",
        data: logsCopy
      });
    } catch (e) {
      logs = {
        ...logsCopy,
        ...logs
      };
      console.error(e);
    } finally {
      sending = false;
    }
  };
  const addLog = (code) => {
    logs[code] = "";
    if (Object.keys(logs).length >= MAX) {
      send();
    }
  };
  app.directive("navclick", {
    mounted(el, binding) {
      const code = binding.value;
      if (!code)
        return;
      el.addEventListener("click", () => {
        addLog(code);
      });
    }
  });
};
const createDirectives = (app, store) => {
  registerLazyimg(app);
  registerDepic(app, store);
  registerPermission(app, store);
  registerNavexpos(app);
  registerNavclick(app);
};
const _sfc_main$1 = {
  __name: "MIcon",
  __ssrInlineRender: true,
  props: {
    name: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<i${ssrRenderAttrs(mergeProps({
        class: `m-icon icon-${__props.name}`
      }, _attrs))}></i>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mui/MIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "MIconJs",
  __ssrInlineRender: true,
  props: {
    name: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({ class: "m-icon-js" }, _attrs))}><use${ssrRenderAttr("xlink:href", `#icon-${__props.name}`)} class="${ssrRenderClass(`icon-${__props.name}`)}"></use></svg>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mui/MIconJs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
async function render(serverCtx, server, manifest) {
  var _a;
  const app = createSSRApp(_sfc_main$2);
  const store = createPinia();
  createDirectives(app);
  app.use(store);
  app.component("MIcon", _sfc_main$1);
  app.component("MIconJs", _sfc_main);
  const globalStore = useGLobalStore(store);
  if (globalStore.ssrDataInit) {
    await globalStore.ssrDataInit({ ctx: serverCtx, server });
  }
  const router = createRouter({ store, ssr: true, server, ctx: serverCtx });
  app.use(router);
  await router.push(serverCtx.request.url);
  await router.isReady();
  const route = router.currentRoute.value;
  let componentsQueue = [];
  const pushAsyncData = (component) => {
    if (component.asyncData) {
      componentsQueue.push(component.asyncData({ route, store, ctx: serverCtx, server }));
    }
  };
  const layoutComponent = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./layout/Admin.vue": () => import("./assets/Admin-CGqD8Dan.js"), "./layout/Blank.vue": () => import("./assets/Blank-DMuCe5mI.js"), "./layout/Default.vue": () => import("./assets/Default-C0dBdqb8.js"), "./layout/Install.vue": () => import("./assets/Install-CIW4RAfW.js") }), `./layout/${route.meta.layout || "Default"}.vue`);
  pushAsyncData(layoutComponent.default);
  const mainComponent = (_a = route.matched[0]) == null ? void 0 : _a.components.default;
  mainComponent && pushAsyncData(mainComponent);
  await Promise.allSettled(componentsQueue);
  const ctx = {};
  const html = await renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return {
    html,
    route: router.currentRoute.value,
    store: store.state.value,
    preloadLinks
  };
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  for (const id of modules) {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  }
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else if (file.endsWith(".webp")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/webp">`;
  } else {
    return "";
  }
}
export {
  useAdminMenu as a,
  decodePicture as b,
  decrypt as d,
  encrypt as e,
  lazy as l,
  request as r,
  render,
  sendStat as s,
  useGLobalStore as u
};
