import { ref, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, computed, onMounted, resolveComponent, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { Dropdown, Input, Breadcrumb, BreadcrumbItem, Button, Spin, Form, FormItem, InputNumber, message } from "ant-design-vue";
import { _ as _sfc_main$2 } from "./admin-form-action-bar-fhn4ltpr.js";
import { _ as _sfc_main$3 } from "./cloud-poster-upload-BYKE9-j0.js";
import { u as useGLobalStore } from "../entry-server.js";
import { useRoute } from "vue-router";
import { d as setting } from "./index-0psH9gUa.js";
import "./modal-CbztPSM0.js";
import "./main-DhQTa4Ec.js";
import "./common-ZcIx5rAG.js";
import "crypto-js";
import "node:path";
import "pinia";
const _sfc_main$1 = {
  __name: "tinyColorInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "" },
    colors: { type: Array, default: () => ["rgb(16, 160, 59)", "rgb(221, 82, 77)", "rgb(41, 131, 235)", "rgb(140, 41, 235)", "rgb(8, 176, 176)"] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const value = ref(props.modelValue);
    const onChange = (color) => {
      if (typeof color === "string") {
        value.value = color;
      }
      emit("update:modelValue", value.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Dropdown), mergeProps({ overlayClassName: "dhy-tiny-input-color-overlay" }, _attrs), {
        overlay: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="f fw ac"${_scopeId}><!--[-->`);
            ssrRenderList(__props.colors, (v) => {
              _push2(`<div class="color-block" style="${ssrRenderStyle({ backgroundColor: v })}"${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "f fw ac" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.colors, (v) => {
                  return openBlock(), createBlock("div", {
                    class: "color-block",
                    key: v,
                    style: { backgroundColor: v },
                    onClick: ($event) => onChange(v)
                  }, null, 12, ["onClick"]);
                }), 128))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="dhy-tiny-input-color"${_scopeId}><span class="color-block" style="${ssrRenderStyle({ backgroundColor: __props.modelValue })}"${_scopeId}></span>`);
            _push2(ssrRenderComponent(unref(Input), {
              value: value.value,
              "onUpdate:value": ($event) => value.value = $event,
              onChange
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "dhy-tiny-input-color" }, [
                createVNode("span", {
                  class: "color-block",
                  style: { backgroundColor: __props.modelValue }
                }, null, 4),
                createVNode(unref(Input), {
                  value: value.value,
                  "onUpdate:value": ($event) => value.value = $event,
                  onChange
                }, null, 8, ["value", "onUpdate:value"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/tinyColorInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "theme",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const spinning = ref(false);
    const formCol = { label: 6, wrapper: 24 };
    const saveLoading = ref(false);
    const appeFormRef = ref();
    const appeForm = ref({
      theme: "rgb(16, 160, 59)",
      themeSecond: "#ff6ea1",
      themeLight: "#2ccc5a",
      themeDark: "#0d712a",
      banner: "",
      bgtop: "",
      bgbottom: "",
      pccols: 10,
      mcols: 3,
      appcols: 12,
      mappcols: 5,
      pccolsPost: 2,
      mcolsPost: 1
    });
    const settingKey = `template-${route.params.templateName}`;
    const fetchSetting = async () => {
      try {
        spinning.value = true;
        await setting.get({
          query: { fieldby: "key", field: settingKey }
        }).then((res) => {
          if (res == null ? void 0 : res.value) {
            appeForm.value = res == null ? void 0 : res.value;
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onSave = async () => {
      try {
        saveLoading.value = true;
        await setting.update({
          query: { fieldby: "key", field: settingKey },
          body: { value: appeForm.value, key: settingKey, _upsert: true }
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        saveLoading.value = false;
      }
    };
    onMounted(() => {
      fetchSetting();
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
                    to: `/${preadmin.value}/templates`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`模板管理`);
                      } else {
                        return [
                          createTextVNode("模板管理")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/templates`
                    }, {
                      default: withCtx(() => [
                        createTextVNode("模板管理")
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
                  _push3(`主题设置`);
                } else {
                  return [
                    createTextVNode("主题设置")
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
                    to: `/${preadmin.value}/templates`
                  }, {
                    default: withCtx(() => [
                      createTextVNode("模板管理")
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("主题设置")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { class: "mt14" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="f ac"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Button), {
              type: "primary",
              loading: saveLoading.value,
              onClick: ($event) => onSave()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存`);
                } else {
                  return [
                    createTextVNode("保存")
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
                  loading: saveLoading.value,
                  onClick: ($event) => onSave()
                }, {
                  default: withCtx(() => [
                    createTextVNode("保存")
                  ]),
                  _: 1
                }, 8, ["loading", "onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel"><div class="max-800 pt20 pr20 pb30 pl30">`);
      _push(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "appeFormRef",
              ref: appeFormRef,
              model: appeForm.value,
              labelAlign: "left",
              labelCol: { span: formCol.label }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "theme",
                    label: "主题色"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$1, {
                          modelValue: appeForm.value.theme,
                          "onUpdate:modelValue": ($event) => appeForm.value.theme = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$1, {
                            modelValue: appeForm.value.theme,
                            "onUpdate:modelValue": ($event) => appeForm.value.theme = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "themeSecond",
                    label: "点缀色"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$1, {
                          modelValue: appeForm.value.themeSecond,
                          "onUpdate:modelValue": ($event) => appeForm.value.themeSecond = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$1, {
                            modelValue: appeForm.value.themeSecond,
                            "onUpdate:modelValue": ($event) => appeForm.value.themeSecond = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "themeLight",
                    label: "高亮背景色"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$1, {
                          modelValue: appeForm.value.themeLight,
                          "onUpdate:modelValue": ($event) => appeForm.value.themeLight = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$1, {
                            modelValue: appeForm.value.themeLight,
                            "onUpdate:modelValue": ($event) => appeForm.value.themeLight = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "themeDark",
                    label: "暗色背景色"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$1, {
                          modelValue: appeForm.value.themeDark,
                          "onUpdate:modelValue": ($event) => appeForm.value.themeDark = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$1, {
                            modelValue: appeForm.value.themeDark,
                            "onUpdate:modelValue": ($event) => appeForm.value.themeDark = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "banner",
                    label: "头部横幅"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          mode: "whole",
                          text: "上传头部横幅",
                          modelValue: appeForm.value.banner,
                          "onUpdate:modelValue": ($event) => appeForm.value.banner = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            mode: "whole",
                            text: "上传头部横幅",
                            modelValue: appeForm.value.banner,
                            "onUpdate:modelValue": ($event) => appeForm.value.banner = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "bgtop",
                    label: "背景图（顶部）"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          mode: "whole",
                          text: "上传背景图（顶部）",
                          modelValue: appeForm.value.bgtop,
                          "onUpdate:modelValue": ($event) => appeForm.value.bgtop = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            mode: "whole",
                            text: "上传背景图（顶部）",
                            modelValue: appeForm.value.bgtop,
                            "onUpdate:modelValue": ($event) => appeForm.value.bgtop = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "bgbottom",
                    label: "背景图（底部）"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          mode: "whole",
                          text: "上传背景图（底部）",
                          modelValue: appeForm.value.bgbottom,
                          "onUpdate:modelValue": ($event) => appeForm.value.bgbottom = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            mode: "whole",
                            text: "上传背景图（底部）",
                            modelValue: appeForm.value.bgbottom,
                            "onUpdate:modelValue": ($event) => appeForm.value.bgbottom = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "pccols",
                    label: "PC端链接列数"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: appeForm.value.pccols,
                          "onUpdate:value": ($event) => appeForm.value.pccols = $event,
                          min: 2,
                          max: 12,
                          placeholder: "请输入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: appeForm.value.pccols,
                            "onUpdate:value": ($event) => appeForm.value.pccols = $event,
                            min: 2,
                            max: 12,
                            placeholder: "请输入"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "mcols",
                    label: "移动端链接列数"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: appeForm.value.mcols,
                          "onUpdate:value": ($event) => appeForm.value.mcols = $event,
                          min: 1,
                          max: 4,
                          placeholder: "请输入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: appeForm.value.mcols,
                            "onUpdate:value": ($event) => appeForm.value.mcols = $event,
                            min: 1,
                            max: 4,
                            placeholder: "请输入"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "appcols",
                    label: "PC端APP列数"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: appeForm.value.appcols,
                          "onUpdate:value": ($event) => appeForm.value.appcols = $event,
                          min: 2,
                          max: 14,
                          placeholder: "请输入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: appeForm.value.appcols,
                            "onUpdate:value": ($event) => appeForm.value.appcols = $event,
                            min: 2,
                            max: 14,
                            placeholder: "请输入"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "mappcols",
                    label: "移动端APP列数"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: appeForm.value.mappcols,
                          "onUpdate:value": ($event) => appeForm.value.mappcols = $event,
                          min: 1,
                          max: 8,
                          placeholder: "请输入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: appeForm.value.mappcols,
                            "onUpdate:value": ($event) => appeForm.value.mappcols = $event,
                            min: 1,
                            max: 8,
                            placeholder: "请输入"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "pccolsPost",
                    label: "PC端文章列数"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: appeForm.value.pccolsPost,
                          "onUpdate:value": ($event) => appeForm.value.pccolsPost = $event,
                          min: 2,
                          max: 12,
                          placeholder: "请输入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: appeForm.value.pccolsPost,
                            "onUpdate:value": ($event) => appeForm.value.pccolsPost = $event,
                            min: 2,
                            max: 12,
                            placeholder: "请输入"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "mcolsPost",
                    label: "移动端文章列数"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(InputNumber), {
                          value: appeForm.value.mcolsPost,
                          "onUpdate:value": ($event) => appeForm.value.mcolsPost = $event,
                          min: 1,
                          max: 4,
                          placeholder: "请输入"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(InputNumber), {
                            value: appeForm.value.mcolsPost,
                            "onUpdate:value": ($event) => appeForm.value.mcolsPost = $event,
                            min: 1,
                            max: 4,
                            placeholder: "请输入"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      name: "theme",
                      label: "主题色"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1, {
                          modelValue: appeForm.value.theme,
                          "onUpdate:modelValue": ($event) => appeForm.value.theme = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "themeSecond",
                      label: "点缀色"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1, {
                          modelValue: appeForm.value.themeSecond,
                          "onUpdate:modelValue": ($event) => appeForm.value.themeSecond = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "themeLight",
                      label: "高亮背景色"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1, {
                          modelValue: appeForm.value.themeLight,
                          "onUpdate:modelValue": ($event) => appeForm.value.themeLight = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "themeDark",
                      label: "暗色背景色"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1, {
                          modelValue: appeForm.value.themeDark,
                          "onUpdate:modelValue": ($event) => appeForm.value.themeDark = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "banner",
                      label: "头部横幅"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          mode: "whole",
                          text: "上传头部横幅",
                          modelValue: appeForm.value.banner,
                          "onUpdate:modelValue": ($event) => appeForm.value.banner = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "bgtop",
                      label: "背景图（顶部）"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          mode: "whole",
                          text: "上传背景图（顶部）",
                          modelValue: appeForm.value.bgtop,
                          "onUpdate:modelValue": ($event) => appeForm.value.bgtop = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "bgbottom",
                      label: "背景图（底部）"
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          mode: "whole",
                          text: "上传背景图（底部）",
                          modelValue: appeForm.value.bgbottom,
                          "onUpdate:modelValue": ($event) => appeForm.value.bgbottom = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "pccols",
                      label: "PC端链接列数"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: appeForm.value.pccols,
                          "onUpdate:value": ($event) => appeForm.value.pccols = $event,
                          min: 2,
                          max: 12,
                          placeholder: "请输入"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "mcols",
                      label: "移动端链接列数"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: appeForm.value.mcols,
                          "onUpdate:value": ($event) => appeForm.value.mcols = $event,
                          min: 1,
                          max: 4,
                          placeholder: "请输入"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "appcols",
                      label: "PC端APP列数"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: appeForm.value.appcols,
                          "onUpdate:value": ($event) => appeForm.value.appcols = $event,
                          min: 2,
                          max: 14,
                          placeholder: "请输入"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "mappcols",
                      label: "移动端APP列数"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: appeForm.value.mappcols,
                          "onUpdate:value": ($event) => appeForm.value.mappcols = $event,
                          min: 1,
                          max: 8,
                          placeholder: "请输入"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "pccolsPost",
                      label: "PC端文章列数"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: appeForm.value.pccolsPost,
                          "onUpdate:value": ($event) => appeForm.value.pccolsPost = $event,
                          min: 2,
                          max: 12,
                          placeholder: "请输入"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      name: "mcolsPost",
                      label: "移动端文章列数"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputNumber), {
                          value: appeForm.value.mcolsPost,
                          "onUpdate:value": ($event) => appeForm.value.mcolsPost = $event,
                          min: 1,
                          max: 4,
                          placeholder: "请输入"
                        }, null, 8, ["value", "onUpdate:value"])
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
                ref_key: "appeFormRef",
                ref: appeFormRef,
                model: appeForm.value,
                labelAlign: "left",
                labelCol: { span: formCol.label }
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    name: "theme",
                    label: "主题色"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        modelValue: appeForm.value.theme,
                        "onUpdate:modelValue": ($event) => appeForm.value.theme = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "themeSecond",
                    label: "点缀色"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        modelValue: appeForm.value.themeSecond,
                        "onUpdate:modelValue": ($event) => appeForm.value.themeSecond = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "themeLight",
                    label: "高亮背景色"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        modelValue: appeForm.value.themeLight,
                        "onUpdate:modelValue": ($event) => appeForm.value.themeLight = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "themeDark",
                    label: "暗色背景色"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        modelValue: appeForm.value.themeDark,
                        "onUpdate:modelValue": ($event) => appeForm.value.themeDark = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "banner",
                    label: "头部横幅"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, {
                        mode: "whole",
                        text: "上传头部横幅",
                        modelValue: appeForm.value.banner,
                        "onUpdate:modelValue": ($event) => appeForm.value.banner = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "bgtop",
                    label: "背景图（顶部）"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, {
                        mode: "whole",
                        text: "上传背景图（顶部）",
                        modelValue: appeForm.value.bgtop,
                        "onUpdate:modelValue": ($event) => appeForm.value.bgtop = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "bgbottom",
                    label: "背景图（底部）"
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, {
                        mode: "whole",
                        text: "上传背景图（底部）",
                        modelValue: appeForm.value.bgbottom,
                        "onUpdate:modelValue": ($event) => appeForm.value.bgbottom = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "pccols",
                    label: "PC端链接列数"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: appeForm.value.pccols,
                        "onUpdate:value": ($event) => appeForm.value.pccols = $event,
                        min: 2,
                        max: 12,
                        placeholder: "请输入"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "mcols",
                    label: "移动端链接列数"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: appeForm.value.mcols,
                        "onUpdate:value": ($event) => appeForm.value.mcols = $event,
                        min: 1,
                        max: 4,
                        placeholder: "请输入"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "appcols",
                    label: "PC端APP列数"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: appeForm.value.appcols,
                        "onUpdate:value": ($event) => appeForm.value.appcols = $event,
                        min: 2,
                        max: 14,
                        placeholder: "请输入"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "mappcols",
                    label: "移动端APP列数"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: appeForm.value.mappcols,
                        "onUpdate:value": ($event) => appeForm.value.mappcols = $event,
                        min: 1,
                        max: 8,
                        placeholder: "请输入"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "pccolsPost",
                    label: "PC端文章列数"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: appeForm.value.pccolsPost,
                        "onUpdate:value": ($event) => appeForm.value.pccolsPost = $event,
                        min: 2,
                        max: 12,
                        placeholder: "请输入"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    name: "mcolsPost",
                    label: "移动端文章列数"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputNumber), {
                        value: appeForm.value.mcolsPost,
                        "onUpdate:value": ($event) => appeForm.value.mcolsPost = $event,
                        min: 1,
                        max: 4,
                        placeholder: "请输入"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "labelCol"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/default/admin/template/theme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
