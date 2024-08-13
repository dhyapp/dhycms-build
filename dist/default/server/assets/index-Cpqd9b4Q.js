import { computed, reactive, ref, onActivated, resolveComponent, resolveDirective, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, createCommentVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Flex, Space, DropdownButton, Menu, MenuItem, Button, Select, SelectOption, Input, Alert, Table, Tag, Dropdown, Modal, Form, FormItem, Textarea, message } from "ant-design-vue";
import { m as menu, n as nav } from "./index-0psH9gUa.js";
import { n as navImport, a as navExport } from "./nav-DjWu7sY3.js";
import { n as numFormat, d as dateFromID, t as toTree } from "./common-ZcIx5rAG.js";
import { u as useGLobalStore } from "../entry-server.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const modalFormCol = { label: 4, wrapper: 20 };
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const searchState = reactive({
      keyword: "",
      mid: null
    });
    const mapStatus = {
      on: "上线",
      off: "下线"
    };
    const list = ref([]);
    const loading = ref(false);
    const pagination = reactive({
      current: 1,
      pageSize: 20,
      pageSizeOptions: [20, 50, 200, 500],
      total: 0,
      showQuickJumper: true,
      position: ["bottomCenter"]
    });
    const menu$1 = ref([]);
    const mapMenuName = ref({});
    let sorter = {};
    const selectedRowKeys = ref([]);
    const batchLoading = ref(false);
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys;
    };
    const init = () => {
      pagination.current = 1;
      pagination.total = 0;
      sorter = {};
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
        for (const m of menu$1.value) {
          mapMenuName.value[m._id] = m.name;
        }
      });
    };
    const fetchList = async () => {
      try {
        loading.value = true;
        const query = {
          current: pagination.current,
          pageSize: pagination.pageSize,
          fieldby: [],
          field: []
        };
        if (searchState.mid) {
          query.fieldby.push("mid");
          query.field.push(searchState.mid);
        }
        if (searchState.keyword) {
          query.keywordby = "name,link";
          query.keyword = searchState.keyword;
        }
        if (sorter.order) {
          query.sortby = sorter.field;
          query.sort = sorter.order === "ascend" ? 1 : -1;
        }
        query.fieldby = query.fieldby.join(",");
        query.field = query.field.join(",");
        list.value = [];
        await nav.list({ query }).then((res) => {
          list.value = res.list || [];
          pagination.total = res.total;
        });
      } finally {
        loading.value = false;
      }
    };
    const batchInit = () => {
      fetchList();
    };
    const delHandle = async (ids) => {
      Modal.confirm({
        title: "确认删除？",
        content: "删除后将无法恢复",
        centered: true,
        onOk: async () => {
          return new Promise((resolve, reject) => {
            nav.del({ ids }).then(() => {
              message.success("删除成功");
              batchInit();
              resolve();
            }).catch((e) => {
              console.error(e);
              message.error(e.message || "删除失败");
              reject();
            });
          });
        }
      });
    };
    const blockHandle = async (ids, status = "off") => {
      const hide = message.loading();
      try {
        await nav.update({ ids, body: { status } }).then(() => {
          message.success("操作成功");
          batchInit();
        }).catch((e) => {
          console.error(e);
          message.error("操作失败");
        });
      } finally {
        hide();
      }
    };
    const showTagModal = ref(false);
    const tagForm = reactive({ tag: "", tagStyles: "" });
    const tagModalFormRef = ref(null);
    const tagHandle = async () => {
      try {
        batchLoading.value = true;
        await tagModalFormRef.value.validate();
        await nav.update({ ids: selectedRowKeys.value, body: toRaw(tagForm) }).then(() => {
          message.success("标签设置成功");
          showTagModal.value = false;
          tagForm.tag = "";
          batchInit();
        }).catch((e) => {
          console.error(e);
          message.error("标签设置失败");
        });
      } finally {
        batchLoading.value = false;
      }
    };
    const showMenuModal = ref(false);
    const menuForm = reactive({ mid: null });
    const menuModalFormRef = ref(null);
    const menuHandle = async () => {
      try {
        batchLoading.value = true;
        await menuModalFormRef.value.validate();
        await nav.update({ ids: selectedRowKeys.value, body: toRaw(menuForm) }).then(() => {
          message.success("归类成功");
          showMenuModal.value = false;
          menuForm.mid = null;
          batchInit();
        }).catch((e) => {
          console.error(e);
          message.error("归类失败");
        });
      } finally {
        batchLoading.value = false;
      }
    };
    const showNavStylesModal = ref(false);
    const navStylesForm = reactive({ styles: null });
    const navStylesModalFormRef = ref(null);
    const navStylesHandle = async () => {
      try {
        batchLoading.value = true;
        await navStylesModalFormRef.value.validate();
        await nav.update({ ids: selectedRowKeys.value, body: toRaw(navStylesForm) }).then(() => {
          message.success("导航样式设置成功");
          showNavStylesModal.value = false;
          navStylesForm.styles = null;
          batchInit();
        }).catch((e) => {
          console.error(e);
          message.error("导航样式设置失败");
        });
      } finally {
        batchLoading.value = false;
      }
    };
    const exportHandle = async () => {
      try {
        batchLoading.value = true;
        await navExport(selectedRowKeys.value).then(async (res) => {
          const blob = await res.blob();
          const bloburl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = bloburl;
          a.download = "导航导出数据.xlsx";
          a.click();
          a.remove();
        }).catch((e) => {
          console.error(e);
          message.error("导出失败");
        });
      } finally {
        batchLoading.value = false;
      }
    };
    const importHandle = async (e) => {
      batchLoading.value = true;
      const formdata = new FormData();
      formdata.append("file", e.target.files[0]);
      try {
        await navImport(formdata).then((res) => {
          message.info(res.msg || `成功导入${res.success}数据，${res.fail}条失败`);
          batchInit();
        });
      } catch (e2) {
        console.error(e2);
        message.error(e2.msg || e2.mesage || "导入失败");
      } finally {
        batchLoading.value = false;
        e.target.value = null;
      }
    };
    const onMoreOptions = async ({ key }, record) => {
      switch (key) {
        case "block":
          await blockHandle([record._id]);
          break;
        case "unblock":
          await blockHandle([record._id], "on");
          break;
        case "del":
          delHandle([record._id]);
          break;
      }
    };
    const onBatchOptions = async ({ key }) => {
      if (!selectedRowKeys.value.length && key !== "import")
        return message.error("未选中目标");
      switch (key) {
        case "del":
          await delHandle(selectedRowKeys.value);
          break;
        case "block":
          await blockHandle(selectedRowKeys.value);
          break;
        case "unblock":
          await blockHandle(selectedRowKeys.value, "on");
          break;
        case "tag":
          showTagModal.value = true;
          break;
        case "menu":
          showMenuModal.value = true;
          break;
        case "style":
          showNavStylesModal.value = true;
          break;
        case "export":
          exportHandle();
          break;
      }
    };
    const onSearch = () => {
      fetchList();
    };
    const onReset = () => {
      searchState.keyword = "";
      searchState.mid = null;
      init();
      fetchList();
    };
    const onTableChange = (paginate, filters, _sorter) => {
      pagination.current = paginate.current;
      pagination.pageSize = paginate.pageSize;
      sorter = _sorter;
      fetchList();
    };
    onActivated(() => {
      fetchList();
      fetchMenu();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      const _directive_depic = resolveDirective("depic");
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
                  _push3(`链接管理`);
                } else {
                  return [
                    createTextVNode("链接管理")
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
                  createTextVNode("链接管理")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel pt20 pl20 pb20 pr20 mt14 nav-list-page">`);
      _push(ssrRenderComponent(unref(Flex), { justify: "space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Space), { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DropdownButton), { loading: batchLoading.value }, {
                    overlay: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Menu), { onClick: onBatchOptions }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "tag" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`添加标签`);
                                  } else {
                                    return [
                                      createTextVNode("添加标签")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "menu" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`归类`);
                                  } else {
                                    return [
                                      createTextVNode("归类")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "style" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`设置样式`);
                                  } else {
                                    return [
                                      createTextVNode("设置样式")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), {
                                key: "import",
                                class: "batch-import-wrapper"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`导入<input type="file"${_scopeId5}>`);
                                  } else {
                                    return [
                                      createTextVNode("导入"),
                                      createVNode("input", {
                                        type: "file",
                                        onChange: importHandle
                                      }, null, 32)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "export" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`导出`);
                                  } else {
                                    return [
                                      createTextVNode("导出")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "block" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`下架`);
                                  } else {
                                    return [
                                      createTextVNode("下架")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "unblock" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`取消下架`);
                                  } else {
                                    return [
                                      createTextVNode("取消下架")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "del" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="txt-error"${_scopeId5}>删除</span>`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "txt-error" }, "删除")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(MenuItem), { key: "tag" }, {
                                  default: withCtx(() => [
                                    createTextVNode("添加标签")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "menu" }, {
                                  default: withCtx(() => [
                                    createTextVNode("归类")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "style" }, {
                                  default: withCtx(() => [
                                    createTextVNode("设置样式")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), {
                                  key: "import",
                                  class: "batch-import-wrapper"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("导入"),
                                    createVNode("input", {
                                      type: "file",
                                      onChange: importHandle
                                    }, null, 32)
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "export" }, {
                                  default: withCtx(() => [
                                    createTextVNode("导出")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "block" }, {
                                  default: withCtx(() => [
                                    createTextVNode("下架")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "unblock" }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消下架")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "del" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "txt-error" }, "删除")
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
                          createVNode(unref(Menu), { onClick: onBatchOptions }, {
                            default: withCtx(() => [
                              createVNode(unref(MenuItem), { key: "tag" }, {
                                default: withCtx(() => [
                                  createTextVNode("添加标签")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "menu" }, {
                                default: withCtx(() => [
                                  createTextVNode("归类")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "style" }, {
                                default: withCtx(() => [
                                  createTextVNode("设置样式")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), {
                                key: "import",
                                class: "batch-import-wrapper"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("导入"),
                                  createVNode("input", {
                                    type: "file",
                                    onChange: importHandle
                                  }, null, 32)
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "export" }, {
                                default: withCtx(() => [
                                  createTextVNode("导出")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "block" }, {
                                default: withCtx(() => [
                                  createTextVNode("下架")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "unblock" }, {
                                default: withCtx(() => [
                                  createTextVNode("取消下架")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "del" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "txt-error" }, "删除")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 批量操作 `);
                      } else {
                        return [
                          createTextVNode(" 批量操作 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    to: `/${preadmin.value}/nav/edit`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Button), { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`添加导航`);
                            } else {
                              return [
                                createTextVNode("添加导航")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Button), { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("添加导航")
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
                    createVNode(unref(DropdownButton), { loading: batchLoading.value }, {
                      overlay: withCtx(() => [
                        createVNode(unref(Menu), { onClick: onBatchOptions }, {
                          default: withCtx(() => [
                            createVNode(unref(MenuItem), { key: "tag" }, {
                              default: withCtx(() => [
                                createTextVNode("添加标签")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "menu" }, {
                              default: withCtx(() => [
                                createTextVNode("归类")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "style" }, {
                              default: withCtx(() => [
                                createTextVNode("设置样式")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), {
                              key: "import",
                              class: "batch-import-wrapper"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("导入"),
                                createVNode("input", {
                                  type: "file",
                                  onChange: importHandle
                                }, null, 32)
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "export" }, {
                              default: withCtx(() => [
                                createTextVNode("导出")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "block" }, {
                              default: withCtx(() => [
                                createTextVNode("下架")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "unblock" }, {
                              default: withCtx(() => [
                                createTextVNode("取消下架")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "del" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "txt-error" }, "删除")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" 批量操作 ")
                      ]),
                      _: 1
                    }, 8, ["loading"]),
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/nav/edit`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Button), { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("添加导航")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Space), { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Select), {
                    value: searchState.mid,
                    "onUpdate:value": ($event) => searchState.mid = $event,
                    placeholder: "所属菜单分类",
                    style: { width: "160px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(menu$1.value, (v) => {
                          _push4(ssrRenderComponent(unref(SelectOption), {
                            key: v._id,
                            value: v._id
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(v.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(v.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "名称/链接/关键词"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Button), {
                    type: "primary",
                    onClick: onSearch
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`搜索`);
                      } else {
                        return [
                          createTextVNode("搜索")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Button), { onClick: onReset }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`重置`);
                      } else {
                        return [
                          createTextVNode("重置")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Select), {
                      value: searchState.mid,
                      "onUpdate:value": ($event) => searchState.mid = $event,
                      placeholder: "所属菜单分类",
                      style: { width: "160px" }
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
                    }, 8, ["value", "onUpdate:value"]),
                    createVNode(unref(Input), {
                      value: searchState.keyword,
                      "onUpdate:value": ($event) => searchState.keyword = $event,
                      placeholder: "名称/链接/关键词"
                    }, null, 8, ["value", "onUpdate:value"]),
                    createVNode(unref(Button), {
                      type: "primary",
                      onClick: onSearch
                    }, {
                      default: withCtx(() => [
                        createTextVNode("搜索")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Button), { onClick: onReset }, {
                      default: withCtx(() => [
                        createTextVNode("重置")
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
              createVNode(unref(Space), { wrap: "" }, {
                default: withCtx(() => [
                  createVNode(unref(DropdownButton), { loading: batchLoading.value }, {
                    overlay: withCtx(() => [
                      createVNode(unref(Menu), { onClick: onBatchOptions }, {
                        default: withCtx(() => [
                          createVNode(unref(MenuItem), { key: "tag" }, {
                            default: withCtx(() => [
                              createTextVNode("添加标签")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "menu" }, {
                            default: withCtx(() => [
                              createTextVNode("归类")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "style" }, {
                            default: withCtx(() => [
                              createTextVNode("设置样式")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), {
                            key: "import",
                            class: "batch-import-wrapper"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("导入"),
                              createVNode("input", {
                                type: "file",
                                onChange: importHandle
                              }, null, 32)
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "export" }, {
                            default: withCtx(() => [
                              createTextVNode("导出")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "block" }, {
                            default: withCtx(() => [
                              createTextVNode("下架")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "unblock" }, {
                            default: withCtx(() => [
                              createTextVNode("取消下架")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "del" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "txt-error" }, "删除")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" 批量操作 ")
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/nav/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("添加导航")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(Space), { wrap: "" }, {
                default: withCtx(() => [
                  createVNode(unref(Select), {
                    value: searchState.mid,
                    "onUpdate:value": ($event) => searchState.mid = $event,
                    placeholder: "所属菜单分类",
                    style: { width: "160px" }
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
                  }, 8, ["value", "onUpdate:value"]),
                  createVNode(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "名称/链接/关键词"
                  }, null, 8, ["value", "onUpdate:value"]),
                  createVNode(unref(Button), {
                    type: "primary",
                    onClick: onSearch
                  }, {
                    default: withCtx(() => [
                      createTextVNode("搜索")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Button), { onClick: onReset }, {
                    default: withCtx(() => [
                      createTextVNode("重置")
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
      }, _parent));
      _push(`<hr class="mt20 mb10">`);
      _push(ssrRenderComponent(unref(Alert), {
        message: "此处来源统计需安装并开启【来路自动排序】插件，否则前台无法按照来源量进行自动排序。每日凌晨6点将进行来源统计。",
        class: "mb14",
        showIcon: "",
        type: "warning"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Table), {
        columns: [
          { title: "图标", dataIndex: "logo", align: "center", width: 80 },
          { title: "名称", dataIndex: "name", ellipsis: true },
          { title: "链接", dataIndex: "link", ellipsis: true },
          { title: "所属分类", dataIndex: "mid" },
          { title: "昨日来源", dataIndex: "referrerYesterdayCount", sorter: true },
          { title: "前日来源", dataIndex: "referrerBeforeyesterdayCount", sorter: true },
          { title: "累计来源", dataIndex: "referrerTotal", sorter: true },
          { title: "来源码", dataIndex: "referrerCode" },
          { title: "标签", dataIndex: "tag" },
          { title: "添加时间", dataIndex: "_id" },
          { title: "状态", dataIndex: "status", align: "center", fixed: "right", width: 80 },
          { title: "操作", dataIndex: "ctrl", align: "right", fixed: "right", width: 210 }
        ],
        "data-source": list.value,
        size: "small",
        loading: loading.value,
        pagination,
        "row-selection": { selectedRowKeys: selectedRowKeys.value, onChange: onSelectChange },
        rowKey: "_id",
        onChange: onTableChange
      }, {
        bodyCell: withCtx(({ column, record }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (column.dataIndex === "logo") {
              _push2(`<div class="f ac jc"${_scopeId}>`);
              if (record.logo) {
                _push2(`<div class="poster"${_scopeId}><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, `${record.logo}?0x30`))}${_scopeId}></div>`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`</div>`);
            } else if (column.dataIndex === "link") {
              _push2(`<a${ssrRenderAttr("href", record.link)} rel="noreferrer" target="_blank"${_scopeId}>${ssrInterpolate(record.link)}</a>`);
            } else if (column.dataIndex === "mid") {
              _push2(`<!--[-->${ssrInterpolate(mapMenuName.value[record.mid] || "-")}<!--]-->`);
            } else if (column.dataIndex === "referrerTodayCount") {
              _push2(`<!--[-->${ssrInterpolate(unref(numFormat)(record.referrerTodayCount))}<!--]-->`);
            } else if (column.dataIndex === "referrerYesterdayCount") {
              _push2(`<!--[-->${ssrInterpolate(unref(numFormat)(record.referrerYesterdayCount))}<!--]-->`);
            } else if (column.dataIndex === "referrerBeforeyesterdayCount") {
              _push2(`<!--[-->${ssrInterpolate(unref(numFormat)(record.referrerBeforeyesterdayCount))}<!--]-->`);
            } else if (column.dataIndex === "referrerTotal") {
              _push2(`<!--[-->${ssrInterpolate(unref(numFormat)(record.referrerTotal + record.referrerTodayCount))}<!--]-->`);
            } else if (column.dataIndex === "referrerCode") {
              _push2(`<!--[-->${ssrInterpolate(record.referrerCode || "-")}<!--]-->`);
            } else if (column.dataIndex === "tag") {
              _push2(`<!--[-->${ssrInterpolate(record.tag || "-")}<!--]-->`);
            } else if (column.dataIndex === "_id") {
              _push2(`<!--[-->${ssrInterpolate(unref(dateFromID)(record._id, "YYYY-MM-DD"))}<!--]-->`);
            } else if (column.dataIndex === "status") {
              _push2(ssrRenderComponent(unref(Tag), {
                bordered: false,
                color: record.status === "on" ? "success" : "error"
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(mapStatus[record.status])}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(mapStatus[record.status]), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else if (column.dataIndex === "ctrl") {
              _push2(ssrRenderComponent(unref(Space), null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_RouterLink, {
                      to: `/${preadmin.value}/nav/edit/${record._id}`
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), {
                            type: "primary",
                            size: "small"
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`编辑`);
                              } else {
                                return [
                                  createTextVNode("编辑")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Button), {
                              type: "primary",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("编辑")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_RouterLink, {
                      to: `/${preadmin.value}/stat/nav/${record.referrerCode}`
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), { size: "small" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`日报`);
                              } else {
                                return [
                                  createTextVNode("日报")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Button), { size: "small" }, {
                              default: withCtx(() => [
                                createTextVNode("日报")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Dropdown), null, {
                      overlay: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Menu), {
                            onClick: (e) => onMoreOptions(e, record)
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "block" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`下架`);
                                    } else {
                                      return [
                                        createTextVNode("下架")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "unblock" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`取消下架`);
                                    } else {
                                      return [
                                        createTextVNode("取消下架")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "del" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<span class="txt-error"${_scopeId5}>删除</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "txt-error" }, "删除")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(MenuItem), { key: "block" }, {
                                    default: withCtx(() => [
                                      createTextVNode("下架")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "unblock" }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消下架")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "del" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "txt-error" }, "删除")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Menu), {
                              onClick: (e) => onMoreOptions(e, record)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(MenuItem), { key: "block" }, {
                                  default: withCtx(() => [
                                    createTextVNode("下架")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "unblock" }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消下架")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "del" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "txt-error" }, "删除")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ];
                        }
                      }),
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), { size: "small" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`...`);
                              } else {
                                return [
                                  createTextVNode("...")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Button), { size: "small" }, {
                              default: withCtx(() => [
                                createTextVNode("...")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_RouterLink, {
                        to: `/${preadmin.value}/nav/edit/${record._id}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Button), {
                            type: "primary",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("编辑")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(_component_RouterLink, {
                        to: `/${preadmin.value}/stat/nav/${record.referrerCode}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Button), { size: "small" }, {
                            default: withCtx(() => [
                              createTextVNode("日报")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(unref(Dropdown), null, {
                        overlay: withCtx(() => [
                          createVNode(unref(Menu), {
                            onClick: (e) => onMoreOptions(e, record)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MenuItem), { key: "block" }, {
                                default: withCtx(() => [
                                  createTextVNode("下架")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "unblock" }, {
                                default: withCtx(() => [
                                  createTextVNode("取消下架")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "del" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "txt-error" }, "删除")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        default: withCtx(() => [
                          createVNode(unref(Button), { size: "small" }, {
                            default: withCtx(() => [
                              createTextVNode("...")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              column.dataIndex === "logo" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f ac jc"
              }, [
                record.logo ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "poster"
                }, [
                  withDirectives(createVNode("img", null, null, 512), [
                    [_directive_depic, `${record.logo}?0x30`]
                  ])
                ])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
              ])) : column.dataIndex === "link" ? (openBlock(), createBlock("a", {
                key: 1,
                href: record.link,
                rel: "noreferrer",
                target: "_blank"
              }, toDisplayString(record.link), 9, ["href"])) : column.dataIndex === "mid" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                createTextVNode(toDisplayString(mapMenuName.value[record.mid] || "-"), 1)
              ], 64)) : column.dataIndex === "referrerTodayCount" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerTodayCount)), 1)
              ], 64)) : column.dataIndex === "referrerYesterdayCount" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerYesterdayCount)), 1)
              ], 64)) : column.dataIndex === "referrerBeforeyesterdayCount" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerBeforeyesterdayCount)), 1)
              ], 64)) : column.dataIndex === "referrerTotal" ? (openBlock(), createBlock(Fragment, { key: 6 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerTotal + record.referrerTodayCount)), 1)
              ], 64)) : column.dataIndex === "referrerCode" ? (openBlock(), createBlock(Fragment, { key: 7 }, [
                createTextVNode(toDisplayString(record.referrerCode || "-"), 1)
              ], 64)) : column.dataIndex === "tag" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                createTextVNode(toDisplayString(record.tag || "-"), 1)
              ], 64)) : column.dataIndex === "_id" ? (openBlock(), createBlock(Fragment, { key: 9 }, [
                createTextVNode(toDisplayString(unref(dateFromID)(record._id, "YYYY-MM-DD")), 1)
              ], 64)) : column.dataIndex === "status" ? (openBlock(), createBlock(unref(Tag), {
                key: 10,
                bordered: false,
                color: record.status === "on" ? "success" : "error"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(mapStatus[record.status]), 1)
                ]),
                _: 2
              }, 1032, ["color"])) : column.dataIndex === "ctrl" ? (openBlock(), createBlock(unref(Space), { key: 11 }, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/nav/edit/${record._id}`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        type: "primary",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("编辑")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["to"]),
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/stat/nav/${record.referrerCode}`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { size: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("日报")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["to"]),
                  createVNode(unref(Dropdown), null, {
                    overlay: withCtx(() => [
                      createVNode(unref(Menu), {
                        onClick: (e) => onMoreOptions(e, record)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(MenuItem), { key: "block" }, {
                            default: withCtx(() => [
                              createTextVNode("下架")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "unblock" }, {
                            default: withCtx(() => [
                              createTextVNode("取消下架")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "del" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "txt-error" }, "删除")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    default: withCtx(() => [
                      createVNode(unref(Button), { size: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("...")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Modal), {
        open: showTagModal.value,
        "onUpdate:open": ($event) => showTagModal.value = $event,
        title: "批量修改或添加标签",
        centered: "",
        confirmLoading: batchLoading.value,
        onOk: tagHandle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "tagModalFormRef",
              ref: tagModalFormRef,
              model: tagForm,
              "label-col": { span: modalFormCol.label },
              "wrapper-col": { span: modalFormCol.wrapper },
              class: "mt20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "标签名",
                    name: "tag",
                    rules: [{ required: true, message: "标签名不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: tagForm.tag,
                          "onUpdate:value": ($event) => tagForm.tag = $event,
                          placeholder: "请输入1~2个中文字符或1~4个英文字符"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: tagForm.tag,
                            "onUpdate:value": ($event) => tagForm.tag = $event,
                            placeholder: "请输入1~2个中文字符或1~4个英文字符"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "标签样式",
                    name: "tagStyles"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Textarea), {
                          value: tagForm.tagStyles,
                          "onUpdate:value": ($event) => tagForm.tagStyles = $event,
                          placeholder: "请输入CSS样式"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Textarea), {
                            value: tagForm.tagStyles,
                            "onUpdate:value": ($event) => tagForm.tagStyles = $event,
                            placeholder: "请输入CSS样式"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "标签名",
                      name: "tag",
                      rules: [{ required: true, message: "标签名不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: tagForm.tag,
                          "onUpdate:value": ($event) => tagForm.tag = $event,
                          placeholder: "请输入1~2个中文字符或1~4个英文字符"
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "标签样式",
                      name: "tagStyles"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Textarea), {
                          value: tagForm.tagStyles,
                          "onUpdate:value": ($event) => tagForm.tagStyles = $event,
                          placeholder: "请输入CSS样式"
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
                ref_key: "tagModalFormRef",
                ref: tagModalFormRef,
                model: tagForm,
                "label-col": { span: modalFormCol.label },
                "wrapper-col": { span: modalFormCol.wrapper },
                class: "mt20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "标签名",
                    name: "tag",
                    rules: [{ required: true, message: "标签名不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: tagForm.tag,
                        "onUpdate:value": ($event) => tagForm.tag = $event,
                        placeholder: "请输入1~2个中文字符或1~4个英文字符"
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "标签样式",
                    name: "tagStyles"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Textarea), {
                        value: tagForm.tagStyles,
                        "onUpdate:value": ($event) => tagForm.tagStyles = $event,
                        placeholder: "请输入CSS样式"
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
      _push(ssrRenderComponent(unref(Modal), {
        open: showMenuModal.value,
        "onUpdate:open": ($event) => showMenuModal.value = $event,
        title: "批量设置所属分类",
        centered: "",
        confirmLoading: batchLoading.value,
        onOk: menuHandle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "menuModalFormRef",
              ref: menuModalFormRef,
              model: menuForm,
              class: "mt20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    name: "mid",
                    rules: [{ required: true, message: "请选择所属分类" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Select), {
                          value: menuForm.mid,
                          "onUpdate:value": ($event) => menuForm.mid = $event,
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
                            value: menuForm.mid,
                            "onUpdate:value": ($event) => menuForm.mid = $event,
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
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      name: "mid",
                      rules: [{ required: true, message: "请选择所属分类" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Select), {
                          value: menuForm.mid,
                          "onUpdate:value": ($event) => menuForm.mid = $event,
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Form), {
                ref_key: "menuModalFormRef",
                ref: menuModalFormRef,
                model: menuForm,
                class: "mt20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    name: "mid",
                    rules: [{ required: true, message: "请选择所属分类" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Select), {
                        value: menuForm.mid,
                        "onUpdate:value": ($event) => menuForm.mid = $event,
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
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Modal), {
        open: showNavStylesModal.value,
        "onUpdate:open": ($event) => showNavStylesModal.value = $event,
        title: "批量设置导航样式",
        centered: "",
        confirmLoading: batchLoading.value,
        onOk: navStylesHandle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "navStylesModalFormRef",
              ref: navStylesModalFormRef,
              model: navStylesForm,
              class: "mt20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), { name: "styles" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Textarea), {
                          value: navStylesForm.styles,
                          "onUpdate:value": ($event) => navStylesForm.styles = $event,
                          placeholder: "请输入CSS样式"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Textarea), {
                            value: navStylesForm.styles,
                            "onUpdate:value": ($event) => navStylesForm.styles = $event,
                            placeholder: "请输入CSS样式"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), { name: "styles" }, {
                      default: withCtx(() => [
                        createVNode(unref(Textarea), {
                          value: navStylesForm.styles,
                          "onUpdate:value": ($event) => navStylesForm.styles = $event,
                          placeholder: "请输入CSS样式"
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
                ref_key: "navStylesModalFormRef",
                ref: navStylesModalFormRef,
                model: navStylesForm,
                class: "mt20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), { name: "styles" }, {
                    default: withCtx(() => [
                      createVNode(unref(Textarea), {
                        value: navStylesForm.styles,
                        "onUpdate:value": ($event) => navStylesForm.styles = $event,
                        placeholder: "请输入CSS样式"
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/nav/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
