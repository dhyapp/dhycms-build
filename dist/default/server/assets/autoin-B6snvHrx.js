import { computed, ref, reactive, onMounted, resolveComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Form, FormItem, Input, Select, SelectOption, InputGroup, Button, Alert, message } from "ant-design-vue";
import { r as request, u as useGLobalStore } from "../entry-server.js";
import { g as getMenu } from "./menu-Dt_xrlWs.js";
import { a as copy } from "./common-ZcIx5rAG.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const submitLink = (body) => {
  return request("/api/v1/autoin/submit", {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const getAboutInfo = () => {
  return request("/api/v1/autoin");
};
const _sfc_main = {
  __name: "autoin",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const themeLight = computed(() => globalStore.appearance.themeLight);
    const ctxLoading = ref(false);
    const ctxInfo = ref({});
    const form = ref();
    const formState = reactive({
      name: "",
      link: "",
      mid: null,
      code: ""
    });
    const captcha = ref(null);
    const submitLoading = ref(false);
    const successData = ref({});
    const menu = ref([]);
    const fetchCaptcha = async () => {
      captcha.value.src = `/api/v1/captcha?${Date.now()}`;
    };
    const fetchMenu = async () => {
      getMenu().then((res) => {
        menu.value = res || [];
      });
    };
    const fetchCtx = async () => {
      ctxLoading.value = true;
      await getAboutInfo().then((res) => {
        ctxInfo.value = res;
      });
      ctxLoading.value = false;
    };
    const onSubmit = async () => {
      try {
        await form.value.validate();
        submitLoading.value = true;
        await submitLink(toRaw(formState)).then((res) => {
          successData.value = res;
          message.success("提交成功");
        }).catch((e) => {
          fetchCaptcha();
        });
      } finally {
        submitLoading.value = false;
      }
    };
    const onCopy = (str) => {
      copy(str).then(() => {
        message.success("复制成功");
      }).catch(() => {
        message.error("复制失败");
      });
    };
    onMounted(() => {
      fetchCaptcha();
      fetchMenu();
      fetchCtx();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "autoin-page" }, _attrs))}><nav class="nav f fw" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}"><div>`);
      _push(ssrRenderComponent(_component_RouterLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><a href="#about">关于我们</a></div><div><a href="#coop">广告合作</a></div><div><a href="#contact">联系我们</a></div><div><a href="#selfin" style="${ssrRenderStyle({ "color": "#ff0" })}">自助收录</a></div></nav><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}" id="about">关于我们</div><div class="module-container">${ctxInfo.value.about}</div><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}" id="coop">广告合作</div><div class="module-container">${ctxInfo.value.cooperation}</div><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}" id="contact">联系我们</div><div class="module-container">${ctxInfo.value.contact}</div><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}" id="selfin">自助收录</div>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        model: formState,
        class: "module-container"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>${ctxInfo.value.description}</div><div class="form-row f"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "name",
              rules: [{ required: true, message: "站点名称不能为空" }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Input), {
                    value: formState.name,
                    "onUpdate:value": ($event) => formState.name = $event,
                    placeholder: "请输入网站名称",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Input), {
                      value: formState.name,
                      "onUpdate:value": ($event) => formState.name = $event,
                      placeholder: "请输入网站名称",
                      size: "large"
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "link",
              rules: [{ required: true, message: "站点链接不能为空" }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Input), {
                    value: formState.link,
                    "onUpdate:value": ($event) => formState.link = $event,
                    placeholder: "https:// 网站地址",
                    size: "large"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Input), {
                      value: formState.link,
                      "onUpdate:value": ($event) => formState.link = $event,
                      placeholder: "https:// 网站地址",
                      size: "large"
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="form-row f"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "mid",
              rules: [{ required: true, message: "请选择站点类型" }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Select), {
                    value: formState.mid,
                    "onUpdate:value": ($event) => formState.mid = $event,
                    placeholder: "请选择站点类型",
                    size: "large"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menu.value, (v) => {
                          _push4(ssrRenderComponent(unref(SelectOption), {
                            key: v._id,
                            value: v._id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(v.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(v.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(menu.value, (v) => {
                            return openBlock(), createBlock(unref(SelectOption), {
                              key: v._id,
                              value: v._id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Select), {
                      value: formState.mid,
                      "onUpdate:value": ($event) => formState.mid = $event,
                      placeholder: "请选择站点类型",
                      size: "large"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(menu.value, (v) => {
                          return openBlock(), createBlock(unref(SelectOption), {
                            key: v._id,
                            value: v._id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(v.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "code",
              rules: [{ required: true, message: "验证码不能为空" }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(InputGroup), { compact: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.code,
                          "onUpdate:value": ($event) => formState.code = $event,
                          placeholder: "验证码",
                          size: "large"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Button), {
                          size: "large",
                          onClick: fetchCaptcha,
                          class: "captcha-btn"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", {
                                  ref_key: "captcha",
                                  ref: captcha
                                }, null, 512)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.code,
                            "onUpdate:value": ($event) => formState.code = $event,
                            placeholder: "验证码",
                            size: "large"
                          }, null, 8, ["value", "onUpdate:value"]),
                          createVNode(unref(Button), {
                            size: "large",
                            onClick: fetchCaptcha,
                            class: "captcha-btn"
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                ref_key: "captcha",
                                ref: captcha
                              }, null, 512)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(InputGroup), { compact: "" }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.code,
                          "onUpdate:value": ($event) => formState.code = $event,
                          placeholder: "验证码",
                          size: "large"
                        }, null, 8, ["value", "onUpdate:value"]),
                        createVNode(unref(Button), {
                          size: "large",
                          onClick: fetchCaptcha,
                          class: "captcha-btn"
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              ref_key: "captcha",
                              ref: captcha
                            }, null, 512)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (successData.value.ok) {
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Alert), {
                      type: "success",
                      showIcon: ""
                    }, {
                      message: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<b${_scopeId3}>提交成功，正在审核中..</b>`);
                        } else {
                          return [
                            createVNode("b", null, "提交成功，正在审核中..")
                          ];
                        }
                      }),
                      description: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 请将以下链接添加至您的站点中：<br${_scopeId3}> 链接名称：<b${_scopeId3}>${ssrInterpolate(successData.value.name || "<无>")}</b><span class="txt-info ml6 pointer"${_scopeId3}>复制</span><br${_scopeId3}> 链接地址：<b${_scopeId3}>${ssrInterpolate(successData.value.link)}</b><span class="txt-info ml6 pointer"${_scopeId3}>复制</span><br${_scopeId3}> 添加完成后，`);
                          if (successData.value.basein > 0) {
                            _push4(`<!--[-->且访问我站的<b class="txt-error"${_scopeId3}>来源量达到${ssrInterpolate(successData.value.basein)}个</b>，<!--]-->`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`我们将会在30分钟内进行自动收录。 `);
                        } else {
                          return [
                            createTextVNode(" 请将以下链接添加至您的站点中："),
                            createVNode("br"),
                            createTextVNode(" 链接名称："),
                            createVNode("b", null, toDisplayString(successData.value.name || "<无>"), 1),
                            createVNode("span", {
                              class: "txt-info ml6 pointer",
                              onClick: ($event) => onCopy(successData.value.name)
                            }, "复制", 8, ["onClick"]),
                            createVNode("br"),
                            createTextVNode(" 链接地址："),
                            createVNode("b", null, toDisplayString(successData.value.link), 1),
                            createVNode("span", {
                              class: "txt-info ml6 pointer",
                              onClick: ($event) => onCopy(successData.value.link)
                            }, "复制", 8, ["onClick"]),
                            createVNode("br"),
                            createTextVNode(" 添加完成后，"),
                            successData.value.basein > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode("且访问我站的"),
                              createVNode("b", { class: "txt-error" }, "来源量达到" + toDisplayString(successData.value.basein) + "个", 1),
                              createTextVNode("，")
                            ], 64)) : createCommentVNode("", true),
                            createTextVNode("我们将会在30分钟内进行自动收录。 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Alert), {
                        type: "success",
                        showIcon: ""
                      }, {
                        message: withCtx(() => [
                          createVNode("b", null, "提交成功，正在审核中..")
                        ]),
                        description: withCtx(() => [
                          createTextVNode(" 请将以下链接添加至您的站点中："),
                          createVNode("br"),
                          createTextVNode(" 链接名称："),
                          createVNode("b", null, toDisplayString(successData.value.name || "<无>"), 1),
                          createVNode("span", {
                            class: "txt-info ml6 pointer",
                            onClick: ($event) => onCopy(successData.value.name)
                          }, "复制", 8, ["onClick"]),
                          createVNode("br"),
                          createTextVNode(" 链接地址："),
                          createVNode("b", null, toDisplayString(successData.value.link), 1),
                          createVNode("span", {
                            class: "txt-info ml6 pointer",
                            onClick: ($event) => onCopy(successData.value.link)
                          }, "复制", 8, ["onClick"]),
                          createVNode("br"),
                          createTextVNode(" 添加完成后，"),
                          successData.value.basein > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createTextVNode("且访问我站的"),
                            createVNode("b", { class: "txt-error" }, "来源量达到" + toDisplayString(successData.value.basein) + "个", 1),
                            createTextVNode("，")
                          ], 64)) : createCommentVNode("", true),
                          createTextVNode("我们将会在30分钟内进行自动收录。 ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(FormItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Button), {
                    loading: submitLoading.value,
                    type: "primary",
                    size: "large",
                    block: "",
                    onClick: onSubmit
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`提交`);
                      } else {
                        return [
                          createTextVNode("提交")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Button), {
                      loading: submitLoading.value,
                      type: "primary",
                      size: "large",
                      block: "",
                      onClick: onSubmit
                    }, {
                      default: withCtx(() => [
                        createTextVNode("提交")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", {
                innerHTML: ctxInfo.value.description
              }, null, 8, ["innerHTML"]),
              createVNode("div", { class: "form-row f" }, [
                createVNode(unref(FormItem), {
                  name: "name",
                  rules: [{ required: true, message: "站点名称不能为空" }]
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: formState.name,
                      "onUpdate:value": ($event) => formState.name = $event,
                      placeholder: "请输入网站名称",
                      size: "large"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  name: "link",
                  rules: [{ required: true, message: "站点链接不能为空" }]
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: formState.link,
                      "onUpdate:value": ($event) => formState.link = $event,
                      placeholder: "https:// 网站地址",
                      size: "large"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "form-row f" }, [
                createVNode(unref(FormItem), {
                  name: "mid",
                  rules: [{ required: true, message: "请选择站点类型" }]
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Select), {
                      value: formState.mid,
                      "onUpdate:value": ($event) => formState.mid = $event,
                      placeholder: "请选择站点类型",
                      size: "large"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(menu.value, (v) => {
                          return openBlock(), createBlock(unref(SelectOption), {
                            key: v._id,
                            value: v._id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(v.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  name: "code",
                  rules: [{ required: true, message: "验证码不能为空" }]
                }, {
                  default: withCtx(() => [
                    createVNode(unref(InputGroup), { compact: "" }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.code,
                          "onUpdate:value": ($event) => formState.code = $event,
                          placeholder: "验证码",
                          size: "large"
                        }, null, 8, ["value", "onUpdate:value"]),
                        createVNode(unref(Button), {
                          size: "large",
                          onClick: fetchCaptcha,
                          class: "captcha-btn"
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              ref_key: "captcha",
                              ref: captcha
                            }, null, 512)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              successData.value.ok ? (openBlock(), createBlock(unref(FormItem), { key: 0 }, {
                default: withCtx(() => [
                  createVNode(unref(Alert), {
                    type: "success",
                    showIcon: ""
                  }, {
                    message: withCtx(() => [
                      createVNode("b", null, "提交成功，正在审核中..")
                    ]),
                    description: withCtx(() => [
                      createTextVNode(" 请将以下链接添加至您的站点中："),
                      createVNode("br"),
                      createTextVNode(" 链接名称："),
                      createVNode("b", null, toDisplayString(successData.value.name || "<无>"), 1),
                      createVNode("span", {
                        class: "txt-info ml6 pointer",
                        onClick: ($event) => onCopy(successData.value.name)
                      }, "复制", 8, ["onClick"]),
                      createVNode("br"),
                      createTextVNode(" 链接地址："),
                      createVNode("b", null, toDisplayString(successData.value.link), 1),
                      createVNode("span", {
                        class: "txt-info ml6 pointer",
                        onClick: ($event) => onCopy(successData.value.link)
                      }, "复制", 8, ["onClick"]),
                      createVNode("br"),
                      createTextVNode(" 添加完成后，"),
                      successData.value.basein > 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode("且访问我站的"),
                        createVNode("b", { class: "txt-error" }, "来源量达到" + toDisplayString(successData.value.basein) + "个", 1),
                        createTextVNode("，")
                      ], 64)) : createCommentVNode("", true),
                      createTextVNode("我们将会在30分钟内进行自动收录。 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(unref(FormItem), null, {
                default: withCtx(() => [
                  createVNode(unref(Button), {
                    loading: submitLoading.value,
                    type: "primary",
                    size: "large",
                    block: "",
                    onClick: onSubmit
                  }, {
                    default: withCtx(() => [
                      createTextVNode("提交")
                    ]),
                    _: 1
                  }, 8, ["loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/default/autoin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
