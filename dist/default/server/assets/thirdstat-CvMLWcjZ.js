import { ref, onMounted, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Alert, Textarea, Space, Button, message } from "ant-design-vue";
import { d as setting } from "./index-0psH9gUa.js";
import { g as getEncodeSetting } from "./setting-Cp7Z9JTT.js";
import "../entry-server.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
import "./common-ZcIx5rAG.js";
const _sfc_main = {
  __name: "thirdstat",
  __ssrInlineRender: true,
  setup(__props) {
    const curTab = ref("thirdstat");
    const formCol = { label: 6, wrapper: 24 };
    const formState = ref({
      statistics: ""
    });
    const matomoFormState = ref({
      token: "",
      webID: "",
      host: ""
    });
    const saveLoading = ref(false);
    const spinning = ref(false);
    const mapForm = {
      thirdstat: formState,
      matomo: matomoFormState
    };
    const fetchSetting = async (type) => {
      try {
        spinning.value = true;
        await setting.get({
          query: { fieldby: "key", field: type }
        }).then((res) => {
          if (res == null ? void 0 : res.value) {
            const stateModel = mapForm[type].value;
            for (const k in stateModel) {
              mapForm[type].value[k] = res.value[k] ?? mapForm[type].value[k];
            }
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onSave = async (type) => {
      try {
        saveLoading.value = true;
        await setting.update({
          query: { fieldby: "key", field: type },
          body: { value: mapForm[type].value, key: type, _upsert: true }
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        saveLoading.value = false;
      }
    };
    const fetchEncodeSetting = async (type) => {
      try {
        spinning.value = true;
        await getEncodeSetting({ key: type }, { error() {
        } }).then((res) => {
          if (res) {
            const stateModel = mapForm[type].value;
            for (const k in stateModel) {
              mapForm[type].value[k] = res[k] ?? mapForm[type].value[k];
            }
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onTabChange = (type) => {
      type === "matomo" ? fetchEncodeSetting(type) : fetchSetting(type);
    };
    onMounted(() => {
      fetchSetting("thirdstat");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel setting-thirdstat-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event,
        onChange: onTabChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "thirdstat",
              tab: "统计脚本"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="setting-max-800 pt20 pr20 pb30 pl30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          model: formState.value,
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
                                      message: "仅支持百度、谷歌、Umami、Matomo，其它第三方统计存在数据不准确的可能",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      type: "info",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }, {
                                      message: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考<a href="https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&amp;implementation=browser-history" target="_blank" class="txt-info"${_scopeId6}>Google Analytics（分析）-衡量单页应用</a>进行设置`);
                                        } else {
                                          return [
                                            createTextVNode("最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考"),
                                            createVNode("a", {
                                              href: "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&implementation=browser-history",
                                              target: "_blank",
                                              ref: "nofollow",
                                              class: "txt-info"
                                            }, "Google Analytics（分析）-衡量单页应用", 512),
                                            createTextVNode("进行设置")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Alert), {
                                        message: "仅支持百度、谷歌、Umami、Matomo，其它第三方统计存在数据不准确的可能",
                                        type: "warning",
                                        "show-icon": "",
                                        banner: ""
                                      }),
                                      createVNode(unref(Alert), {
                                        type: "info",
                                        "show-icon": "",
                                        banner: "",
                                        class: "mt10"
                                      }, {
                                        message: withCtx(() => [
                                          createTextVNode("最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考"),
                                          createVNode("a", {
                                            href: "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&implementation=browser-history",
                                            target: "_blank",
                                            ref: "nofollow",
                                            class: "txt-info"
                                          }, "Google Analytics（分析）-衡量单页应用", 512),
                                          createTextVNode("进行设置")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "统计代码",
                                name: "statistics"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Textarea), {
                                      value: formState.value.statistics,
                                      "onUpdate:value": ($event) => formState.value.statistics = $event,
                                      style: { height: "260px" },
                                      placeholder: "请输入统计代码"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Textarea), {
                                        value: formState.value.statistics,
                                        "onUpdate:value": ($event) => formState.value.statistics = $event,
                                        style: { height: "260px" },
                                        placeholder: "请输入统计代码"
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
                                            onClick: ($event) => onSave("thirdstat")
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`保存`);
                                              } else {
                                                return [
                                                  createTextVNode("保存")
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
                                              onClick: ($event) => onSave("thirdstat")
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("保存")
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
                                            onClick: ($event) => onSave("thirdstat")
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("保存")
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
                                      message: "仅支持百度、谷歌、Umami、Matomo，其它第三方统计存在数据不准确的可能",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: ""
                                    }),
                                    createVNode(unref(Alert), {
                                      type: "info",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }, {
                                      message: withCtx(() => [
                                        createTextVNode("最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考"),
                                        createVNode("a", {
                                          href: "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&implementation=browser-history",
                                          target: "_blank",
                                          ref: "nofollow",
                                          class: "txt-info"
                                        }, "Google Analytics（分析）-衡量单页应用", 512),
                                        createTextVNode("进行设置")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["wrapperCol"]),
                                createVNode(unref(FormItem), {
                                  label: "统计代码",
                                  name: "statistics"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Textarea), {
                                      value: formState.value.statistics,
                                      "onUpdate:value": ($event) => formState.value.statistics = $event,
                                      style: { height: "260px" },
                                      placeholder: "请输入统计代码"
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
                                          onClick: ($event) => onSave("thirdstat")
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("保存")
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
                            model: formState.value,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Alert), {
                                    message: "仅支持百度、谷歌、Umami、Matomo，其它第三方统计存在数据不准确的可能",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: ""
                                  }),
                                  createVNode(unref(Alert), {
                                    type: "info",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  }, {
                                    message: withCtx(() => [
                                      createTextVNode("最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考"),
                                      createVNode("a", {
                                        href: "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&implementation=browser-history",
                                        target: "_blank",
                                        ref: "nofollow",
                                        class: "txt-info"
                                      }, "Google Analytics（分析）-衡量单页应用", 512),
                                      createTextVNode("进行设置")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"]),
                              createVNode(unref(FormItem), {
                                label: "统计代码",
                                name: "statistics"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: formState.value.statistics,
                                    "onUpdate:value": ($event) => formState.value.statistics = $event,
                                    style: { height: "260px" },
                                    placeholder: "请输入统计代码"
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
                                        onClick: ($event) => onSave("thirdstat")
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
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
                    createVNode("div", { class: "setting-max-800 pt20 pr20 pb30 pl30" }, [
                      createVNode(unref(Spin), { spinning: spinning.value }, {
                        default: withCtx(() => [
                          createVNode(unref(Form), {
                            model: formState.value,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Alert), {
                                    message: "仅支持百度、谷歌、Umami、Matomo，其它第三方统计存在数据不准确的可能",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: ""
                                  }),
                                  createVNode(unref(Alert), {
                                    type: "info",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  }, {
                                    message: withCtx(() => [
                                      createTextVNode("最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考"),
                                      createVNode("a", {
                                        href: "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&implementation=browser-history",
                                        target: "_blank",
                                        ref: "nofollow",
                                        class: "txt-info"
                                      }, "Google Analytics（分析）-衡量单页应用", 512),
                                      createTextVNode("进行设置")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"]),
                              createVNode(unref(FormItem), {
                                label: "统计代码",
                                name: "statistics"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: formState.value.statistics,
                                    "onUpdate:value": ($event) => formState.value.statistics = $event,
                                    style: { height: "260px" },
                                    placeholder: "请输入统计代码"
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
                                        onClick: ($event) => onSave("thirdstat")
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
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
                key: "thirdstat",
                tab: "统计脚本"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "setting-max-800 pt20 pr20 pb30 pl30" }, [
                    createVNode(unref(Spin), { spinning: spinning.value }, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          model: formState.value,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), {
                              wrapperCol: { offset: formCol.label }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Alert), {
                                  message: "仅支持百度、谷歌、Umami、Matomo，其它第三方统计存在数据不准确的可能",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: ""
                                }),
                                createVNode(unref(Alert), {
                                  type: "info",
                                  "show-icon": "",
                                  banner: "",
                                  class: "mt10"
                                }, {
                                  message: withCtx(() => [
                                    createTextVNode("最新的谷歌统计代码将自动统计单页应用的页面跳转，若未生效，请参考"),
                                    createVNode("a", {
                                      href: "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=zh-cn&implementation=browser-history",
                                      target: "_blank",
                                      ref: "nofollow",
                                      class: "txt-info"
                                    }, "Google Analytics（分析）-衡量单页应用", 512),
                                    createTextVNode("进行设置")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["wrapperCol"]),
                            createVNode(unref(FormItem), {
                              label: "统计代码",
                              name: "statistics"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Textarea), {
                                  value: formState.value.statistics,
                                  "onUpdate:value": ($event) => formState.value.statistics = $event,
                                  style: { height: "260px" },
                                  placeholder: "请输入统计代码"
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
                                      onClick: ($event) => onSave("thirdstat")
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("保存")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/thirdstat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
