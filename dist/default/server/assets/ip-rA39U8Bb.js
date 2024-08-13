import { ref, reactive, provide, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Flex, Space, DropdownButton, Menu, MenuItem, Button, Input, Alert, Table, TableColumn, Modal, message } from "ant-design-vue";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./editModal-b6k-tF7H.js";
import { b as blockIps } from "./index-0psH9gUa.js";
import { d as dateFromID } from "./common-ZcIx5rAG.js";
import dayjs from "dayjs";
import "../entry-server.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "ip",
  __ssrInlineRender: true,
  setup(__props) {
    const batchLoading = ref(false);
    const tableLoading = ref(false);
    const searchState = reactive({
      keyword: ""
    });
    const selectedRowKeys = ref([]);
    const list = ref([]);
    const pagination = reactive({
      current: 1,
      pageSize: 20,
      pageSizeOptions: [20, 50, 200, 500],
      total: 0,
      showQuickJumper: true,
      position: ["bottomCenter"]
    });
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const editIDs = ref([]);
    const editState = ref({});
    const mapTypes = {
      all: "所有",
      selfreg: "自助收录",
      comment: "评论",
      user: "用户"
    };
    provide("mapTypes", mapTypes);
    const initEditModalState = (record) => {
      editState.value = record || {};
    };
    const fetchList = async () => {
      try {
        tableLoading.value = true;
        const query = {
          current: pagination.current,
          pageSize: pagination.pageSize,
          fieldby: [],
          field: []
        };
        if (searchState.keyword) {
          query.keywordby = "ip";
          query.keyword = searchState.keyword;
        }
        query.fieldby = query.fieldby.join(",");
        query.field = query.field.join(",");
        list.value = [];
        await blockIps.list({ query }).then((res) => {
          list.value = res.list || [];
          pagination.total = res.total;
        });
      } finally {
        tableLoading.value = false;
      }
    };
    const delHandle = async (ids) => {
      Modal.confirm({
        title: "确认移除？",
        content: "移除对象将从IP黑名单中剔除",
        centered: true,
        onOk: async () => {
          return new Promise((resolve, reject) => {
            blockIps.del({ ids }).then(() => {
              message.success("移除成功");
              fetchList();
              resolve();
            }).catch((e) => {
              console.error(e);
              message.error(e.message || "移除失败");
              reject();
            });
          });
        }
      });
    };
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys;
    };
    const onBatchOptions = async ({ key }) => {
      if (!selectedRowKeys.value.length && key !== "import")
        return message.error("未选中目标");
      switch (key) {
        case "remove":
          await delHandle(selectedRowKeys.value);
          break;
        case "set":
          initEditModalState();
          editIDs.value = selectedRowKeys.value;
          showEditModal.value = true;
          break;
      }
    };
    const onSearch = () => {
      pagination.current = 1;
      fetchList();
    };
    const onReset = () => {
      searchState.keyword = "";
      pagination.current = 1;
      fetchList();
    };
    const onTableChange = (paginate, filters) => {
      pagination.current = paginate.current;
      pagination.pageSize = paginate.pageSize;
      fetchList();
    };
    const onSetIps = (record) => {
      initEditModalState(record);
      editIDs.value = [record._id];
      showEditModal.value = true;
    };
    onMounted(() => {
      fetchList();
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
                    to: `/${_ctx.preadmin}`
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
                      to: `/${_ctx.preadmin}`
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
                  _push3(`IP黑名单`);
                } else {
                  return [
                    createTextVNode("IP黑名单")
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
                    to: `/${_ctx.preadmin}`
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
                  createTextVNode("IP黑名单")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel pt20 pl20 pb20 pr20 mt14 security-page">`);
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
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "set" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`设置`);
                                  } else {
                                    return [
                                      createTextVNode("设置")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "remove" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`移除黑名单`);
                                  } else {
                                    return [
                                      createTextVNode("移除黑名单")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(MenuItem), { key: "set" }, {
                                  default: withCtx(() => [
                                    createTextVNode("设置")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "remove" }, {
                                  default: withCtx(() => [
                                    createTextVNode("移除黑名单")
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
                              createVNode(unref(MenuItem), { key: "set" }, {
                                default: withCtx(() => [
                                  createTextVNode("设置")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "remove" }, {
                                default: withCtx(() => [
                                  createTextVNode("移除黑名单")
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
                  _push3(ssrRenderComponent(unref(Button), {
                    type: "primary",
                    onClick: () => showAddModal.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`添加黑名单`);
                      } else {
                        return [
                          createTextVNode("添加黑名单")
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
                            createVNode(unref(MenuItem), { key: "set" }, {
                              default: withCtx(() => [
                                createTextVNode("设置")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "remove" }, {
                              default: withCtx(() => [
                                createTextVNode("移除黑名单")
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
                    createVNode(unref(Button), {
                      type: "primary",
                      onClick: () => showAddModal.value = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("添加黑名单")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Space), { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "请输入IP地址"
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
                    createVNode(unref(Input), {
                      value: searchState.keyword,
                      "onUpdate:value": ($event) => searchState.keyword = $event,
                      placeholder: "请输入IP地址"
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
                          createVNode(unref(MenuItem), { key: "set" }, {
                            default: withCtx(() => [
                              createTextVNode("设置")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "remove" }, {
                            default: withCtx(() => [
                              createTextVNode("移除黑名单")
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
                  createVNode(unref(Button), {
                    type: "primary",
                    onClick: () => showAddModal.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("添加黑名单")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(unref(Space), { wrap: "" }, {
                default: withCtx(() => [
                  createVNode(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "请输入IP地址"
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
      _push(`<hr class="mt20 mb20">`);
      _push(ssrRenderComponent(unref(Alert), {
        type: "warning",
        message: "以下黑名单均对所有站点生效",
        showIcon: "",
        class: "mb12"
      }, null, _parent));
      _push(ssrRenderComponent(unref(Table), {
        "data-source": list.value,
        size: "small",
        loading: tableLoading.value,
        pagination,
        "row-selection": { selectedRowKeys: selectedRowKeys.value, onChange: onSelectChange },
        rowKey: "_id",
        onChange: onTableChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "IP",
              dataIndex: "ip"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "类型",
              dataIndex: "type"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(mapTypes[record.type])}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(mapTypes[record.type]), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "拉黑时间",
              dataIndex: "_id"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(dateFromID)(record._id))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(dateFromID)(record._id)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "自动移除时间",
              dataIndex: "_id"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (record.expireTime) {
                    _push3(`<!--[-->${ssrInterpolate(unref(dayjs)(record.expireTime).format("YYYY-MM-DD"))}<!--]-->`);
                  } else {
                    _push3(`<!--[-->持久拉黑<!--]-->`);
                  }
                } else {
                  return [
                    record.expireTime ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(unref(dayjs)(record.expireTime).format("YYYY-MM-DD")), 1)
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode("持久拉黑")
                    ], 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "操作",
              align: "right"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Space), null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Button), {
                          size: "small",
                          type: "primary",
                          onClick: ($event) => onSetIps(record)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`设置`);
                            } else {
                              return [
                                createTextVNode("设置")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(Button), {
                          size: "small",
                          danger: "",
                          onClick: ($event) => delHandle([record._id])
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`移除`);
                            } else {
                              return [
                                createTextVNode("移除")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Button), {
                            size: "small",
                            type: "primary",
                            onClick: ($event) => onSetIps(record)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("设置")
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(unref(Button), {
                            size: "small",
                            danger: "",
                            onClick: ($event) => delHandle([record._id])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("移除")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Space), null, {
                      default: withCtx(() => [
                        createVNode(unref(Button), {
                          size: "small",
                          type: "primary",
                          onClick: ($event) => onSetIps(record)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("设置")
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(unref(Button), {
                          size: "small",
                          danger: "",
                          onClick: ($event) => delHandle([record._id])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("移除")
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TableColumn), {
                title: "IP",
                dataIndex: "ip"
              }),
              createVNode(unref(TableColumn), {
                title: "类型",
                dataIndex: "type"
              }, {
                default: withCtx(({ record }) => [
                  createTextVNode(toDisplayString(mapTypes[record.type]), 1)
                ]),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "拉黑时间",
                dataIndex: "_id"
              }, {
                default: withCtx(({ record }) => [
                  createTextVNode(toDisplayString(unref(dateFromID)(record._id)), 1)
                ]),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "自动移除时间",
                dataIndex: "_id"
              }, {
                default: withCtx(({ record }) => [
                  record.expireTime ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createTextVNode(toDisplayString(unref(dayjs)(record.expireTime).format("YYYY-MM-DD")), 1)
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode("持久拉黑")
                  ], 64))
                ]),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "操作",
                align: "right"
              }, {
                default: withCtx(({ record }) => [
                  createVNode(unref(Space), null, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        size: "small",
                        type: "primary",
                        onClick: ($event) => onSetIps(record)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("设置")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      createVNode(unref(Button), {
                        size: "small",
                        danger: "",
                        onClick: ($event) => delHandle([record._id])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("移除")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showAddModal.value,
        "onUpdate:show": ($event) => showAddModal.value = $event,
        title: "添加IP黑名单",
        onSuccess: fetchList
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        show: showEditModal.value,
        "onUpdate:show": ($event) => showEditModal.value = $event,
        ids: editIDs.value,
        data: editState.value,
        title: "设置IP黑名单",
        onSuccess: fetchList
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/security/ip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
