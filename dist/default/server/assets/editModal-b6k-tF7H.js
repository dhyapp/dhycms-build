import { ref, reactive, inject, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext, toRaw, watchEffect } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Modal, Form, FormItem, Textarea, Select, SelectOption, DatePicker, message } from "ant-design-vue";
import { r as request } from "../entry-server.js";
import { b as blockIps, c as blockDomain$1 } from "./index-0psH9gUa.js";
import dayjs from "dayjs";
const blockIPs = (body = {}, options = {}) => {
  return request(`/api/v1/admin/blockIps/addbatch`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const blockDomain = (body = {}, options = {}) => {
  return request(`/api/v1/admin/blockDomain/addbatch`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const _sfc_main$1 = {
  __name: "addModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    type: { type: String, default: "ip" }
  },
  emits: ["update:show", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const confirmLoading = ref(false);
    const formRef = ref();
    const formState = reactive({
      data: "",
      type: "all",
      expireTime: 0
    });
    const mapTypes = inject("mapTypes", {});
    const showModal = computed({
      get() {
        return props.show;
      },
      set(v) {
        emits("update:show", v);
      }
    });
    const onExpireTimeChange = (date) => {
      formState.expireTime = date ? date.valueOf() : 0;
    };
    const onOk = async () => {
      try {
        confirmLoading.value = true;
        await formRef.value.validate();
        const data = toRaw(formState);
        const success = () => {
          message.success("操作成功");
          showModal.value = false;
          emits("success", data);
        };
        props.type === "ip" ? await blockIPs(data).then(success) : await blockDomain(data).then(success);
      } finally {
        confirmLoading.value = false;
      }
    };
    const onCancel = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: showModal.value,
        "onUpdate:open": ($event) => showModal.value = $event
      }, _ctx.$attrs, {
        centered: "",
        "cancel-text": "取消",
        okButtonProps: { loading: confirmLoading.value },
        width: 600,
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
              "wrapper-col": { span: 18 },
              class: "pt30 pb20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "拉黑对象",
                    name: "data",
                    rules: [{ required: true, message: "拉黑对象不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Textarea), {
                          value: formState.data,
                          "onUpdate:value": ($event) => formState.data = $event,
                          rows: 6,
                          placeholder: __props.type === "ip" ? "例：168.168.168.2，多个IP请换行" : "例：example.com，多个域名请换行"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Textarea), {
                            value: formState.data,
                            "onUpdate:value": ($event) => formState.data = $event,
                            rows: 6,
                            placeholder: __props.type === "ip" ? "例：168.168.168.2，多个IP请换行" : "例：example.com，多个域名请换行"
                          }, null, 8, ["value", "onUpdate:value", "placeholder"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "拉黑类型",
                    name: "type",
                    rules: [{ required: true, message: "请选择拉黑类型" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Select), {
                          value: formState.type,
                          "onUpdate:value": ($event) => formState.type = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(mapTypes), (v, k) => {
                                _push5(ssrRenderComponent(unref(SelectOption), {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                                  return openBlock(), createBlock(unref(SelectOption), {
                                    key: k,
                                    value: k
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(v), 1)
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
                            value: formState.type,
                            "onUpdate:value": ($event) => formState.type = $event
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                                return openBlock(), createBlock(unref(SelectOption), {
                                  key: k,
                                  value: k
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(v), 1)
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
                    label: "移除时间",
                    name: "expireTime"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DatePicker), {
                          placeholder: "选择移除时间，空表示永久拉黑",
                          style: { width: "100%" },
                          onChange: onExpireTimeChange
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DatePicker), {
                            placeholder: "选择移除时间，空表示永久拉黑",
                            style: { width: "100%" },
                            onChange: onExpireTimeChange
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "拉黑对象",
                      name: "data",
                      rules: [{ required: true, message: "拉黑对象不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Textarea), {
                          value: formState.data,
                          "onUpdate:value": ($event) => formState.data = $event,
                          rows: 6,
                          placeholder: __props.type === "ip" ? "例：168.168.168.2，多个IP请换行" : "例：example.com，多个域名请换行"
                        }, null, 8, ["value", "onUpdate:value", "placeholder"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "拉黑类型",
                      name: "type",
                      rules: [{ required: true, message: "请选择拉黑类型" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          value: formState.type,
                          "onUpdate:value": ($event) => formState.type = $event
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                              return openBlock(), createBlock(unref(SelectOption), {
                                key: k,
                                value: k
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(v), 1)
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
                      label: "移除时间",
                      name: "expireTime"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DatePicker), {
                          placeholder: "选择移除时间，空表示永久拉黑",
                          style: { width: "100%" },
                          onChange: onExpireTimeChange
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
                "label-col": { span: 4 },
                "wrapper-col": { span: 18 },
                class: "pt30 pb20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "拉黑对象",
                    name: "data",
                    rules: [{ required: true, message: "拉黑对象不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Textarea), {
                        value: formState.data,
                        "onUpdate:value": ($event) => formState.data = $event,
                        rows: 6,
                        placeholder: __props.type === "ip" ? "例：168.168.168.2，多个IP请换行" : "例：example.com，多个域名请换行"
                      }, null, 8, ["value", "onUpdate:value", "placeholder"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "拉黑类型",
                    name: "type",
                    rules: [{ required: true, message: "请选择拉黑类型" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        value: formState.type,
                        "onUpdate:value": ($event) => formState.type = $event
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                            return openBlock(), createBlock(unref(SelectOption), {
                              key: k,
                              value: k
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v), 1)
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
                    label: "移除时间",
                    name: "expireTime"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(DatePicker), {
                        placeholder: "选择移除时间，空表示永久拉黑",
                        style: { width: "100%" },
                        onChange: onExpireTimeChange
                      })
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/security/addModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "editModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ids: { type: Array, required: true },
    data: { type: Object, default: () => ({
      type: "all",
      expireTime: 0
    }) },
    type: { type: String, default: "ip" }
  },
  emits: ["update:show", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const confirmLoading = ref(false);
    const formRef = ref();
    const formState = reactive({});
    const mapTypes = inject("mapTypes", {});
    const expireTime = ref();
    const showModal = computed({
      get() {
        return props.show;
      },
      set(v) {
        emits("update:show", v);
      }
    });
    watchEffect(() => {
      for (const k in props.data) {
        if (k === "expireTime") {
          expireTime.value = props.data[k] ? dayjs(props.data[k]) : null;
          continue;
        }
        formState[k] = props.data[k];
      }
    });
    const onExpireTimeChange = (date) => {
      formState.expireTime = date ? date.valueOf() : 0;
    };
    const onOk = async () => {
      try {
        confirmLoading.value = true;
        await formRef.value.validate();
        await (props.type === "ip" ? blockIps : blockDomain$1).update({
          ids: props.ids,
          body: toRaw(formState)
        }).then(() => {
          message.success("操作成功");
          showModal.value = false;
          emits("success", toRaw(formState));
        });
      } finally {
        confirmLoading.value = false;
      }
    };
    const onCancel = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: showModal.value,
        "onUpdate:open": ($event) => showModal.value = $event
      }, _ctx.$attrs, {
        centered: "",
        "cancel-text": "取消",
        okButtonProps: { loading: confirmLoading.value },
        width: 600,
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
              "wrapper-col": { span: 18 },
              class: "pt30 pb20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "拉黑类型",
                    name: "type",
                    rules: [{ required: true, message: "请选择拉黑类型" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Select), {
                          value: formState.type,
                          "onUpdate:value": ($event) => formState.type = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(mapTypes), (v, k) => {
                                _push5(ssrRenderComponent(unref(SelectOption), {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                                  return openBlock(), createBlock(unref(SelectOption), {
                                    key: k,
                                    value: k
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(v), 1)
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
                            value: formState.type,
                            "onUpdate:value": ($event) => formState.type = $event
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                                return openBlock(), createBlock(unref(SelectOption), {
                                  key: k,
                                  value: k
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(v), 1)
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
                    label: "移除时间",
                    name: "expireTime"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DatePicker), {
                          value: expireTime.value,
                          "onUpdate:value": ($event) => expireTime.value = $event,
                          placeholder: "选择移除时间，空表示永久拉黑",
                          style: { width: "100%" },
                          onChange: onExpireTimeChange
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DatePicker), {
                            value: expireTime.value,
                            "onUpdate:value": ($event) => expireTime.value = $event,
                            placeholder: "选择移除时间，空表示永久拉黑",
                            style: { width: "100%" },
                            onChange: onExpireTimeChange
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "拉黑类型",
                      name: "type",
                      rules: [{ required: true, message: "请选择拉黑类型" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          value: formState.type,
                          "onUpdate:value": ($event) => formState.type = $event
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                              return openBlock(), createBlock(unref(SelectOption), {
                                key: k,
                                value: k
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(v), 1)
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
                      label: "移除时间",
                      name: "expireTime"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DatePicker), {
                          value: expireTime.value,
                          "onUpdate:value": ($event) => expireTime.value = $event,
                          placeholder: "选择移除时间，空表示永久拉黑",
                          style: { width: "100%" },
                          onChange: onExpireTimeChange
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
                "label-col": { span: 4 },
                "wrapper-col": { span: 18 },
                class: "pt30 pb20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "拉黑类型",
                    name: "type",
                    rules: [{ required: true, message: "请选择拉黑类型" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        value: formState.type,
                        "onUpdate:value": ($event) => formState.type = $event
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(mapTypes), (v, k) => {
                            return openBlock(), createBlock(unref(SelectOption), {
                              key: k,
                              value: k
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v), 1)
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
                    label: "移除时间",
                    name: "expireTime"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(DatePicker), {
                        value: expireTime.value,
                        "onUpdate:value": ($event) => expireTime.value = $event,
                        placeholder: "选择移除时间，空表示永久拉黑",
                        style: { width: "100%" },
                        onChange: onExpireTimeChange
                      }, null, 8, ["value", "onUpdate:value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/security/editModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
