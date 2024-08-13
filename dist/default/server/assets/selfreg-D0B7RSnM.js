import { ref, reactive, computed, watch, onMounted, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, createVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Space, Button, Alert, Textarea, Input, InputNumber, message } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./index-DSEGUnNi.js";
import { d as setting } from "./index-0psH9gUa.js";
import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import "./modal-CbztPSM0.js";
import "./main-DhQTa4Ec.js";
import "./common-ZcIx5rAG.js";
import "crypto-js";
import "node:path";
import "vue-router";
import "pinia";
const _sfc_main = {
  __name: "selfreg",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const curTab = ref("selfreg-base");
    const formCol = { label: 6, wrapper: 24 };
    const formRef = ref(null);
    const formState = reactive({
      about: "",
      cooperation: "",
      contact: "",
      description: ""
    });
    const inFormState = reactive({
      baseReferrerCount: 0,
      name: "",
      domains: ""
    });
    const isDark = computed(() => globalStore.theme === "dark");
    const editorRef = ref(null);
    const editor2Ref = ref(null);
    const editor3Ref = ref(null);
    const editor4Ref = ref(null);
    const editorOptions = { inline: true };
    const showEditor = ref(false);
    const saveLoading = ref(false);
    const spinning = ref(false);
    const mapForm = {
      "selfreg-base": formState,
      "selfreg-in": inFormState
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
          showEditor.value = true;
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
          body: { value: toRaw(mapForm[type]), key: type, _upsert: true }
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        saveLoading.value = false;
      }
    };
    watch(() => globalStore.theme, () => {
      editorRef.value.reload();
      editor2Ref.value.reload();
    });
    const onTabChange = (type) => {
      fetchSetting(type || curTab.value);
    };
    onMounted(() => {
      fetchSetting("selfreg-base");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel selfreg-contact-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event,
        onChange: onTabChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "selfreg-base",
              tab: "联系与说明"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="setting-max-800 pt20 pr20 pb30 pl30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          ref_key: "formRef",
                          ref: formRef,
                          model: formState,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(FormItem), { label: "关于我们" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (showEditor.value) {
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        ref_key: "editorRef",
                                        ref: editorRef,
                                        id: "aboutEditor",
                                        modelValue: formState.about,
                                        "onUpdate:modelValue": ($event) => formState.about = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                        key: 0,
                                        ref_key: "editorRef",
                                        ref: editorRef,
                                        id: "aboutEditor",
                                        modelValue: formState.about,
                                        "onUpdate:modelValue": ($event) => formState.about = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "广告合作" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (showEditor.value) {
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        ref_key: "editor2Ref",
                                        ref: editor2Ref,
                                        id: "cooperateEditor",
                                        modelValue: formState.cooperation,
                                        "onUpdate:modelValue": ($event) => formState.cooperation = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                        key: 0,
                                        ref_key: "editor2Ref",
                                        ref: editor2Ref,
                                        id: "cooperateEditor",
                                        modelValue: formState.cooperation,
                                        "onUpdate:modelValue": ($event) => formState.cooperation = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "联系我们" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (showEditor.value) {
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        ref_key: "editor3Ref",
                                        ref: editor3Ref,
                                        id: "contactEditor",
                                        modelValue: formState.contact,
                                        "onUpdate:modelValue": ($event) => formState.contact = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                        key: 0,
                                        ref_key: "editor3Ref",
                                        ref: editor3Ref,
                                        id: "contactEditor",
                                        modelValue: formState.contact,
                                        "onUpdate:modelValue": ($event) => formState.contact = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "收录说明" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (showEditor.value) {
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        ref_key: "editor4Ref",
                                        ref: editor4Ref,
                                        id: "decriptionEditor",
                                        modelValue: formState.description,
                                        "onUpdate:modelValue": ($event) => formState.description = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                        key: 0,
                                        ref_key: "editor4Ref",
                                        ref: editor4Ref,
                                        id: "decriptionEditor",
                                        modelValue: formState.description,
                                        "onUpdate:modelValue": ($event) => formState.description = $event,
                                        dark: isDark.value,
                                        options: editorOptions
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
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
                                            onClick: ($event) => onSave("selfreg-base")
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
                                              onClick: ($event) => onSave("selfreg-base")
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
                                            onClick: ($event) => onSave("selfreg-base")
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
                                createVNode(unref(FormItem), { label: "关于我们" }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      ref_key: "editorRef",
                                      ref: editorRef,
                                      id: "aboutEditor",
                                      modelValue: formState.about,
                                      "onUpdate:modelValue": ($event) => formState.about = $event,
                                      dark: isDark.value,
                                      options: editorOptions
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "广告合作" }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      ref_key: "editor2Ref",
                                      ref: editor2Ref,
                                      id: "cooperateEditor",
                                      modelValue: formState.cooperation,
                                      "onUpdate:modelValue": ($event) => formState.cooperation = $event,
                                      dark: isDark.value,
                                      options: editorOptions
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "联系我们" }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      ref_key: "editor3Ref",
                                      ref: editor3Ref,
                                      id: "contactEditor",
                                      modelValue: formState.contact,
                                      "onUpdate:modelValue": ($event) => formState.contact = $event,
                                      dark: isDark.value,
                                      options: editorOptions
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "收录说明" }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      ref_key: "editor4Ref",
                                      ref: editor4Ref,
                                      id: "decriptionEditor",
                                      modelValue: formState.description,
                                      "onUpdate:modelValue": ($event) => formState.description = $event,
                                      dark: isDark.value,
                                      options: editorOptions
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
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
                                          onClick: ($event) => onSave("selfreg-base")
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
                            ref_key: "formRef",
                            ref: formRef,
                            model: formState,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), { label: "关于我们" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editorRef",
                                    ref: editorRef,
                                    id: "aboutEditor",
                                    modelValue: formState.about,
                                    "onUpdate:modelValue": ($event) => formState.about = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "广告合作" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editor2Ref",
                                    ref: editor2Ref,
                                    id: "cooperateEditor",
                                    modelValue: formState.cooperation,
                                    "onUpdate:modelValue": ($event) => formState.cooperation = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "联系我们" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editor3Ref",
                                    ref: editor3Ref,
                                    id: "contactEditor",
                                    modelValue: formState.contact,
                                    "onUpdate:modelValue": ($event) => formState.contact = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "收录说明" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editor4Ref",
                                    ref: editor4Ref,
                                    id: "decriptionEditor",
                                    modelValue: formState.description,
                                    "onUpdate:modelValue": ($event) => formState.description = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
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
                                        onClick: ($event) => onSave("selfreg-base")
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
                            ref_key: "formRef",
                            ref: formRef,
                            model: formState,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), { label: "关于我们" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editorRef",
                                    ref: editorRef,
                                    id: "aboutEditor",
                                    modelValue: formState.about,
                                    "onUpdate:modelValue": ($event) => formState.about = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "广告合作" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editor2Ref",
                                    ref: editor2Ref,
                                    id: "cooperateEditor",
                                    modelValue: formState.cooperation,
                                    "onUpdate:modelValue": ($event) => formState.cooperation = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "联系我们" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editor3Ref",
                                    ref: editor3Ref,
                                    id: "contactEditor",
                                    modelValue: formState.contact,
                                    "onUpdate:modelValue": ($event) => formState.contact = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "收录说明" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editor4Ref",
                                    ref: editor4Ref,
                                    id: "decriptionEditor",
                                    modelValue: formState.description,
                                    "onUpdate:modelValue": ($event) => formState.description = $event,
                                    dark: isDark.value,
                                    options: editorOptions
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
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
                                        onClick: ($event) => onSave("selfreg-base")
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
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "selfreg-in",
              tab: "收录设置"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="setting-max-800 pt20 pr20 pb30 pl30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Form), {
                    model: inFormState,
                    labelAlign: "left",
                    "label-col": { span: formCol.label }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FormItem), {
                          wrapperCol: { offset: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Alert), {
                                class: "mb10",
                                type: "warning"
                              }, {
                                message: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<ul class="pl14" style="${ssrRenderStyle({ "list-style": "decimal" })}"${_scopeId5}><li${_scopeId5}><b${_scopeId5}>跳转域名（强烈推荐填写，可提高站点存活率）</b>，随机使用以下域名生成友链。默认使用本域名做为跳转域名（不推荐）。</li><li${_scopeId5}><b${_scopeId5}>收录最低来源</b>需安装并<b${_scopeId5}>开启自动收录插件</b>后方可生效。</li></ul>`);
                                  } else {
                                    return [
                                      createVNode("ul", {
                                        class: "pl14",
                                        style: { "list-style": "decimal" }
                                      }, [
                                        createVNode("li", null, [
                                          createVNode("b", null, "跳转域名（强烈推荐填写，可提高站点存活率）"),
                                          createTextVNode("，随机使用以下域名生成友链。默认使用本域名做为跳转域名（不推荐）。")
                                        ]),
                                        createVNode("li", null, [
                                          createVNode("b", null, "收录最低来源"),
                                          createTextVNode("需安装并"),
                                          createVNode("b", null, "开启自动收录插件"),
                                          createTextVNode("后方可生效。")
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Alert), {
                                  class: "mb10",
                                  type: "warning"
                                }, {
                                  message: withCtx(() => [
                                    createVNode("ul", {
                                      class: "pl14",
                                      style: { "list-style": "decimal" }
                                    }, [
                                      createVNode("li", null, [
                                        createVNode("b", null, "跳转域名（强烈推荐填写，可提高站点存活率）"),
                                        createTextVNode("，随机使用以下域名生成友链。默认使用本域名做为跳转域名（不推荐）。")
                                      ]),
                                      createVNode("li", null, [
                                        createVNode("b", null, "收录最低来源"),
                                        createTextVNode("需安装并"),
                                        createVNode("b", null, "开启自动收录插件"),
                                        createTextVNode("后方可生效。")
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { label: "友链跳转域名" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Textarea), {
                                value: inFormState.domains,
                                "onUpdate:value": ($event) => inFormState.domains = $event,
                                rows: 6,
                                placeholder: "https://开头，多个域名请换行"
                              }, null, _parent5, _scopeId4));
                              _push5(`<div class="mt4"${_scopeId4}><a${ssrRenderAttr("href", `${unref(ssrStore).config.dhy.gateway}/market?type=landing`)} target="_blank" class="txt-info"${_scopeId4}>免费获取DHYCMS跳转页模板</a></div>`);
                            } else {
                              return [
                                createVNode(unref(Textarea), {
                                  value: inFormState.domains,
                                  "onUpdate:value": ($event) => inFormState.domains = $event,
                                  rows: 6,
                                  placeholder: "https://开头，多个域名请换行"
                                }, null, 8, ["value", "onUpdate:value"]),
                                createVNode("div", { class: "mt4" }, [
                                  createVNode("a", {
                                    href: `${unref(ssrStore).config.dhy.gateway}/market?type=landing`,
                                    target: "_blank",
                                    class: "txt-info"
                                  }, "免费获取DHYCMS跳转页模板", 8, ["href"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { label: "己站名称" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Input), {
                                value: inFormState.name,
                                "onUpdate:value": ($event) => inFormState.name = $event,
                                placeholder: "提示对方进行收录的我站名称，默认使用网站简称"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Input), {
                                  value: inFormState.name,
                                  "onUpdate:value": ($event) => inFormState.name = $event,
                                  placeholder: "提示对方进行收录的我站名称，默认使用网站简称"
                                }, null, 8, ["value", "onUpdate:value"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(FormItem), { label: "收录最低来源" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(InputNumber), {
                                value: inFormState.baseReferrerCount,
                                "onUpdate:value": ($event) => inFormState.baseReferrerCount = $event,
                                placeholder: "请收入最低收录来源量",
                                min: 0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(InputNumber), {
                                  value: inFormState.baseReferrerCount,
                                  "onUpdate:value": ($event) => inFormState.baseReferrerCount = $event,
                                  placeholder: "请收入最低收录来源量",
                                  min: 0
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
                                      loading: saveLoading.value,
                                      onClick: ($event) => onSave("selfreg-in")
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
                                  } else {
                                    return [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: saveLoading.value,
                                        onClick: ($event) => onSave("selfreg-in")
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Space), { size: "middle" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: saveLoading.value,
                                      onClick: ($event) => onSave("selfreg-in")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(FormItem), {
                            wrapperCol: { offset: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Alert), {
                                class: "mb10",
                                type: "warning"
                              }, {
                                message: withCtx(() => [
                                  createVNode("ul", {
                                    class: "pl14",
                                    style: { "list-style": "decimal" }
                                  }, [
                                    createVNode("li", null, [
                                      createVNode("b", null, "跳转域名（强烈推荐填写，可提高站点存活率）"),
                                      createTextVNode("，随机使用以下域名生成友链。默认使用本域名做为跳转域名（不推荐）。")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("b", null, "收录最低来源"),
                                      createTextVNode("需安装并"),
                                      createVNode("b", null, "开启自动收录插件"),
                                      createTextVNode("后方可生效。")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"]),
                          createVNode(unref(FormItem), { label: "友链跳转域名" }, {
                            default: withCtx(() => [
                              createVNode(unref(Textarea), {
                                value: inFormState.domains,
                                "onUpdate:value": ($event) => inFormState.domains = $event,
                                rows: 6,
                                placeholder: "https://开头，多个域名请换行"
                              }, null, 8, ["value", "onUpdate:value"]),
                              createVNode("div", { class: "mt4" }, [
                                createVNode("a", {
                                  href: `${unref(ssrStore).config.dhy.gateway}/market?type=landing`,
                                  target: "_blank",
                                  class: "txt-info"
                                }, "免费获取DHYCMS跳转页模板", 8, ["href"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { label: "己站名称" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: inFormState.name,
                                "onUpdate:value": ($event) => inFormState.name = $event,
                                placeholder: "提示对方进行收录的我站名称，默认使用网站简称"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { label: "收录最低来源" }, {
                            default: withCtx(() => [
                              createVNode(unref(InputNumber), {
                                value: inFormState.baseReferrerCount,
                                "onUpdate:value": ($event) => inFormState.baseReferrerCount = $event,
                                placeholder: "请收入最低收录来源量",
                                min: 0
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
                                    onClick: ($event) => onSave("selfreg-in")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "setting-max-800 pt20 pr20 pb30 pl30" }, [
                      createVNode(unref(Form), {
                        model: inFormState,
                        labelAlign: "left",
                        "label-col": { span: formCol.label }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(FormItem), {
                            wrapperCol: { offset: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Alert), {
                                class: "mb10",
                                type: "warning"
                              }, {
                                message: withCtx(() => [
                                  createVNode("ul", {
                                    class: "pl14",
                                    style: { "list-style": "decimal" }
                                  }, [
                                    createVNode("li", null, [
                                      createVNode("b", null, "跳转域名（强烈推荐填写，可提高站点存活率）"),
                                      createTextVNode("，随机使用以下域名生成友链。默认使用本域名做为跳转域名（不推荐）。")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("b", null, "收录最低来源"),
                                      createTextVNode("需安装并"),
                                      createVNode("b", null, "开启自动收录插件"),
                                      createTextVNode("后方可生效。")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["wrapperCol"]),
                          createVNode(unref(FormItem), { label: "友链跳转域名" }, {
                            default: withCtx(() => [
                              createVNode(unref(Textarea), {
                                value: inFormState.domains,
                                "onUpdate:value": ($event) => inFormState.domains = $event,
                                rows: 6,
                                placeholder: "https://开头，多个域名请换行"
                              }, null, 8, ["value", "onUpdate:value"]),
                              createVNode("div", { class: "mt4" }, [
                                createVNode("a", {
                                  href: `${unref(ssrStore).config.dhy.gateway}/market?type=landing`,
                                  target: "_blank",
                                  class: "txt-info"
                                }, "免费获取DHYCMS跳转页模板", 8, ["href"])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { label: "己站名称" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: inFormState.name,
                                "onUpdate:value": ($event) => inFormState.name = $event,
                                placeholder: "提示对方进行收录的我站名称，默认使用网站简称"
                              }, null, 8, ["value", "onUpdate:value"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(FormItem), { label: "收录最低来源" }, {
                            default: withCtx(() => [
                              createVNode(unref(InputNumber), {
                                value: inFormState.baseReferrerCount,
                                "onUpdate:value": ($event) => inFormState.baseReferrerCount = $event,
                                placeholder: "请收入最低收录来源量",
                                min: 0
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
                                    onClick: ($event) => onSave("selfreg-in")
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
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "selfreg-base",
                tab: "联系与说明"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "setting-max-800 pt20 pr20 pb30 pl30" }, [
                    createVNode(unref(Spin), { spinning: spinning.value }, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          ref_key: "formRef",
                          ref: formRef,
                          model: formState,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), { label: "关于我们" }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 0,
                                  ref_key: "editorRef",
                                  ref: editorRef,
                                  id: "aboutEditor",
                                  modelValue: formState.about,
                                  "onUpdate:modelValue": ($event) => formState.about = $event,
                                  dark: isDark.value,
                                  options: editorOptions
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "广告合作" }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 0,
                                  ref_key: "editor2Ref",
                                  ref: editor2Ref,
                                  id: "cooperateEditor",
                                  modelValue: formState.cooperation,
                                  "onUpdate:modelValue": ($event) => formState.cooperation = $event,
                                  dark: isDark.value,
                                  options: editorOptions
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "联系我们" }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 0,
                                  ref_key: "editor3Ref",
                                  ref: editor3Ref,
                                  id: "contactEditor",
                                  modelValue: formState.contact,
                                  "onUpdate:modelValue": ($event) => formState.contact = $event,
                                  dark: isDark.value,
                                  options: editorOptions
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "收录说明" }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 0,
                                  ref_key: "editor4Ref",
                                  ref: editor4Ref,
                                  id: "decriptionEditor",
                                  modelValue: formState.description,
                                  "onUpdate:modelValue": ($event) => formState.description = $event,
                                  dark: isDark.value,
                                  options: editorOptions
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
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
                                      onClick: ($event) => onSave("selfreg-base")
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
              }),
              createVNode(unref(TabPane), {
                key: "selfreg-in",
                tab: "收录设置"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "setting-max-800 pt20 pr20 pb30 pl30" }, [
                    createVNode(unref(Form), {
                      model: inFormState,
                      labelAlign: "left",
                      "label-col": { span: formCol.label }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(FormItem), {
                          wrapperCol: { offset: formCol.label }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Alert), {
                              class: "mb10",
                              type: "warning"
                            }, {
                              message: withCtx(() => [
                                createVNode("ul", {
                                  class: "pl14",
                                  style: { "list-style": "decimal" }
                                }, [
                                  createVNode("li", null, [
                                    createVNode("b", null, "跳转域名（强烈推荐填写，可提高站点存活率）"),
                                    createTextVNode("，随机使用以下域名生成友链。默认使用本域名做为跳转域名（不推荐）。")
                                  ]),
                                  createVNode("li", null, [
                                    createVNode("b", null, "收录最低来源"),
                                    createTextVNode("需安装并"),
                                    createVNode("b", null, "开启自动收录插件"),
                                    createTextVNode("后方可生效。")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["wrapperCol"]),
                        createVNode(unref(FormItem), { label: "友链跳转域名" }, {
                          default: withCtx(() => [
                            createVNode(unref(Textarea), {
                              value: inFormState.domains,
                              "onUpdate:value": ($event) => inFormState.domains = $event,
                              rows: 6,
                              placeholder: "https://开头，多个域名请换行"
                            }, null, 8, ["value", "onUpdate:value"]),
                            createVNode("div", { class: "mt4" }, [
                              createVNode("a", {
                                href: `${unref(ssrStore).config.dhy.gateway}/market?type=landing`,
                                target: "_blank",
                                class: "txt-info"
                              }, "免费获取DHYCMS跳转页模板", 8, ["href"])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { label: "己站名称" }, {
                          default: withCtx(() => [
                            createVNode(unref(Input), {
                              value: inFormState.name,
                              "onUpdate:value": ($event) => inFormState.name = $event,
                              placeholder: "提示对方进行收录的我站名称，默认使用网站简称"
                            }, null, 8, ["value", "onUpdate:value"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(FormItem), { label: "收录最低来源" }, {
                          default: withCtx(() => [
                            createVNode(unref(InputNumber), {
                              value: inFormState.baseReferrerCount,
                              "onUpdate:value": ($event) => inFormState.baseReferrerCount = $event,
                              placeholder: "请收入最低收录来源量",
                              min: 0
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
                                  onClick: ($event) => onSave("selfreg-in")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/selfreg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
