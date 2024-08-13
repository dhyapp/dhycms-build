import { ref, reactive, toRaw, computed, provide, watch, onBeforeMount, createVNode, resolveComponent, unref, withCtx, createTextVNode, toDisplayString, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Modal, Breadcrumb, BreadcrumbItem, Form, Button, FormItem, Tabs, TabPane, Spin, InputGroup, Input, Tooltip, InputNumber, RadioGroup, Radio, Select, SelectOption, Empty, Textarea, message } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { _ as _sfc_main$3 } from "./cloud-poster-upload-BYKE9-j0.js";
import { _ as _sfc_main$2 } from "./index-DSEGUnNi.js";
import { _ as _sfc_main$1 } from "./admin-form-action-bar-fhn4ltpr.js";
import { _ as _sfc_main$4 } from "./edit-GdJ21eH7.js";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import { p as post, m as menu } from "./index-0psH9gUa.js";
import { g as generateMixed, t as toTree } from "./common-ZcIx5rAG.js";
import "./modal-CbztPSM0.js";
import "./main-DhQTa4Ec.js";
import "crypto-js";
import "node:path";
import "pinia";
const _sfc_main = {
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const formInitModel = () => ({
      id: generateMixed(),
      author: "",
      //作者
      title: "",
      //标题
      poster: "",
      //封面
      content: "",
      //正文
      mid: null,
      //菜单ID
      status: "on",
      tag: "",
      tagStyles: "",
      styles: "",
      remark: ""
      //备注
    });
    const showEditor = ref(false);
    const formState = reactive(formInitModel());
    let oldFormState = JSON.stringify(toRaw(formState));
    const initFormState = (fState, record) => {
      const stateModel = formInitModel();
      for (let k in stateModel) {
        fState[k] = (record == null ? void 0 : record[k]) || stateModel[k];
      }
    };
    const formItemLayout = {
      label: 4,
      wrapper: 20
    };
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const router = useRouter();
    const route = useRoute();
    const menuTree = ref([]);
    const showMenuEditModal = ref(false);
    const mapSubType = {
      post: "文章类型"
    };
    provide("mapSubType", mapSubType);
    const curContentTab = ref("content");
    const editorOptions = { height: 600 };
    const editorRef = ref(null);
    const formRef = ref(null);
    const publishing = ref(false);
    const fetchPost = (id) => {
      return post.get({ id }).then((res) => {
        showEditor.value = true;
        initFormState(formState, res);
        oldFormState = JSON.stringify(toRaw(formState));
        return res;
      });
    };
    const onSave = async () => {
      try {
        publishing.value = true;
        await formRef.value.validate();
        const data = { body: toRaw(formState) };
        const isAdd = !route.params.id;
        if (!isAdd) {
          data.id = route.params.id;
        }
        await post[isAdd ? "add" : "update"](data).then(() => {
          oldFormState = JSON.stringify(toRaw(formState));
          message.success(`${isAdd ? "发布" : "保存"}成功`);
          router.back();
        });
      } finally {
        publishing.value = false;
      }
    };
    const fetchMenu = async () => {
      menu.list({
        query: { fieldby: "subType", field: "post", sortby: "sort", pageSize: 1e3 }
      }).then((res) => {
        menuTree.value = toTree({ data: res.list || [] });
      });
    };
    watch(() => globalStore.theme, () => {
      const mapEditor = {
        "content": editorRef
      };
      mapEditor[curContentTab.value].value.reload();
    });
    onBeforeMount(() => {
      fetchMenu();
      if (route.params.id) {
        fetchPost(route.params.id);
      } else {
        showEditor.value = true;
      }
    });
    onBeforeRouteLeave((to, from, next) => {
      const currentFormState = JSON.stringify(toRaw(formState));
      if (currentFormState === oldFormState) {
        next();
      } else {
        Modal.confirm({
          title: "页面数据未保存，确认离开？",
          icon: createVNode(ExclamationCircleOutlined),
          okText: "留在此页面",
          cancelText: "离开",
          onOk() {
            next(false);
          },
          onCancel() {
            next();
          }
        });
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
                    to: `/${preadmin.value}/post`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`文章管理`);
                      } else {
                        return [
                          createTextVNode("文章管理")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/post`
                    }, {
                      default: withCtx(() => [
                        createTextVNode("文章管理")
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
                    to: `/${preadmin.value}/post`
                  }, {
                    default: withCtx(() => [
                      createTextVNode("文章管理")
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
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "formRef",
        ref: formRef,
        model: formState,
        labelCol: { span: formItemLayout.label },
        wrapperCol: { span: formItemLayout.wrapper },
        labelAlign: "left",
        class: "mt14"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="f ac"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Button), {
                    type: "primary",
                    loading: publishing.value,
                    onClick: ($event) => onSave()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(!unref(route).params.id ? "发布" : "保存修改")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(!unref(route).params.id ? "发布" : "保存修改"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "f ac" }, [
                      createVNode(unref(Button), {
                        type: "primary",
                        loading: publishing.value,
                        onClick: ($event) => onSave()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(!unref(route).params.id ? "发布" : "保存修改"), 1)
                        ]),
                        _: 1
                      }, 8, ["loading", "onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="admin-post-edit-page mt10 f"${_scopeId}><div class="fa w0"${_scopeId}><div class="pannel"${_scopeId}><div class="pt20 pl20 pr20"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "title",
              class: "mb0",
              rules: [{ required: true, message: "标题不能为空" }],
              wrapperCol: { span: 24 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input${ssrRenderAttr("value", formState.title)} class="h1-input" placeholder="请输入标题"${_scopeId2}>`);
                } else {
                  return [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => formState.title = $event,
                      class: "h1-input",
                      placeholder: "请输入标题"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, formState.title]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><input${ssrRenderAttr("value", formState.author)} class="author-input" placeholder="作者"${_scopeId}></div></div>`);
            _push2(ssrRenderComponent(unref(Tabs), {
              activeKey: curContentTab.value,
              "onUpdate:activeKey": ($event) => curContentTab.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabPane), {
                    key: "content",
                    tab: "正文"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Spin), {
                          spinning: !showEditor.value,
                          style: { minHeight: "600px" },
                          class: "f ac jc"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (showEditor.value) {
                                _push5(ssrRenderComponent(_sfc_main$2, {
                                  ref_key: "editorRef",
                                  ref: editorRef,
                                  modelValue: formState.content,
                                  "onUpdate:modelValue": ($event) => formState.content = $event,
                                  dark: unref(globalStore).theme === "dark",
                                  options: editorOptions
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                  key: 0,
                                  ref_key: "editorRef",
                                  ref: editorRef,
                                  modelValue: formState.content,
                                  "onUpdate:modelValue": ($event) => formState.content = $event,
                                  dark: unref(globalStore).theme === "dark",
                                  options: editorOptions
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Spin), {
                            spinning: !showEditor.value,
                            style: { minHeight: "600px" },
                            class: "f ac jc"
                          }, {
                            default: withCtx(() => [
                              showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                key: 0,
                                ref_key: "editorRef",
                                ref: editorRef,
                                modelValue: formState.content,
                                "onUpdate:modelValue": ($event) => formState.content = $event,
                                dark: unref(globalStore).theme === "dark",
                                options: editorOptions
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["spinning"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TabPane), {
                      key: "content",
                      tab: "正文"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Spin), {
                          spinning: !showEditor.value,
                          style: { minHeight: "600px" },
                          class: "f ac jc"
                        }, {
                          default: withCtx(() => [
                            showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                              key: 0,
                              ref_key: "editorRef",
                              ref: editorRef,
                              modelValue: formState.content,
                              "onUpdate:modelValue": ($event) => formState.content = $event,
                              dark: unref(globalStore).theme === "dark",
                              options: editorOptions
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["spinning"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pannel pannel-post-info mt20"${_scopeId}><div class="phead"${_scopeId}>文章信息</div><hr${_scopeId}><div class="pt30 pr20 pb20 pl20 info-body"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "id",
              label: "文章ID（唯一）",
              rules: [{ required: true, message: "ID不能为空" }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(InputGroup), { compact: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: formState.id,
                          "onUpdate:value": ($event) => formState.id = $event,
                          placeholder: "ID自动生成，非必要请勿手动更改"
                        }, {
                          suffix: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Tooltip), { title: "ID自动生成，非必要请勿手动更改" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_MIcon, {
                                      name: "info",
                                      class: "fs18"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_MIcon, {
                                        name: "info",
                                        class: "fs18"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Tooltip), { title: "ID自动生成，非必要请勿手动更改" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_MIcon, {
                                      name: "info",
                                      class: "fs18"
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Button), {
                          onClick: () => formState.id = unref(generateMixed)()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`重新生成ID`);
                            } else {
                              return [
                                createTextVNode("重新生成ID")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: formState.id,
                            "onUpdate:value": ($event) => formState.id = $event,
                            placeholder: "ID自动生成，非必要请勿手动更改"
                          }, {
                            suffix: withCtx(() => [
                              createVNode(unref(Tooltip), { title: "ID自动生成，非必要请勿手动更改" }, {
                                default: withCtx(() => [
                                  createVNode(_component_MIcon, {
                                    name: "info",
                                    class: "fs18"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["value", "onUpdate:value"]),
                          createVNode(unref(Button), {
                            onClick: () => formState.id = unref(generateMixed)()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("重新生成ID")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                          value: formState.id,
                          "onUpdate:value": ($event) => formState.id = $event,
                          placeholder: "ID自动生成，非必要请勿手动更改"
                        }, {
                          suffix: withCtx(() => [
                            createVNode(unref(Tooltip), { title: "ID自动生成，非必要请勿手动更改" }, {
                              default: withCtx(() => [
                                createVNode(_component_MIcon, {
                                  name: "info",
                                  class: "fs18"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["value", "onUpdate:value"]),
                        createVNode(unref(Button), {
                          onClick: () => formState.id = unref(generateMixed)()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("重新生成ID")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(FormItem), {
              name: "view",
              label: "累计浏览量"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(InputNumber), {
                    value: formState.viewCount,
                    "onUpdate:value": ($event) => formState.viewCount = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(InputNumber), {
                      value: formState.viewCount,
                      "onUpdate:value": ($event) => formState.viewCount = $event
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(FormItem), {
              label: "上下线",
              name: "status"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(RadioGroup), {
                    value: formState.status,
                    "onUpdate:value": ($event) => formState.status = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Radio), { value: "on" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`上线`);
                            } else {
                              return [
                                createTextVNode("上线")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Radio), { value: "off" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`下线`);
                            } else {
                              return [
                                createTextVNode("下线")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="right ml20"${_scopeId}><div class="pannel pt20 pl20 pb20 pr20"${_scopeId}><div class="mb10"${_scopeId}>封面海报</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              modelValue: formState.poster,
              "onUpdate:modelValue": ($event) => formState.poster = $event,
              previewURL: `${formState.poster}?280x160`
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="pannel pt20 pl20 pb20 pr20 mt20"${_scopeId}><div class="mb10 f jb ac"${_scopeId}><span class="required"${_scopeId}>文章分类`);
            _push2(ssrRenderComponent(unref(Button), {
              size: "small",
              class: "ml6",
              onClick: () => showMenuEditModal.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加`);
                } else {
                  return [
                    createTextVNode("添加")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: `/${preadmin.value}/menu`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Button), {
                    size: "small",
                    type: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`文章分类管理`);
                      } else {
                        return [
                          createTextVNode("文章分类管理")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Button), {
                      size: "small",
                      type: "link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("文章分类管理")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><hr class="mb12"${_scopeId}>`);
            if (menuTree.value.length) {
              _push2(ssrRenderComponent(unref(Select), {
                value: formState.mid,
                "onUpdate:value": ($event) => formState.mid = $event,
                placeholder: "请选择分类",
                style: { width: "100%" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(menuTree.value, (v) => {
                      _push3(ssrRenderComponent(unref(SelectOption), {
                        key: v._id,
                        value: v._id
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(v.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(v.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(menuTree.value, (v) => {
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
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Empty), {
                image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                description: "暂无分类"
              }, null, _parent2, _scopeId));
            }
            _push2(`</div><div class="pannel pt20 pl20 pb20 pr20 mt20"${_scopeId}><div class="mb10"${_scopeId}>标题样式</div>`);
            _push2(ssrRenderComponent(unref(Textarea), { placeholder: "请输入标题css" }, null, _parent2, _scopeId));
            _push2(`</div><div class="pannel pt20 pl20 pb20 pr20 mt20"${_scopeId}><div class="mb10"${_scopeId}>标签</div>`);
            _push2(ssrRenderComponent(unref(Input), {
              value: formState.tag,
              "onUpdate:value": ($event) => formState.tag = $event,
              style: { width: "100%" },
              placeholder: "请输入1~2中文字符或1~4英文字符"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Textarea), {
              placeholder: "请输入标签css",
              class: "mt14"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="pannel pt20 pl20 pb20 pr20 mt20"${_scopeId}><div class="mb10"${_scopeId}>备注</div>`);
            _push2(ssrRenderComponent(unref(Input), {
              value: formState.remark,
              "onUpdate:value": ($event) => formState.remark = $event,
              style: { width: "100%" }
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$1, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "f ac" }, [
                    createVNode(unref(Button), {
                      type: "primary",
                      loading: publishing.value,
                      onClick: ($event) => onSave()
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(!unref(route).params.id ? "发布" : "保存修改"), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ])
                ]),
                _: 1
              }),
              createVNode("div", { class: "admin-post-edit-page mt10 f" }, [
                createVNode("div", { class: "fa w0" }, [
                  createVNode("div", { class: "pannel" }, [
                    createVNode("div", { class: "pt20 pl20 pr20" }, [
                      createVNode(unref(FormItem), {
                        name: "title",
                        class: "mb0",
                        rules: [{ required: true, message: "标题不能为空" }],
                        wrapperCol: { span: 24 }
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => formState.title = $event,
                            class: "h1-input",
                            placeholder: "请输入标题"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, formState.title]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => formState.author = $event,
                          class: "author-input",
                          placeholder: "作者"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, formState.author]
                        ])
                      ])
                    ]),
                    createVNode(unref(Tabs), {
                      activeKey: curContentTab.value,
                      "onUpdate:activeKey": ($event) => curContentTab.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(TabPane), {
                          key: "content",
                          tab: "正文"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Spin), {
                              spinning: !showEditor.value,
                              style: { minHeight: "600px" },
                              class: "f ac jc"
                            }, {
                              default: withCtx(() => [
                                showEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
                                  key: 0,
                                  ref_key: "editorRef",
                                  ref: editorRef,
                                  modelValue: formState.content,
                                  "onUpdate:modelValue": ($event) => formState.content = $event,
                                  dark: unref(globalStore).theme === "dark",
                                  options: editorOptions
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "dark"])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }, 8, ["spinning"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["activeKey", "onUpdate:activeKey"])
                  ]),
                  createVNode("div", { class: "pannel pannel-post-info mt20" }, [
                    createVNode("div", { class: "phead" }, "文章信息"),
                    createVNode("hr"),
                    createVNode("div", { class: "pt30 pr20 pb20 pl20 info-body" }, [
                      createVNode(unref(FormItem), {
                        name: "id",
                        label: "文章ID（唯一）",
                        rules: [{ required: true, message: "ID不能为空" }]
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(InputGroup), { compact: "" }, {
                            default: withCtx(() => [
                              createVNode(unref(Input), {
                                value: formState.id,
                                "onUpdate:value": ($event) => formState.id = $event,
                                placeholder: "ID自动生成，非必要请勿手动更改"
                              }, {
                                suffix: withCtx(() => [
                                  createVNode(unref(Tooltip), { title: "ID自动生成，非必要请勿手动更改" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_MIcon, {
                                        name: "info",
                                        class: "fs18"
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["value", "onUpdate:value"]),
                              createVNode(unref(Button), {
                                onClick: () => formState.id = unref(generateMixed)()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("重新生成ID")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FormItem), {
                        name: "view",
                        label: "累计浏览量"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(InputNumber), {
                            value: formState.viewCount,
                            "onUpdate:value": ($event) => formState.viewCount = $event
                          }, null, 8, ["value", "onUpdate:value"])
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
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "right ml20" }, [
                  createVNode("div", { class: "pannel pt20 pl20 pb20 pr20" }, [
                    createVNode("div", { class: "mb10" }, "封面海报"),
                    createVNode(_sfc_main$3, {
                      modelValue: formState.poster,
                      "onUpdate:modelValue": ($event) => formState.poster = $event,
                      previewURL: `${formState.poster}?280x160`
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "previewURL"])
                  ]),
                  createVNode("div", { class: "pannel pt20 pl20 pb20 pr20 mt20" }, [
                    createVNode("div", { class: "mb10 f jb ac" }, [
                      createVNode("span", { class: "required" }, [
                        createTextVNode("文章分类"),
                        createVNode(unref(Button), {
                          size: "small",
                          class: "ml6",
                          onClick: () => showMenuEditModal.value = true
                        }, {
                          default: withCtx(() => [
                            createTextVNode("添加")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode(_component_RouterLink, {
                        to: `/${preadmin.value}/menu`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Button), {
                            size: "small",
                            type: "link"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("文章分类管理")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ]),
                    createVNode("hr", { class: "mb12" }),
                    menuTree.value.length ? (openBlock(), createBlock(unref(Select), {
                      key: 0,
                      value: formState.mid,
                      "onUpdate:value": ($event) => formState.mid = $event,
                      placeholder: "请选择分类",
                      style: { width: "100%" }
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(menuTree.value, (v) => {
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
                    }, 8, ["value", "onUpdate:value"])) : (openBlock(), createBlock(unref(Empty), {
                      key: 1,
                      image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
                      description: "暂无分类"
                    }, null, 8, ["image"]))
                  ]),
                  createVNode("div", { class: "pannel pt20 pl20 pb20 pr20 mt20" }, [
                    createVNode("div", { class: "mb10" }, "标题样式"),
                    createVNode(unref(Textarea), { placeholder: "请输入标题css" })
                  ]),
                  createVNode("div", { class: "pannel pt20 pl20 pb20 pr20 mt20" }, [
                    createVNode("div", { class: "mb10" }, "标签"),
                    createVNode(unref(Input), {
                      value: formState.tag,
                      "onUpdate:value": ($event) => formState.tag = $event,
                      style: { width: "100%" },
                      placeholder: "请输入1~2中文字符或1~4英文字符"
                    }, null, 8, ["value", "onUpdate:value"]),
                    createVNode(unref(Textarea), {
                      placeholder: "请输入标签css",
                      class: "mt14"
                    })
                  ]),
                  createVNode("div", { class: "pannel pt20 pl20 pb20 pr20 mt20" }, [
                    createVNode("div", { class: "mb10" }, "备注"),
                    createVNode(unref(Input), {
                      value: formState.remark,
                      "onUpdate:value": ($event) => formState.remark = $event,
                      style: { width: "100%" }
                    }, null, 8, ["value", "onUpdate:value"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        modelValue: showMenuEditModal.value,
        "onUpdate:modelValue": ($event) => showMenuEditModal.value = $event,
        type: "add",
        menuType: "main",
        menuList: menuTree.value,
        onModified: fetchMenu
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/post/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
