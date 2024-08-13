import { ref, reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Tabs, TabPane, Form, FormItem, Input, Space, Button, Alert, message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import { u as updateUsername, g as getProfile, b as updatePwd } from "./user-DniUCSmL.js";
import "node:path";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const router = useRouter();
    const curTab = ref("profile");
    const formCol = { label: 4, wrapper: 16 };
    const profileForm = reactive({
      username: globalStore.user.username,
      nickname: globalStore.user.nickname
    });
    const profileFormRef = ref(null);
    const profileSaving = ref(false);
    const onSaveUsername = async () => {
      try {
        profileSaving.value = true;
        await profileFormRef.value.validate();
        await updateUsername(toRaw(profileForm)).then(() => {
          message.success("保存成功");
          getProfile();
        });
      } finally {
        profileSaving.value = false;
      }
    };
    const emailForm = reactive({
      username: globalStore.user.email
    });
    const emailFormRef = ref(null);
    const emailSaving = ref(false);
    const pwdForm = reactive({
      password: "",
      newpassword: ""
    });
    const pwdFormRef = ref(null);
    const pwdSaving = ref(false);
    const onSavePwd = async () => {
      try {
        pwdSaving.value = true;
        await pwdFormRef.value.validate();
        await updatePwd(toRaw(pwdForm)).then(() => {
          message.success("保存成功");
          getProfile();
        });
      } finally {
        pwdSaving.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "profile",
              tab: "个人资料"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="form-max"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Form), {
                    ref_key: "profileFormRef",
                    ref: profileFormRef,
                    model: profileForm,
                    "label-col": { span: formCol.label },
                    "wrapper-col": { span: formCol.wrapper },
                    class: "pt30 pb20"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FormItem), {
                          label: "用户名",
                          name: "username",
                          rules: [{ required: true, message: "用户名不能为空" }]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: profileForm.username,
                                "onUpdate:value": ($event) => profileForm.username = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: profileForm.username,
                                  "onUpdate:value": ($event) => profileForm.username = $event
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), {
                          label: "昵称",
                          name: "nickname"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: profileForm.nickname,
                                "onUpdate:value": ($event) => profileForm.nickname = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: profileForm.nickname,
                                  "onUpdate:value": ($event) => profileForm.nickname = $event
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), {
                          wrapperCol: { offset: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Space), { size: "middle" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Button), {
                                      type: "primary",
                                      loading: profileSaving.value,
                                      onClick: ($event) => onSaveUsername()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`保存`);
                                        } else {
                                          return [
                                            createTextVNode("保存")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Button), {
                                      onClick: ($event) => unref(router).back()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`返回`);
                                        } else {
                                          return [
                                            createTextVNode("返回")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: profileSaving.value,
                                        onClick: ($event) => onSaveUsername()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "onClick"]),
                                      createVNode(unref(Button), {
                                        onClick: ($event) => unref(router).back()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("返回")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Space), { size: "middle" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: profileSaving.value,
                                      onClick: ($event) => onSaveUsername()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("保存")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "onClick"]),
                                    createVNode(unref(Button), {
                                      onClick: ($event) => unref(router).back()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("返回")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(FormItem), {
                            label: "用户名",
                            name: "username",
                            rules: [{ required: true, message: "用户名不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: profileForm.username,
                                "onUpdate:value": ($event) => profileForm.username = $event
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), {
                            label: "昵称",
                            name: "nickname"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: profileForm.nickname,
                                "onUpdate:value": ($event) => profileForm.nickname = $event
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
                                    loading: profileSaving.value,
                                    onClick: ($event) => onSaveUsername()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("保存")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"]),
                                  createVNode(unref(Button), {
                                    onClick: ($event) => unref(router).back()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("返回")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "form-max" }, [
                      createVNode(unref(Form), {
                        ref_key: "profileFormRef",
                        ref: profileFormRef,
                        model: profileForm,
                        "label-col": { span: formCol.label },
                        "wrapper-col": { span: formCol.wrapper },
                        class: "pt30 pb20"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(FormItem), {
                            label: "用户名",
                            name: "username",
                            rules: [{ required: true, message: "用户名不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: profileForm.username,
                                "onUpdate:value": ($event) => profileForm.username = $event
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), {
                            label: "昵称",
                            name: "nickname"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: profileForm.nickname,
                                "onUpdate:value": ($event) => profileForm.nickname = $event
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
                                    loading: profileSaving.value,
                                    onClick: ($event) => onSaveUsername()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("保存")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"]),
                                  createVNode(unref(Button), {
                                    onClick: ($event) => unref(router).back()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("返回")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"])
                        ]),
                        _: 1
                      }, 8, ["model", "label-col", "wrapper-col"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "email",
              tab: "修改邮箱"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="form-max pt30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Form), {
                    ref_key: "emailFormRef",
                    ref: emailFormRef,
                    model: emailForm,
                    "label-col": { span: formCol.label },
                    "wrapper-col": { span: formCol.wrapper },
                    class: "pb20"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FormItem), {
                          wrapperCol: { offset: formCol.label, span: formCol.wrapper }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Alert), {
                                message: "邮箱可用于登录和修改密码",
                                type: "info",
                                "show-icon": ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Alert), {
                                  message: "邮箱可用于登录和修改密码",
                                  type: "info",
                                  "show-icon": ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), {
                          label: "邮箱",
                          name: "username",
                          rules: [{ required: true, message: "邮箱不能为空" }]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                id: "email",
                                value: emailForm.email,
                                "onUpdate:value": ($event) => emailForm.email = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  id: "email",
                                  value: emailForm.email,
                                  "onUpdate:value": ($event) => emailForm.email = $event
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), {
                          wrapperCol: { offset: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Space), { size: "middle" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Button), {
                                      type: "primary",
                                      loading: emailSaving.value,
                                      onClick: ($event) => _ctx.onEmailSave()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`保存`);
                                        } else {
                                          return [
                                            createTextVNode("保存")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Button), {
                                      onClick: ($event) => unref(router).back()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`返回`);
                                        } else {
                                          return [
                                            createTextVNode("返回")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: emailSaving.value,
                                        onClick: ($event) => _ctx.onEmailSave()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "onClick"]),
                                      createVNode(unref(Button), {
                                        onClick: ($event) => unref(router).back()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("返回")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Space), { size: "middle" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: emailSaving.value,
                                      onClick: ($event) => _ctx.onEmailSave()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("保存")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "onClick"]),
                                    createVNode(unref(Button), {
                                      onClick: ($event) => unref(router).back()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("返回")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(FormItem), {
                            wrapperCol: { offset: formCol.label, span: formCol.wrapper }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Alert), {
                                message: "邮箱可用于登录和修改密码",
                                type: "info",
                                "show-icon": ""
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"]),
                          createVNode(unref(FormItem), {
                            label: "邮箱",
                            name: "username",
                            rules: [{ required: true, message: "邮箱不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                id: "email",
                                value: emailForm.email,
                                "onUpdate:value": ($event) => emailForm.email = $event
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
                                    loading: emailSaving.value,
                                    onClick: ($event) => _ctx.onEmailSave()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("保存")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"]),
                                  createVNode(unref(Button), {
                                    onClick: ($event) => unref(router).back()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("返回")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "form-max pt30" }, [
                      createVNode(unref(Form), {
                        ref_key: "emailFormRef",
                        ref: emailFormRef,
                        model: emailForm,
                        "label-col": { span: formCol.label },
                        "wrapper-col": { span: formCol.wrapper },
                        class: "pb20"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(FormItem), {
                            wrapperCol: { offset: formCol.label, span: formCol.wrapper }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Alert), {
                                message: "邮箱可用于登录和修改密码",
                                type: "info",
                                "show-icon": ""
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"]),
                          createVNode(unref(FormItem), {
                            label: "邮箱",
                            name: "username",
                            rules: [{ required: true, message: "邮箱不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                id: "email",
                                value: emailForm.email,
                                "onUpdate:value": ($event) => emailForm.email = $event
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
                                    loading: emailSaving.value,
                                    onClick: ($event) => _ctx.onEmailSave()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("保存")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"]),
                                  createVNode(unref(Button), {
                                    onClick: ($event) => unref(router).back()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("返回")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"])
                        ]),
                        _: 1
                      }, 8, ["model", "label-col", "wrapper-col"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "password",
              tab: "修改密码"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="form-max pt30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Form), {
                    ref_key: "pwdFormRef",
                    ref: pwdFormRef,
                    model: pwdForm,
                    "label-col": { span: formCol.label },
                    "wrapper-col": { span: formCol.wrapper },
                    class: "pb20"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FormItem), {
                          label: "旧密码",
                          name: "password",
                          rules: [{ required: true, message: "密码不能为空" }]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: pwdForm.password,
                                "onUpdate:value": ($event) => pwdForm.password = $event,
                                type: "password"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: pwdForm.password,
                                  "onUpdate:value": ($event) => pwdForm.password = $event,
                                  type: "password"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), {
                          label: "新密码",
                          name: "newpassword",
                          rules: [{ required: true, message: "密码不能为空" }]
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: pwdForm.newpassword,
                                "onUpdate:value": ($event) => pwdForm.newpassword = $event,
                                type: "password"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: pwdForm.newpassword,
                                  "onUpdate:value": ($event) => pwdForm.newpassword = $event,
                                  type: "password"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), {
                          wrapperCol: { offset: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Space), { size: "middle" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Button), {
                                      type: "primary",
                                      loading: pwdSaving.value,
                                      onClick: ($event) => onSavePwd()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`保存`);
                                        } else {
                                          return [
                                            createTextVNode("保存")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Button), {
                                      onClick: ($event) => unref(router).back()
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`返回`);
                                        } else {
                                          return [
                                            createTextVNode("返回")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: pwdSaving.value,
                                        onClick: ($event) => onSavePwd()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading", "onClick"]),
                                      createVNode(unref(Button), {
                                        onClick: ($event) => unref(router).back()
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("返回")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Space), { size: "middle" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: pwdSaving.value,
                                      onClick: ($event) => onSavePwd()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("保存")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "onClick"]),
                                    createVNode(unref(Button), {
                                      onClick: ($event) => unref(router).back()
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("返回")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(FormItem), {
                            label: "旧密码",
                            name: "password",
                            rules: [{ required: true, message: "密码不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: pwdForm.password,
                                "onUpdate:value": ($event) => pwdForm.password = $event,
                                type: "password"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), {
                            label: "新密码",
                            name: "newpassword",
                            rules: [{ required: true, message: "密码不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: pwdForm.newpassword,
                                "onUpdate:value": ($event) => pwdForm.newpassword = $event,
                                type: "password"
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
                                    loading: pwdSaving.value,
                                    onClick: ($event) => onSavePwd()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("保存")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"]),
                                  createVNode(unref(Button), {
                                    onClick: ($event) => unref(router).back()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("返回")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "form-max pt30" }, [
                      createVNode(unref(Form), {
                        ref_key: "pwdFormRef",
                        ref: pwdFormRef,
                        model: pwdForm,
                        "label-col": { span: formCol.label },
                        "wrapper-col": { span: formCol.wrapper },
                        class: "pb20"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(FormItem), {
                            label: "旧密码",
                            name: "password",
                            rules: [{ required: true, message: "密码不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: pwdForm.password,
                                "onUpdate:value": ($event) => pwdForm.password = $event,
                                type: "password"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), {
                            label: "新密码",
                            name: "newpassword",
                            rules: [{ required: true, message: "密码不能为空" }]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: pwdForm.newpassword,
                                "onUpdate:value": ($event) => pwdForm.newpassword = $event,
                                type: "password"
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
                                    loading: pwdSaving.value,
                                    onClick: ($event) => onSavePwd()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("保存")
                                    ]),
                                    _: 1
                                  }, 8, ["loading", "onClick"]),
                                  createVNode(unref(Button), {
                                    onClick: ($event) => unref(router).back()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("返回")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"])
                        ]),
                        _: 1
                      }, 8, ["model", "label-col", "wrapper-col"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "profile",
                tab: "个人资料"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "form-max" }, [
                    createVNode(unref(Form), {
                      ref_key: "profileFormRef",
                      ref: profileFormRef,
                      model: profileForm,
                      "label-col": { span: formCol.label },
                      "wrapper-col": { span: formCol.wrapper },
                      class: "pt30 pb20"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(FormItem), {
                          label: "用户名",
                          name: "username",
                          rules: [{ required: true, message: "用户名不能为空" }]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: profileForm.username,
                              "onUpdate:value": ($event) => profileForm.username = $event
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), {
                          label: "昵称",
                          name: "nickname"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: profileForm.nickname,
                              "onUpdate:value": ($event) => profileForm.nickname = $event
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
                                  loading: profileSaving.value,
                                  onClick: ($event) => onSaveUsername()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("保存")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "onClick"]),
                                createVNode(unref(Button), {
                                  onClick: ($event) => unref(router).back()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("返回")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["wrapperCol"])
                      ]),
                      _: 1
                    }, 8, ["model", "label-col", "wrapper-col"])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(TabPane), {
                key: "email",
                tab: "修改邮箱"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "form-max pt30" }, [
                    createVNode(unref(Form), {
                      ref_key: "emailFormRef",
                      ref: emailFormRef,
                      model: emailForm,
                      "label-col": { span: formCol.label },
                      "wrapper-col": { span: formCol.wrapper },
                      class: "pb20"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(FormItem), {
                          wrapperCol: { offset: formCol.label, span: formCol.wrapper }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Alert), {
                              message: "邮箱可用于登录和修改密码",
                              type: "info",
                              "show-icon": ""
                            })
                          ]),
                          _: 1
                        }, 8, ["wrapperCol"]),
                        createVNode(unref(FormItem), {
                          label: "邮箱",
                          name: "username",
                          rules: [{ required: true, message: "邮箱不能为空" }]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              id: "email",
                              value: emailForm.email,
                              "onUpdate:value": ($event) => emailForm.email = $event
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
                                  loading: emailSaving.value,
                                  onClick: ($event) => _ctx.onEmailSave()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("保存")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "onClick"]),
                                createVNode(unref(Button), {
                                  onClick: ($event) => unref(router).back()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("返回")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["wrapperCol"])
                      ]),
                      _: 1
                    }, 8, ["model", "label-col", "wrapper-col"])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(TabPane), {
                key: "password",
                tab: "修改密码"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "form-max pt30" }, [
                    createVNode(unref(Form), {
                      ref_key: "pwdFormRef",
                      ref: pwdFormRef,
                      model: pwdForm,
                      "label-col": { span: formCol.label },
                      "wrapper-col": { span: formCol.wrapper },
                      class: "pb20"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(FormItem), {
                          label: "旧密码",
                          name: "password",
                          rules: [{ required: true, message: "密码不能为空" }]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: pwdForm.password,
                              "onUpdate:value": ($event) => pwdForm.password = $event,
                              type: "password"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), {
                          label: "新密码",
                          name: "newpassword",
                          rules: [{ required: true, message: "密码不能为空" }]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: pwdForm.newpassword,
                              "onUpdate:value": ($event) => pwdForm.newpassword = $event,
                              type: "password"
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
                                  loading: pwdSaving.value,
                                  onClick: ($event) => onSavePwd()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("保存")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "onClick"]),
                                createVNode(unref(Button), {
                                  onClick: ($event) => unref(router).back()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("返回")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["wrapperCol"])
                      ]),
                      _: 1
                    }, 8, ["model", "label-col", "wrapper-col"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/uhub/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
