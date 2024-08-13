import { ref, reactive, watch, onMounted, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Input, Space, Button, message } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./index-DSEGUnNi.js";
import { d as setting } from "./index-0psH9gUa.js";
import { u as useGLobalStore } from "../entry-server.js";
import "./modal-CbztPSM0.js";
import "./main-DhQTa4Ec.js";
import "./common-ZcIx5rAG.js";
import "crypto-js";
import "node:path";
import "vue-router";
import "pinia";
const _sfc_main = {
  __name: "notice",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const curTab = ref("notice");
    const formCol = { label: 6, wrapper: 24 };
    const formRef = ref(null);
    const formState = reactive({
      marquee: "",
      title: "最新公告",
      content: "",
      appurl: "",
      appText: "",
      publishurl: "",
      publishText: ""
    });
    const saveLoading = ref(false);
    const spinning = ref(false);
    const editorRef = ref(null);
    const marqueeRef = ref(null);
    const showEditor = ref(false);
    const fetchSetting = async () => {
      try {
        spinning.value = true;
        await setting.get({
          query: { fieldby: "key", field: "notice" }
        }).then((res) => {
          if (res == null ? void 0 : res.value) {
            const stateModel = toRaw(formState);
            for (const k in stateModel) {
              formState[k] = res.value[k] || formState[k];
            }
          }
          showEditor.value = true;
        });
      } finally {
        spinning.value = false;
      }
    };
    const onSave = async () => {
      try {
        saveLoading.value = true;
        await setting.update({
          query: { fieldby: "key", field: "notice" },
          body: { value: toRaw(formState), key: "notice", _upsert: true }
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        saveLoading.value = false;
      }
    };
    watch(() => globalStore.theme, () => {
      editorRef.value.reload();
      marqueeRef.value.reload();
    });
    onMounted(() => {
      fetchSetting();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel setting-notice-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "notice",
              tab: "公告"
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
                              _push5(ssrRenderComponent(unref(FormItem), { label: "跑马灯公告" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (showEditor.value) {
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        ref_key: "marqueeRef",
                                        ref: marqueeRef,
                                        id: "marqueeEditor",
                                        modelValue: formState.marquee,
                                        "onUpdate:modelValue": ($event) => formState.marquee = $event,
                                        dark: unref(globalStore).theme === "dark",
                                        options: { inline: true }
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                        key: 0,
                                        ref_key: "marqueeRef",
                                        ref: marqueeRef,
                                        id: "marqueeEditor",
                                        modelValue: formState.marquee,
                                        "onUpdate:modelValue": ($event) => formState.marquee = $event,
                                        dark: unref(globalStore).theme === "dark",
                                        options: { inline: true }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<hr class="mb30 mt20"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "弹窗公告标题",
                                name: "title"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.title,
                                      "onUpdate:value": ($event) => formState.title = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.title,
                                        "onUpdate:value": ($event) => formState.title = $event
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "弹窗公告内容" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (showEditor.value) {
                                      _push6(ssrRenderComponent(_sfc_main$1, {
                                        ref_key: "editorRef",
                                        ref: editorRef,
                                        id: "noticeEditor",
                                        modelValue: formState.content,
                                        "onUpdate:modelValue": ($event) => formState.content = $event,
                                        dark: unref(globalStore).theme === "dark",
                                        options: { inline: true }
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
                                        id: "noticeEditor",
                                        modelValue: formState.content,
                                        "onUpdate:modelValue": ($event) => formState.content = $event,
                                        dark: unref(globalStore).theme === "dark",
                                        options: { inline: true }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "APP下载地址",
                                name: "appurl"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.appurl,
                                      "onUpdate:value": ($event) => formState.appurl = $event,
                                      placeholder: "https://"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.appurl,
                                        "onUpdate:value": ($event) => formState.appurl = $event,
                                        placeholder: "https://"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "APP下载按钮文字",
                                name: "appText"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.appText,
                                      "onUpdate:value": ($event) => formState.appText = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.appText,
                                        "onUpdate:value": ($event) => formState.appText = $event
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "发布地址",
                                name: "publishurl"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.publishurl,
                                      "onUpdate:value": ($event) => formState.publishurl = $event,
                                      placeholder: "https://"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.publishurl,
                                        "onUpdate:value": ($event) => formState.publishurl = $event,
                                        placeholder: "https://"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "发布地址按钮文字",
                                name: "publishText"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.publishText,
                                      "onUpdate:value": ($event) => formState.publishText = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.publishText,
                                        "onUpdate:value": ($event) => formState.publishText = $event
                                      }, null, 8, ["value", "onUpdate:value"])
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
                                            onClick: ($event) => onSave()
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
                                              onClick: ($event) => onSave()
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
                                            onClick: ($event) => onSave()
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
                                createVNode(unref(FormItem), { label: "跑马灯公告" }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      ref_key: "marqueeRef",
                                      ref: marqueeRef,
                                      id: "marqueeEditor",
                                      modelValue: formState.marquee,
                                      "onUpdate:modelValue": ($event) => formState.marquee = $event,
                                      dark: unref(globalStore).theme === "dark",
                                      options: { inline: true }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode("hr", { class: "mb30 mt20" }),
                                createVNode(unref(FormItem), {
                                  label: "弹窗公告标题",
                                  name: "title"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.title,
                                      "onUpdate:value": ($event) => formState.title = $event
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "弹窗公告内容" }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                      key: 0,
                                      ref_key: "editorRef",
                                      ref: editorRef,
                                      id: "noticeEditor",
                                      modelValue: formState.content,
                                      "onUpdate:modelValue": ($event) => formState.content = $event,
                                      dark: unref(globalStore).theme === "dark",
                                      options: { inline: true }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "APP下载地址",
                                  name: "appurl"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.appurl,
                                      "onUpdate:value": ($event) => formState.appurl = $event,
                                      placeholder: "https://"
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "APP下载按钮文字",
                                  name: "appText"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.appText,
                                      "onUpdate:value": ($event) => formState.appText = $event
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "发布地址",
                                  name: "publishurl"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.publishurl,
                                      "onUpdate:value": ($event) => formState.publishurl = $event,
                                      placeholder: "https://"
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "发布地址按钮文字",
                                  name: "publishText"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.publishText,
                                      "onUpdate:value": ($event) => formState.publishText = $event
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
                                          onClick: ($event) => onSave()
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
                              createVNode(unref(FormItem), { label: "跑马灯公告" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "marqueeRef",
                                    ref: marqueeRef,
                                    id: "marqueeEditor",
                                    modelValue: formState.marquee,
                                    "onUpdate:modelValue": ($event) => formState.marquee = $event,
                                    dark: unref(globalStore).theme === "dark",
                                    options: { inline: true }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode("hr", { class: "mb30 mt20" }),
                              createVNode(unref(FormItem), {
                                label: "弹窗公告标题",
                                name: "title"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.title,
                                    "onUpdate:value": ($event) => formState.title = $event
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "弹窗公告内容" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editorRef",
                                    ref: editorRef,
                                    id: "noticeEditor",
                                    modelValue: formState.content,
                                    "onUpdate:modelValue": ($event) => formState.content = $event,
                                    dark: unref(globalStore).theme === "dark",
                                    options: { inline: true }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "APP下载地址",
                                name: "appurl"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appurl,
                                    "onUpdate:value": ($event) => formState.appurl = $event,
                                    placeholder: "https://"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "APP下载按钮文字",
                                name: "appText"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appText,
                                    "onUpdate:value": ($event) => formState.appText = $event
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "发布地址",
                                name: "publishurl"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.publishurl,
                                    "onUpdate:value": ($event) => formState.publishurl = $event,
                                    placeholder: "https://"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "发布地址按钮文字",
                                name: "publishText"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.publishText,
                                    "onUpdate:value": ($event) => formState.publishText = $event
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
                                        onClick: ($event) => onSave()
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
                              createVNode(unref(FormItem), { label: "跑马灯公告" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "marqueeRef",
                                    ref: marqueeRef,
                                    id: "marqueeEditor",
                                    modelValue: formState.marquee,
                                    "onUpdate:modelValue": ($event) => formState.marquee = $event,
                                    dark: unref(globalStore).theme === "dark",
                                    options: { inline: true }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode("hr", { class: "mb30 mt20" }),
                              createVNode(unref(FormItem), {
                                label: "弹窗公告标题",
                                name: "title"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.title,
                                    "onUpdate:value": ($event) => formState.title = $event
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "弹窗公告内容" }, {
                                default: withCtx(() => [
                                  showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                    key: 0,
                                    ref_key: "editorRef",
                                    ref: editorRef,
                                    id: "noticeEditor",
                                    modelValue: formState.content,
                                    "onUpdate:modelValue": ($event) => formState.content = $event,
                                    dark: unref(globalStore).theme === "dark",
                                    options: { inline: true }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "APP下载地址",
                                name: "appurl"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appurl,
                                    "onUpdate:value": ($event) => formState.appurl = $event,
                                    placeholder: "https://"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "APP下载按钮文字",
                                name: "appText"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.appText,
                                    "onUpdate:value": ($event) => formState.appText = $event
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "发布地址",
                                name: "publishurl"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.publishurl,
                                    "onUpdate:value": ($event) => formState.publishurl = $event,
                                    placeholder: "https://"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "发布地址按钮文字",
                                name: "publishText"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.publishText,
                                    "onUpdate:value": ($event) => formState.publishText = $event
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
                                        onClick: ($event) => onSave()
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
                key: "notice",
                tab: "公告"
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
                            createVNode(unref(FormItem), { label: "跑马灯公告" }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 0,
                                  ref_key: "marqueeRef",
                                  ref: marqueeRef,
                                  id: "marqueeEditor",
                                  modelValue: formState.marquee,
                                  "onUpdate:modelValue": ($event) => formState.marquee = $event,
                                  dark: unref(globalStore).theme === "dark",
                                  options: { inline: true }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode("hr", { class: "mb30 mt20" }),
                            createVNode(unref(FormItem), {
                              label: "弹窗公告标题",
                              name: "title"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.title,
                                  "onUpdate:value": ($event) => formState.title = $event
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "弹窗公告内容" }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$1, {
                                  key: 0,
                                  ref_key: "editorRef",
                                  ref: editorRef,
                                  id: "noticeEditor",
                                  modelValue: formState.content,
                                  "onUpdate:modelValue": ($event) => formState.content = $event,
                                  dark: unref(globalStore).theme === "dark",
                                  options: { inline: true }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "APP下载地址",
                              name: "appurl"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.appurl,
                                  "onUpdate:value": ($event) => formState.appurl = $event,
                                  placeholder: "https://"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "APP下载按钮文字",
                              name: "appText"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.appText,
                                  "onUpdate:value": ($event) => formState.appText = $event
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "发布地址",
                              name: "publishurl"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.publishurl,
                                  "onUpdate:value": ($event) => formState.publishurl = $event,
                                  placeholder: "https://"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "发布地址按钮文字",
                              name: "publishText"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.publishText,
                                  "onUpdate:value": ($event) => formState.publishText = $event
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
                                      onClick: ($event) => onSave()
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/notice.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
