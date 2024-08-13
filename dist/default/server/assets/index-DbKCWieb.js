import { computed, reactive, ref, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext, toRaw } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { message, Breadcrumb, BreadcrumbItem, Space, Select, SelectOption, Input, Button, Table, TableColumn, Modal } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./admin-form-action-bar-fhn4ltpr.js";
import { m as menu } from "./index-0psH9gUa.js";
import { r as request, u as useGLobalStore } from "../entry-server.js";
import { q as query2str, n as numFormat, t as toTree } from "./common-ZcIx5rAG.js";
import { useDebounceFn } from "@vueuse/core";
import { g as getDurationUnix } from "./dayjs-Cgr4VyVN.js";
import { useRoute } from "vue-router";
import "node:path";
import "pinia";
import "crypto-js";
import "dayjs";
const getNavReport = (query = {}, options = {}) => {
  return request(`/api/v1/admin/stats/nav?${query2str(query)}`, options);
};
const syncNavReport = (body = {}) => {
  return request(`/api/v1/admin/stats/nav`, {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const reportDate = {
  "day": "今日",
  "yesterday": "昨日",
  "beforeyesterday": "前日",
  "3d": "近3日",
  "7d": "近7日",
  "week": "本周",
  "lastweek": "上周",
  "30d": "近30日",
  "month": "本月",
  "lastmonth": "上月"
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const showBack = computed(() => Boolean(route.params.code));
    const searchState = reactive({
      date: "yesterday",
      keyword: route.params.code || "",
      ...getDurationUnix("yesterday")
    });
    const tableLoading = ref(false);
    const list = ref([]);
    const menu$1 = ref([]);
    const mapMenuName = ref({});
    const pagination = reactive({
      current: 1,
      pageSize: 20,
      pageSizeOptions: [20, 50, 200, 500],
      total: 0,
      showQuickJumper: true,
      position: ["bottomCenter"]
    });
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
    const fetchReport = async () => {
      try {
        tableLoading.value = true;
        await getNavReport({
          current: pagination.current,
          pageSize: pagination.pageSize,
          ...toRaw(searchState)
        }).then((res) => {
          list.value = res.list || [];
          pagination.total = res.total;
        });
      } finally {
        tableLoading.value = false;
      }
    };
    const onSearch = useDebounceFn(async () => {
      fetchReport();
    }, 200, { leading: false });
    const onDateChange = () => {
      const { startAt, endAt } = getDurationUnix(searchState.date);
      searchState.startAt = startAt;
      searchState.endAt = endAt;
      fetchReport();
    };
    const onReset = () => {
      searchState.keyword = "";
      searchState.mid = null;
      searchState.date = "yesterday";
      pagination.current = 1;
      pagination.total = 0;
      list.value = [];
      onDateChange();
      fetchReport();
    };
    const showSyncModal = ref(false);
    const syncLoading = ref(false);
    const syncDateKey = ref("day");
    const onSync = useDebounceFn(async () => {
      try {
        syncLoading.value = true;
        const { startAt, endAt } = getDurationUnix(syncDateKey.value);
        await syncNavReport({ startAt, endAt }).then((res) => {
          const syncRowCount = Object.keys(res.result).length;
          message.success(`同步完成，已同步${syncRowCount}条数据`);
          if (syncRowCount)
            fetchReport();
          showSyncModal.value = false;
        });
      } finally {
        syncLoading.value = false;
      }
    }, 500, { leading: false });
    onMounted(() => {
      fetchMenu();
      fetchReport();
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
                  _push3(`统计报表`);
                } else {
                  return [
                    createTextVNode("统计报表")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`链接报表`);
                } else {
                  return [
                    createTextVNode("链接报表")
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
                  createTextVNode("统计报表")
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("链接报表")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt14",
        showBack: showBack.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Space), { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Select), {
                    value: searchState.date,
                    "onUpdate:value": ($event) => searchState.date = $event,
                    placeholder: "请选择日期",
                    style: { width: "120px" },
                    onChange: onDateChange
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(reportDate), (v, k) => {
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(reportDate), (v, k) => {
                            return openBlock(), createBlock(unref(SelectOption), {
                              key: k,
                              value: k
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v), 1)
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
                    placeholder: "来源码",
                    allowClear: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Button), {
                    type: "primary",
                    onClick: unref(onSearch)
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
                  _push3(ssrRenderComponent(unref(Button), {
                    loading: syncLoading.value,
                    onClick: () => showSyncModal.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`日报同步`);
                      } else {
                        return [
                          createTextVNode("日报同步")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Select), {
                      value: searchState.date,
                      "onUpdate:value": ($event) => searchState.date = $event,
                      placeholder: "请选择日期",
                      style: { width: "120px" },
                      onChange: onDateChange
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(reportDate), (v, k) => {
                          return openBlock(), createBlock(unref(SelectOption), {
                            key: k,
                            value: k
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(v), 1)
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
                      placeholder: "来源码",
                      allowClear: ""
                    }, null, 8, ["value", "onUpdate:value"]),
                    createVNode(unref(Button), {
                      type: "primary",
                      onClick: unref(onSearch)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("搜索")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(unref(Button), { onClick: onReset }, {
                      default: withCtx(() => [
                        createTextVNode("重置")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Button), {
                      loading: syncLoading.value,
                      onClick: () => showSyncModal.value = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("日报同步")
                      ]),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Space), { wrap: "" }, {
                default: withCtx(() => [
                  createVNode(unref(Select), {
                    value: searchState.date,
                    "onUpdate:value": ($event) => searchState.date = $event,
                    placeholder: "请选择日期",
                    style: { width: "120px" },
                    onChange: onDateChange
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(reportDate), (v, k) => {
                        return openBlock(), createBlock(unref(SelectOption), {
                          key: k,
                          value: k
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(v), 1)
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
                    placeholder: "来源码",
                    allowClear: ""
                  }, null, 8, ["value", "onUpdate:value"]),
                  createVNode(unref(Button), {
                    type: "primary",
                    onClick: unref(onSearch)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("搜索")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(unref(Button), { onClick: onReset }, {
                    default: withCtx(() => [
                      createTextVNode("重置")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Button), {
                    loading: syncLoading.value,
                    onClick: () => showSyncModal.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("日报同步")
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
      }, _parent));
      _push(`<div class="pannel pt20 pl20 pb20 pr20 admin-stat-page">`);
      _push(ssrRenderComponent(unref(Table), {
        "data-source": list.value,
        class: "table-striped",
        size: "small",
        loading: tableLoading.value,
        pagination,
        rowKey: "_id",
        onChange: fetchReport
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "链接名称",
              dataIndex: "name"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`${ssrInterpolate(((_a = record.nav[0]) == null ? void 0 : _a.name) || "-")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(((_b = record.nav[0]) == null ? void 0 : _b.name) || "-"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "链接",
              dataIndex: "link"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`${ssrInterpolate(((_a = record.nav[0]) == null ? void 0 : _a.link) || "")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(((_b = record.nav[0]) == null ? void 0 : _b.link) || ""), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "来源码",
              dataIndex: "_id"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "来源UV",
              dataIndex: "uvCount"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "来源PV",
              dataIndex: "pvCount"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(numFormat)(record.pvCount))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(numFormat)(record.pvCount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "曝光量",
              dataIndex: "exposureCount"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(numFormat)(record.exposureCount))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(numFormat)(record.exposureCount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "点击量",
              dataIndex: "clickCount"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "点击率",
              dataIndex: "clickRate"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(record.exposureCount > 0 ? Math.round(record.clickCount / record.exposureCount * 1e4) / 100 : 0)}%`);
                } else {
                  return [
                    createTextVNode(toDisplayString(record.exposureCount > 0 ? Math.round(record.clickCount / record.exposureCount * 1e4) / 100 : 0) + "%", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TableColumn), {
              title: "所属分类",
              dataIndex: "mid"
            }, {
              default: withCtx(({ record }, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`${ssrInterpolate(mapMenuName.value[(_a = record.nav[0]) == null ? void 0 : _a.mid] || "")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(mapMenuName.value[(_b = record.nav[0]) == null ? void 0 : _b.mid] || ""), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TableColumn), {
                title: "链接名称",
                dataIndex: "name"
              }, {
                default: withCtx(({ record }) => {
                  var _a;
                  return [
                    createTextVNode(toDisplayString(((_a = record.nav[0]) == null ? void 0 : _a.name) || "-"), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "链接",
                dataIndex: "link"
              }, {
                default: withCtx(({ record }) => {
                  var _a;
                  return [
                    createTextVNode(toDisplayString(((_a = record.nav[0]) == null ? void 0 : _a.link) || ""), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "来源码",
                dataIndex: "_id"
              }),
              createVNode(unref(TableColumn), {
                title: "来源UV",
                dataIndex: "uvCount"
              }),
              createVNode(unref(TableColumn), {
                title: "来源PV",
                dataIndex: "pvCount"
              }, {
                default: withCtx(({ record }) => [
                  createTextVNode(toDisplayString(unref(numFormat)(record.pvCount)), 1)
                ]),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "曝光量",
                dataIndex: "exposureCount"
              }, {
                default: withCtx(({ record }) => [
                  createTextVNode(toDisplayString(unref(numFormat)(record.exposureCount)), 1)
                ]),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "点击量",
                dataIndex: "clickCount"
              }),
              createVNode(unref(TableColumn), {
                title: "点击率",
                dataIndex: "clickRate"
              }, {
                default: withCtx(({ record }) => [
                  createTextVNode(toDisplayString(record.exposureCount > 0 ? Math.round(record.clickCount / record.exposureCount * 1e4) / 100 : 0) + "%", 1)
                ]),
                _: 1
              }),
              createVNode(unref(TableColumn), {
                title: "所属分类",
                dataIndex: "mid"
              }, {
                default: withCtx(({ record }) => {
                  var _a;
                  return [
                    createTextVNode(toDisplayString(mapMenuName.value[(_a = record.nav[0]) == null ? void 0 : _a.mid] || ""), 1)
                  ];
                }),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Modal), {
        open: showSyncModal.value,
        "onUpdate:open": ($event) => showSyncModal.value = $event,
        class: "modal-centered",
        width: 400,
        centered: "",
        title: "请选择日报同步时间",
        "ok-button-props": { loading: syncLoading.value },
        onOk: unref(onSync)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="f fc jc ac pt20 pb20"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Select), {
              value: syncDateKey.value,
              "onUpdate:value": ($event) => syncDateKey.value = $event,
              style: { width: "260px" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectOption), { value: "day" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`今日`);
                      } else {
                        return [
                          createTextVNode("今日")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(SelectOption), { value: "yesterday" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`昨日`);
                      } else {
                        return [
                          createTextVNode("昨日")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(SelectOption), { value: "beforeyesterday" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`前日`);
                      } else {
                        return [
                          createTextVNode("前日")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectOption), { value: "day" }, {
                      default: withCtx(() => [
                        createTextVNode("今日")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(SelectOption), { value: "yesterday" }, {
                      default: withCtx(() => [
                        createTextVNode("昨日")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(SelectOption), { value: "beforeyesterday" }, {
                      default: withCtx(() => [
                        createTextVNode("前日")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "f fc jc ac pt20 pb20" }, [
                createVNode(unref(Select), {
                  value: syncDateKey.value,
                  "onUpdate:value": ($event) => syncDateKey.value = $event,
                  style: { width: "260px" }
                }, {
                  default: withCtx(() => [
                    createVNode(unref(SelectOption), { value: "day" }, {
                      default: withCtx(() => [
                        createTextVNode("今日")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(SelectOption), { value: "yesterday" }, {
                      default: withCtx(() => [
                        createTextVNode("昨日")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(SelectOption), { value: "beforeyesterday" }, {
                      default: withCtx(() => [
                        createTextVNode("前日")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["value", "onUpdate:value"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/stat/nav/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
