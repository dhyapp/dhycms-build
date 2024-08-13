import { computed, ref, watch, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { Breadcrumb, BreadcrumbItem, Tabs, TabPane, Badge, Spin, Empty, message, Modal } from "ant-design-vue";
import { useRouter } from "vue-router";
import { _ as _sfc_main$1 } from "./card-CRh319Bd.js";
import { a as uninstallPlugin, s as switchPluginStatus } from "./dhy-CpRy-bJi.js";
import "node:path";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const preadmin = computed(() => globalStore.preadmin);
    const router = useRouter();
    const curTab = ref("plugins");
    const loading = ref(false);
    const plugins = computed(() => ssrStore.plugins);
    const hasNewest = computed(() => {
      for (const product of ssrStore.plugins) {
        if (product.newestVersion && product.newestVersion > product.version)
          return true;
      }
      return false;
    });
    watch(curTab, (key) => {
      router.push(`/${preadmin.value}/${key}`);
    });
    const onPluginClick = async ({ key, record }) => {
      var _a, _b;
      const hideLoading = message.loading();
      try {
        switch (key) {
          case "active":
            const active = !record.plugin.dhy.active;
            switchPluginStatus({
              active,
              name: record.plugin.name
            }).then((res) => {
              ssrStore.plugins[record.pluginIndex] = res;
              message[active ? "success" : "warning"](`插件已${active ? "开启" : "关闭"}`);
            });
            break;
          case "uninstall":
            if (record.plugin.dhy.active)
              return message.error("需先关闭插件");
            Modal.confirm({
              title: "确认卸载？",
              okText: "卸载",
              centered: true,
              onOk() {
                return new Promise((resolve, reject) => {
                  uninstallPlugin({ name: record.plugin.name }).then((res) => {
                    const idx = plugins.value.findIndex((v) => v.name === record.plugin.name);
                    ssrStore.plugins.splice(idx, 1);
                    message.success("卸载成功");
                    resolve();
                  }).catch((e) => {
                    message.error("卸载失败");
                    reject(e);
                  });
                });
              }
            });
            break;
          default:
            if ((_b = (_a = record.plugin) == null ? void 0 : _a.dhy) == null ? void 0 : _b.link) {
              router.push(`/${preadmin.value}/plugin/setting?url=${encodeURIComponent(record.plugin.dhy.link)}`);
            }
            break;
        }
      } catch (e) {
        console.error(e);
        message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "操作失败");
      } finally {
        hideLoading();
      }
    };
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Breadcrumb), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    to: `/${preadmin.value}`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_MIcon, {
                          name: "dashboard",
                          class: "mr6"
                        }, null, _parent4, _scopeId3));
                        _push4(`控制台`);
                      } else {
                        return [
                          createVNode(_component_MIcon, {
                            name: "dashboard",
                            class: "mr6"
                          }),
                          createTextVNode("控制台")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, {
                          name: "dashboard",
                          class: "mr6"
                        }),
                        createTextVNode("控制台")
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`插件管理`);
                } else {
                  return [
                    createTextVNode("插件管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`插件列表`);
                } else {
                  return [
                    createTextVNode("插件列表")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}`
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_MIcon, {
                        name: "dashboard",
                        class: "mr6"
                      }),
                      createTextVNode("控制台")
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("插件管理")
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("插件列表")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel mt14 plugin-page">`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "plugins",
              tab: "插件列表"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabPane), { key: "plugins/market" }, {
              tab: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (hasNewest.value) {
                    _push3(ssrRenderComponent(unref(Badge), {
                      count: "New",
                      numberStyle: { backgroundColor: "var(--success)" },
                      offset: [18, 0]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`插件市场`);
                        } else {
                          return [
                            createTextVNode("插件市场")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->插件市场<!--]-->`);
                  }
                } else {
                  return [
                    hasNewest.value ? (openBlock(), createBlock(unref(Badge), {
                      key: 0,
                      count: "New",
                      numberStyle: { backgroundColor: "var(--success)" },
                      offset: [18, 0]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("插件市场")
                      ]),
                      _: 1
                    }, 8, ["numberStyle"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode("插件市场")
                    ], 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "plugins",
                tab: "插件列表"
              }),
              createVNode(unref(TabPane), { key: "plugins/market" }, {
                tab: withCtx(() => [
                  hasNewest.value ? (openBlock(), createBlock(unref(Badge), {
                    key: 0,
                    count: "New",
                    numberStyle: { backgroundColor: "var(--success)" },
                    offset: [18, 0]
                  }, {
                    default: withCtx(() => [
                      createTextVNode("插件市场")
                    ]),
                    _: 1
                  }, 8, ["numberStyle"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("插件市场")
                  ], 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pb20 pl20 pr20 pt20">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: loading.value,
        style: { minHeight: "300px", width: "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (plugins.value.length) {
              _push2(`<div class="f fw list"${_scopeId}><!--[-->`);
              ssrRenderList(plugins.value, (v, i) => {
                var _a, _b, _c, _d, _e, _f, _g;
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: v.name,
                  type: "plugin",
                  poster: (_a = v.dhy) == null ? void 0 : _a.poster,
                  title: (_b = v.dhy) == null ? void 0 : _b.title,
                  active: (_c = v.dhy) == null ? void 0 : _c.active,
                  auth: (_d = v.dhy) == null ? void 0 : _d.auth,
                  description: v.description,
                  version: v.version,
                  tag: v.newestVersion && v.newestVersion > v.version ? "New" : "",
                  tagType: "success",
                  controls: [
                    ((_e = v.dhy) == null ? void 0 : _e.link) ? { label: v.dhy.linkText || "进入", key: "entry", plugin: v, pluginIndex: i } : null,
                    { label: ((_f = v.dhy) == null ? void 0 : _f.active) ? "关闭" : "开启", key: "active", plugin: v, pluginIndex: i },
                    { label: "卸载", key: "uninstall", class: ((_g = v.dhy) == null ? void 0 : _g.active) ? "txt-grey" : "txt-error", plugin: v, pluginIndex: i }
                  ],
                  onClick: onPluginClick
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(ssrRenderComponent(unref(Empty), {
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无插件"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              plugins.value.length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f fw list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(plugins.value, (v, i) => {
                  var _a, _b, _c, _d, _e, _f, _g;
                  return openBlock(), createBlock(_sfc_main$1, {
                    key: v.name,
                    type: "plugin",
                    poster: (_a = v.dhy) == null ? void 0 : _a.poster,
                    title: (_b = v.dhy) == null ? void 0 : _b.title,
                    active: (_c = v.dhy) == null ? void 0 : _c.active,
                    auth: (_d = v.dhy) == null ? void 0 : _d.auth,
                    description: v.description,
                    version: v.version,
                    tag: v.newestVersion && v.newestVersion > v.version ? "New" : "",
                    tagType: "success",
                    controls: [
                      ((_e = v.dhy) == null ? void 0 : _e.link) ? { label: v.dhy.linkText || "进入", key: "entry", plugin: v, pluginIndex: i } : null,
                      { label: ((_f = v.dhy) == null ? void 0 : _f.active) ? "关闭" : "开启", key: "active", plugin: v, pluginIndex: i },
                      { label: "卸载", key: "uninstall", class: ((_g = v.dhy) == null ? void 0 : _g.active) ? "txt-grey" : "txt-error", plugin: v, pluginIndex: i }
                    ],
                    onClick: onPluginClick
                  }, null, 8, ["poster", "title", "active", "auth", "description", "version", "tag", "controls"]);
                }), 128))
              ])) : (openBlock(), createBlock(unref(Empty), {
                key: 1,
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无插件"
              }, null, 8, ["image"]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/plugin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
