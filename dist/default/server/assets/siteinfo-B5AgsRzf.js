import { ref, reactive, watch, onMounted, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Input, Textarea, Space, Button, message } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./cloud-poster-upload-BYKE9-j0.js";
import { _ as _sfc_main$2 } from "./index-DSEGUnNi.js";
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
  __name: "siteinfo",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const curTab = ref("siteinfo");
    const formCol = { label: 6, wrapper: 24 };
    const formRef = ref(null);
    const formState = reactive({
      logo: "",
      ico: "",
      title: "",
      shortTitle: "",
      keys: "",
      description: "",
      footer: ""
    });
    const saveLoading = ref(false);
    const spinning = ref(false);
    const editorRef = ref(null);
    const showEditor = ref(false);
    const fetchSetting = async () => {
      try {
        spinning.value = true;
        await setting.get({
          query: { fieldby: "key", field: "siteinfo" }
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
          query: { fieldby: "key", field: "siteinfo" },
          body: { value: toRaw(formState), key: "siteinfo", _upsert: true }
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        saveLoading.value = false;
      }
    };
    watch(() => globalStore.theme, () => {
      editorRef.value.reload();
    });
    onMounted(() => {
      fetchSetting();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel setting-siteinfo-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "siteinfo",
              tab: "站点信息"
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
                              _push5(ssrRenderComponent(unref(FormItem), { label: "网站 Logo" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, {
                                      mode: "whole",
                                      text: "上传 Logo",
                                      modelValue: formState.logo,
                                      "onUpdate:modelValue": ($event) => formState.logo = $event,
                                      previewURL: `${formState.logo}?180x100`
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1, {
                                        mode: "whole",
                                        text: "上传 Logo",
                                        modelValue: formState.logo,
                                        "onUpdate:modelValue": ($event) => formState.logo = $event,
                                        previewURL: `${formState.logo}?180x100`
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "网站 ico" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, {
                                      mode: "whole",
                                      text: "上传 ico",
                                      modelValue: formState.ico,
                                      "onUpdate:modelValue": ($event) => formState.ico = $event,
                                      previewURL: `${formState.logo}?180x100`
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1, {
                                        mode: "whole",
                                        text: "上传 ico",
                                        modelValue: formState.ico,
                                        "onUpdate:modelValue": ($event) => formState.ico = $event,
                                        previewURL: `${formState.logo}?180x100`
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "网站标题",
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
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "网站简称",
                                name: "shortTitle"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Input), {
                                      value: formState.shortTitle,
                                      "onUpdate:value": ($event) => formState.shortTitle = $event,
                                      placeholder: "网站Logo为空时将显示网站简称"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Input), {
                                        value: formState.shortTitle,
                                        "onUpdate:value": ($event) => formState.shortTitle = $event,
                                        placeholder: "网站Logo为空时将显示网站简称"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "网站关键词",
                                name: "keys"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Textarea), {
                                      value: formState.keys,
                                      "onUpdate:value": ($event) => formState.keys = $event,
                                      placeholder: "多个关键词请用英文逗号隔开"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Textarea), {
                                        value: formState.keys,
                                        "onUpdate:value": ($event) => formState.keys = $event,
                                        placeholder: "多个关键词请用英文逗号隔开"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "网站描述",
                                name: "description"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Textarea), {
                                      value: formState.description,
                                      "onUpdate:value": ($event) => formState.description = $event,
                                      placeholder: "请用2~4句话描述网站内容"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Textarea), {
                                        value: formState.description,
                                        "onUpdate:value": ($event) => formState.description = $event,
                                        placeholder: "请用2~4句话描述网站内容"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "底部版权信息" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Spin), {
                                      spinning: spinning.value,
                                      class: "f ac jc",
                                      style: { "min-height": "120px" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          if (showEditor.value) {
                                            _push7(ssrRenderComponent(_sfc_main$2, {
                                              ref_key: "editorRef",
                                              ref: editorRef,
                                              modelValue: formState.footer,
                                              "onUpdate:modelValue": ($event) => formState.footer = $event,
                                              dark: unref(globalStore).theme === "dark",
                                              options: { inline: true }
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            _push7(`<!---->`);
                                          }
                                        } else {
                                          return [
                                            showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                              key: 0,
                                              ref_key: "editorRef",
                                              ref: editorRef,
                                              modelValue: formState.footer,
                                              "onUpdate:modelValue": ($event) => formState.footer = $event,
                                              dark: unref(globalStore).theme === "dark",
                                              options: { inline: true }
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Spin), {
                                        spinning: spinning.value,
                                        class: "f ac jc",
                                        style: { "min-height": "120px" }
                                      }, {
                                        default: withCtx(() => [
                                          showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                            key: 0,
                                            ref_key: "editorRef",
                                            ref: editorRef,
                                            modelValue: formState.footer,
                                            "onUpdate:modelValue": ($event) => formState.footer = $event,
                                            dark: unref(globalStore).theme === "dark",
                                            options: { inline: true }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                        ]),
                                        _: 1
                                      }, 8, ["spinning"])
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
                                createVNode(unref(FormItem), { label: "网站 Logo" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1, {
                                      mode: "whole",
                                      text: "上传 Logo",
                                      modelValue: formState.logo,
                                      "onUpdate:modelValue": ($event) => formState.logo = $event,
                                      previewURL: `${formState.logo}?180x100`
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "网站 ico" }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1, {
                                      mode: "whole",
                                      text: "上传 ico",
                                      modelValue: formState.ico,
                                      "onUpdate:modelValue": ($event) => formState.ico = $event,
                                      previewURL: `${formState.logo}?180x100`
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "网站标题",
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
                                createVNode(unref(FormItem), {
                                  label: "网站简称",
                                  name: "shortTitle"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Input), {
                                      value: formState.shortTitle,
                                      "onUpdate:value": ($event) => formState.shortTitle = $event,
                                      placeholder: "网站Logo为空时将显示网站简称"
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "网站关键词",
                                  name: "keys"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Textarea), {
                                      value: formState.keys,
                                      "onUpdate:value": ($event) => formState.keys = $event,
                                      placeholder: "多个关键词请用英文逗号隔开"
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), {
                                  label: "网站描述",
                                  name: "description"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Textarea), {
                                      value: formState.description,
                                      "onUpdate:value": ($event) => formState.description = $event,
                                      placeholder: "请用2~4句话描述网站内容"
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(FormItem), { label: "底部版权信息" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Spin), {
                                      spinning: spinning.value,
                                      class: "f ac jc",
                                      style: { "min-height": "120px" }
                                    }, {
                                      default: withCtx(() => [
                                        showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                          key: 0,
                                          ref_key: "editorRef",
                                          ref: editorRef,
                                          modelValue: formState.footer,
                                          "onUpdate:modelValue": ($event) => formState.footer = $event,
                                          dark: unref(globalStore).theme === "dark",
                                          options: { inline: true }
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                      ]),
                                      _: 1
                                    }, 8, ["spinning"])
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
                              createVNode(unref(FormItem), { label: "网站 Logo" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1, {
                                    mode: "whole",
                                    text: "上传 Logo",
                                    modelValue: formState.logo,
                                    "onUpdate:modelValue": ($event) => formState.logo = $event,
                                    previewURL: `${formState.logo}?180x100`
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "网站 ico" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1, {
                                    mode: "whole",
                                    text: "上传 ico",
                                    modelValue: formState.ico,
                                    "onUpdate:modelValue": ($event) => formState.ico = $event,
                                    previewURL: `${formState.logo}?180x100`
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "网站标题",
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
                              createVNode(unref(FormItem), {
                                label: "网站简称",
                                name: "shortTitle"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.shortTitle,
                                    "onUpdate:value": ($event) => formState.shortTitle = $event,
                                    placeholder: "网站Logo为空时将显示网站简称"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "网站关键词",
                                name: "keys"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: formState.keys,
                                    "onUpdate:value": ($event) => formState.keys = $event,
                                    placeholder: "多个关键词请用英文逗号隔开"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "网站描述",
                                name: "description"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: formState.description,
                                    "onUpdate:value": ($event) => formState.description = $event,
                                    placeholder: "请用2~4句话描述网站内容"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "底部版权信息" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Spin), {
                                    spinning: spinning.value,
                                    class: "f ac jc",
                                    style: { "min-height": "120px" }
                                  }, {
                                    default: withCtx(() => [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                        key: 0,
                                        ref_key: "editorRef",
                                        ref: editorRef,
                                        modelValue: formState.footer,
                                        "onUpdate:modelValue": ($event) => formState.footer = $event,
                                        dark: unref(globalStore).theme === "dark",
                                        options: { inline: true }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }, 8, ["spinning"])
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
                              createVNode(unref(FormItem), { label: "网站 Logo" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1, {
                                    mode: "whole",
                                    text: "上传 Logo",
                                    modelValue: formState.logo,
                                    "onUpdate:modelValue": ($event) => formState.logo = $event,
                                    previewURL: `${formState.logo}?180x100`
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "网站 ico" }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1, {
                                    mode: "whole",
                                    text: "上传 ico",
                                    modelValue: formState.ico,
                                    "onUpdate:modelValue": ($event) => formState.ico = $event,
                                    previewURL: `${formState.logo}?180x100`
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "网站标题",
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
                              createVNode(unref(FormItem), {
                                label: "网站简称",
                                name: "shortTitle"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Input), {
                                    value: formState.shortTitle,
                                    "onUpdate:value": ($event) => formState.shortTitle = $event,
                                    placeholder: "网站Logo为空时将显示网站简称"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "网站关键词",
                                name: "keys"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: formState.keys,
                                    "onUpdate:value": ($event) => formState.keys = $event,
                                    placeholder: "多个关键词请用英文逗号隔开"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), {
                                label: "网站描述",
                                name: "description"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: formState.description,
                                    "onUpdate:value": ($event) => formState.description = $event,
                                    placeholder: "请用2~4句话描述网站内容"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), { label: "底部版权信息" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Spin), {
                                    spinning: spinning.value,
                                    class: "f ac jc",
                                    style: { "min-height": "120px" }
                                  }, {
                                    default: withCtx(() => [
                                      showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                        key: 0,
                                        ref_key: "editorRef",
                                        ref: editorRef,
                                        modelValue: formState.footer,
                                        "onUpdate:modelValue": ($event) => formState.footer = $event,
                                        dark: unref(globalStore).theme === "dark",
                                        options: { inline: true }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                    ]),
                                    _: 1
                                  }, 8, ["spinning"])
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
                key: "siteinfo",
                tab: "站点信息"
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
                            createVNode(unref(FormItem), { label: "网站 Logo" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1, {
                                  mode: "whole",
                                  text: "上传 Logo",
                                  modelValue: formState.logo,
                                  "onUpdate:modelValue": ($event) => formState.logo = $event,
                                  previewURL: `${formState.logo}?180x100`
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "网站 ico" }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1, {
                                  mode: "whole",
                                  text: "上传 ico",
                                  modelValue: formState.ico,
                                  "onUpdate:modelValue": ($event) => formState.ico = $event,
                                  previewURL: `${formState.logo}?180x100`
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "网站标题",
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
                            createVNode(unref(FormItem), {
                              label: "网站简称",
                              name: "shortTitle"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: formState.shortTitle,
                                  "onUpdate:value": ($event) => formState.shortTitle = $event,
                                  placeholder: "网站Logo为空时将显示网站简称"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "网站关键词",
                              name: "keys"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Textarea), {
                                  value: formState.keys,
                                  "onUpdate:value": ($event) => formState.keys = $event,
                                  placeholder: "多个关键词请用英文逗号隔开"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), {
                              label: "网站描述",
                              name: "description"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Textarea), {
                                  value: formState.description,
                                  "onUpdate:value": ($event) => formState.description = $event,
                                  placeholder: "请用2~4句话描述网站内容"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), { label: "底部版权信息" }, {
                              default: withCtx(() => [
                                createVNode(unref(Spin), {
                                  spinning: spinning.value,
                                  class: "f ac jc",
                                  style: { "min-height": "120px" }
                                }, {
                                  default: withCtx(() => [
                                    showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                      key: 0,
                                      ref_key: "editorRef",
                                      ref: editorRef,
                                      modelValue: formState.footer,
                                      "onUpdate:modelValue": ($event) => formState.footer = $event,
                                      dark: unref(globalStore).theme === "dark",
                                      options: { inline: true }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }, 8, ["spinning"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/siteinfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
