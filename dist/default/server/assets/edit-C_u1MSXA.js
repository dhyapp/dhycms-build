import { computed, ref, reactive, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Button, Spin, Form, FormItem, Input, Select, SelectOption, RadioGroup, Radio, Space, InputNumber, Tooltip, Textarea, message } from "ant-design-vue";
import { _ as _sfc_main$2 } from "./cloud-poster-upload-BYKE9-j0.js";
import { _ as _sfc_main$1 } from "./admin-form-action-bar-fhn4ltpr.js";
import { n as nav, m as menu } from "./index-0psH9gUa.js";
import { useRoute, useRouter } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import { t as toTree, g as generateMixed } from "./common-ZcIx5rAG.js";
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
    const formCol = { label: 4, wrapper: 18 };
    const formRef = ref(null);
    const formState = reactive({
      name: "",
      logo: "",
      link: "",
      status: "on",
      mid: null,
      sort: 0,
      styles: "",
      tag: "",
      tagStyles: ""
    });
    const spinning = ref(false);
    const saving = ref(false);
    const menu$1 = ref([]);
    const fetchData = async (id) => {
      try {
        spinning.value = true;
        await nav.get({ id }).then((data) => {
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
        field: "main,in:nav|app",
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
        if (isAdd) {
          data.body.referrerCode = generateMixed(6);
        }
        await nav[isAdd ? "add" : "update"](data).then(() => {
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
                        _push4(`链接管理`);
                      } else {
                        return [
                          createTextVNode("链接管理")
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
                        createTextVNode("链接管理")
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
                      createTextVNode("链接管理")
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
      _push(`<div class="pannel nav-edit-page"><div class="phead">链接编辑</div><div class="form-max pt20 pr20 pb30 pl30">`);
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
                  _push3(ssrRenderComponent(unref(FormItem), { label: "LOGO" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, {
                          mode: "whole",
                          text: "上传LOGO",
                          modelValue: formState.logo,
                          "onUpdate:modelValue": ($event) => formState.logo = $event,
                          previewURL: `${formState.logo}?100x100`
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, {
                            mode: "whole",
                            text: "上传LOGO",
                            modelValue: formState.logo,
                            "onUpdate:modelValue": ($event) => formState.logo = $event,
                            previewURL: `${formState.logo}?100x100`
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                              _push5(ssrRenderComponent(unref(Radio), { value: "on" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`上线`);
                                  } else {
                                    return [
                                      createTextVNode("上线")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Radio), { value: "off" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`下线`);
                                  } else {
                                    return [
                                      createTextVNode("下线")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Radio), { value: "on" }, {
                                  default: withCtx(() => [
                                    createTextVNode("上线")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(Radio), { value: "off" }, {
                                  default: withCtx(() => [
                                    createTextVNode("下线")
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
                            value: formState.status,
                            "onUpdate:value": ($event) => formState.status = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Radio), { value: "on" }, {
                                default: withCtx(() => [
                                  createTextVNode("上线")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(Radio), { value: "off" }, {
                                default: withCtx(() => [
                                  createTextVNode("下线")
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
                    label: "排序",
                    name: "sort"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Space), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(InputNumber), {
                                value: formState.sort,
                                "onUpdate:value": ($event) => formState.sort = $event,
                                min: 0
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(Tooltip), null, {
                                title: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`数值越高排序越靠前，0表示默认排序<br${_scopeId5}>排序优先规则：手动排序&gt;昨日&gt;今日&gt;总量`);
                                  } else {
                                    return [
                                      createTextVNode("数值越高排序越靠前，0表示默认排序"),
                                      createVNode("br"),
                                      createTextVNode("排序优先规则：手动排序>昨日>今日>总量")
                                    ];
                                  }
                                }),
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
                                createVNode(unref(InputNumber), {
                                  value: formState.sort,
                                  "onUpdate:value": ($event) => formState.sort = $event,
                                  min: 0
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode(unref(Tooltip), null, {
                                  title: withCtx(() => [
                                    createTextVNode("数值越高排序越靠前，0表示默认排序"),
                                    createVNode("br"),
                                    createTextVNode("排序优先规则：手动排序>昨日>今日>总量")
                                  ]),
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
                          createVNode(unref(Space), null, {
                            default: withCtx(() => [
                              createVNode(unref(InputNumber), {
                                value: formState.sort,
                                "onUpdate:value": ($event) => formState.sort = $event,
                                min: 0
                              }, null, 8, ["value", "onUpdate:value"]),
                              createVNode(unref(Tooltip), null, {
                                title: withCtx(() => [
                                  createTextVNode("数值越高排序越靠前，0表示默认排序"),
                                  createVNode("br"),
                                  createTextVNode("排序优先规则：手动排序>昨日>今日>总量")
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_MIcon, { name: "help" })
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
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "标签",
                    name: "tag"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.tag,
                          "onUpdate:value": ($event) => formState.tag = $event,
                          placeholder: "请输入1~2个中文字符或1~4个英文字符"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.tag,
                            "onUpdate:value": ($event) => formState.tag = $event,
                            placeholder: "请输入1~2个中文字符或1~4个英文字符"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), { label: "标签样式" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Textarea), {
                          value: formState.tagStyles,
                          "onUpdate:value": ($event) => formState.tagStyles = $event,
                          placeholder: "例：background:red;color:#fff"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Textarea), {
                            value: formState.tagStyles,
                            "onUpdate:value": ($event) => formState.tagStyles = $event,
                            placeholder: "例：background:red;color:#fff"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), { label: "CSS样式" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Textarea), {
                          value: formState.styles,
                          "onUpdate:value": ($event) => formState.styles = $event,
                          placeholder: "例：font-weight:bold"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Textarea), {
                            value: formState.styles,
                            "onUpdate:value": ($event) => formState.styles = $event,
                            placeholder: "例：font-weight:bold"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), { label: "LOGO" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, {
                          mode: "whole",
                          text: "上传LOGO",
                          modelValue: formState.logo,
                          "onUpdate:modelValue": ($event) => formState.logo = $event,
                          previewURL: `${formState.logo}?100x100`
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                      ]),
                      _: 1
                    }),
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
                            createVNode(unref(Radio), { value: "on" }, {
                              default: withCtx(() => [
                                createTextVNode("上线")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(Radio), { value: "off" }, {
                              default: withCtx(() => [
                                createTextVNode("下线")
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
                      label: "排序",
                      name: "sort"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Space), null, {
                          default: withCtx(() => [
                            createVNode(unref(InputNumber), {
                              value: formState.sort,
                              "onUpdate:value": ($event) => formState.sort = $event,
                              min: 0
                            }, null, 8, ["value", "onUpdate:value"]),
                            createVNode(unref(Tooltip), null, {
                              title: withCtx(() => [
                                createTextVNode("数值越高排序越靠前，0表示默认排序"),
                                createVNode("br"),
                                createTextVNode("排序优先规则：手动排序>昨日>今日>总量")
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_MIcon, { name: "help" })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "标签",
                      name: "tag"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: formState.tag,
                          "onUpdate:value": ($event) => formState.tag = $event,
                          placeholder: "请输入1~2个中文字符或1~4个英文字符"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), { label: "标签样式" }, {
                      default: withCtx(() => [
                        createVNode(unref(Textarea), {
                          value: formState.tagStyles,
                          "onUpdate:value": ($event) => formState.tagStyles = $event,
                          placeholder: "例：background:red;color:#fff"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), { label: "CSS样式" }, {
                      default: withCtx(() => [
                        createVNode(unref(Textarea), {
                          value: formState.styles,
                          "onUpdate:value": ($event) => formState.styles = $event,
                          placeholder: "例：font-weight:bold"
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
                  createVNode(unref(FormItem), { label: "LOGO" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, {
                        mode: "whole",
                        text: "上传LOGO",
                        modelValue: formState.logo,
                        "onUpdate:modelValue": ($event) => formState.logo = $event,
                        previewURL: `${formState.logo}?100x100`
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                    ]),
                    _: 1
                  }),
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
                          createVNode(unref(Radio), { value: "on" }, {
                            default: withCtx(() => [
                              createTextVNode("上线")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Radio), { value: "off" }, {
                            default: withCtx(() => [
                              createTextVNode("下线")
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
                    label: "排序",
                    name: "sort"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Space), null, {
                        default: withCtx(() => [
                          createVNode(unref(InputNumber), {
                            value: formState.sort,
                            "onUpdate:value": ($event) => formState.sort = $event,
                            min: 0
                          }, null, 8, ["value", "onUpdate:value"]),
                          createVNode(unref(Tooltip), null, {
                            title: withCtx(() => [
                              createTextVNode("数值越高排序越靠前，0表示默认排序"),
                              createVNode("br"),
                              createTextVNode("排序优先规则：手动排序>昨日>今日>总量")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_MIcon, { name: "help" })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "标签",
                    name: "tag"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: formState.tag,
                        "onUpdate:value": ($event) => formState.tag = $event,
                        placeholder: "请输入1~2个中文字符或1~4个英文字符"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), { label: "标签样式" }, {
                    default: withCtx(() => [
                      createVNode(unref(Textarea), {
                        value: formState.tagStyles,
                        "onUpdate:value": ($event) => formState.tagStyles = $event,
                        placeholder: "例：background:red;color:#fff"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), { label: "CSS样式" }, {
                    default: withCtx(() => [
                      createVNode(unref(Textarea), {
                        value: formState.styles,
                        "onUpdate:value": ($event) => formState.styles = $event,
                        placeholder: "例：font-weight:bold"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/nav/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
