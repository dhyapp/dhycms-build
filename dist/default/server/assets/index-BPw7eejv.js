import { computed, reactive, ref, onActivated, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Flex, Space, DropdownButton, Menu, MenuItem, Button, Select, SelectOption, Input, Alert, Table, Tooltip, Tag, Dropdown, Modal, Form, FormItem, message } from "ant-design-vue";
import { m as menu, s as selfreg } from "./index-0psH9gUa.js";
import { r as request, u as useGLobalStore } from "../entry-server.js";
import { n as numFormat, d as dateFromID, b as dateFormat, t as toTree } from "./common-ZcIx5rAG.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const setSelfregToNav = (body = {}, options = {}) => {
  return request(`/api/v1/admin/selfreg/in`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const setNavOffFromSelfreg = (body = {}, options = {}) => {
  return request(`/api/v1/admin/selfreg/out`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const blockIPOrURL = (body = {}, options = {}) => {
  return request(`/api/v1/admin/selfreg/block`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const unblockIPOrURL = (body = {}, options = {}) => {
  return request(`/api/v1/admin/selfreg/unblock`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options
  });
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const searchState = reactive({
      keyword: "",
      mid: null,
      status: null
    });
    const mapStatus = {
      in: "已收录",
      out: "未收录",
      refuse: "驳回",
      block: "拉黑",
      unblock: "移除黑名单"
    };
    const mapStatusColor = {
      in: "green",
      out: "",
      refuse: "red",
      block: "red",
      unblock: ""
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
    const selectedRowKeys = ref([]);
    const batchLoading = ref(false);
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys;
    };
    const init = () => {
      pagination.current = 1;
      pagination.total = 0;
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
        query.fieldby = query.fieldby.join(",");
        query.field = query.field.join(",");
        list.value = [];
        await selfreg.list({ query }).then((res) => {
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
            selfreg.del({ ids }).then(() => {
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
    const blockHandle = async (ids, status = "block") => {
      const hide = message.loading();
      try {
        const isBlock = status === "block";
        const request2 = isBlock ? blockIPOrURL : unblockIPOrURL;
        await request2({ ids }).then(async () => {
          await updateHandle(ids, { status });
          batchInit();
        }).catch((e) => {
          console.error(e);
          message.error("操作失败");
        });
      } finally {
        hide();
      }
    };
    const showMenuModal = ref(false);
    const menuForm = reactive({ mid: null });
    const menuModalFormRef = ref(null);
    const menuHandle = async () => {
      try {
        batchLoading.value = true;
        await menuModalFormRef.value.validate();
        await selfreg.update({ ids: selectedRowKeys.value, body: toRaw(menuForm) }).then(() => {
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
    const showRefuseModal = ref(false);
    const refuseForm = reactive({ remark: "", status: "refuse" });
    const refuseModalFormRef = ref(null);
    const resfuseHandle = async () => {
      try {
        batchLoading.value = true;
        await refuseModalFormRef.value.validate();
        await selfreg.update({ ids: selectedRowKeys.value, body: toRaw(refuseForm) }).then(() => {
          message.success("操作成功");
          showRefuseModal.value = false;
          refuseForm.remark = "";
          batchInit();
        }).catch((e) => {
          console.error(e);
          message.error("操作失败");
        });
      } finally {
        batchLoading.value = false;
      }
    };
    const updateHandle = async (ids, body) => {
      const hide = message.loading();
      try {
        await selfreg.update({ ids, body }).then(() => {
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
    const inHandle = async (ids) => {
      const hide = message.loading();
      try {
        await setSelfregToNav({ ids }).then((res) => {
          updateHandle(ids, { status: "in", inAt: Date.now() });
          message.info(`成功收录${res.success}数据，${res.fail}条失败`);
        }).catch((e) => {
          console.error(e);
          message.error("收录失败");
        });
      } finally {
        hide();
      }
    };
    const outHandle = async (ids) => {
      const hide = message.loading();
      try {
        await setNavOffFromSelfreg({ ids }).then((res) => {
          updateHandle(ids, { status: "out" });
          message.info(`成功操作${res.success}数据，${res.fail}条失败`);
        }).catch((e) => {
          console.error(e);
          message.error("操作失败");
        });
      } finally {
        hide();
      }
    };
    const onMoreOptions = async ({ key }, record) => {
      switch (key) {
        case "menu":
          menuForm.mid = record.mid;
          selectedRowKeys.value = [record._id];
          showMenuModal.value = true;
          break;
        case "in":
          inHandle([record._id]);
          break;
        case "out":
          outHandle([record._id]);
          break;
        case "refuse":
          selectedRowKeys.value = [record._id];
          showRefuseModal.value = true;
          break;
        case "block":
          await blockHandle([record._id]);
          break;
        case "unblock":
          await blockHandle([record._id], "unblock");
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
        case "menu":
          showMenuModal.value = true;
          break;
        case "block":
          await blockHandle(selectedRowKeys.value);
          break;
        case "unblock":
          await blockHandle(selectedRowKeys.value, "unblock");
          break;
        case "refuse":
          showRefuseModal.value = true;
          break;
        case "out":
          outHandle(selectedRowKeys.value);
          break;
        case "in":
          inHandle(selectedRowKeys.value);
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
    const onTableChange = (paginate) => {
      pagination.current = paginate.current;
      pagination.pageSize = paginate.pageSize;
      fetchList();
    };
    onActivated(() => {
      fetchList();
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
                  _push3(`自助收录管理`);
                } else {
                  return [
                    createTextVNode("自助收录管理")
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
                  createTextVNode("自助收录管理")
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
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "in" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`收录`);
                                  } else {
                                    return [
                                      createTextVNode("收录")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "out" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`取消收录`);
                                  } else {
                                    return [
                                      createTextVNode("取消收录")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "refuse" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`驳回`);
                                  } else {
                                    return [
                                      createTextVNode("驳回")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "block" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`拉黑（IP&amp;域名）`);
                                  } else {
                                    return [
                                      createTextVNode("拉黑（IP&域名）")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "unblock" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`取消拉黑`);
                                  } else {
                                    return [
                                      createTextVNode("取消拉黑")
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
                                createVNode(unref(MenuItem), { key: "menu" }, {
                                  default: withCtx(() => [
                                    createTextVNode("归类")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "in" }, {
                                  default: withCtx(() => [
                                    createTextVNode("收录")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "out" }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消收录")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "refuse" }, {
                                  default: withCtx(() => [
                                    createTextVNode("驳回")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "block" }, {
                                  default: withCtx(() => [
                                    createTextVNode("拉黑（IP&域名）")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "unblock" }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消拉黑")
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
                              createVNode(unref(MenuItem), { key: "menu" }, {
                                default: withCtx(() => [
                                  createTextVNode("归类")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "in" }, {
                                default: withCtx(() => [
                                  createTextVNode("收录")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "out" }, {
                                default: withCtx(() => [
                                  createTextVNode("取消收录")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "refuse" }, {
                                default: withCtx(() => [
                                  createTextVNode("驳回")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "block" }, {
                                default: withCtx(() => [
                                  createTextVNode("拉黑（IP&域名）")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "unblock" }, {
                                default: withCtx(() => [
                                  createTextVNode("取消拉黑")
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
                    to: `/${preadmin.value}/selfreg/edit`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Button), { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`添加收录`);
                            } else {
                              return [
                                createTextVNode("添加收录")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Button), { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("添加收录")
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
                            createVNode(unref(MenuItem), { key: "menu" }, {
                              default: withCtx(() => [
                                createTextVNode("归类")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "in" }, {
                              default: withCtx(() => [
                                createTextVNode("收录")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "out" }, {
                              default: withCtx(() => [
                                createTextVNode("取消收录")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "refuse" }, {
                              default: withCtx(() => [
                                createTextVNode("驳回")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "block" }, {
                              default: withCtx(() => [
                                createTextVNode("拉黑（IP&域名）")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "unblock" }, {
                              default: withCtx(() => [
                                createTextVNode("取消拉黑")
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
                      to: `/${preadmin.value}/selfreg/edit`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Button), { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("添加收录")
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
                  _push3(ssrRenderComponent(unref(Select), {
                    value: searchState.status,
                    "onUpdate:value": ($event) => searchState.status = $event,
                    placeholder: "状态筛选",
                    style: { width: "160px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(mapStatus, (v, k) => {
                          _push4(ssrRenderComponent(unref(SelectOption), {
                            key: k,
                            value: k
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(v)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(v), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                            return createVNode(unref(SelectOption), {
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
                    createVNode(unref(Select), {
                      value: searchState.status,
                      "onUpdate:value": ($event) => searchState.status = $event,
                      placeholder: "状态筛选",
                      style: { width: "160px" }
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                          return createVNode(unref(SelectOption), {
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
                          createVNode(unref(MenuItem), { key: "menu" }, {
                            default: withCtx(() => [
                              createTextVNode("归类")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "in" }, {
                            default: withCtx(() => [
                              createTextVNode("收录")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "out" }, {
                            default: withCtx(() => [
                              createTextVNode("取消收录")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "refuse" }, {
                            default: withCtx(() => [
                              createTextVNode("驳回")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "block" }, {
                            default: withCtx(() => [
                              createTextVNode("拉黑（IP&域名）")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "unblock" }, {
                            default: withCtx(() => [
                              createTextVNode("取消拉黑")
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
                    to: `/${preadmin.value}/selfreg/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("添加收录")
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
                  createVNode(unref(Select), {
                    value: searchState.status,
                    "onUpdate:value": ($event) => searchState.status = $event,
                    placeholder: "状态筛选",
                    style: { width: "160px" }
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(mapStatus, (v, k) => {
                        return createVNode(unref(SelectOption), {
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
      _push(`<hr class="mt20 mb14">`);
      _push(ssrRenderComponent(unref(Alert), {
        message: "来源统计需安装并开启【自动收录】插件。此处来源量仅限对未收录链接进行统计，拉黑、驳回链接将不进行统计",
        class: "mb14",
        showIcon: "",
        type: "warning"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Table), {
        columns: [
          { title: "名称", dataIndex: "name", ellipsis: true },
          { title: "链接", dataIndex: "link", ellipsis: true },
          { title: "所属分类", dataIndex: "mid" },
          { title: "今日来源", dataIndex: "referrerTodayCount", sorter: true },
          { title: "昨日来源", dataIndex: "referrerYesterdayCount", sorter: true },
          { title: "前日来源", dataIndex: "referrerBeforeyesterdayCount", sorter: true },
          { title: "累计来源", dataIndex: "referrerTotal", sorter: true },
          { title: "来源码", dataIndex: "referrerCode" },
          { title: "收录时间", dataIndex: "inAt" },
          { title: "申请时间", dataIndex: "_id" },
          { title: "备注", dataIndex: "remark", ellipsis: true },
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
            if (column.dataIndex === "link") {
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
              _push2(`<!--[-->${ssrInterpolate(record.referrerCode || "")}<!--]-->`);
            } else if (column.dataIndex === "_id") {
              _push2(`<!--[-->${ssrInterpolate(unref(dateFromID)(record._id, "YYYY-MM-DD"))}<!--]-->`);
            } else if (column.dataIndex === "inAt") {
              _push2(`<!--[-->${ssrInterpolate(record.inAt ? unref(dateFormat)(record.inAt, "YYYY-MM-DD") : "-")}<!--]-->`);
            } else if (column.dataIndex === "remark") {
              _push2(ssrRenderComponent(unref(Tooltip), {
                title: record.remark
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(record.remark || "-")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(record.remark || "-"), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else if (column.dataIndex === "status") {
              _push2(ssrRenderComponent(unref(Tag), {
                bordered: false,
                color: mapStatusColor[record.status]
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
                      to: `/${preadmin.value}/selfreg/edit/${record._id}`
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
                      to: `/${preadmin.value}/stat/selfreg/${record._id}`
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), { size: "small" }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`报表`);
                              } else {
                                return [
                                  createTextVNode("报表")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Button), { size: "small" }, {
                              default: withCtx(() => [
                                createTextVNode("报表")
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
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "menu" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`归类`);
                                    } else {
                                      return [
                                        createTextVNode("归类")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "in" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`收录`);
                                    } else {
                                      return [
                                        createTextVNode("收录")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "out" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`取消收录`);
                                    } else {
                                      return [
                                        createTextVNode("取消收录")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "refuse" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`驳回`);
                                    } else {
                                      return [
                                        createTextVNode("驳回")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "block" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`拉黑（IP&amp;域名）`);
                                    } else {
                                      return [
                                        createTextVNode("拉黑（IP&域名）")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "unblock" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`取消拉黑`);
                                    } else {
                                      return [
                                        createTextVNode("取消拉黑")
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
                                  createVNode(unref(MenuItem), { key: "menu" }, {
                                    default: withCtx(() => [
                                      createTextVNode("归类")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "in" }, {
                                    default: withCtx(() => [
                                      createTextVNode("收录")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "out" }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消收录")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "refuse" }, {
                                    default: withCtx(() => [
                                      createTextVNode("驳回")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "block" }, {
                                    default: withCtx(() => [
                                      createTextVNode("拉黑（IP&域名）")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "unblock" }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消拉黑")
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
                                createVNode(unref(MenuItem), { key: "menu" }, {
                                  default: withCtx(() => [
                                    createTextVNode("归类")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "in" }, {
                                  default: withCtx(() => [
                                    createTextVNode("收录")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "out" }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消收录")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "refuse" }, {
                                  default: withCtx(() => [
                                    createTextVNode("驳回")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "block" }, {
                                  default: withCtx(() => [
                                    createTextVNode("拉黑（IP&域名）")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "unblock" }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消拉黑")
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
                        to: `/${preadmin.value}/selfreg/edit/${record._id}`
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
                        to: `/${preadmin.value}/stat/selfreg/${record._id}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Button), { size: "small" }, {
                            default: withCtx(() => [
                              createTextVNode("报表")
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
                              createVNode(unref(MenuItem), { key: "menu" }, {
                                default: withCtx(() => [
                                  createTextVNode("归类")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "in" }, {
                                default: withCtx(() => [
                                  createTextVNode("收录")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "out" }, {
                                default: withCtx(() => [
                                  createTextVNode("取消收录")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "refuse" }, {
                                default: withCtx(() => [
                                  createTextVNode("驳回")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "block" }, {
                                default: withCtx(() => [
                                  createTextVNode("拉黑（IP&域名）")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "unblock" }, {
                                default: withCtx(() => [
                                  createTextVNode("取消拉黑")
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
              column.dataIndex === "link" ? (openBlock(), createBlock("a", {
                key: 0,
                href: record.link,
                rel: "noreferrer",
                target: "_blank"
              }, toDisplayString(record.link), 9, ["href"])) : column.dataIndex === "mid" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(mapMenuName.value[record.mid] || "-"), 1)
              ], 64)) : column.dataIndex === "referrerTodayCount" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerTodayCount)), 1)
              ], 64)) : column.dataIndex === "referrerYesterdayCount" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerYesterdayCount)), 1)
              ], 64)) : column.dataIndex === "referrerBeforeyesterdayCount" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerBeforeyesterdayCount)), 1)
              ], 64)) : column.dataIndex === "referrerTotal" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                createTextVNode(toDisplayString(unref(numFormat)(record.referrerTotal + record.referrerTodayCount)), 1)
              ], 64)) : column.dataIndex === "referrerCode" ? (openBlock(), createBlock(Fragment, { key: 6 }, [
                createTextVNode(toDisplayString(record.referrerCode || ""), 1)
              ], 64)) : column.dataIndex === "_id" ? (openBlock(), createBlock(Fragment, { key: 7 }, [
                createTextVNode(toDisplayString(unref(dateFromID)(record._id, "YYYY-MM-DD")), 1)
              ], 64)) : column.dataIndex === "inAt" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                createTextVNode(toDisplayString(record.inAt ? unref(dateFormat)(record.inAt, "YYYY-MM-DD") : "-"), 1)
              ], 64)) : column.dataIndex === "remark" ? (openBlock(), createBlock(unref(Tooltip), {
                key: 9,
                title: record.remark
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(record.remark || "-"), 1)
                ]),
                _: 2
              }, 1032, ["title"])) : column.dataIndex === "status" ? (openBlock(), createBlock(unref(Tag), {
                key: 10,
                bordered: false,
                color: mapStatusColor[record.status]
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(mapStatus[record.status]), 1)
                ]),
                _: 2
              }, 1032, ["color"])) : column.dataIndex === "ctrl" ? (openBlock(), createBlock(unref(Space), { key: 11 }, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/selfreg/edit/${record._id}`
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
                    to: `/${preadmin.value}/stat/selfreg/${record._id}`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { size: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("报表")
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
                          createVNode(unref(MenuItem), { key: "menu" }, {
                            default: withCtx(() => [
                              createTextVNode("归类")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "in" }, {
                            default: withCtx(() => [
                              createTextVNode("收录")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "out" }, {
                            default: withCtx(() => [
                              createTextVNode("取消收录")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "refuse" }, {
                            default: withCtx(() => [
                              createTextVNode("驳回")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "block" }, {
                            default: withCtx(() => [
                              createTextVNode("拉黑（IP&域名）")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "unblock" }, {
                            default: withCtx(() => [
                              createTextVNode("取消拉黑")
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
        open: showRefuseModal.value,
        "onUpdate:open": ($event) => showRefuseModal.value = $event,
        title: "驳回理由",
        centered: "",
        confirmLoading: batchLoading.value,
        onOk: resfuseHandle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "refuseModalFormRef",
              ref: refuseModalFormRef,
              model: refuseForm,
              class: "mt20"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), { name: "remark" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          value: refuseForm.remark,
                          "onUpdate:value": ($event) => refuseForm.remark = $event,
                          placeholder: "请输入驳回理由"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            value: refuseForm.remark,
                            "onUpdate:value": ($event) => refuseForm.remark = $event,
                            placeholder: "请输入驳回理由"
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), { name: "remark" }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          value: refuseForm.remark,
                          "onUpdate:value": ($event) => refuseForm.remark = $event,
                          placeholder: "请输入驳回理由"
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
                ref_key: "refuseModalFormRef",
                ref: refuseModalFormRef,
                model: refuseForm,
                class: "mt20"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), { name: "remark" }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        value: refuseForm.remark,
                        "onUpdate:value": ($event) => refuseForm.remark = $event,
                        placeholder: "请输入驳回理由"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/selfreg/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
