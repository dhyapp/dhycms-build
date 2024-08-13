import { ref, reactive, onMounted, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Input, Alert, Textarea, Switch, InputGroup, Popconfirm, Button, Space, message } from "ant-design-vue";
import { d as setting } from "./index-0psH9gUa.js";
import { g as generateMixed } from "./common-ZcIx5rAG.js";
import { u as useGLobalStore } from "../entry-server.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "cloud",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const curTab = ref("cloud");
    const formCol = { label: 6, wrapper: 24 };
    const baseState = reactive({
      type: "local",
      tgToken: "",
      tgChatID: "",
      staticDomains: "",
      encoded: false,
      secret: ""
    });
    const saveLoading = ref(false);
    const spinning = ref(false);
    const mapForm = {
      "cloud": baseState
    };
    const fetchSetting = async (type) => {
      try {
        spinning.value = true;
        await setting.get({
          query: { fieldby: "key", field: type }
        }).then((res) => {
          if (res == null ? void 0 : res.value) {
            const stateModel = toRaw(mapForm[type]);
            for (const k in stateModel) {
              mapForm[type][k] = res.value[k] || mapForm[type][k];
            }
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onSave = async (type) => {
      if (baseState.secret && !/^\w{16}$/.test(baseState.secret))
        return message.error("密匙格式错误");
      try {
        saveLoading.value = true;
        await setting.update({
          query: { fieldby: "key", field: type },
          body: { value: toRaw(mapForm[type]), key: type, _upsert: true }
        }).then(() => {
          message.success("保存成功");
          if (type === "cloud") {
            const staticDomains = baseState.staticDomains.split("\n");
            const sdIdx = Math.floor(Math.random() * staticDomains.length);
            globalStore.cloud = {
              ...globalStore.cloud,
              encoded: baseState.encoded,
              key: baseState.secret,
              staticDomain: staticDomains[sdIdx]
            };
          }
        });
      } finally {
        saveLoading.value = false;
      }
    };
    const onTabChange = (type) => {
      fetchSetting(type);
    };
    onMounted(() => {
      fetchSetting("cloud");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel setting-cloud-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event,
        onChange: onTabChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "cloud",
              tab: "TG云盘"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="setting-max-800 pt20 pr20 pb30 pl30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          model: baseState,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "Telegram Bot Token",
                                required: baseState.type === "tg" || baseState.type === "tgcf"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: baseState.tgToken,
                                      "onUpdate:value": ($event) => baseState.tgToken = $event,
                                      type: "password"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="mt4"${_scopeId5}><a href="https://t.me/botfather" target="_blank" class="txt-info"${_scopeId5}>点我获取 Telegram Bot Token</a></div>`);
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: baseState.tgToken,
                                        "onUpdate:value": ($event) => baseState.tgToken = $event,
                                        type: "password"
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode("div", { class: "mt4" }, [
                                        createVNode("a", {
                                          href: "https://t.me/botfather",
                                          target: "_blank",
                                          class: "txt-info"
                                        }, "点我获取 Telegram Bot Token")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "Telegram Chat ID",
                                required: baseState.type === "tg" || baseState.type === "tgcf"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: baseState.tgChatID,
                                      "onUpdate:value": ($event) => baseState.tgChatID = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="mt4"${_scopeId5}><a href="https://t.me/userinfobot" target="_blank" class="txt-info"${_scopeId5}>点我获取 Telegram Chat ID</a></div>`);
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "该 Chat ID 用户需与机器人发生首次交互，如发送 /start，否则无法生效",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: baseState.tgChatID,
                                        "onUpdate:value": ($event) => baseState.tgChatID = $event
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode("div", { class: "mt4" }, [
                                        createVNode("a", {
                                          href: "https://t.me/userinfobot",
                                          target: "_blank",
                                          class: "txt-info"
                                        }, "点我获取 Telegram Chat ID")
                                      ]),
                                      createVNode(unref(Alert), {
                                        message: "该 Chat ID 用户需与机器人发生首次交互，如发送 /start，否则无法生效",
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
                                label: "CloudFlare 静态域名",
                                required: baseState.type === "tgcf"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Textarea), {
                                      value: baseState.staticDomains,
                                      "onUpdate:value": ($event) => baseState.staticDomains = $event,
                                      rows: 6,
                                      placeholder: "https://开头，多个域名请换行"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="mt4"${_scopeId5}><a href="/post/cloudflare-static-domains" target="_blank" class="txt-info"${_scopeId5}>CloudFlare 静态域名部署帮助文档</a></div>`);
                                  } else {
                                    return [
                                      createVNode(unref(Textarea), {
                                        value: baseState.staticDomains,
                                        "onUpdate:value": ($event) => baseState.staticDomains = $event,
                                        rows: 6,
                                        placeholder: "https://开头，多个域名请换行"
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode("div", { class: "mt4" }, [
                                        createVNode("a", {
                                          href: "/post/cloudflare-static-domains",
                                          target: "_blank",
                                          class: "txt-info"
                                        }, "CloudFlare 静态域名部署帮助文档")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<hr class="mb30"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(FormItem), { label: "是否加密" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="f ac"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Switch), {
                                      checked: baseState.encoded,
                                      "onUpdate:checked": ($event) => baseState.encoded = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<b class="ml8"${_scopeId5}>加密后无法直接预览或打开云盘图片/文件，需进行解密操作</b></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "f ac" }, [
                                        createVNode(unref(Switch), {
                                          checked: baseState.encoded,
                                          "onUpdate:checked": ($event) => baseState.encoded = $event
                                        }, null, 8, ["checked", "onUpdate:checked"]),
                                        createVNode("b", { class: "ml8" }, "加密后无法直接预览或打开云盘图片/文件，需进行解密操作")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "密匙" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(InputGroup), { compact: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Input), {
                                            value: baseState.secret,
                                            "onUpdate:value": ($event) => baseState.secret = $event,
                                            style: { "width": "calc(100% - 120px)" }
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(Popconfirm), {
                                            title: "确认生成？",
                                            description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                            onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(Button), { type: "primary" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`点击生成密匙`);
                                                    } else {
                                                      return [
                                                        createTextVNode("点击生成密匙")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(Button), { type: "primary" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("点击生成密匙")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(Input), {
                                              value: baseState.secret,
                                              "onUpdate:value": ($event) => baseState.secret = $event,
                                              style: { "width": "calc(100% - 120px)" }
                                            }, null, 8, ["value", "onUpdate:value"]),
                                            createVNode(unref(Popconfirm), {
                                              title: "确认生成？",
                                              description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                              onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Button), { type: "primary" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("点击生成密匙")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["onConfirm"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "仅支持英文+数字16位字符",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "请自行保存密匙，且勿轻易修改，否则将会造成之前上传的云盘图片/文件无法解密",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(InputGroup), { compact: "" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Input), {
                                            value: baseState.secret,
                                            "onUpdate:value": ($event) => baseState.secret = $event,
                                            style: { "width": "calc(100% - 120px)" }
                                          }, null, 8, ["value", "onUpdate:value"]),
                                          createVNode(unref(Popconfirm), {
                                            title: "确认生成？",
                                            description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                            onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Button), { type: "primary" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("点击生成密匙")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["onConfirm"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(Alert), {
                                        message: "仅支持英文+数字16位字符",
                                        type: "warning",
                                        "show-icon": "",
                                        banner: "",
                                        class: "mt10"
                                      }),
                                      createVNode(unref(Alert), {
                                        message: "请自行保存密匙，且勿轻易修改，否则将会造成之前上传的云盘图片/文件无法解密",
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
                                            onClick: ($event) => onSave("cloud")
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
                                              onClick: ($event) => onSave("cloud")
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
                                            onClick: ($event) => onSave("cloud")
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
                                  label: "Telegram Bot Token",
                                  required: baseState.type === "tg" || baseState.type === "tgcf"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: baseState.tgToken,
                                      "onUpdate:value": ($event) => baseState.tgToken = $event,
                                      type: "password"
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    createVNode("div", { class: "mt4" }, [
                                      createVNode("a", {
                                        href: "https://t.me/botfather",
                                        target: "_blank",
                                        class: "txt-info"
                                      }, "点我获取 Telegram Bot Token")
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["required"]),
                                createVNode(unref(FormItem), {
                                  label: "Telegram Chat ID",
                                  required: baseState.type === "tg" || baseState.type === "tgcf"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: baseState.tgChatID,
                                      "onUpdate:value": ($event) => baseState.tgChatID = $event
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    createVNode("div", { class: "mt4" }, [
                                      createVNode("a", {
                                        href: "https://t.me/userinfobot",
                                        target: "_blank",
                                        class: "txt-info"
                                      }, "点我获取 Telegram Chat ID")
                                    ]),
                                    createVNode(unref(Alert), {
                                      message: "该 Chat ID 用户需与机器人发生首次交互，如发送 /start，否则无法生效",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["required"]),
                                createVNode(unref(FormItem), {
                                  label: "CloudFlare 静态域名",
                                  required: baseState.type === "tgcf"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Textarea), {
                                      value: baseState.staticDomains,
                                      "onUpdate:value": ($event) => baseState.staticDomains = $event,
                                      rows: 6,
                                      placeholder: "https://开头，多个域名请换行"
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    createVNode("div", { class: "mt4" }, [
                                      createVNode("a", {
                                        href: "/post/cloudflare-static-domains",
                                        target: "_blank",
                                        class: "txt-info"
                                      }, "CloudFlare 静态域名部署帮助文档")
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["required"]),
                                createVNode("hr", { class: "mb30" }),
                                createVNode(unref(FormItem), { label: "是否加密" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "f ac" }, [
                                      createVNode(unref(Switch), {
                                        checked: baseState.encoded,
                                        "onUpdate:checked": ($event) => baseState.encoded = $event
                                      }, null, 8, ["checked", "onUpdate:checked"]),
                                      createVNode("b", { class: "ml8" }, "加密后无法直接预览或打开云盘图片/文件，需进行解密操作")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "密匙" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(InputGroup), { compact: "" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Input), {
                                          value: baseState.secret,
                                          "onUpdate:value": ($event) => baseState.secret = $event,
                                          style: { "width": "calc(100% - 120px)" }
                                        }, null, 8, ["value", "onUpdate:value"]),
                                        createVNode(unref(Popconfirm), {
                                          title: "确认生成？",
                                          description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                          onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(Button), { type: "primary" }, {
                                              default: withCtx(() => [
                                                createTextVNode("点击生成密匙")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["onConfirm"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Alert), {
                                      message: "仅支持英文+数字16位字符",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    }),
                                    createVNode(unref(Alert), {
                                      message: "请自行保存密匙，且勿轻易修改，否则将会造成之前上传的云盘图片/文件无法解密",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt10"
                                    })
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
                                          onClick: ($event) => onSave("cloud")
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
                            model: baseState,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                label: "Telegram Bot Token",
                                required: baseState.type === "tg" || baseState.type === "tgcf"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: baseState.tgToken,
                                    "onUpdate:value": ($event) => baseState.tgToken = $event,
                                    type: "password"
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: "https://t.me/botfather",
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取 Telegram Bot Token")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["required"]),
                              createVNode(unref(FormItem), {
                                label: "Telegram Chat ID",
                                required: baseState.type === "tg" || baseState.type === "tgcf"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: baseState.tgChatID,
                                    "onUpdate:value": ($event) => baseState.tgChatID = $event
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: "https://t.me/userinfobot",
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取 Telegram Chat ID")
                                  ]),
                                  createVNode(unref(Alert), {
                                    message: "该 Chat ID 用户需与机器人发生首次交互，如发送 /start，否则无法生效",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  })
                                ]),
                                _: 1
                              }, 8, ["required"]),
                              createVNode(unref(FormItem), {
                                label: "CloudFlare 静态域名",
                                required: baseState.type === "tgcf"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: baseState.staticDomains,
                                    "onUpdate:value": ($event) => baseState.staticDomains = $event,
                                    rows: 6,
                                    placeholder: "https://开头，多个域名请换行"
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: "/post/cloudflare-static-domains",
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "CloudFlare 静态域名部署帮助文档")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["required"]),
                              createVNode("hr", { class: "mb30" }),
                              createVNode(unref(FormItem), { label: "是否加密" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "f ac" }, [
                                    createVNode(unref(Switch), {
                                      checked: baseState.encoded,
                                      "onUpdate:checked": ($event) => baseState.encoded = $event
                                    }, null, 8, ["checked", "onUpdate:checked"]),
                                    createVNode("b", { class: "ml8" }, "加密后无法直接预览或打开云盘图片/文件，需进行解密操作")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "密匙" }, {
                                default: withCtx(() => [
                                  createVNode(unref(InputGroup), { compact: "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Input), {
                                        value: baseState.secret,
                                        "onUpdate:value": ($event) => baseState.secret = $event,
                                        style: { "width": "calc(100% - 120px)" }
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode(unref(Popconfirm), {
                                        title: "确认生成？",
                                        description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                        onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Button), { type: "primary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("点击生成密匙")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["onConfirm"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "仅支持英文+数字16位字符",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "请自行保存密匙，且勿轻易修改，否则将会造成之前上传的云盘图片/文件无法解密",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  })
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
                                        onClick: ($event) => onSave("cloud")
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
                            model: baseState,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                label: "Telegram Bot Token",
                                required: baseState.type === "tg" || baseState.type === "tgcf"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: baseState.tgToken,
                                    "onUpdate:value": ($event) => baseState.tgToken = $event,
                                    type: "password"
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: "https://t.me/botfather",
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取 Telegram Bot Token")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["required"]),
                              createVNode(unref(FormItem), {
                                label: "Telegram Chat ID",
                                required: baseState.type === "tg" || baseState.type === "tgcf"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: baseState.tgChatID,
                                    "onUpdate:value": ($event) => baseState.tgChatID = $event
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: "https://t.me/userinfobot",
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "点我获取 Telegram Chat ID")
                                  ]),
                                  createVNode(unref(Alert), {
                                    message: "该 Chat ID 用户需与机器人发生首次交互，如发送 /start，否则无法生效",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  })
                                ]),
                                _: 1
                              }, 8, ["required"]),
                              createVNode(unref(FormItem), {
                                label: "CloudFlare 静态域名",
                                required: baseState.type === "tgcf"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: baseState.staticDomains,
                                    "onUpdate:value": ($event) => baseState.staticDomains = $event,
                                    rows: 6,
                                    placeholder: "https://开头，多个域名请换行"
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode("div", { class: "mt4" }, [
                                    createVNode("a", {
                                      href: "/post/cloudflare-static-domains",
                                      target: "_blank",
                                      class: "txt-info"
                                    }, "CloudFlare 静态域名部署帮助文档")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["required"]),
                              createVNode("hr", { class: "mb30" }),
                              createVNode(unref(FormItem), { label: "是否加密" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "f ac" }, [
                                    createVNode(unref(Switch), {
                                      checked: baseState.encoded,
                                      "onUpdate:checked": ($event) => baseState.encoded = $event
                                    }, null, 8, ["checked", "onUpdate:checked"]),
                                    createVNode("b", { class: "ml8" }, "加密后无法直接预览或打开云盘图片/文件，需进行解密操作")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "密匙" }, {
                                default: withCtx(() => [
                                  createVNode(unref(InputGroup), { compact: "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Input), {
                                        value: baseState.secret,
                                        "onUpdate:value": ($event) => baseState.secret = $event,
                                        style: { "width": "calc(100% - 120px)" }
                                      }, null, 8, ["value", "onUpdate:value"]),
                                      createVNode(unref(Popconfirm), {
                                        title: "确认生成？",
                                        description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                        onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Button), { type: "primary" }, {
                                            default: withCtx(() => [
                                              createTextVNode("点击生成密匙")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["onConfirm"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "仅支持英文+数字16位字符",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "请自行保存密匙，且勿轻易修改，否则将会造成之前上传的云盘图片/文件无法解密",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt10"
                                  })
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
                                        onClick: ($event) => onSave("cloud")
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
                key: "cloud",
                tab: "TG云盘"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "setting-max-800 pt20 pr20 pb30 pl30" }, [
                    createVNode(unref(Spin), { spinning: spinning.value }, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          model: baseState,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), {
                              label: "Telegram Bot Token",
                              required: baseState.type === "tg" || baseState.type === "tgcf"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: baseState.tgToken,
                                  "onUpdate:value": ($event) => baseState.tgToken = $event,
                                  type: "password"
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode("div", { class: "mt4" }, [
                                  createVNode("a", {
                                    href: "https://t.me/botfather",
                                    target: "_blank",
                                    class: "txt-info"
                                  }, "点我获取 Telegram Bot Token")
                                ])
                              ]),
                              _: 1
                            }, 8, ["required"]),
                            createVNode(unref(FormItem), {
                              label: "Telegram Chat ID",
                              required: baseState.type === "tg" || baseState.type === "tgcf"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: baseState.tgChatID,
                                  "onUpdate:value": ($event) => baseState.tgChatID = $event
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode("div", { class: "mt4" }, [
                                  createVNode("a", {
                                    href: "https://t.me/userinfobot",
                                    target: "_blank",
                                    class: "txt-info"
                                  }, "点我获取 Telegram Chat ID")
                                ]),
                                createVNode(unref(Alert), {
                                  message: "该 Chat ID 用户需与机器人发生首次交互，如发送 /start，否则无法生效",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: "",
                                  class: "mt10"
                                })
                              ]),
                              _: 1
                            }, 8, ["required"]),
                            createVNode(unref(FormItem), {
                              label: "CloudFlare 静态域名",
                              required: baseState.type === "tgcf"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Textarea), {
                                  value: baseState.staticDomains,
                                  "onUpdate:value": ($event) => baseState.staticDomains = $event,
                                  rows: 6,
                                  placeholder: "https://开头，多个域名请换行"
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode("div", { class: "mt4" }, [
                                  createVNode("a", {
                                    href: "/post/cloudflare-static-domains",
                                    target: "_blank",
                                    class: "txt-info"
                                  }, "CloudFlare 静态域名部署帮助文档")
                                ])
                              ]),
                              _: 1
                            }, 8, ["required"]),
                            createVNode("hr", { class: "mb30" }),
                            createVNode(unref(FormItem), { label: "是否加密" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "f ac" }, [
                                  createVNode(unref(Switch), {
                                    checked: baseState.encoded,
                                    "onUpdate:checked": ($event) => baseState.encoded = $event
                                  }, null, 8, ["checked", "onUpdate:checked"]),
                                  createVNode("b", { class: "ml8" }, "加密后无法直接预览或打开云盘图片/文件，需进行解密操作")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "密匙" }, {
                              default: withCtx(() => [
                                createVNode(unref(InputGroup), { compact: "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: baseState.secret,
                                      "onUpdate:value": ($event) => baseState.secret = $event,
                                      style: { "width": "calc(100% - 120px)" }
                                    }, null, 8, ["value", "onUpdate:value"]),
                                    createVNode(unref(Popconfirm), {
                                      title: "确认生成？",
                                      description: "原密匙覆盖后，旧文件将会失效，请谨慎操作！",
                                      onConfirm: () => baseState.secret = unref(generateMixed)(16)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Button), { type: "primary" }, {
                                          default: withCtx(() => [
                                            createTextVNode("点击生成密匙")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["onConfirm"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Alert), {
                                  message: "仅支持英文+数字16位字符",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: "",
                                  class: "mt10"
                                }),
                                createVNode(unref(Alert), {
                                  message: "请自行保存密匙，且勿轻易修改，否则将会造成之前上传的云盘图片/文件无法解密",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: "",
                                  class: "mt10"
                                })
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
                                      onClick: ($event) => onSave("cloud")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/cloud.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
