import { computed, ref, reactive, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Button, Spin, Form, FormItem, InputGroup, Input, RadioGroup, Radio, Select, SelectOption, Space, InputNumber, Tooltip, message } from "ant-design-vue";
import { _ as _sfc_main$2 } from "./cloud-poster-upload-BYKE9-j0.js";
import { _ as _sfc_main$1 } from "./admin-form-action-bar-fhn4ltpr.js";
import { u as user } from "./index-0psH9gUa.js";
import { a as addUser, b as updateUser } from "./index-DM_w3Rd-.js";
import { useRoute, useRouter } from "vue-router";
import { g as generateMixed, b as dateFormat } from "./common-ZcIx5rAG.js";
import { u as useGLobalStore } from "../entry-server.js";
import "./modal-CbztPSM0.js";
import "./main-DhQTa4Ec.js";
import "crypto-js";
import "node:path";
import "pinia";
const _sfc_main = {
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const user$1 = computed(() => globalStore.user);
    const formCol = { label: 4, wrapper: 18 };
    const formRef = ref(null);
    const formState = reactive({
      id: route.params.id || generateMixed(8, true),
      pid: [],
      username: "",
      nickname: "",
      realname: "",
      sex: 2,
      email: "",
      phone: "",
      password: "",
      wx: "",
      alipay: "",
      IPs: [],
      role: "normal",
      status: "normal",
      avatar: "",
      frozen: false,
      security: 0,
      coin: 0,
      commission: 0,
      commissionFrozen: 0,
      vipEndTime: 0,
      freeDownloadCount: 1,
      maxDownloadCount: 1
    });
    const expiredTime = ref("");
    const mapRoles = {
      normal: { name: "普通用户", color: "info" },
      admin: { name: "管理员", color: "admin" },
      super: { name: "超级管理员", color: "super" }
    };
    const spinning = ref(false);
    const saving = ref(false);
    const fetchData = async (id) => {
      try {
        spinning.value = true;
        await user.get({ id }).then((data) => {
          const stateModel = toRaw(formState);
          for (const k in stateModel) {
            formState[k] = data[k] || formState[k];
          }
          if (formState.vipEndTime) {
            expiredTime.value = dateFormat(Number(`${formState.vipEndTime}000`), "YYYY-MM-DD");
          }
          if (["admin", "super"].includes(formState.role)) {
            formState.roleDisabledEdit = true;
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
        const body = toRaw(formState);
        if (expiredTime.value)
          body.vipEndTime = Math.round(new Date(expiredTime.value).getTime() / 1e3);
        const isAdd = !route.params.id;
        if (isAdd) {
          await addUser(body).then(() => {
            message.success("添加成功");
            router.back();
          });
        } else {
          await updateUser(route.params.id, body).then(() => {
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
                    to: `/${preadmin.value}/users`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`用户管理`);
                      } else {
                        return [
                          createTextVNode("用户管理")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/users`
                    }, {
                      default: withCtx(() => [
                        createTextVNode("用户管理")
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
                    to: `/${preadmin.value}/users`
                  }, {
                    default: withCtx(() => [
                      createTextVNode("用户管理")
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
                  _push3(`${ssrInterpolate(!unref(route).params.id ? "添加" : "提交")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(!unref(route).params.id ? "添加" : "提交"), 1)
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
                    createTextVNode(toDisplayString(!unref(route).params.id ? "添加" : "提交"), 1)
                  ]),
                  _: 1
                }, 8, ["loading", "onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel user-edit-page"><div class="phead">用户编辑</div><div class="form-max pt20 pr20 pb30 pl30">`);
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
                  _push3(ssrRenderComponent(unref(FormItem), { label: "头像" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          text: "上传头像",
                          modelValue: formState.avatar,
                          "onUpdate:modelValue": ($event) => formState.avatar = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, {
                            text: "上传头像",
                            modelValue: formState.avatar,
                            "onUpdate:modelValue": ($event) => formState.avatar = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(route).params.id != 1e4) {
                    _push3(ssrRenderComponent(unref(FormItem), {
                      label: "ID",
                      name: "id",
                      rules: [{ required: true, message: "ID不能为空" }]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(InputGroup), { compact: "" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Input), {
                                  value: formState.id,
                                  "onUpdate:value": ($event) => formState.id = $event,
                                  style: { "width": "calc(100% - 88px)" }
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(Button), {
                                  style: { "width": "88px" },
                                  onClick: ($event) => formState.id = unref(generateMixed)(8, true)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`重新生成`);
                                    } else {
                                      return [
                                        createTextVNode("重新生成")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(Input), {
                                    value: formState.id,
                                    "onUpdate:value": ($event) => formState.id = $event,
                                    style: { "width": "calc(100% - 88px)" }
                                  }, null, 8, ["value", "onUpdate:value"]),
                                  createVNode(unref(Button), {
                                    style: { "width": "88px" },
                                    onClick: ($event) => formState.id = unref(generateMixed)(8, true)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("重新生成")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(InputGroup), { compact: "" }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.id,
                                  "onUpdate:value": ($event) => formState.id = $event,
                                  style: { "width": "calc(100% - 88px)" }
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode(unref(Button), {
                                  style: { "width": "88px" },
                                  onClick: ($event) => formState.id = unref(generateMixed)(8, true)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("重新生成")
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
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "用户名",
                    name: "username",
                    rules: [{ required: true, message: "用户名不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.username,
                          "onUpdate:value": ($event) => formState.username = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.username,
                            "onUpdate:value": ($event) => formState.username = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "密码",
                    name: "password",
                    rules: [{ required: true, message: "密码不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.password,
                          "onUpdate:value": ($event) => formState.password = $event,
                          type: "password"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.password,
                            "onUpdate:value": ($event) => formState.password = $event,
                            type: "password"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "邮箱",
                    name: "email",
                    rules: [{ required: true, message: "邮箱不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.email,
                          "onUpdate:value": ($event) => formState.email = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.email,
                            "onUpdate:value": ($event) => formState.email = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "手机号",
                    name: "phone"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.phone,
                          "onUpdate:value": ($event) => formState.phone = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.phone,
                            "onUpdate:value": ($event) => formState.phone = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "昵称",
                    name: "nickname"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.nickname,
                          "onUpdate:value": ($event) => formState.nickname = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.nickname,
                            "onUpdate:value": ($event) => formState.nickname = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "性别",
                    name: "sex"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RadioGroup), {
                          value: formState.sex,
                          "onUpdate:value": ($event) => formState.sex = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Radio), { value: 0 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`女`);
                                  } else {
                                    return [
                                      createTextVNode("女")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Radio), { value: 1 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`男`);
                                  } else {
                                    return [
                                      createTextVNode("男")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Radio), { value: 2 }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`保密`);
                                  } else {
                                    return [
                                      createTextVNode("保密")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Radio), { value: 0 }, {
                                  default: withCtx(() => [
                                    createTextVNode("女")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Radio), { value: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode("男")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Radio), { value: 2 }, {
                                  default: withCtx(() => [
                                    createTextVNode("保密")
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
                          createVNode(unref(RadioGroup), {
                            value: formState.sex,
                            "onUpdate:value": ($event) => formState.sex = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Radio), { value: 0 }, {
                                default: withCtx(() => [
                                  createTextVNode("女")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Radio), { value: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode("男")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Radio), { value: 2 }, {
                                default: withCtx(() => [
                                  createTextVNode("保密")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(route).params.id) {
                    _push3(ssrRenderComponent(unref(FormItem), {
                      label: "IP",
                      name: "IPs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Select), {
                            mode: "tags",
                            value: formState.IPs,
                            "onUpdate:value": ($event) => formState.IPs = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Select), {
                              mode: "tags",
                              value: formState.IPs,
                              "onUpdate:value": ($event) => formState.IPs = $event
                            }, null, 8, ["value", "onUpdate:value"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "角色/会员",
                    name: "role"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Select), {
                          value: formState.role,
                          "onUpdate:value": ($event) => formState.role = $event,
                          placeholder: "请选择角色/会员",
                          disabled: formState.id == user$1.value.id
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(mapRoles, (v, k) => {
                                _push5(ssrRenderComponent(unref(SelectOption), { value: k }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(v.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(v.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                                  return createVNode(unref(SelectOption), { value: k }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(v.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Select), {
                            value: formState.role,
                            "onUpdate:value": ($event) => formState.role = $event,
                            placeholder: "请选择角色/会员",
                            disabled: formState.id == user$1.value.id
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                                return createVNode(unref(SelectOption), { value: k }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(v.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "是否冻结",
                    name: "frozen"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RadioGroup), {
                          value: formState.frozen,
                          "onUpdate:value": ($event) => formState.frozen = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Radio), { value: false }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`否`);
                                  } else {
                                    return [
                                      createTextVNode("否")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Radio), { value: true }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`是`);
                                  } else {
                                    return [
                                      createTextVNode("是")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Radio), { value: false }, {
                                  default: withCtx(() => [
                                    createTextVNode("否")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Radio), { value: true }, {
                                  default: withCtx(() => [
                                    createTextVNode("是")
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
                          createVNode(unref(RadioGroup), {
                            value: formState.frozen,
                            "onUpdate:value": ($event) => formState.frozen = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Radio), { value: false }, {
                                default: withCtx(() => [
                                  createTextVNode("否")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Radio), { value: true }, {
                                default: withCtx(() => [
                                  createTextVNode("是")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "账户安全等级",
                    name: "security"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Space), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(InputNumber), {
                                value: formState.security,
                                "onUpdate:value": ($event) => formState.security = $event,
                                min: 0
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Tooltip), { title: "数值越高，表示账户风险越高" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_MIcon, {
                                      name: "info",
                                      class: "fs16"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_MIcon, {
                                        name: "info",
                                        class: "fs16"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(InputNumber), {
                                  value: formState.security,
                                  "onUpdate:value": ($event) => formState.security = $event,
                                  min: 0
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode(unref(Tooltip), { title: "数值越高，表示账户风险越高" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_MIcon, {
                                      name: "info",
                                      class: "fs16"
                                    })
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
                          createVNode(unref(Space), null, {
                            default: withCtx(() => [
                              createVNode(unref(InputNumber), {
                                value: formState.security,
                                "onUpdate:value": ($event) => formState.security = $event,
                                min: 0
                              }, null, 8, ["value", "onUpdate:value"]),
                              createVNode(unref(Tooltip), { title: "数值越高，表示账户风险越高" }, {
                                default: withCtx(() => [
                                  createVNode(_component_MIcon, {
                                    name: "info",
                                    class: "fs16"
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), { label: "头像" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, {
                          text: "上传头像",
                          modelValue: formState.avatar,
                          "onUpdate:modelValue": ($event) => formState.avatar = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    unref(route).params.id != 1e4 ? (openBlock(), createBlock(unref(FormItem), {
                      key: 0,
                      label: "ID",
                      name: "id",
                      rules: [{ required: true, message: "ID不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(InputGroup), { compact: "" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: formState.id,
                              "onUpdate:value": ($event) => formState.id = $event,
                              style: { "width": "calc(100% - 88px)" }
                            }, null, 8, ["value", "onUpdate:value"]),
                            createVNode(unref(Button), {
                              style: { "width": "88px" },
                              onClick: ($event) => formState.id = unref(generateMixed)(8, true)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("重新生成")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(unref(FormItem), {
                      label: "用户名",
                      name: "username",
                      rules: [{ required: true, message: "用户名不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.username,
                          "onUpdate:value": ($event) => formState.username = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "密码",
                      name: "password",
                      rules: [{ required: true, message: "密码不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.password,
                          "onUpdate:value": ($event) => formState.password = $event,
                          type: "password"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "邮箱",
                      name: "email",
                      rules: [{ required: true, message: "邮箱不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.email,
                          "onUpdate:value": ($event) => formState.email = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "手机号",
                      name: "phone"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.phone,
                          "onUpdate:value": ($event) => formState.phone = $event
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
                          value: formState.nickname,
                          "onUpdate:value": ($event) => formState.nickname = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "性别",
                      name: "sex"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RadioGroup), {
                          value: formState.sex,
                          "onUpdate:value": ($event) => formState.sex = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Radio), { value: 0 }, {
                              default: withCtx(() => [
                                createTextVNode("女")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Radio), { value: 1 }, {
                              default: withCtx(() => [
                                createTextVNode("男")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Radio), { value: 2 }, {
                              default: withCtx(() => [
                                createTextVNode("保密")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    unref(route).params.id ? (openBlock(), createBlock(unref(FormItem), {
                      key: 1,
                      label: "IP",
                      name: "IPs"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          mode: "tags",
                          value: formState.IPs,
                          "onUpdate:value": ($event) => formState.IPs = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(unref(FormItem), {
                      label: "角色/会员",
                      name: "role"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          value: formState.role,
                          "onUpdate:value": ($event) => formState.role = $event,
                          placeholder: "请选择角色/会员",
                          disabled: formState.id == user$1.value.id
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                              return createVNode(unref(SelectOption), { value: k }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(v.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "是否冻结",
                      name: "frozen"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RadioGroup), {
                          value: formState.frozen,
                          "onUpdate:value": ($event) => formState.frozen = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Radio), { value: false }, {
                              default: withCtx(() => [
                                createTextVNode("否")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Radio), { value: true }, {
                              default: withCtx(() => [
                                createTextVNode("是")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "账户安全等级",
                      name: "security"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Space), null, {
                          default: withCtx(() => [
                            createVNode(unref(InputNumber), {
                              value: formState.security,
                              "onUpdate:value": ($event) => formState.security = $event,
                              min: 0
                            }, null, 8, ["value", "onUpdate:value"]),
                            createVNode(unref(Tooltip), { title: "数值越高，表示账户风险越高" }, {
                              default: withCtx(() => [
                                createVNode(_component_MIcon, {
                                  name: "info",
                                  class: "fs16"
                                })
                              ]),
                              _: 1
                            })
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
                  createVNode(unref(FormItem), { label: "头像" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, {
                        text: "上传头像",
                        modelValue: formState.avatar,
                        "onUpdate:modelValue": ($event) => formState.avatar = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  unref(route).params.id != 1e4 ? (openBlock(), createBlock(unref(FormItem), {
                    key: 0,
                    label: "ID",
                    name: "id",
                    rules: [{ required: true, message: "ID不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(InputGroup), { compact: "" }, {
                        default: withCtx(() => [
                          createVNode(unref(Input), {
                            value: formState.id,
                            "onUpdate:value": ($event) => formState.id = $event,
                            style: { "width": "calc(100% - 88px)" }
                          }, null, 8, ["value", "onUpdate:value"]),
                          createVNode(unref(Button), {
                            style: { "width": "88px" },
                            onClick: ($event) => formState.id = unref(generateMixed)(8, true)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("重新生成")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(unref(FormItem), {
                    label: "用户名",
                    name: "username",
                    rules: [{ required: true, message: "用户名不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.username,
                        "onUpdate:value": ($event) => formState.username = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "密码",
                    name: "password",
                    rules: [{ required: true, message: "密码不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.password,
                        "onUpdate:value": ($event) => formState.password = $event,
                        type: "password"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "邮箱",
                    name: "email",
                    rules: [{ required: true, message: "邮箱不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.email,
                        "onUpdate:value": ($event) => formState.email = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "手机号",
                    name: "phone"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.phone,
                        "onUpdate:value": ($event) => formState.phone = $event
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
                        value: formState.nickname,
                        "onUpdate:value": ($event) => formState.nickname = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "性别",
                    name: "sex"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(RadioGroup), {
                        value: formState.sex,
                        "onUpdate:value": ($event) => formState.sex = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Radio), { value: 0 }, {
                            default: withCtx(() => [
                              createTextVNode("女")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Radio), { value: 1 }, {
                            default: withCtx(() => [
                              createTextVNode("男")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Radio), { value: 2 }, {
                            default: withCtx(() => [
                              createTextVNode("保密")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  unref(route).params.id ? (openBlock(), createBlock(unref(FormItem), {
                    key: 1,
                    label: "IP",
                    name: "IPs"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        mode: "tags",
                        value: formState.IPs,
                        "onUpdate:value": ($event) => formState.IPs = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(unref(FormItem), {
                    label: "角色/会员",
                    name: "role"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        value: formState.role,
                        "onUpdate:value": ($event) => formState.role = $event,
                        placeholder: "请选择角色/会员",
                        disabled: formState.id == user$1.value.id
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                            return createVNode(unref(SelectOption), { value: k }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "是否冻结",
                    name: "frozen"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(RadioGroup), {
                        value: formState.frozen,
                        "onUpdate:value": ($event) => formState.frozen = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Radio), { value: false }, {
                            default: withCtx(() => [
                              createTextVNode("否")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Radio), { value: true }, {
                            default: withCtx(() => [
                              createTextVNode("是")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "账户安全等级",
                    name: "security"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Space), null, {
                        default: withCtx(() => [
                          createVNode(unref(InputNumber), {
                            value: formState.security,
                            "onUpdate:value": ($event) => formState.security = $event,
                            min: 0
                          }, null, 8, ["value", "onUpdate:value"]),
                          createVNode(unref(Tooltip), { title: "数值越高，表示账户风险越高" }, {
                            default: withCtx(() => [
                              createVNode(_component_MIcon, {
                                name: "info",
                                class: "fs16"
                              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/users/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
