import { ref, reactive, onMounted, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Alert, Input, Space, Button, message } from "ant-design-vue";
import { g as getEncodeSetting, d as dhyAuth } from "./setting-Cp7Z9JTT.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { u as useGLobalStore } from "../entry-server.js";
import "./common-ZcIx5rAG.js";
import "pinia";
import "node:path";
import "vue-router";
import "crypto-js";
const _sfc_main = {
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const ssrStore = useSsrFetch();
    const globalStore = useGLobalStore();
    const curTab = ref("dhystat2");
    const formCol = { label: 6, wrapper: 24 };
    const formRef = ref(null);
    const formState = reactive({
      appID: "",
      appKey: "",
      umamiWebID: "",
      authLevel: "",
      authDomains: [],
      authProducts: []
    });
    const mapForm = {
      "dhystat2": formState
    };
    const saveLoading = ref(false);
    const spinning = ref(false);
    const fetchEncodeSetting = async (type) => {
      try {
        spinning.value = true;
        await getEncodeSetting({ key: type }, { error() {
        } }).then((res) => {
          if (res) {
            const stateModel = mapForm[type];
            for (const k in stateModel) {
              mapForm[type][k] = res[k] ?? mapForm[type][k];
            }
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onAuth = async () => {
      try {
        await formRef.value.validate();
        saveLoading.value = true;
        await dhyAuth(toRaw(formState)).then((res) => {
          formState.umamiWebID = res.umamiWebID || "";
          globalStore.webID = res.umamiWebID || "";
          message.success("授权成功");
        });
      } catch (e) {
        console.error(e);
      } finally {
        saveLoading.value = false;
      }
    };
    onMounted(() => {
      fetchEncodeSetting("dhystat2");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel setting-auth-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "dhystat2",
              tab: "官方授权"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="setting-max-800 pt30 pr20 pb30 pl30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          ref_key: "formRef",
                          ref: formRef,
                          model: formState,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",
                                      type: "info",
                                      "show-icon": "",
                                      banner: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "授权后若存在部分插件或模板不可用，请重启程序",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Alert), {
                                        message: "授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",
                                        type: "info",
                                        "show-icon": "",
                                        banner: ""
                                      }),
                                      createVNode(unref(Alert), {
                                        message: "授权后若存在部分插件或模板不可用，请重启程序",
                                        type: "warning",
                                        "show-icon": "",
                                        banner: "",
                                        class: "mt10"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "appID",
                                name: "appID",
                                rules: [{ required: true, message: "appID不能为空" }]
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.appID,
                                      "onUpdate:value": ($event) => formState.appID = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="mt4"${_scopeId5}><a${ssrRenderAttr("href", `${unref(ssrStore).config.dhy.gateway}/uhub`)} target="_blank" class="txt-info"${_scopeId5}>点我获取appID</a></div>`);
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.appID,
                                        "onUpdate:value": ($event) => formState.appID = $event
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode("div", { class: "mt4" }, [
                                        createVNode("a", {
                                          href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                          target: "_blank",
                                          class: "txt-info"
                                        }, "点我获取appID", 8, ["href"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "appKey",
                                name: "appKey",
                                rules: [{ required: true, message: "appKey不能为空" }]
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.appKey,
                                      "onUpdate:value": ($event) => formState.appKey = $event,
                                      type: "password",
                                      autoComplete: "new-password"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="mt4"${_scopeId5}><a${ssrRenderAttr("href", `${unref(ssrStore).config.dhy.gateway}/uhub`)} target="_blank" class="txt-info"${_scopeId5}>点我获取appKey</a></div>`);
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.appKey,
                                        "onUpdate:value": ($event) => formState.appKey = $event,
                                        type: "password",
                                        autoComplete: "new-password"
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode("div", { class: "mt4" }, [
                                        createVNode("a", {
                                          href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                          target: "_blank",
                                          class: "txt-info"
                                        }, "点我获取appKey", 8, ["href"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "webID(选填)",
                                name: "umamiWebID"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.umamiWebID,
                                      "onUpdate:value": ($event) => formState.umamiWebID = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.umamiWebID,
                                        "onUpdate:value": ($event) => formState.umamiWebID = $event
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Space), { size: "middle" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Button), {
                                            type: "primary",
                                            loading: saveLoading.value,
                                            onClick: ($event) => onAuth()
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`授权或刷新`);
                                              } else {
                                                return [
                                                  createTextVNode("授权或刷新")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(Button), {
                                              type: "primary",
                                              loading: saveLoading.value,
                                              onClick: ($event) => onAuth()
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("授权或刷新")
                                              ]),
                                              _: 1
                                            }, 8, ["loading", "onClick"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Space), { size: "middle" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Button), {
                                            type: "primary",
                                            loading: saveLoading.value,
                                            onClick: ($event) => onAuth()
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("授权或刷新")
                                            ]),
                                            _: 1
                                          }, 8, ["loading", "onClick"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(FormItem), {
                                  wrapperCol: { offset: formCol.label }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Alert), {
                                      message: "授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",
                                      type: "info",
                                      "show-icon": "",
                                      banner: ""
                                    }),
                                    createVNode(unref(Alert), {
                                      message: "授权后若存在部分插件或模板不可用，请重启程序",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["wrapperCol"]),
                                createVNode(unref(FormItem), {
                                  label: "appID",
                                  name: "appID",
                                  rules: [{ required: true, message: "appID不能为空" }]
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.appID,
                                      "onUpdate:value": ($event) => formState.appID = $event
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    createVNode("div", { class: "mt4" }, [
                                      createVNode("a", {
                                        href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                        target: "_blank",
                                        class: "txt-info"
                                      }, "点我获取appID", 8, ["href"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "appKey",
                                  name: "appKey",
                                  rules: [{ required: true, message: "appKey不能为空" }]
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.appKey,
                                      "onUpdate:value": ($event) => formState.appKey = $event,
                                      type: "password",
                                      autoComplete: "new-password"
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    createVNode("div", { class: "mt4" }, [
                                      createVNode("a", {
                                        href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                        target: "_blank",
                                        class: "txt-info"
                                      }, "点我获取appKey", 8, ["href"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "webID(选填)",
                                  name: "umamiWebID"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.umamiWebID,
                                      "onUpdate:value": ($event) => formState.umamiWebID = $event
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  wrapperCol: { offset: formCol.label }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Space), { size: "middle" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Button), {
                                          type: "primary",
                                          loading: saveLoading.value,
                                          onClick: ($event) => onAuth()
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("授权或刷新")
                                          ]),
                                          _: 1
                                        }, 8, ["loading", "onClick"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["wrapperCol"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Form), {
                            ref_key: "formRef",
                            ref: formRef,
                            model: formState,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Alert), {
                                    message: "授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",
                                    type: "info",
                                    "show-icon": "",
                                    banner: ""
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "授权后若存在部分插件或模板不可用，请重启程序",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"]),
                              createVNode(unref(FormItem), {
                                label: "appID",
                                name: "appID",
                                rules: [{ required: true, message: "appID不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appID,
                                    "onUpdate:value": ($event) => formState.appID = $event
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取appID", 8, ["href"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "appKey",
                                name: "appKey",
                                rules: [{ required: true, message: "appKey不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appKey,
                                    "onUpdate:value": ($event) => formState.appKey = $event,
                                    type: "password",
                                    autoComplete: "new-password"
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取appKey", 8, ["href"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "webID(选填)",
                                name: "umamiWebID"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.umamiWebID,
                                    "onUpdate:value": ($event) => formState.umamiWebID = $event
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), { size: "middle" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: saveLoading.value,
                                        onClick: ($event) => onAuth()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("授权或刷新")
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "onClick"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"])
                            ]),
                            _: 1
                          }, 8, ["model", "label-col"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "setting-max-800 pt30 pr20 pb30 pl30" }, [
                      createVNode(unref(Spin), { spinning: spinning.value }, {
                        default: withCtx(() => [
                          createVNode(unref(Form), {
                            ref_key: "formRef",
                            ref: formRef,
                            model: formState,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Alert), {
                                    message: "授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",
                                    type: "info",
                                    "show-icon": "",
                                    banner: ""
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "授权后若存在部分插件或模板不可用，请重启程序",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"]),
                              createVNode(unref(FormItem), {
                                label: "appID",
                                name: "appID",
                                rules: [{ required: true, message: "appID不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appID,
                                    "onUpdate:value": ($event) => formState.appID = $event
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取appID", 8, ["href"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "appKey",
                                name: "appKey",
                                rules: [{ required: true, message: "appKey不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appKey,
                                    "onUpdate:value": ($event) => formState.appKey = $event,
                                    type: "password",
                                    autoComplete: "new-password"
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取appKey", 8, ["href"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "webID(选填)",
                                name: "umamiWebID"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.umamiWebID,
                                    "onUpdate:value": ($event) => formState.umamiWebID = $event
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), { size: "middle" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: saveLoading.value,
                                        onClick: ($event) => onAuth()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("授权或刷新")
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "onClick"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"])
                            ]),
                            _: 1
                          }, 8, ["model", "label-col"])
                        ]),
                        _: 1
                      }, 8, ["spinning"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "dhystat2",
                tab: "官方授权"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "setting-max-800 pt30 pr20 pb30 pl30" }, [
                    createVNode(unref(Spin), { spinning: spinning.value }, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          ref_key: "formRef",
                          ref: formRef,
                          model: formState,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), {
                              wrapperCol: { offset: formCol.label }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Alert), {
                                  message: "授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",
                                  type: "info",
                                  "show-icon": "",
                                  banner: ""
                                }),
                                createVNode(unref(Alert), {
                                  message: "授权后若存在部分插件或模板不可用，请重启程序",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: "",
                                  class: "mt10"
                                })
                              ]),
                              _: 1
                            }, 8, ["wrapperCol"]),
                            createVNode(unref(FormItem), {
                              label: "appID",
                              name: "appID",
                              rules: [{ required: true, message: "appID不能为空" }]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.appID,
                                  "onUpdate:value": ($event) => formState.appID = $event
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode("div", { class: "mt4" }, [
                                  createVNode("a", {
                                    href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                    target: "_blank",
                                    class: "txt-info"
                                  }, "点我获取appID", 8, ["href"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "appKey",
                              name: "appKey",
                              rules: [{ required: true, message: "appKey不能为空" }]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.appKey,
                                  "onUpdate:value": ($event) => formState.appKey = $event,
                                  type: "password",
                                  autoComplete: "new-password"
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode("div", { class: "mt4" }, [
                                  createVNode("a", {
                                    href: `${unref(ssrStore).config.dhy.gateway}/uhub`,
                                    target: "_blank",
                                    class: "txt-info"
                                  }, "点我获取appKey", 8, ["href"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "webID(选填)",
                              name: "umamiWebID"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.umamiWebID,
                                  "onUpdate:value": ($event) => formState.umamiWebID = $event
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              wrapperCol: { offset: formCol.label }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Space), { size: "middle" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: saveLoading.value,
                                      onClick: ($event) => onAuth()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("授权或刷新")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "onClick"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["wrapperCol"])
                          ]),
                          _: 1
                        }, 8, ["model", "label-col"])
                      ]),
                      _: 1
                    }, 8, ["spinning"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
