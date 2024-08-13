import { computed, reactive, ref, onActivated, resolveComponent, resolveDirective, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Flex, Space, DropdownButton, Menu, MenuItem, Button, Select, SelectOption, Input, Table, Tooltip, Dropdown, message, Modal } from "ant-design-vue";
import { a as ad } from "./index-0psH9gUa.js";
import { b as dateFormat, d as dateFromID } from "./common-ZcIx5rAG.js";
import { u as useGLobalStore } from "../entry-server.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const searchState = reactive({
      keyword: "",
      status: null
    });
    const mapStatus = {
      on: "上线",
      off: "下线",
      auto: "自动"
    };
    const mapStatusColor = {
      on: "success",
      off: "error",
      auto: "info"
    };
    const mapPosition = {
      banner: "首页横幅"
    };
    const mapMode = {
      // cpa: '单次行为(注册、下载等)', 
      cpc: "单次点击",
      // cps: '单次销售', 
      cpt: "时长付费",
      cpm: "展示付费"
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
    const selectedRowKeys = ref([]);
    const batchLoading = ref(false);
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys;
    };
    const init = () => {
      pagination.current = 1;
      pagination.total = 0;
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
        if (searchState.status) {
          query.fieldby.push("status");
          query.field.push(searchState.status);
        }
        if (searchState.keyword) {
          query.keywordby = "name,link";
          query.keyword = searchState.keyword;
        }
        query.fieldby = query.fieldby.join(",");
        query.field = query.field.join(",");
        list.value = [];
        await ad.list({ query }).then((res) => {
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
            ad.del({ ids }).then(() => {
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
    const updateHandle = async (ids, body) => {
      const hide = message.loading();
      try {
        await ad.update({ ids, body }).then(() => {
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
    const onMoreOptions = async ({ key }, record) => {
      switch (key) {
        case "on":
          updateHandle([record._id], { status: "on" });
          break;
        case "off":
          updateHandle([record._id], { status: "off" });
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
        case "on":
          updateHandle(selectedRowKeys.value, { status: "on" });
          break;
        case "off":
          updateHandle(selectedRowKeys.value, { status: "off" });
          break;
      }
    };
    const onSearch = () => {
      fetchList();
    };
    const onReset = () => {
      searchState.keyword = "";
      searchState.status = null;
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
                  _push3(`广告管理`);
                } else {
                  return [
                    createTextVNode("广告管理")
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
                  createTextVNode("广告管理")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel pt20 pl20 pb20 pr20 mt14 ads-list-page">`);
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
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "on" }, {
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
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "off" }, {
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
                                createVNode(unref(MenuItem), { key: "on" }, {
                                  default: withCtx(() => [
                                    createTextVNode("上线")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "off" }, {
                                  default: withCtx(() => [
                                    createTextVNode("下线")
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
                              createVNode(unref(MenuItem), { key: "on" }, {
                                default: withCtx(() => [
                                  createTextVNode("上线")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "off" }, {
                                default: withCtx(() => [
                                  createTextVNode("下线")
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
                    to: `/${preadmin.value}/ads/edit`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Button), { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`添加广告`);
                            } else {
                              return [
                                createTextVNode("添加广告")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Button), { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("添加广告")
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
                            createVNode(unref(MenuItem), { key: "on" }, {
                              default: withCtx(() => [
                                createTextVNode("上线")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(MenuItem), { key: "off" }, {
                              default: withCtx(() => [
                                createTextVNode("下线")
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
                      to: `/${preadmin.value}/ads/edit`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Button), { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("添加广告")
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
                    value: searchState.status,
                    "onUpdate:value": ($event) => searchState.status = $event,
                    placeholder: "广告状态筛选",
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
                      value: searchState.status,
                      "onUpdate:value": ($event) => searchState.status = $event,
                      placeholder: "广告状态筛选",
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
                          createVNode(unref(MenuItem), { key: "on" }, {
                            default: withCtx(() => [
                              createTextVNode("上线")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "off" }, {
                            default: withCtx(() => [
                              createTextVNode("下线")
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
                    to: `/${preadmin.value}/ads/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("添加广告")
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
                    value: searchState.status,
                    "onUpdate:value": ($event) => searchState.status = $event,
                    placeholder: "广告状态筛选",
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
      _push(`<hr class="mt20 mb20">`);
      _push(ssrRenderComponent(unref(Table), {
        columns: [
          { title: "广告图", dataIndex: "imgurl", align: "center", width: 80 },
          { title: "名称", dataIndex: "name", ellipsis: true },
          { title: "链接", dataIndex: "link", ellipsis: true },
          { title: "广告位", dataIndex: "position" },
          { title: "广告文案", dataIndex: "text", ellipsis: true, width: 210 },
          { title: "付费模式", dataIndex: "mode" },
          { title: "预付款", dataIndex: "prepay" },
          { title: "单价", dataIndex: "price" },
          { title: "上线时间", dataIndex: "startTime", width: 150 },
          { title: "下线时间", dataIndex: "offTime", width: 150 },
          { title: "添加时间", dataIndex: "_id", width: 140 },
          { title: "状态", dataIndex: "status", align: "center", fixed: "right", width: 80 },
          { title: "操作", dataIndex: "ctrl", align: "right", fixed: "right", width: 210 }
        ],
        "data-source": list.value,
        size: "small",
        loading: loading.value,
        pagination,
        "row-selection": { selectedRowKeys: selectedRowKeys.value, onChange: onSelectChange },
        rowKey: "_id",
        scroll: { x: 1800 },
        onChange: onTableChange
      }, {
        bodyCell: withCtx(({ column, record }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (column.dataIndex === "imgurl") {
              _push2(`<div class="f ac jc"${_scopeId}>`);
              if (record.imgurl) {
                _push2(`<div class="poster"${_scopeId}><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, `${record.imgurl}?0x30`))}${_scopeId}></div>`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`</div>`);
            } else if (column.dataIndex === "link") {
              _push2(`<a${ssrRenderAttr("href", record.link)} rel="noreferrer" target="_blank"${_scopeId}>${ssrInterpolate(record.link)}</a>`);
            } else if (column.dataIndex === "position") {
              _push2(`<!--[-->${ssrInterpolate(mapPosition[record.position] || "-")}<!--]-->`);
            } else if (column.dataIndex === "text") {
              _push2(ssrRenderComponent(unref(Tooltip), {
                title: record.text
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(record.text || "-")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(record.text || "-"), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else if (column.dataIndex === "mode") {
              _push2(`<!--[-->${ssrInterpolate(mapMode[record.mode] || "-")}<!--]-->`);
            } else if (column.dataIndex === "prepay") {
              _push2(`<!--[-->${ssrInterpolate(record.prepay || 0)}<!--]-->`);
            } else if (column.dataIndex === "price") {
              _push2(`<!--[-->${ssrInterpolate(record.price || 0)}<!--]-->`);
            } else if (column.dataIndex === "startTime") {
              _push2(`<!--[-->${ssrInterpolate(record.startTime ? unref(dateFormat)(record.startTime, "YYYY-MM-DD hh:mm:ss") : "-")}<!--]-->`);
            } else if (column.dataIndex === "offTime") {
              _push2(`<!--[-->${ssrInterpolate(record.offTime ? unref(dateFormat)(record.offTime, "YYYY-MM-DD hh:mm:ss") : "-")}<!--]-->`);
            } else if (column.dataIndex === "_id") {
              _push2(`<!--[-->${ssrInterpolate(unref(dateFromID)(record._id, "YYYY-MM-DD hh:mm"))}<!--]-->`);
            } else if (column.dataIndex === "status") {
              _push2(`<span class="${ssrRenderClass([`sugar-${mapStatusColor[record.status]}`])}"${_scopeId}>${ssrInterpolate(mapStatus[record.status])}</span>`);
            } else if (column.dataIndex === "ctrl") {
              _push2(ssrRenderComponent(unref(Space), null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_RouterLink, {
                      to: `/${preadmin.value}/ads/edit/${record._id}`
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
                    _push3(ssrRenderComponent(unref(Dropdown), null, {
                      overlay: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Menu), {
                            onClick: (e) => onMoreOptions(e, record)
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "on" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`上线`);
                                    } else {
                                      return [
                                        createTextVNode("上线")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "off" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`下线`);
                                    } else {
                                      return [
                                        createTextVNode("下线")
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
                                  createVNode(unref(MenuItem), { key: "on" }, {
                                    default: withCtx(() => [
                                      createTextVNode("上线")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "off" }, {
                                    default: withCtx(() => [
                                      createTextVNode("下线")
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
                                createVNode(unref(MenuItem), { key: "on" }, {
                                  default: withCtx(() => [
                                    createTextVNode("上线")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "off" }, {
                                  default: withCtx(() => [
                                    createTextVNode("下线")
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
                        to: `/${preadmin.value}/ads/edit/${record._id}`
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
                      createVNode(unref(Dropdown), null, {
                        overlay: withCtx(() => [
                          createVNode(unref(Menu), {
                            onClick: (e) => onMoreOptions(e, record)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MenuItem), { key: "on" }, {
                                default: withCtx(() => [
                                  createTextVNode("上线")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "off" }, {
                                default: withCtx(() => [
                                  createTextVNode("下线")
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
              column.dataIndex === "imgurl" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f ac jc"
              }, [
                record.imgurl ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "poster"
                }, [
                  withDirectives(createVNode("img", null, null, 512), [
                    [_directive_depic, `${record.imgurl}?0x30`]
                  ])
                ])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
              ])) : column.dataIndex === "link" ? (openBlock(), createBlock("a", {
                key: 1,
                href: record.link,
                rel: "noreferrer",
                target: "_blank"
              }, toDisplayString(record.link), 9, ["href"])) : column.dataIndex === "position" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                createTextVNode(toDisplayString(mapPosition[record.position] || "-"), 1)
              ], 64)) : column.dataIndex === "text" ? (openBlock(), createBlock(unref(Tooltip), {
                key: 3,
                title: record.text
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(record.text || "-"), 1)
                ]),
                _: 2
              }, 1032, ["title"])) : column.dataIndex === "mode" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                createTextVNode(toDisplayString(mapMode[record.mode] || "-"), 1)
              ], 64)) : column.dataIndex === "prepay" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                createTextVNode(toDisplayString(record.prepay || 0), 1)
              ], 64)) : column.dataIndex === "price" ? (openBlock(), createBlock(Fragment, { key: 6 }, [
                createTextVNode(toDisplayString(record.price || 0), 1)
              ], 64)) : column.dataIndex === "startTime" ? (openBlock(), createBlock(Fragment, { key: 7 }, [
                createTextVNode(toDisplayString(record.startTime ? unref(dateFormat)(record.startTime, "YYYY-MM-DD hh:mm:ss") : "-"), 1)
              ], 64)) : column.dataIndex === "offTime" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                createTextVNode(toDisplayString(record.offTime ? unref(dateFormat)(record.offTime, "YYYY-MM-DD hh:mm:ss") : "-"), 1)
              ], 64)) : column.dataIndex === "_id" ? (openBlock(), createBlock(Fragment, { key: 9 }, [
                createTextVNode(toDisplayString(unref(dateFromID)(record._id, "YYYY-MM-DD hh:mm")), 1)
              ], 64)) : column.dataIndex === "status" ? (openBlock(), createBlock("span", {
                key: 10,
                class: [`sugar-${mapStatusColor[record.status]}`]
              }, toDisplayString(mapStatus[record.status]), 3)) : column.dataIndex === "ctrl" ? (openBlock(), createBlock(unref(Space), { key: 11 }, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/ads/edit/${record._id}`
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
                  createVNode(unref(Dropdown), null, {
                    overlay: withCtx(() => [
                      createVNode(unref(Menu), {
                        onClick: (e) => onMoreOptions(e, record)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(MenuItem), { key: "on" }, {
                            default: withCtx(() => [
                              createTextVNode("上线")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "off" }, {
                            default: withCtx(() => [
                              createTextVNode("下线")
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
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/ads/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
