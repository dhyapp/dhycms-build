import { computed, ref, watch, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { Breadcrumb, BreadcrumbItem, Tabs, TabPane, Badge, Spin, Empty, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { _ as _sfc_main$1 } from "./card-CRh319Bd.js";
import { i as installTemplate, b as setDefaultTemplate } from "./dhy-CpRy-bJi.js";
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
    const curTab = ref("templates");
    const loading = ref(false);
    const templates = computed(() => ssrStore.templates);
    const hasNewest = computed(() => {
      for (const product of ssrStore.templates) {
        if (product.newestVersion && product.newestVersion > product.version)
          return true;
      }
      return false;
    });
    watch(curTab, (key) => {
      router.push(`/${preadmin.value}/${key}`);
    });
    const onTemplateClick = async ({ key, record }) => {
      var _a;
      const hideLoading = message.loading();
      try {
        switch (key) {
          case "active":
            await setDefaultTemplate({
              name: record.template.name
            }).then((res) => {
              ssrStore.templates = res;
              message.success(`模板已切换`);
            });
            break;
          case "update":
            let control = ssrStore.templates[record.templateIndex].controls[1];
            control.label = "更新中..";
            control.class = "txt-grey event-none";
            await installTemplate({ productName: record.name }).then((res) => {
              message.success("更新成功");
              ssrStore.templates[record.templateIndex].controls[1] = null;
            }).catch((e) => {
              console.error(e);
              control.label = "更新";
              control.class = "";
            });
            break;
          case "setting":
            const templateEntryLink = (_a = record.template.dhy) == null ? void 0 : _a.link;
            if (templateEntryLink) {
              window.open(templateEntryLink);
            } else {
              router.push(`/${preadmin.value}/templates/theme/${record.template.name}`);
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
                  _push3(`模板管理`);
                } else {
                  return [
                    createTextVNode("模板管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`模板列表`);
                } else {
                  return [
                    createTextVNode("模板列表")
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
                  createTextVNode("模板管理")
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("模板列表")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel mt14 template-page">`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "templates",
              tab: "模板列表"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabPane), { key: "templates/market" }, {
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
                          _push4(`模板市场`);
                        } else {
                          return [
                            createTextVNode("模板市场")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->模板市场<!--]-->`);
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
                        createTextVNode("模板市场")
                      ]),
                      _: 1
                    }, 8, ["numberStyle"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode("模板市场")
                    ], 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "templates",
                tab: "模板列表"
              }),
              createVNode(unref(TabPane), { key: "templates/market" }, {
                tab: withCtx(() => [
                  hasNewest.value ? (openBlock(), createBlock(unref(Badge), {
                    key: 0,
                    count: "New",
                    numberStyle: { backgroundColor: "var(--success)" },
                    offset: [18, 0]
                  }, {
                    default: withCtx(() => [
                      createTextVNode("模板市场")
                    ]),
                    _: 1
                  }, 8, ["numberStyle"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("模板市场")
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
            if (templates.value.length) {
              _push2(`<div class="f fw list"${_scopeId}><!--[-->`);
              ssrRenderList(templates.value, (v, i) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: v.name,
                  type: "template",
                  poster: (_a = v.dhy) == null ? void 0 : _a.poster,
                  title: (_b = v.dhy) == null ? void 0 : _b.title,
                  active: (_c = v.dhy) == null ? void 0 : _c.active,
                  auth: (_d = v.dhy) == null ? void 0 : _d.auth,
                  description: v.description,
                  version: v.version,
                  tag: v.newestVersion && v.newestVersion > v.version ? "New" : "",
                  tagType: "success",
                  controls: [
                    { label: ((_e = v.dhy) == null ? void 0 : _e.active) ? "模板使用中" : "设为默认模板", key: "active", class: ((_f = v.dhy) == null ? void 0 : _f.active) ? "txt-grey event-none" : "", template: v, templateIndex: i },
                    ((_g = v.dhy) == null ? void 0 : _g.linkText) || ((_h = v.dhy) == null ? void 0 : _h.linkText) ? { label: v.dhy.linkText || "设置", key: "setting", template: v, templateIndex: i } : null
                  ],
                  onClick: onTemplateClick
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(ssrRenderComponent(unref(Empty), {
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无模板"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              templates.value.length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f fw list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(templates.value, (v, i) => {
                  var _a, _b, _c, _d, _e, _f, _g, _h;
                  return openBlock(), createBlock(_sfc_main$1, {
                    key: v.name,
                    type: "template",
                    poster: (_a = v.dhy) == null ? void 0 : _a.poster,
                    title: (_b = v.dhy) == null ? void 0 : _b.title,
                    active: (_c = v.dhy) == null ? void 0 : _c.active,
                    auth: (_d = v.dhy) == null ? void 0 : _d.auth,
                    description: v.description,
                    version: v.version,
                    tag: v.newestVersion && v.newestVersion > v.version ? "New" : "",
                    tagType: "success",
                    controls: [
                      { label: ((_e = v.dhy) == null ? void 0 : _e.active) ? "模板使用中" : "设为默认模板", key: "active", class: ((_f = v.dhy) == null ? void 0 : _f.active) ? "txt-grey event-none" : "", template: v, templateIndex: i },
                      ((_g = v.dhy) == null ? void 0 : _g.linkText) || ((_h = v.dhy) == null ? void 0 : _h.linkText) ? { label: v.dhy.linkText || "设置", key: "setting", template: v, templateIndex: i } : null
                    ],
                    onClick: onTemplateClick
                  }, null, 8, ["poster", "title", "active", "auth", "description", "version", "tag", "controls"]);
                }), 128))
              ])) : (openBlock(), createBlock(unref(Empty), {
                key: 1,
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无模板"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/template/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
