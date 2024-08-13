import { computed, reactive, ref, onMounted, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Form, FormItem, Input, InputGroup, Button, Checkbox, message } from "ant-design-vue";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined, SafetyOutlined } from "@ant-design/icons-vue";
import { a as login, g as getProfile } from "./user-DniUCSmL.js";
import { useRouter } from "vue-router";
import { l as logoImg } from "./logox-DC6lobCp.js";
import { u as useGLobalStore } from "../entry-server.js";
import "node:path";
import "pinia";
import "crypto-js";
const __default__ = {
  async asyncData({ ctx, store }) {
    const globalStore = useGLobalStore(store);
    globalStore.preadmin = ctx.state.preadmin;
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const siteinfo = computed(() => globalStore.siteinfo);
    const router = useRouter();
    const formState = reactive({
      username: "",
      password: "",
      code: "",
      rememberme: true
    });
    const passwordVisibled = ref(false);
    const captcha = ref(null);
    const logining = ref(false);
    const fetchCaptcha = async () => {
      captcha.value.src = `/api/v1/captcha?${Date.now()}`;
    };
    const onLogin = async () => {
      try {
        logining.value = true;
        const res = await login(toRaw(formState));
        if (res.ok) {
          globalStore.user = res.userInfo;
          message.success("登录成功");
          router.push(`/${globalStore.preadmin}`);
          getProfile();
        }
      } finally {
        logining.value = false;
      }
    };
    onMounted(() => {
      fetchCaptcha();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "adm-login-page f fc ac jc" }, _attrs))}><div class="wrapper"><div class="logo txtc"><img${ssrRenderAttr("src", unref(logoImg))}></div><h1 class="txtc">后台管理登录${ssrInterpolate(siteinfo.value.shortTitle || siteinfo.value.title ? `-${siteinfo.value.shortTitle || siteinfo.value.title}` : "")}</h1>`);
      _push(ssrRenderComponent(unref(Form), {
        model: formState,
        class: "mt30"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "username",
              rules: [{ required: true, message: "用户名不能为空" }],
              onPressEnter: onLogin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Input), {
                    value: formState.username,
                    "onUpdate:value": ($event) => formState.username = $event,
                    placeholder: "用户名/邮箱",
                    size: "large"
                  }, {
                    prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(UserOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(UserOutlined))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Input), {
                      value: formState.username,
                      "onUpdate:value": ($event) => formState.username = $event,
                      placeholder: "用户名/邮箱",
                      size: "large"
                    }, {
                      prefix: withCtx(() => [
                        createVNode(unref(UserOutlined))
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "password",
              rules: [{ required: true, message: "密码不能为空" }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Input), {
                    value: formState.password,
                    "onUpdate:value": ($event) => formState.password = $event,
                    type: passwordVisibled.value ? "text" : "password",
                    placeholder: "密码",
                    size: "large",
                    onPressEnter: onLogin
                  }, {
                    prefix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(LockOutlined), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(LockOutlined))
                        ];
                      }
                    }),
                    suffix: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (passwordVisibled.value) {
                          _push4(ssrRenderComponent(unref(EyeInvisibleOutlined), {
                            class: "pwd-eye",
                            onClick: () => passwordVisibled.value = false
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(EyeOutlined), {
                            class: "pwd-eye",
                            onClick: () => passwordVisibled.value = true
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          passwordVisibled.value ? (openBlock(), createBlock(unref(EyeInvisibleOutlined), {
                            key: 0,
                            class: "pwd-eye",
                            onClick: () => passwordVisibled.value = false
                          }, null, 8, ["onClick"])) : (openBlock(), createBlock(unref(EyeOutlined), {
                            key: 1,
                            class: "pwd-eye",
                            onClick: () => passwordVisibled.value = true
                          }, null, 8, ["onClick"]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Input), {
                      value: formState.password,
                      "onUpdate:value": ($event) => formState.password = $event,
                      type: passwordVisibled.value ? "text" : "password",
                      placeholder: "密码",
                      size: "large",
                      onPressEnter: onLogin
                    }, {
                      prefix: withCtx(() => [
                        createVNode(unref(LockOutlined))
                      ]),
                      suffix: withCtx(() => [
                        passwordVisibled.value ? (openBlock(), createBlock(unref(EyeInvisibleOutlined), {
                          key: 0,
                          class: "pwd-eye",
                          onClick: () => passwordVisibled.value = false
                        }, null, 8, ["onClick"])) : (openBlock(), createBlock(unref(EyeOutlined), {
                          key: 1,
                          class: "pwd-eye",
                          onClick: () => passwordVisibled.value = true
                        }, null, 8, ["onClick"]))
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value", "type"])
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
                          size: "large",
                          onPressEnter: onLogin
                        }, {
                          prefix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(SafetyOutlined), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(SafetyOutlined))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                            size: "large",
                            onPressEnter: onLogin
                          }, {
                            prefix: withCtx(() => [
                              createVNode(unref(SafetyOutlined))
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value"]),
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
                          size: "large",
                          onPressEnter: onLogin
                        }, {
                          prefix: withCtx(() => [
                            createVNode(unref(SafetyOutlined))
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"]),
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
            _push2(`<div class="f jb ac mb20 extra"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Checkbox), {
              checked: formState.rememberme,
              "onUpdate:checked": ($event) => formState.rememberme = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`记住我`);
                } else {
                  return [
                    createTextVNode("记住我")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="forget-btn"${_scopeId}>忘记密码?</span></div>`);
            _push2(ssrRenderComponent(unref(FormItem), { class: "mb0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Button), {
                    block: "",
                    size: "large",
                    type: "primary",
                    loading: logining.value,
                    onClick: onLogin
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`登录`);
                      } else {
                        return [
                          createTextVNode("登录")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Button), {
                      block: "",
                      size: "large",
                      type: "primary",
                      loading: logining.value,
                      onClick: onLogin
                    }, {
                      default: withCtx(() => [
                        createTextVNode("登录")
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
              createVNode(unref(FormItem), {
                name: "username",
                rules: [{ required: true, message: "用户名不能为空" }],
                onPressEnter: onLogin
              }, {
                default: withCtx(() => [
                  createVNode(unref(Input), {
                    value: formState.username,
                    "onUpdate:value": ($event) => formState.username = $event,
                    placeholder: "用户名/邮箱",
                    size: "large"
                  }, {
                    prefix: withCtx(() => [
                      createVNode(unref(UserOutlined))
                    ]),
                    _: 1
                  }, 8, ["value", "onUpdate:value"])
                ]),
                _: 1
              }),
              createVNode(unref(FormItem), {
                name: "password",
                rules: [{ required: true, message: "密码不能为空" }]
              }, {
                default: withCtx(() => [
                  createVNode(unref(Input), {
                    value: formState.password,
                    "onUpdate:value": ($event) => formState.password = $event,
                    type: passwordVisibled.value ? "text" : "password",
                    placeholder: "密码",
                    size: "large",
                    onPressEnter: onLogin
                  }, {
                    prefix: withCtx(() => [
                      createVNode(unref(LockOutlined))
                    ]),
                    suffix: withCtx(() => [
                      passwordVisibled.value ? (openBlock(), createBlock(unref(EyeInvisibleOutlined), {
                        key: 0,
                        class: "pwd-eye",
                        onClick: () => passwordVisibled.value = false
                      }, null, 8, ["onClick"])) : (openBlock(), createBlock(unref(EyeOutlined), {
                        key: 1,
                        class: "pwd-eye",
                        onClick: () => passwordVisibled.value = true
                      }, null, 8, ["onClick"]))
                    ]),
                    _: 1
                  }, 8, ["value", "onUpdate:value", "type"])
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
                        size: "large",
                        onPressEnter: onLogin
                      }, {
                        prefix: withCtx(() => [
                          createVNode(unref(SafetyOutlined))
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value"]),
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
              }),
              createVNode("div", { class: "f jb ac mb20 extra" }, [
                createVNode(unref(Checkbox), {
                  checked: formState.rememberme,
                  "onUpdate:checked": ($event) => formState.rememberme = $event
                }, {
                  default: withCtx(() => [
                    createTextVNode("记住我")
                  ]),
                  _: 1
                }, 8, ["checked", "onUpdate:checked"]),
                createVNode("span", { class: "forget-btn" }, "忘记密码?")
              ]),
              createVNode(unref(FormItem), { class: "mb0" }, {
                default: withCtx(() => [
                  createVNode(unref(Button), {
                    block: "",
                    size: "large",
                    type: "primary",
                    loading: logining.value,
                    onClick: onLogin
                  }, {
                    default: withCtx(() => [
                      createTextVNode("登录")
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
      _push(`</div><div class="mt30 copyright">©2023 本程序由 comic.com 提供技术支持</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
