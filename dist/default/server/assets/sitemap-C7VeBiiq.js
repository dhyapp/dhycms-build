import { ref, onMounted, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { Tabs, TabPane, Spin, Form, FormItem, Alert, Switch, Textarea, Space, Button, Modal, message } from "ant-design-vue";
import { g as getEncodeSetting, s as setEncodeSetting, a as getSitemap, b as addSitemapURLs, c as saveSitemap, r as resetSitemap } from "./setting-Cp7Z9JTT.js";
import "../entry-server.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
import "./common-ZcIx5rAG.js";
const _sfc_main = {
  __name: "sitemap",
  __ssrInlineRender: true,
  setup(__props) {
    const curTab = ref("sitemap");
    const formCol = { label: 6, wrapper: 24 };
    const formRef = ref(null);
    const formState = ref({
      auto: false
    });
    const sitemapLoading = ref(false);
    const showSitemapSource = ref(false);
    const sitemapURLs = ref("");
    const sitemapSource = ref("");
    const mapForm = {
      "sitemap": [formRef, formState]
    };
    const saveLoading = ref(false);
    const spinning = ref(false);
    const fetchSetting = async (type) => {
      try {
        spinning.value = true;
        await getEncodeSetting({ key: type }, { error() {
        } }).then((res) => {
          if (res) {
            const stateModel = mapForm[type][1].value;
            for (const k in stateModel) {
              mapForm[type][1].value[k] = res[k] ?? mapForm[type][1].value[k];
            }
          }
        });
      } finally {
        spinning.value = false;
      }
    };
    const onSave = async (type) => {
      try {
        const formdata = mapForm[type][1].value;
        saveLoading.value = true;
        await setEncodeSetting({ key: type, value: formdata }).then(() => {
          message.success("保存成功");
        });
      } finally {
        saveLoading.value = false;
      }
    };
    const onTabChange = (type) => {
      fetchSetting(type);
    };
    const viewSitemap = async () => {
      try {
        sitemapLoading.value = true;
        await getSitemap().then((res) => {
          sitemapSource.value = res;
          showSitemapSource.value = true;
        });
      } finally {
        sitemapLoading.value = false;
      }
    };
    const onAddSitemapURL = async () => {
      try {
        sitemapLoading.value = true;
        await addSitemapURLs(sitemapURLs.value).then(() => {
          message.success("追加成功");
          sitemapURLs.value = "";
        });
      } finally {
        sitemapLoading.value = false;
      }
    };
    const saveSitemapURL = async () => {
      try {
        sitemapLoading.value = true;
        await saveSitemap(sitemapSource.value).then(() => {
          message.success("保存成功");
          showSitemapSource.value = false;
        });
      } finally {
        sitemapLoading.value = false;
      }
    };
    const onSitemapInit = () => {
      Modal.confirm({
        centered: true,
        title: "确认初始化网站地图",
        content: "该操作无法逆转，请谨慎操作！",
        async onOk() {
          const hide = message.loading("网站地图初始化中..");
          try {
            return await resetSitemap().then(() => {
              message.success("初始化完成");
            });
          } finally {
            hide();
          }
        }
      });
    };
    onMounted(() => {
      fetchSetting("sitemap");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pannel setting-marketing-page" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: curTab.value,
        "onUpdate:activeKey": ($event) => curTab.value = $event,
        onChange: onTabChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "sitemap",
              tab: "网站地图"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="setting-max-1000 pt20 pr20 pb30 pl30"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Spin), { spinning: spinning.value }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Form), {
                          ref_key: "formRef",
                          ref: formRef,
                          model: formState.value,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "请使用主域名生成网站地图（发布文章或追加URL），否则网站地图将产生偏差，不利于SEO。",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(Alert), {
                                      message: "若需要多个域名SEO，请使用站群管理建立分站，并设置站点同步。",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt8"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Alert), {
                                        message: "请使用主域名生成网站地图（发布文章或追加URL），否则网站地图将产生偏差，不利于SEO。",
                                        type: "warning",
                                        "show-icon": "",
                                        banner: ""
                                      }),
                                      createVNode(unref(Alert), {
                                        message: "若需要多个域名SEO，请使用站群管理建立分站，并设置站点同步。",
                                        type: "warning",
                                        "show-icon": "",
                                        banner: "",
                                        class: "mt8"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), {
                                label: "自动追加URL",
                                name: "auto",
                                onClick: ($event) => onSave("sitemap")
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="f ac"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(Switch), {
                                      checked: formState.value.auto,
                                      "onUpdate:checked": ($event) => formState.value.auto = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<span class="ml10"${_scopeId5}>发布文章后自动追加URL到网站地图</span></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "f ac" }, [
                                        createVNode(unref(Switch), {
                                          checked: formState.value.auto,
                                          "onUpdate:checked": ($event) => formState.value.auto = $event
                                        }, null, 8, ["checked", "onUpdate:checked"]),
                                        createVNode("span", { class: "ml10" }, "发布文章后自动追加URL到网站地图")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(FormItem), { label: "手动追加URL" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Textarea), {
                                      value: sitemapURLs.value,
                                      "onUpdate:value": ($event) => sitemapURLs.value = $event,
                                      placeholder: "请输入https链接\r多个URL请换行",
                                      style: { "max-width": "400px", "height": "200px" }
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Textarea), {
                                        value: sitemapURLs.value,
                                        "onUpdate:value": ($event) => sitemapURLs.value = $event,
                                        placeholder: "请输入https链接\r多个URL请换行",
                                        style: { "max-width": "400px", "height": "200px" }
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
                                            loading: sitemapLoading.value,
                                            onClick: onAddSitemapURL
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`追加`);
                                              } else {
                                                return [
                                                  createTextVNode("追加")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(Button), { onClick: onSitemapInit }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`初始化网站地图`);
                                              } else {
                                                return [
                                                  createTextVNode("初始化网站地图")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(Button), {
                                            loading: sitemapLoading.value,
                                            onClick: viewSitemap
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`查看源码`);
                                              } else {
                                                return [
                                                  createTextVNode("查看源码")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(Button), {
                                              type: "primary",
                                              loading: sitemapLoading.value,
                                              onClick: onAddSitemapURL
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("追加")
                                              ]),
                                              _: 1
                                            }, 8, ["loading"]),
                                            createVNode(unref(Button), { onClick: onSitemapInit }, {
                                              default: withCtx(() => [
                                                createTextVNode("初始化网站地图")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(Button), {
                                              loading: sitemapLoading.value,
                                              onClick: viewSitemap
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("查看源码")
                                              ]),
                                              _: 1
                                            }, 8, ["loading"])
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
                                            loading: sitemapLoading.value,
                                            onClick: onAddSitemapURL
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("追加")
                                            ]),
                                            _: 1
                                          }, 8, ["loading"]),
                                          createVNode(unref(Button), { onClick: onSitemapInit }, {
                                            default: withCtx(() => [
                                              createTextVNode("初始化网站地图")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(Button), {
                                            loading: sitemapLoading.value,
                                            onClick: viewSitemap
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("查看源码")
                                            ]),
                                            _: 1
                                          }, 8, ["loading"])
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
                                createVNode(unref(FormItem), {
                                  wrapperCol: { offset: formCol.label }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Alert), {
                                      message: "请使用主域名生成网站地图（发布文章或追加URL），否则网站地图将产生偏差，不利于SEO。",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: ""
                                    }),
                                    createVNode(unref(Alert), {
                                      message: "若需要多个域名SEO，请使用站群管理建立分站，并设置站点同步。",
                                      type: "warning",
                                      "show-icon": "",
                                      banner: "",
                                      class: "mt8"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["wrapperCol"]),
                                createVNode(unref(FormItem), {
                                  label: "自动追加URL",
                                  name: "auto",
                                  onClick: ($event) => onSave("sitemap")
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "f ac" }, [
                                      createVNode(unref(Switch), {
                                        checked: formState.value.auto,
                                        "onUpdate:checked": ($event) => formState.value.auto = $event
                                      }, null, 8, ["checked", "onUpdate:checked"]),
                                      createVNode("span", { class: "ml10" }, "发布文章后自动追加URL到网站地图")
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(unref(FormItem), { label: "手动追加URL" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Textarea), {
                                      value: sitemapURLs.value,
                                      "onUpdate:value": ($event) => sitemapURLs.value = $event,
                                      placeholder: "请输入https链接\r多个URL请换行",
                                      style: { "max-width": "400px", "height": "200px" }
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
                                          loading: sitemapLoading.value,
                                          onClick: onAddSitemapURL
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("追加")
                                          ]),
                                          _: 1
                                        }, 8, ["loading"]),
                                        createVNode(unref(Button), { onClick: onSitemapInit }, {
                                          default: withCtx(() => [
                                            createTextVNode("初始化网站地图")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(Button), {
                                          loading: sitemapLoading.value,
                                          onClick: viewSitemap
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("查看源码")
                                          ]),
                                          _: 1
                                        }, 8, ["loading"])
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
                            model: formState.value,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Alert), {
                                    message: "请使用主域名生成网站地图（发布文章或追加URL），否则网站地图将产生偏差，不利于SEO。",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: ""
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "若需要多个域名SEO，请使用站群管理建立分站，并设置站点同步。",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt8"
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"]),
                              createVNode(unref(FormItem), {
                                label: "自动追加URL",
                                name: "auto",
                                onClick: ($event) => onSave("sitemap")
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "f ac" }, [
                                    createVNode(unref(Switch), {
                                      checked: formState.value.auto,
                                      "onUpdate:checked": ($event) => formState.value.auto = $event
                                    }, null, 8, ["checked", "onUpdate:checked"]),
                                    createVNode("span", { class: "ml10" }, "发布文章后自动追加URL到网站地图")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(FormItem), { label: "手动追加URL" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: sitemapURLs.value,
                                    "onUpdate:value": ($event) => sitemapURLs.value = $event,
                                    placeholder: "请输入https链接\r多个URL请换行",
                                    style: { "max-width": "400px", "height": "200px" }
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
                                        loading: sitemapLoading.value,
                                        onClick: onAddSitemapURL
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("追加")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"]),
                                      createVNode(unref(Button), { onClick: onSitemapInit }, {
                                        default: withCtx(() => [
                                          createTextVNode("初始化网站地图")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(Button), {
                                        loading: sitemapLoading.value,
                                        onClick: viewSitemap
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("查看源码")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
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
                    createVNode("div", { class: "setting-max-1000 pt20 pr20 pb30 pl30" }, [
                      createVNode(unref(Spin), { spinning: spinning.value }, {
                        default: withCtx(() => [
                          createVNode(unref(Form), {
                            ref_key: "formRef",
                            ref: formRef,
                            model: formState.value,
                            labelAlign: "left",
                            "label-col": { span: formCol.label }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                wrapperCol: { offset: formCol.label }
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Alert), {
                                    message: "请使用主域名生成网站地图（发布文章或追加URL），否则网站地图将产生偏差，不利于SEO。",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: ""
                                  }),
                                  createVNode(unref(Alert), {
                                    message: "若需要多个域名SEO，请使用站群管理建立分站，并设置站点同步。",
                                    type: "warning",
                                    "show-icon": "",
                                    banner: "",
                                    class: "mt8"
                                  })
                                ]),
                                _: 1
                              }, 8, ["wrapperCol"]),
                              createVNode(unref(FormItem), {
                                label: "自动追加URL",
                                name: "auto",
                                onClick: ($event) => onSave("sitemap")
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "f ac" }, [
                                    createVNode(unref(Switch), {
                                      checked: formState.value.auto,
                                      "onUpdate:checked": ($event) => formState.value.auto = $event
                                    }, null, 8, ["checked", "onUpdate:checked"]),
                                    createVNode("span", { class: "ml10" }, "发布文章后自动追加URL到网站地图")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(unref(FormItem), { label: "手动追加URL" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: sitemapURLs.value,
                                    "onUpdate:value": ($event) => sitemapURLs.value = $event,
                                    placeholder: "请输入https链接\r多个URL请换行",
                                    style: { "max-width": "400px", "height": "200px" }
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
                                        loading: sitemapLoading.value,
                                        onClick: onAddSitemapURL
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("追加")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"]),
                                      createVNode(unref(Button), { onClick: onSitemapInit }, {
                                        default: withCtx(() => [
                                          createTextVNode("初始化网站地图")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(Button), {
                                        loading: sitemapLoading.value,
                                        onClick: viewSitemap
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("查看源码")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
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
                key: "sitemap",
                tab: "网站地图"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "setting-max-1000 pt20 pr20 pb30 pl30" }, [
                    createVNode(unref(Spin), { spinning: spinning.value }, {
                      default: withCtx(() => [
                        createVNode(unref(Form), {
                          ref_key: "formRef",
                          ref: formRef,
                          model: formState.value,
                          labelAlign: "left",
                          "label-col": { span: formCol.label }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), {
                              wrapperCol: { offset: formCol.label }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Alert), {
                                  message: "请使用主域名生成网站地图（发布文章或追加URL），否则网站地图将产生偏差，不利于SEO。",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: ""
                                }),
                                createVNode(unref(Alert), {
                                  message: "若需要多个域名SEO，请使用站群管理建立分站，并设置站点同步。",
                                  type: "warning",
                                  "show-icon": "",
                                  banner: "",
                                  class: "mt8"
                                })
                              ]),
                              _: 1
                            }, 8, ["wrapperCol"]),
                            createVNode(unref(FormItem), {
                              label: "自动追加URL",
                              name: "auto",
                              onClick: ($event) => onSave("sitemap")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "f ac" }, [
                                  createVNode(unref(Switch), {
                                    checked: formState.value.auto,
                                    "onUpdate:checked": ($event) => formState.value.auto = $event
                                  }, null, 8, ["checked", "onUpdate:checked"]),
                                  createVNode("span", { class: "ml10" }, "发布文章后自动追加URL到网站地图")
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(unref(FormItem), { label: "手动追加URL" }, {
                              default: withCtx(() => [
                                createVNode(unref(Textarea), {
                                  value: sitemapURLs.value,
                                  "onUpdate:value": ($event) => sitemapURLs.value = $event,
                                  placeholder: "请输入https链接\r多个URL请换行",
                                  style: { "max-width": "400px", "height": "200px" }
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
                                      loading: sitemapLoading.value,
                                      onClick: onAddSitemapURL
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("追加")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"]),
                                    createVNode(unref(Button), { onClick: onSitemapInit }, {
                                      default: withCtx(() => [
                                        createTextVNode("初始化网站地图")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(Button), {
                                      loading: sitemapLoading.value,
                                      onClick: viewSitemap
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("查看源码")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"])
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
      _push(ssrRenderComponent(unref(Modal), {
        open: showSitemapSource.value,
        "onUpdate:open": ($event) => showSitemapSource.value = $event,
        title: "网站地图",
        width: 800,
        cancelText: "关闭",
        okText: "保存",
        okButtonProps: {
          loading: sitemapLoading.value
        },
        onOk: saveSitemapURL
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Textarea), {
              value: sitemapSource.value,
              "onUpdate:value": ($event) => sitemapSource.value = $event,
              style: { "height": "600px" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(unref(Textarea), {
                  value: sitemapSource.value,
                  "onUpdate:value": ($event) => sitemapSource.value = $event,
                  style: { "height": "600px" }
                }, null, 8, ["value", "onUpdate:value"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/modules/sitemap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
