import { computed, ref, reactive, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Button, Spin, Form, FormItem, Input, InputNumber, message } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./admin-form-action-bar-fhn4ltpr.js";
import { f as sites } from "./index-0psH9gUa.js";
import { i as addSite } from "./sites-CNKC-LVu.js";
import { useRoute, useRouter } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import "./common-ZcIx5rAG.js";
import "./ssrFetch-DNAH9Bfk.js";
import "pinia";
import "node:path";
import "crypto-js";
const _sfc_main = {
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const formCol = { label: 5, wrapper: 17 };
    const formRef = ref(null);
    const formState = reactive({
      nickName: "",
      port: ""
    });
    const spinning = ref(false);
    const saving = ref(false);
    const fetchData = async (id) => {
      try {
        spinning.value = true;
        await sites.get({ id }).then((data) => {
          const stateModel = toRaw(formState);
          for (const k in stateModel) {
            formState[k] = data[k] || formState[k];
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onSave = async () => {
      try {
        saving.value = true;
        await formRef.value.validate();
        const data = { body: toRaw(formState) };
        if (route.params.id) {
          data.id = route.params.id;
        }
        const isAdd = !route.params.id;
        if (isAdd) {
          await addSite(data.body).then(() => {
            message.success("站点添加并启动成功");
            router.back();
          });
        } else {
          await sites.update(data).then(() => {
            message.success("保存成功");
            router.back();
          });
        }
      } finally {
        saving.value = false;
      }
    };
    onMounted(() => {
      if (route.params.id) {
        fetchData(route.params.id);
      }
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
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    to: `/${preadmin.value}/sites`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`站点管理`);
                      } else {
                        return [
                          createTextVNode("站点管理")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/sites`
                    }, {
                      default: withCtx(() => [
                        createTextVNode("站点管理")
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
                  _push3(`编辑`);
                } else {
                  return [
                    createTextVNode("编辑")
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
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/sites`
                  }, {
                    default: withCtx(() => [
                      createTextVNode("站点管理")
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("编辑")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { class: "mt14" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="f ac"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Button), {
              type: "primary",
              loading: saving.value,
              onClick: ($event) => onSave()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(!unref(route).params.id ? "添加" : "保存修改")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(!unref(route).params.id ? "添加" : "保存修改"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "f ac" }, [
                createVNode(unref(Button), {
                  type: "primary",
                  loading: saving.value,
                  onClick: ($event) => onSave()
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(!unref(route).params.id ? "添加" : "保存修改"), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel site-edit-page"><div class="phead">站点编辑</div><div class="form-max pt20 pr20 pb30 pl30">`);
      _push(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "formRef",
              ref: formRef,
              model: formState,
              labelAlign: "left",
              "label-col": { span: formCol.label },
              "wrapper-col": { span: formCol.wrapper }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "站点名称",
                    name: "nickName",
                    rules: [{ required: true, message: "站点名称不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.nickName,
                          "onUpdate:value": ($event) => formState.nickName = $event,
                          placeholder: "请输入站点名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.nickName,
                            "onUpdate:value": ($event) => formState.nickName = $event,
                            placeholder: "请输入站点名称"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "监听端口",
                    name: "port",
                    rules: [{ required: true, message: "监听端口不能为空且唯一" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: formState.port,
                          "onUpdate:value": ($event) => formState.port = $event,
                          placeholder: "8802~9000未使用的端口",
                          disabled: Boolean(unref(route).params.id),
                          style: { width: "100%" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: formState.port,
                            "onUpdate:value": ($event) => formState.port = $event,
                            placeholder: "8802~9000未使用的端口",
                            disabled: Boolean(unref(route).params.id),
                            style: { width: "100%" }
                          }, null, 8, ["value", "onUpdate:value", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "站点名称",
                      name: "nickName",
                      rules: [{ required: true, message: "站点名称不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.nickName,
                          "onUpdate:value": ($event) => formState.nickName = $event,
                          placeholder: "请输入站点名称"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "监听端口",
                      name: "port",
                      rules: [{ required: true, message: "监听端口不能为空且唯一" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: formState.port,
                          "onUpdate:value": ($event) => formState.port = $event,
                          placeholder: "8802~9000未使用的端口",
                          disabled: Boolean(unref(route).params.id),
                          style: { width: "100%" }
                        }, null, 8, ["value", "onUpdate:value", "disabled"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Form), {
                ref_key: "formRef",
                ref: formRef,
                model: formState,
                labelAlign: "left",
                "label-col": { span: formCol.label },
                "wrapper-col": { span: formCol.wrapper }
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "站点名称",
                    name: "nickName",
                    rules: [{ required: true, message: "站点名称不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.nickName,
                        "onUpdate:value": ($event) => formState.nickName = $event,
                        placeholder: "请输入站点名称"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "监听端口",
                    name: "port",
                    rules: [{ required: true, message: "监听端口不能为空且唯一" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: formState.port,
                        "onUpdate:value": ($event) => formState.port = $event,
                        placeholder: "8802~9000未使用的端口",
                        disabled: Boolean(unref(route).params.id),
                        style: { width: "100%" }
                      }, null, 8, ["value", "onUpdate:value", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "label-col", "wrapper-col"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/sites/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
