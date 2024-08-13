import { ref, inject, reactive, watchEffect, resolveComponent, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Modal, Form, FormItem, Input, Tooltip, Select, SelectOption, message } from "ant-design-vue";
import { m as menu } from "./index-0psH9gUa.js";
const _sfc_main = {
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    modelValue: Boolean,
    menuList: { type: Array, default: () => [] },
    type: { type: String, default: "add" },
    menuType: { type: String, required: true },
    state: { type: Object, default: () => ({}) },
    categories: { type: Array, default: () => [] },
    mapCategories: { type: Object, default: () => ({}) }
  },
  emits: ["modified", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const formInitModel = () => ({
      name: "",
      alias: "",
      subType: null,
      icon: "",
      iconType: null,
      link: "",
      color: "",
      sort: null,
      tag: "",
      pid: null,
      _id: null,
      cids: []
    });
    const showModal = ref(props.modelValue);
    const mapSubType = inject("mapSubType", {});
    const formRef = ref(null);
    const formState = reactive({});
    const confirmLoading = ref(false);
    const cids = ref([]);
    const initFormState = (data) => {
      var _a;
      const stateModel = formInitModel();
      for (let k in stateModel) {
        if (k === "cids" && ((_a = data == null ? void 0 : data.cids) == null ? void 0 : _a.length)) {
          cids.value = data.cids.map((id) => {
            var _a2;
            return { value: id, label: (_a2 = props.mapCategories[id]) == null ? void 0 : _a2.name };
          });
        }
        formState[k] = data[k] || stateModel[k];
      }
    };
    watchEffect(() => {
      showModal.value = props.modelValue;
      initFormState(props.state);
    });
    const onCancel = () => {
      showModal.value = false;
      emits("update:modelValue", false);
    };
    const onAdd = async () => {
      if (/[\-|,]/.test(formState.alias))
        return message.error("英文名称存在非法字符");
      try {
        confirmLoading.value = true;
        await formRef.value.validate();
        const data = toRaw(formState);
        delete data._id;
        if (cids.value)
          data.cids = cids.value.map((v) => v.value);
        await menu.add({ body: { ...data, type: props.menuType } }).then(() => {
          message.success("添加成功");
          emits("modified", data);
          initFormState({});
          onCancel();
        });
      } finally {
        confirmLoading.value = false;
      }
    };
    const onSave = async () => {
      if (/[\-|,]/.test(formState.alias))
        return message.error("英文名称存在非法字符");
      try {
        confirmLoading.value = true;
        await formRef.value.validate();
        const body = toRaw(formState);
        if (cids.value)
          body.cids = cids.value.map((v) => v.value);
        await menu.update({ id: body._id, body }).then(() => {
          message.success("保存成功");
          emits("modified", body);
          onCancel();
        });
      } finally {
        confirmLoading.value = false;
      }
    };
    const onOk = () => {
      if (props.type === "add")
        onAdd();
      else
        onSave();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MIcon = resolveComponent("MIcon");
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: showModal.value,
        "onUpdate:open": ($event) => showModal.value = $event
      }, _ctx.$attrs, {
        centered: "",
        title: `${__props.type === "add" ? "添加" : "编辑"}菜单`,
        "cancel-text": "取消",
        "ok-text": __props.type === "add" ? "添加" : "保存",
        confirmLoading: confirmLoading.value,
        width: 700,
        wrapClassName: "menu-modal",
        onOk,
        onCancel
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "formRef",
              ref: formRef,
              model: formState,
              "label-col": { span: 4 },
              "wrapper-col": { span: 20 },
              class: "pt30 pb20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "名称",
                    name: "name",
                    rules: [{ required: true, message: "菜单名称不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          placeholder: "菜单名称",
                          value: formState.name,
                          "onUpdate:value": ($event) => formState.name = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            placeholder: "菜单名称",
                            value: formState.name,
                            "onUpdate:value": ($event) => formState.name = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "链接",
                    name: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          placeholder: "https链接或站内相对路径",
                          value: formState.link,
                          "onUpdate:value": ($event) => formState.link = $event
                        }, {
                          suffix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Tooltip), { title: "https链接或站内相对路径" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_MIcon, { name: "help" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_MIcon, { name: "help" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Tooltip), { title: "https链接或站内相对路径" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_MIcon, { name: "help" })
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
                          createVNode(unref(Input), {
                            placeholder: "https链接或站内相对路径",
                            value: formState.link,
                            "onUpdate:value": ($event) => formState.link = $event
                          }, {
                            suffix: withCtx(() => [
                              createVNode(unref(Tooltip), { title: "https链接或站内相对路径" }, {
                                default: withCtx(() => [
                                  createVNode(_component_MIcon, { name: "help" })
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
                    label: "菜单类型",
                    name: "subType",
                    rules: [{ required: true, message: "请选择菜单类型" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Select), {
                          value: formState.subType,
                          "onUpdate:value": ($event) => formState.subType = $event,
                          placeholder: "请选择菜单类型"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(mapSubType), (v, k) => {
                                _push5(ssrRenderComponent(unref(SelectOption), { value: k }, {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(mapSubType), (v, k) => {
                                  return openBlock(), createBlock(unref(SelectOption), { value: k }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(v), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 256))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Select), {
                            value: formState.subType,
                            "onUpdate:value": ($event) => formState.subType = $event,
                            placeholder: "请选择菜单类型"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(mapSubType), (v, k) => {
                                return openBlock(), createBlock(unref(SelectOption), { value: k }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(v), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 256))
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "颜色",
                    name: "color"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          placeholder: "颜色",
                          value: formState.color,
                          "onUpdate:value": ($event) => formState.color = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            placeholder: "颜色",
                            value: formState.color,
                            "onUpdate:value": ($event) => formState.color = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "排序",
                    name: "sort"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          placeholder: "排序",
                          value: formState.sort,
                          "onUpdate:value": ($event) => formState.sort = $event
                        }, {
                          suffix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Tooltip), { title: "数值越高，排序越靠前" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_MIcon, { name: "help" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_MIcon, { name: "help" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Tooltip), { title: "数值越高，排序越靠前" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_MIcon, { name: "help" })
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
                          createVNode(unref(Input), {
                            placeholder: "排序",
                            value: formState.sort,
                            "onUpdate:value": ($event) => formState.sort = $event
                          }, {
                            suffix: withCtx(() => [
                              createVNode(unref(Tooltip), { title: "数值越高，排序越靠前" }, {
                                default: withCtx(() => [
                                  createVNode(_component_MIcon, { name: "help" })
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
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "名称",
                      name: "name",
                      rules: [{ required: true, message: "菜单名称不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          placeholder: "菜单名称",
                          value: formState.name,
                          "onUpdate:value": ($event) => formState.name = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "链接",
                      name: "link"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          placeholder: "https链接或站内相对路径",
                          value: formState.link,
                          "onUpdate:value": ($event) => formState.link = $event
                        }, {
                          suffix: withCtx(() => [
                            createVNode(unref(Tooltip), { title: "https链接或站内相对路径" }, {
                              default: withCtx(() => [
                                createVNode(_component_MIcon, { name: "help" })
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
                      label: "菜单类型",
                      name: "subType",
                      rules: [{ required: true, message: "请选择菜单类型" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          value: formState.subType,
                          "onUpdate:value": ($event) => formState.subType = $event,
                          placeholder: "请选择菜单类型"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(mapSubType), (v, k) => {
                              return openBlock(), createBlock(unref(SelectOption), { value: k }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(v), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 256))
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "颜色",
                      name: "color"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          placeholder: "颜色",
                          value: formState.color,
                          "onUpdate:value": ($event) => formState.color = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "排序",
                      name: "sort"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          placeholder: "排序",
                          value: formState.sort,
                          "onUpdate:value": ($event) => formState.sort = $event
                        }, {
                          suffix: withCtx(() => [
                            createVNode(unref(Tooltip), { title: "数值越高，排序越靠前" }, {
                              default: withCtx(() => [
                                createVNode(_component_MIcon, { name: "help" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"])
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
                "label-col": { span: 4 },
                "wrapper-col": { span: 20 },
                class: "pt30 pb20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "名称",
                    name: "name",
                    rules: [{ required: true, message: "菜单名称不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        placeholder: "菜单名称",
                        value: formState.name,
                        "onUpdate:value": ($event) => formState.name = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "链接",
                    name: "link"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        placeholder: "https链接或站内相对路径",
                        value: formState.link,
                        "onUpdate:value": ($event) => formState.link = $event
                      }, {
                        suffix: withCtx(() => [
                          createVNode(unref(Tooltip), { title: "https链接或站内相对路径" }, {
                            default: withCtx(() => [
                              createVNode(_component_MIcon, { name: "help" })
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
                    label: "菜单类型",
                    name: "subType",
                    rules: [{ required: true, message: "请选择菜单类型" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        value: formState.subType,
                        "onUpdate:value": ($event) => formState.subType = $event,
                        placeholder: "请选择菜单类型"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(mapSubType), (v, k) => {
                            return openBlock(), createBlock(unref(SelectOption), { value: k }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 256))
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "颜色",
                    name: "color"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        placeholder: "颜色",
                        value: formState.color,
                        "onUpdate:value": ($event) => formState.color = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "排序",
                    name: "sort"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        placeholder: "排序",
                        value: formState.sort,
                        "onUpdate:value": ($event) => formState.sort = $event
                      }, {
                        suffix: withCtx(() => [
                          createVNode(unref(Tooltip), { title: "数值越高，排序越靠前" }, {
                            default: withCtx(() => [
                              createVNode(_component_MIcon, { name: "help" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/menu/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
