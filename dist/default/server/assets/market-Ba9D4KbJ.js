import { computed, ref, watch, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Tabs, TabPane, Badge, Spin, Empty, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { _ as _sfc_main$1 } from "./card-CRh319Bd.js";
import { g as getDHYProducts, i as installTemplate } from "./dhy-CpRy-bJi.js";
import "node:path";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "market",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const preadmin = computed(() => globalStore.preadmin);
    const router = useRouter();
    const curTab = ref("templates/market");
    const loading = ref(false);
    const list = ref([]);
    const mapAuthLevel = ["free", "pro", "plus"];
    const dhygateway = computed(() => ssrStore.config.dhy.gateway || "");
    const localTemplates = computed(() => ssrStore.templates);
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
    const fetchProducts = async () => {
      try {
        loading.value = true;
        await getDHYProducts("template").then((res) => {
          var _a;
          list.value = ((_a = res == null ? void 0 : res.list) == null ? void 0 : _a.map((v, i) => {
            var _a2;
            if ((_a2 = localTemplates.value) == null ? void 0 : _a2.length) {
              const localTemplateIdx = localTemplates.value.findIndex((local) => local.name === v.key);
              if (localTemplateIdx > -1) {
                const localTemplate = localTemplates.value[localTemplateIdx];
                v.hasNew = v.version > localTemplate.version;
                v.installed = true;
              }
            }
            v.controls = [
              { label: v.installed ? "已安装" : "安装", key: "install", class: v.installed ? "txt-grey event-none" : "", product: v, productIndex: i }
            ];
            if (v.hasNew) {
              v.controls.push({ label: "更新", key: "update", class: "txt-success", product: v, productIndex: i });
            }
            return v;
          })) || [];
        });
      } finally {
        loading.value = false;
      }
    };
    const onTemplateClick = async ({ key, record }) => {
      const hideLoading = message.loading();
      const mapKey = {
        install: "安装",
        update: "更新"
      };
      try {
        switch (key) {
          case "install":
            if (!record.installed) {
              const control2 = list.value[record.productIndex].controls[0];
              control2.label = "安装中..";
              control2.class = "txt-grey event-none";
              await installTemplate({ productId: record.product.id }).then((res) => {
                control2.label = "已安装";
                message.success("安装成功");
                if (res.templates)
                  ssrStore.templates = res.templates;
                fetchProducts();
              }).catch((e) => {
                console.error(e);
                control2.label = "安装";
                control2.class = "";
              });
            }
            break;
          case "update":
            let control = list.value[record.productIndex].controls[1];
            control.label = "更新中..";
            control.class = "txt-grey event-none";
            await installTemplate({ productId: record.product.id }).then((res) => {
              message.success("更新成功");
              if (res.templates)
                ssrStore.templates = res.templates;
              fetchProducts();
            }).catch((e) => {
              console.error(e);
              control.label = "更新";
              control.class = "";
            });
            break;
        }
      } catch (e) {
        console.error(e);
        message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || `${mapKey[key]}操作失败`);
      } finally {
        hideLoading();
      }
    };
    onMounted(() => {
      fetchProducts();
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
                  _push3(`模板市场`);
                } else {
                  return [
                    createTextVNode("模板市场")
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
                  createTextVNode("模板市场")
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
            if (list.value.length) {
              _push2(`<div class="f fw list"${_scopeId}><!--[-->`);
              ssrRenderList(list.value, (v) => {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  key: v.id,
                  type: "template",
                  poster: v.poster ? `${dhygateway.value}${v.poster}` : "",
                  title: v.title,
                  auth: mapAuthLevel[v.authLevel],
                  description: v.brif,
                  controls: v.controls,
                  version: v.version,
                  price: v.price > 0 ? `${v.price}U` : "免费",
                  tag: v.hasNew ? "最新" : "",
                  tagType: "success",
                  onClick: onTemplateClick
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(ssrRenderComponent(unref(Empty), {
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无市场模板"
              }, null, _parent2, _scopeId));
            }
          } else {
            return [
              list.value.length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f fw list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(list.value, (v) => {
                  return openBlock(), createBlock(_sfc_main$1, {
                    key: v.id,
                    type: "template",
                    poster: v.poster ? `${dhygateway.value}${v.poster}` : "",
                    title: v.title,
                    auth: mapAuthLevel[v.authLevel],
                    description: v.brif,
                    controls: v.controls,
                    version: v.version,
                    price: v.price > 0 ? `${v.price}U` : "免费",
                    tag: v.hasNew ? "最新" : "",
                    tagType: "success",
                    onClick: onTemplateClick
                  }, null, 8, ["poster", "title", "auth", "description", "controls", "version", "price", "tag"]);
                }), 128))
              ])) : (openBlock(), createBlock(unref(Empty), {
                key: 1,
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无市场模板"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/template/market.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
