import { computed, ref, provide, watch, onMounted, resolveComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Tabs, TabPane, Flex, Select, SelectOption, Button, Table, Space, Popconfirm, message } from "ant-design-vue";
import { _ as _sfc_main$1 } from "./edit-GdJ21eH7.js";
import { u as useGLobalStore } from "../entry-server.js";
import { t as toTree } from "./common-ZcIx5rAG.js";
import { useRoute } from "vue-router";
import { m as menu } from "./index-0psH9gUa.js";
import "node:path";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const menuType = ref("main");
    const subTypes = ref([]);
    const editForm = ref({});
    const showEditModal = ref(false);
    const editType = ref("add");
    const menuList = ref([]);
    ref(null);
    const mapCategories = ref({});
    const categories = ref([]);
    const loading = ref(false);
    const mapSubType = {
      nav: "导航",
      post: "文章",
      app: "APP",
      link: "URL",
      ad: "广告横幅"
    };
    const mapSubTypeColor = {
      nav: "grey",
      post: "grey",
      link: "success",
      ad: "primary",
      app: "grey"
    };
    provide("mapSubType", mapSubType);
    const fetchMenuList = async (_menuType) => {
      loading.value = true;
      const sql = {
        sortby: "sort",
        fieldby: "type",
        field: _menuType || menuType.value,
        pageSize: 1e3
      };
      if (subTypes.value.length) {
        sql.fieldby += ",subType";
        sql.field += `,in:${subTypes.value.join("|")}`;
      }
      await menu.list({ query: sql }).then((res) => {
        var _a;
        if (_menuType === "category") {
          (_a = res.list) == null ? void 0 : _a.forEach((v) => {
            mapCategories.value[v._id] = v;
          });
          categories.value = toTree({ data: res.list });
        } else {
          menuList.value = toTree({ data: res.list });
        }
      });
      loading.value = false;
    };
    watch(menuType, (type) => {
      fetchMenuList();
    });
    const onAdd = () => {
      editType.value = "add";
      editForm.value = {};
      showEditModal.value = true;
    };
    const onEdit = (record) => {
      editType.value = "edit";
      editForm.value = record;
      showEditModal.value = true;
    };
    const onDel = async (record) => {
      try {
        record.loading = true;
        await menu.del({
          id: record._id
        }).then(() => {
          message.success("删除成功");
          fetchMenuList();
        });
      } finally {
        record.loading = false;
      }
    };
    const onSubtypeChange = () => {
      fetchMenuList();
    };
    onMounted(() => {
      if (route.query.type) {
        menuType.value = route.query.type || "main";
      } else {
        fetchMenuList();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<!--[--><div class="menu-page">`);
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
                  _push3(`菜单分类`);
                } else {
                  return [
                    createTextVNode("菜单分类")
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
                  createTextVNode("菜单分类")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel mt14">`);
      _push(ssrRenderComponent(unref(Tabs), {
        activeKey: menuType.value,
        "onUpdate:activeKey": ($event) => menuType.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabPane), {
              key: "main",
              tab: "导航分类"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TabPane), {
                key: "main",
                tab: "导航分类"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="f jc tab-panne"><div class="max">`);
      _push(ssrRenderComponent(unref(Flex), {
        gap: "10",
        justify: "space-between",
        class: "mb14"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Select), {
              value: subTypes.value,
              "onUpdate:value": ($event) => subTypes.value = $event,
              mode: "multiple",
              placeholder: "请选择菜单类型",
              style: { width: "360px" },
              onChange: onSubtypeChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(mapSubType, (v, k) => {
                    _push3(ssrRenderComponent(unref(SelectOption), { value: k }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(v)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(v), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(mapSubType, (v, k) => {
                      return createVNode(unref(SelectOption), { value: k }, {
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Button), {
              type: "primary",
              onClick: onAdd
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加菜单`);
                } else {
                  return [
                    createTextVNode("添加菜单")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Select), {
                value: subTypes.value,
                "onUpdate:value": ($event) => subTypes.value = $event,
                mode: "multiple",
                placeholder: "请选择菜单类型",
                style: { width: "360px" },
                onChange: onSubtypeChange
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(mapSubType, (v, k) => {
                    return createVNode(unref(SelectOption), { value: k }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(v), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              }, 8, ["value", "onUpdate:value"]),
              createVNode(unref(Button), {
                type: "primary",
                onClick: onAdd
              }, {
                default: withCtx(() => [
                  createTextVNode("添加菜单")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Table), {
        columns: [
          { title: "名称", dataIndex: "name", width: 180 },
          { title: "类型", dataIndex: "subType", width: 140 },
          { title: "链接", dataIndex: "link", ellipsis: true },
          { title: "操作", dataIndex: "ctrl", align: "right" }
        ],
        "data-source": menuList.value,
        rowKey: "_id",
        size: "small",
        loading: loading.value,
        pagination: false
      }, {
        bodyCell: withCtx(({ column, record }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (column.dataIndex === "name") {
              _push2(`<div class="f ac nowrap"${_scopeId}><span${_scopeId}>${ssrInterpolate(record.name)}</span>`);
              if (record.alias) {
                _push2(`<span class="fs12 txt-grey ml6"${_scopeId}>${ssrInterpolate(record.alias)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (column.dataIndex === "subType") {
              _push2(`<span class="${ssrRenderClass(`sugar-${mapSubTypeColor[record.subType]}`)}"${_scopeId}>${ssrInterpolate(mapSubType[record.subType])}</span>`);
            } else if (column.dataIndex === "ctrl") {
              _push2(ssrRenderComponent(unref(Space), null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Button), {
                      type: "primary",
                      size: "small",
                      onClick: ($event) => onEdit(record)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`编辑`);
                        } else {
                          return [
                            createTextVNode("编辑")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Popconfirm), {
                      title: "确认删除？",
                      okText: "删除",
                      cancelText: "取消",
                      "ok-button-props": { loading: record.loading },
                      onConfirm: ($event) => onDel(record)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), {
                            size: "small",
                            loading: record.loading
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`删除`);
                              } else {
                                return [
                                  createTextVNode("删除")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Button), {
                              size: "small",
                              loading: record.loading
                            }, {
                              default: withCtx(() => [
                                createTextVNode("删除")
                              ]),
                              _: 2
                            }, 1032, ["loading"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Button), {
                        type: "primary",
                        size: "small",
                        onClick: ($event) => onEdit(record)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("编辑")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      createVNode(unref(Popconfirm), {
                        title: "确认删除？",
                        okText: "删除",
                        cancelText: "取消",
                        "ok-button-props": { loading: record.loading },
                        onConfirm: ($event) => onDel(record)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Button), {
                            size: "small",
                            loading: record.loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
                            ]),
                            _: 2
                          }, 1032, ["loading"])
                        ]),
                        _: 2
                      }, 1032, ["ok-button-props", "onConfirm"])
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
              column.dataIndex === "name" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f ac nowrap"
              }, [
                createVNode("span", null, toDisplayString(record.name), 1),
                record.alias ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "fs12 txt-grey ml6"
                }, toDisplayString(record.alias), 1)) : createCommentVNode("", true)
              ])) : column.dataIndex === "subType" ? (openBlock(), createBlock("span", {
                key: 1,
                class: `sugar-${mapSubTypeColor[record.subType]}`
              }, toDisplayString(mapSubType[record.subType]), 3)) : column.dataIndex === "ctrl" ? (openBlock(), createBlock(unref(Space), { key: 2 }, {
                default: withCtx(() => [
                  createVNode(unref(Button), {
                    type: "primary",
                    size: "small",
                    onClick: ($event) => onEdit(record)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("编辑")
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(unref(Popconfirm), {
                    title: "确认删除？",
                    okText: "删除",
                    cancelText: "取消",
                    "ok-button-props": { loading: record.loading },
                    onConfirm: ($event) => onDel(record)
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        size: "small",
                        loading: record.loading
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 2
                      }, 1032, ["loading"])
                    ]),
                    _: 2
                  }, 1032, ["ok-button-props", "onConfirm"])
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
      if (showEditModal.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          modelValue: showEditModal.value,
          "onUpdate:modelValue": ($event) => showEditModal.value = $event,
          state: editForm.value,
          type: editType.value,
          menuType: menuType.value,
          menuList: menuList.value,
          categories: categories.value,
          mapCategories: mapCategories.value,
          onModified: () => fetchMenuList()
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/menu/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
