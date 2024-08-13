import { computed, ref, reactive, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Button, Spin, Form, FormItem, Input, Select, SelectOption, RadioGroup, Radio, message } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./admin-form-action-bar-fhn4ltpr.js";
import { s as selfreg, m as menu } from "./index-0psH9gUa.js";
import { useRoute, useRouter } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import { t as toTree } from "./common-ZcIx5rAG.js";
import "node:path";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const formCol = { label: 4, wrapper: 18 };
    const formRef = ref(null);
    const formState = reactive({
      name: "",
      link: "",
      referrerCode: "",
      status: "out",
      mid: null,
      remark: ""
    });
    const mapStatus = {
      in: "已收录",
      out: "未收录",
      refuse: "驳回",
      block: "拉黑"
    };
    const spinning = ref(false);
    const saving = ref(false);
    const menu$1 = ref([]);
    const fetchData = async (id) => {
      try {
        spinning.value = true;
        await selfreg.get({ id }).then((data) => {
          const stateModel = toRaw(formState);
          for (const k in stateModel) {
            formState[k] = data[k] || formState[k];
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const fetchMenu = async () => {
      const sql = {
        sortby: "sort",
        fieldby: "type,subType",
        field: "main,nav",
        pageSize: 1e3
      };
      await menu.list({ query: sql }).then((res) => {
        menu$1.value = toTree({ data: res.list });
      });
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
        await selfreg[isAdd ? "add" : "update"](data).then(() => {
          message.success(`${isAdd ? "添加" : "保存"}成功`);
          router.back();
        });
      } finally {
        saving.value = false;
      }
    };
    onMounted(() => {
      if (route.params.id) {
        fetchData(route.params.id);
      }
      fetchMenu();
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
                    to: `/${preadmin.value}/nav`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`自助收录管理`);
                      } else {
                        return [
                          createTextVNode("自助收录管理")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/nav`
                    }, {
                      default: withCtx(() => [
                        createTextVNode("自助收录管理")
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
                    to: `/${preadmin.value}/nav`
                  }, {
                    default: withCtx(() => [
                      createTextVNode("自助收录管理")
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
      _push(`<div class="pannel nav-edit-page"><div class="phead">收录编辑</div><div class="form-max pt20 pr20 pb30 pl30">`);
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
                    label: "名称",
                    name: "name",
                    rules: [{ required: true, message: "名称不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.name,
                          "onUpdate:value": ($event) => formState.name = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.name,
                            "onUpdate:value": ($event) => formState.name = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "跳转链接",
                    name: "link",
                    rules: [{ required: true, message: "跳转链接不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.link,
                          "onUpdate:value": ($event) => formState.link = $event,
                          placeholder: "https://"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.link,
                            "onUpdate:value": ($event) => formState.link = $event,
                            placeholder: "https://"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "来源码",
                    name: "referrerCode",
                    rules: [{ required: true, message: "来源码不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.referrerCode,
                          "onUpdate:value": ($event) => formState.referrerCode = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.referrerCode,
                            "onUpdate:value": ($event) => formState.referrerCode = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "所属分类",
                    name: "mid",
                    rules: [{ required: true, message: "请选择所属分类" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Select), {
                          value: formState.mid,
                          "onUpdate:value": ($event) => formState.mid = $event,
                          placeholder: "所属菜单分类"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(menu$1.value, (v) => {
                                _push5(ssrRenderComponent(unref(SelectOption), {
                                  key: v._id,
                                  value: v._id
                                }, {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(menu$1.value, (v) => {
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Select), {
                            value: formState.mid,
                            "onUpdate:value": ($event) => formState.mid = $event,
                            placeholder: "所属菜单分类"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(menu$1.value, (v) => {
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "上下线",
                    name: "status"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(RadioGroup), {
                          value: formState.status,
                          "onUpdate:value": ($event) => formState.status = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(mapStatus, (v, k) => {
                                _push5(ssrRenderComponent(unref(Radio), {
                                  key: k,
                                  value: k
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(v)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(v), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                                  return createVNode(unref(Radio), {
                                    key: k,
                                    value: k
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(v), 1)
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
                          createVNode(unref(RadioGroup), {
                            value: formState.status,
                            "onUpdate:value": ($event) => formState.status = $event
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                                return createVNode(unref(Radio), {
                                  key: k,
                                  value: k
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(v), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "备注",
                    name: "remark"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.remark,
                          "onUpdate:value": ($event) => formState.remark = $event,
                          placeholder: "请输入驳回原因"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.remark,
                            "onUpdate:value": ($event) => formState.remark = $event,
                            placeholder: "请输入驳回原因"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "名称",
                      name: "name",
                      rules: [{ required: true, message: "名称不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.name,
                          "onUpdate:value": ($event) => formState.name = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "跳转链接",
                      name: "link",
                      rules: [{ required: true, message: "跳转链接不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.link,
                          "onUpdate:value": ($event) => formState.link = $event,
                          placeholder: "https://"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "来源码",
                      name: "referrerCode",
                      rules: [{ required: true, message: "来源码不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.referrerCode,
                          "onUpdate:value": ($event) => formState.referrerCode = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "所属分类",
                      name: "mid",
                      rules: [{ required: true, message: "请选择所属分类" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          value: formState.mid,
                          "onUpdate:value": ($event) => formState.mid = $event,
                          placeholder: "所属菜单分类"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(menu$1.value, (v) => {
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
                      label: "上下线",
                      name: "status"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RadioGroup), {
                          value: formState.status,
                          "onUpdate:value": ($event) => formState.status = $event
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                              return createVNode(unref(Radio), {
                                key: k,
                                value: k
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(v), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "备注",
                      name: "remark"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.remark,
                          "onUpdate:value": ($event) => formState.remark = $event,
                          placeholder: "请输入驳回原因"
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
                ref_key: "formRef",
                ref: formRef,
                model: formState,
                labelAlign: "left",
                "label-col": { span: formCol.label },
                "wrapper-col": { span: formCol.wrapper }
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "名称",
                    name: "name",
                    rules: [{ required: true, message: "名称不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.name,
                        "onUpdate:value": ($event) => formState.name = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "跳转链接",
                    name: "link",
                    rules: [{ required: true, message: "跳转链接不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.link,
                        "onUpdate:value": ($event) => formState.link = $event,
                        placeholder: "https://"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "来源码",
                    name: "referrerCode",
                    rules: [{ required: true, message: "来源码不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.referrerCode,
                        "onUpdate:value": ($event) => formState.referrerCode = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "所属分类",
                    name: "mid",
                    rules: [{ required: true, message: "请选择所属分类" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        value: formState.mid,
                        "onUpdate:value": ($event) => formState.mid = $event,
                        placeholder: "所属菜单分类"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(menu$1.value, (v) => {
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
                    label: "上下线",
                    name: "status"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(RadioGroup), {
                        value: formState.status,
                        "onUpdate:value": ($event) => formState.status = $event
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                            return createVNode(unref(Radio), {
                              key: k,
                              value: k
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "备注",
                    name: "remark"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.remark,
                        "onUpdate:value": ($event) => formState.remark = $event,
                        placeholder: "请输入驳回原因"
                      }, null, 8, ["value", "onUpdate:value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/selfreg/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
