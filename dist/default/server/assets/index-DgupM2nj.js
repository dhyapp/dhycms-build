import { computed, ref, onMounted, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Tabs, DatePicker, TabPane, Spin } from "ant-design-vue";
import { r as request, u as useGLobalStore } from "../entry-server.js";
import dayjs from "dayjs";
import { q as query2str } from "./common-ZcIx5rAG.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const getLog = (query = {}, options = {}) => {
  return request(`/api/v1/admin/logs?${query2str(query)}`, options);
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const curTab = ref("err");
    const curDate = ref(dayjs());
    const logLoading = ref(false);
    const logContent = ref("");
    const scroller = ref();
    const fetchLog = async () => {
      try {
        logLoading.value = true;
        await getLog({
          type: curTab.value,
          date: curDate.value.format("YYYY-MM-DD")
        }, {
          error: (e) => {
            if (e.msg) {
              logContent.value = e.msg || "日志获取失败";
            }
          }
        }).then((res) => {
          logContent.value = res;
          nextTick(() => {
            scroller.value.scroll(0, 999999);
          });
        });
      } finally {
        logLoading.value = false;
      }
    };
    const onChange = () => {
      fetchLog();
    };
    onMounted(() => {
      fetchLog();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logs-box" }, _attrs))}>`);
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
                  _push3(`日志`);
                } else {
                  return [
                    createTextVNode("日志")
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
                  createTextVNode("日志")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel mt14 logs-page">`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event,
        onChange
      }, {
        rightExtra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="f ac"${_scopeId}><span class="mr14"${_scopeId}>日期</span>`);
            _push2(ssrRenderComponent(unref(DatePicker), {
              value: curDate.value,
              "onUpdate:value": ($event) => curDate.value = $event,
              onChange
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "f ac" }, [
                createVNode("span", { class: "mr14" }, "日期"),
                createVNode(unref(DatePicker), {
                  value: curDate.value,
                  "onUpdate:value": ($event) => curDate.value = $event,
                  onChange
                }, null, 8, ["value", "onUpdate:value"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "err",
              tab: "错误"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "out",
              tab: "输出"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "err",
                tab: "错误"
              }),
              createVNode(unref(TabPane), {
                key: "out",
                tab: "输出"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="logs-ctx scroll">`);
      _push(ssrRenderComponent(unref(Spin), { spinning: logLoading.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pt20 pl20 pb20 pr20"${_scopeId}>${ssrInterpolate(logContent.value)}</div>`);
          } else {
            return [
              createVNode("div", { class: "pt20 pl20 pb20 pr20" }, toDisplayString(logContent.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/log/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
