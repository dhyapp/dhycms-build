import { computed, ref, reactive, onMounted, resolveComponent, resolveDirective, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withDirectives, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { Breadcrumb, BreadcrumbItem, Flex, Space, DropdownButton, Menu, MenuItem, Button, Input, Select, SelectOption, Table, Avatar, Modal, Tree, message } from "ant-design-vue";
import { u as user } from "./index-0psH9gUa.js";
import { u as updateUserPermission } from "./index-DM_w3Rd-.js";
import { b as dateFormat, d as dateFromID } from "./common-ZcIx5rAG.js";
import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const preadmin = computed(() => globalStore.preadmin);
    computed(() => globalStore.user);
    const selectedRowKeys = ref([]);
    const batchLoading = ref(false);
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys;
    };
    const searchState = reactive({
      keyword: "",
      role: "",
      frozen: null
    });
    const list = ref([]);
    const loading = ref(false);
    const pagination = reactive({
      current: 1,
      pageSize: 12,
      total: 0,
      showQuickJumper: true,
      simple: true,
      position: ["bottomCenter"]
    });
    const mapRoles = {
      normal: { name: "普通用户", color: "grey" },
      admin: { name: "管理员", color: "info" },
      super: { name: "超级管理员", color: "info" }
    };
    const mapSex = ["女", "男", "保密"];
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
        if (searchState.role) {
          query.fieldby.push("role");
          query.field.push(searchState.role);
        }
        if (searchState.frozen) {
          query.fieldby.push("frozen");
          query.field.push(searchState.frozen);
        }
        if (searchState.keyword) {
          query.keywordby = "id,username,nickname";
          query.keyword = searchState.keyword;
        }
        query.fieldby = query.fieldby.join(",");
        query.field = query.field.join(",");
        list.value = [];
        await user.list({ query }).then((res) => {
          list.value = res.list || [];
          pagination.total = res.total;
        });
      } finally {
        loading.value = false;
      }
    };
    const onReset = () => {
      searchState.keyword = "";
      searchState.role = "";
      searchState.frozen = null;
      init();
      fetchList();
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
            user.del({ ids }).then(() => {
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
    const showRolesModal = ref(false);
    const roleEditAuthTree = ref(ssrStore.roleAuth);
    const roleViewAuthTree = ref(ssrStore.roleAuth);
    const editabledRoleAuth = ref([]);
    const viewabledRoleAuth = ref([]);
    const roleAuthSubmitHandle = async () => {
      batchLoading.value = true;
      const ids = selectedRowKeys.value;
      try {
        await updateUserPermission({
          ids,
          body: {
            editabledRoleAuth: editabledRoleAuth.value,
            viewabledRoleAuth: viewabledRoleAuth.value
          }
        }).then(() => {
          fetchList();
          message.success("权限设置成功");
          showRolesModal.value = false;
        });
      } finally {
        batchLoading.value = false;
      }
    };
    const onRoleEditAuthSelect = (data) => {
      roleEditAuthTree.value = ssrStore.roleAuth;
      roleViewAuthTree.value = JSON.parse(JSON.stringify(ssrStore.roleAuth)).map((v) => {
        if (data.checked.includes(v.key)) {
          v.disabled = true;
        }
        return v;
      });
      const editSet = new Set(data.checked);
      const viewSet = /* @__PURE__ */ new Set([...data.checked, ...viewabledRoleAuth.value]);
      editabledRoleAuth.value = Array.from(editSet);
      viewabledRoleAuth.value = Array.from(viewSet);
    };
    const onRoleViewAuthSelect = (data) => {
      viewabledRoleAuth.value = data.checked;
    };
    const showSingleAuthModal = (record) => {
      viewabledRoleAuth.value = record.viewabledRoleAuth;
      onRoleEditAuthSelect({ checked: record.editabledRoleAuth });
      selectedRowKeys.value = [record._id];
      showRolesModal.value = true;
    };
    const onBatchOptions = async ({ key }) => {
      if (!selectedRowKeys.value.length && key !== "import")
        return message.error("未选中目标");
      switch (key) {
        case "del":
          await delHandle(selectedRowKeys.value);
          break;
        case "auth":
          editabledRoleAuth.value = [];
          viewabledRoleAuth.value = [];
          showRolesModal.value = true;
          break;
      }
    };
    const onSearch = () => {
      fetchList();
    };
    const onTableChange = (paginate) => {
      pagination.current = paginate.current;
      fetchList();
    };
    onMounted(() => {
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
                  _push3(`用户管理`);
                } else {
                  return [
                    createTextVNode("用户管理")
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
                  createTextVNode("用户管理")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel pt20 pl20 pb20 pr20 mt14 users-list-page">`);
      _push(ssrRenderComponent(unref(Flex), { justify: "space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Space), { size: "middle" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DropdownButton), { loading: batchLoading.value }, {
                    overlay: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Menu), { onClick: onBatchOptions }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(MenuItem), { key: "auth" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`设置角色权限`);
                                  } else {
                                    return [
                                      createTextVNode("设置角色权限")
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
                                createVNode(unref(MenuItem), { key: "auth" }, {
                                  default: withCtx(() => [
                                    createTextVNode("设置角色权限")
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
                              createVNode(unref(MenuItem), { key: "auth" }, {
                                default: withCtx(() => [
                                  createTextVNode("设置角色权限")
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
                    to: `/${preadmin.value}/users/edit`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Button), { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`新增用户`);
                            } else {
                              return [
                                createTextVNode("新增用户")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Button), { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("新增用户")
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
                            createVNode(unref(MenuItem), { key: "auth" }, {
                              default: withCtx(() => [
                                createTextVNode("设置角色权限")
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
                      to: `/${preadmin.value}/users/edit`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Button), { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("新增用户")
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
            _push2(ssrRenderComponent(unref(Space), { size: "middle" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "用户ID/用户名"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Select), {
                    value: searchState.role,
                    "onUpdate:value": ($event) => searchState.role = $event,
                    placeholder: "所有角色",
                    style: { width: "120px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SelectOption), { value: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`所有角色`);
                            } else {
                              return [
                                createTextVNode("所有角色")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(mapRoles, (v, k) => {
                          _push4(ssrRenderComponent(unref(SelectOption), {
                            key: k,
                            value: k
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
                          createVNode(unref(SelectOption), { value: "" }, {
                            default: withCtx(() => [
                              createTextVNode("所有角色")
                            ]),
                            _: 1
                          }),
                          (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                            return createVNode(unref(SelectOption), {
                              key: k,
                              value: k
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Select), {
                    value: searchState.frozen,
                    "onUpdate:value": ($event) => searchState.frozen = $event,
                    placeholder: "是否冻结",
                    style: { width: "120px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SelectOption), { value: true }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`冻结`);
                            } else {
                              return [
                                createTextVNode("冻结")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(SelectOption), { value: false }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`正常`);
                            } else {
                              return [
                                createTextVNode("正常")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SelectOption), { value: true }, {
                            default: withCtx(() => [
                              createTextVNode("冻结")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(SelectOption), { value: false }, {
                            default: withCtx(() => [
                              createTextVNode("正常")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                      placeholder: "用户ID/用户名"
                    }, null, 8, ["value", "onUpdate:value"]),
                    createVNode(unref(Select), {
                      value: searchState.role,
                      "onUpdate:value": ($event) => searchState.role = $event,
                      placeholder: "所有角色",
                      style: { width: "120px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(SelectOption), { value: "" }, {
                          default: withCtx(() => [
                            createTextVNode("所有角色")
                          ]),
                          _: 1
                        }),
                        (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                          return createVNode(unref(SelectOption), {
                            key: k,
                            value: k
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(v.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value"]),
                    createVNode(unref(Select), {
                      value: searchState.frozen,
                      "onUpdate:value": ($event) => searchState.frozen = $event,
                      placeholder: "是否冻结",
                      style: { width: "120px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(SelectOption), { value: true }, {
                          default: withCtx(() => [
                            createTextVNode("冻结")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(SelectOption), { value: false }, {
                          default: withCtx(() => [
                            createTextVNode("正常")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value"]),
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
              createVNode(unref(Space), { size: "middle" }, {
                default: withCtx(() => [
                  createVNode(unref(DropdownButton), { loading: batchLoading.value }, {
                    overlay: withCtx(() => [
                      createVNode(unref(Menu), { onClick: onBatchOptions }, {
                        default: withCtx(() => [
                          createVNode(unref(MenuItem), { key: "auth" }, {
                            default: withCtx(() => [
                              createTextVNode("设置角色权限")
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
                    to: `/${preadmin.value}/users/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("新增用户")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(Space), { size: "middle" }, {
                default: withCtx(() => [
                  createVNode(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "用户ID/用户名"
                  }, null, 8, ["value", "onUpdate:value"]),
                  createVNode(unref(Select), {
                    value: searchState.role,
                    "onUpdate:value": ($event) => searchState.role = $event,
                    placeholder: "所有角色",
                    style: { width: "120px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(SelectOption), { value: "" }, {
                        default: withCtx(() => [
                          createTextVNode("所有角色")
                        ]),
                        _: 1
                      }),
                      (openBlock(), createBlock(Fragment, null, renderList(mapRoles, (v, k) => {
                        return createVNode(unref(SelectOption), {
                          key: k,
                          value: k
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(v.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["value", "onUpdate:value"]),
                  createVNode(unref(Select), {
                    value: searchState.frozen,
                    "onUpdate:value": ($event) => searchState.frozen = $event,
                    placeholder: "是否冻结",
                    style: { width: "120px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(SelectOption), { value: true }, {
                        default: withCtx(() => [
                          createTextVNode("冻结")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(SelectOption), { value: false }, {
                        default: withCtx(() => [
                          createTextVNode("正常")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["value", "onUpdate:value"]),
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
          { title: "ID", dataIndex: "id" },
          { title: "角色", dataIndex: "role" },
          { title: "邮箱", dataIndex: "email", ellipsis: true },
          { title: "上级用户ID", dataIndex: "pid" },
          { title: "性别", dataIndex: "sex" },
          { title: "IP", dataIndex: "IPs" },
          { title: "最近登录时间", dataIndex: "lastLogin" },
          { title: "注册时间", dataIndex: "_id" },
          { title: "安全等级", dataIndex: "security" },
          { title: "手机号", dataIndex: "phone" },
          { title: "状态", dataIndex: "frozen", align: "center", fixed: "right", width: 70 },
          { title: "操作", dataIndex: "ctrl", align: "right", fixed: "right", width: 180 }
        ],
        "data-source": list.value,
        size: "small",
        loading: loading.value,
        scroll: { x: 1700 },
        pagination,
        "row-selection": { selectedRowKeys: selectedRowKeys.value, onChange: onSelectChange },
        rowKey: "_id",
        onChange: onTableChange
      }, {
        bodyCell: withCtx(({ column, record }, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            if (column.dataIndex === "id") {
              _push2(`<div class="f ac user-avatar"${_scopeId}>`);
              if (record.avatar) {
                _push2(ssrRenderComponent(unref(Avatar), null, {
                  icon: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, `${record.avatar}?100x100`))}${_scopeId2}>`);
                    } else {
                      return [
                        withDirectives(createVNode("img", null, null, 512), [
                          [_directive_depic, `${record.avatar}?100x100`]
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Avatar), { src: "/assets/img/avatar/avatar.jpg" }, null, _parent2, _scopeId));
              }
              _push2(`<div class="ml4"${_scopeId}><div class="txt-ellipsis" style="${ssrRenderStyle({ maxWidth: "100px" })}"${_scopeId}>${ssrInterpolate(record.username)}</div><div class="fs12 txt-grey"${_scopeId}>ID:${ssrInterpolate(record.id || "null")}</div></div></div>`);
            } else if (column.dataIndex === "role") {
              _push2(`<span class="${ssrRenderClass(`sugar-${mapRoles[record.role].color}`)}"${_scopeId}>${ssrInterpolate(mapRoles[record.role].name)}</span>`);
            } else if (column.dataIndex === "email") {
              _push2(`<!--[-->${ssrInterpolate(record.email || "-")}<!--]-->`);
            } else if (column.dataIndex === "pid") {
              _push2(`<!--[-->`);
              if ((_a = record.pid) == null ? void 0 : _a.length) {
                _push2(ssrRenderComponent(unref(Space), null, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(record.pid, (v) => {
                        _push3(`<span class="sugar-grey fs12"${_scopeId2}>${ssrInterpolate(v)}</span>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(record.pid, (v) => {
                          return openBlock(), createBlock("span", { class: "sugar-grey fs12" }, toDisplayString(v), 1);
                        }), 256))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`<!--]-->`);
            } else if (column.dataIndex === "sex") {
              _push2(`<!--[-->${ssrInterpolate(mapSex[record.sex])}<!--]-->`);
            } else if (column.dataIndex === "IPs") {
              _push2(`<!--[-->`);
              if ((_b = record.IPs) == null ? void 0 : _b.length) {
                _push2(ssrRenderComponent(unref(Space), null, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(record.IPs.slice(-3), (v) => {
                        _push3(`<span class="sugar-grey fs12"${_scopeId2}>${ssrInterpolate(v)}</span>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(record.IPs.slice(-3), (v) => {
                          return openBlock(), createBlock("span", { class: "sugar-grey fs12" }, toDisplayString(v), 1);
                        }), 256))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`<!--]-->`);
            } else if (column.dataIndex === "lastLogin") {
              _push2(`<!--[-->`);
              if (record.lastLogin > 0) {
                _push2(`<span${_scopeId}>${ssrInterpolate(unref(dateFormat)(Number(`${record.lastLogin}000`), "YYYY-MM-DD hh:mm"))}</span>`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`<!--]-->`);
            } else if (column.dataIndex === "_id") {
              _push2(`<!--[-->${ssrInterpolate(unref(dateFromID)(record._id, "YYYY-MM-DD hh:mm"))}<!--]-->`);
            } else if (column.dataIndex === "frozen") {
              _push2(`<span class="${ssrRenderClass(`sugar-${record.frozen ? "error" : "success"}`)}"${_scopeId}>${ssrInterpolate(record.frozen ? "冻结" : "正常")}</span>`);
            } else if (column.dataIndex === "phone") {
              _push2(`<!--[-->${ssrInterpolate(record.phone || "-")}<!--]-->`);
            } else if (column.dataIndex === "ctrl") {
              _push2(ssrRenderComponent(unref(Space), null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_RouterLink, {
                      to: `/${preadmin.value}/users/edit/${record.id}`
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
                    _push3(ssrRenderComponent(unref(Button), {
                      size: "small",
                      disabled: record.id == 1e4 || !["super", "admin"].includes(record.role),
                      onClick: ($event) => showSingleAuthModal(record)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`权限`);
                        } else {
                          return [
                            createTextVNode("权限")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Button), {
                      size: "small",
                      disabled: record.id == 1e4,
                      danger: "",
                      onClick: ($event) => delHandle([record._id])
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`删除`);
                        } else {
                          return [
                            createTextVNode("删除")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_RouterLink, {
                        to: `/${preadmin.value}/users/edit/${record.id}`
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
                      createVNode(unref(Button), {
                        size: "small",
                        disabled: record.id == 1e4 || !["super", "admin"].includes(record.role),
                        onClick: ($event) => showSingleAuthModal(record)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("权限")
                        ]),
                        _: 2
                      }, 1032, ["disabled", "onClick"]),
                      createVNode(unref(Button), {
                        size: "small",
                        disabled: record.id == 1e4,
                        danger: "",
                        onClick: ($event) => delHandle([record._id])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
                        ]),
                        _: 2
                      }, 1032, ["disabled", "onClick"])
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
              column.dataIndex === "id" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "f ac user-avatar"
              }, [
                record.avatar ? (openBlock(), createBlock(unref(Avatar), { key: 0 }, {
                  icon: withCtx(() => [
                    withDirectives(createVNode("img", null, null, 512), [
                      [_directive_depic, `${record.avatar}?100x100`]
                    ])
                  ]),
                  _: 2
                }, 1024)) : (openBlock(), createBlock(unref(Avatar), {
                  key: 1,
                  src: "/assets/img/avatar/avatar.jpg"
                })),
                createVNode("div", { class: "ml4" }, [
                  createVNode("div", {
                    class: "txt-ellipsis",
                    style: { maxWidth: "100px" }
                  }, toDisplayString(record.username), 1),
                  createVNode("div", { class: "fs12 txt-grey" }, "ID:" + toDisplayString(record.id || "null"), 1)
                ])
              ])) : column.dataIndex === "role" ? (openBlock(), createBlock("span", {
                key: 1,
                class: `sugar-${mapRoles[record.role].color}`
              }, toDisplayString(mapRoles[record.role].name), 3)) : column.dataIndex === "email" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                createTextVNode(toDisplayString(record.email || "-"), 1)
              ], 64)) : column.dataIndex === "pid" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                ((_c = record.pid) == null ? void 0 : _c.length) ? (openBlock(), createBlock(unref(Space), { key: 0 }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(record.pid, (v) => {
                      return openBlock(), createBlock("span", { class: "sugar-grey fs12" }, toDisplayString(v), 1);
                    }), 256))
                  ]),
                  _: 2
                }, 1024)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
              ], 64)) : column.dataIndex === "sex" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                createTextVNode(toDisplayString(mapSex[record.sex]), 1)
              ], 64)) : column.dataIndex === "IPs" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                ((_d = record.IPs) == null ? void 0 : _d.length) ? (openBlock(), createBlock(unref(Space), { key: 0 }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(record.IPs.slice(-3), (v) => {
                      return openBlock(), createBlock("span", { class: "sugar-grey fs12" }, toDisplayString(v), 1);
                    }), 256))
                  ]),
                  _: 2
                }, 1024)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
              ], 64)) : column.dataIndex === "lastLogin" ? (openBlock(), createBlock(Fragment, { key: 6 }, [
                record.lastLogin > 0 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(dateFormat)(Number(`${record.lastLogin}000`), "YYYY-MM-DD hh:mm")), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
              ], 64)) : column.dataIndex === "_id" ? (openBlock(), createBlock(Fragment, { key: 7 }, [
                createTextVNode(toDisplayString(unref(dateFromID)(record._id, "YYYY-MM-DD hh:mm")), 1)
              ], 64)) : column.dataIndex === "frozen" ? (openBlock(), createBlock("span", {
                key: 8,
                class: `sugar-${record.frozen ? "error" : "success"}`
              }, toDisplayString(record.frozen ? "冻结" : "正常"), 3)) : column.dataIndex === "phone" ? (openBlock(), createBlock(Fragment, { key: 9 }, [
                createTextVNode(toDisplayString(record.phone || "-"), 1)
              ], 64)) : column.dataIndex === "ctrl" ? (openBlock(), createBlock(unref(Space), { key: 10 }, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/users/edit/${record.id}`
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
                  createVNode(unref(Button), {
                    size: "small",
                    disabled: record.id == 1e4 || !["super", "admin"].includes(record.role),
                    onClick: ($event) => showSingleAuthModal(record)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("权限")
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick"]),
                  createVNode(unref(Button), {
                    size: "small",
                    disabled: record.id == 1e4,
                    danger: "",
                    onClick: ($event) => delHandle([record._id])
                  }, {
                    default: withCtx(() => [
                      createTextVNode("删除")
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick"])
                ]),
                _: 2
              }, 1024)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Modal), {
        open: showRolesModal.value,
        "onUpdate:open": ($event) => showRolesModal.value = $event,
        title: "角色权限",
        centered: "",
        confirmLoading: batchLoading.value,
        onOk: roleAuthSubmitHandle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="f mt20"${_scopeId}><div class="roles-auth-tree"${_scopeId}><div${_scopeId}><b${_scopeId}>编辑</b></div>`);
            _push2(ssrRenderComponent(unref(Tree), {
              checkedKeys: editabledRoleAuth.value,
              "onUpdate:checkedKeys": ($event) => editabledRoleAuth.value = $event,
              showLine: { showLeafIcon: false },
              treeData: roleEditAuthTree.value,
              "tree-node-filter-prop": "title",
              checkable: "",
              checkStrictly: "",
              multiple: "",
              selectable: false,
              onCheck: onRoleEditAuthSelect
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="roles-auth-tree"${_scopeId}><div${_scopeId}><b${_scopeId}>查看</b></div>`);
            _push2(ssrRenderComponent(unref(Tree), {
              class: "roles-auth-tree",
              checkedKeys: viewabledRoleAuth.value,
              "onUpdate:checkedKeys": ($event) => viewabledRoleAuth.value = $event,
              showLine: { showLeafIcon: false },
              treeData: roleViewAuthTree.value,
              "tree-node-filter-prop": "title",
              checkable: "",
              checkStrictly: "",
              multiple: "",
              selectable: false,
              onCheck: onRoleViewAuthSelect
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "f mt20" }, [
                createVNode("div", { class: "roles-auth-tree" }, [
                  createVNode("div", null, [
                    createVNode("b", null, "编辑")
                  ]),
                  createVNode(unref(Tree), {
                    checkedKeys: editabledRoleAuth.value,
                    "onUpdate:checkedKeys": ($event) => editabledRoleAuth.value = $event,
                    showLine: { showLeafIcon: false },
                    treeData: roleEditAuthTree.value,
                    "tree-node-filter-prop": "title",
                    checkable: "",
                    checkStrictly: "",
                    multiple: "",
                    selectable: false,
                    onCheck: onRoleEditAuthSelect
                  }, null, 8, ["checkedKeys", "onUpdate:checkedKeys", "treeData"])
                ]),
                createVNode("div", { class: "roles-auth-tree" }, [
                  createVNode("div", null, [
                    createVNode("b", null, "查看")
                  ]),
                  createVNode(unref(Tree), {
                    class: "roles-auth-tree",
                    checkedKeys: viewabledRoleAuth.value,
                    "onUpdate:checkedKeys": ($event) => viewabledRoleAuth.value = $event,
                    showLine: { showLeafIcon: false },
                    treeData: roleViewAuthTree.value,
                    "tree-node-filter-prop": "title",
                    checkable: "",
                    checkStrictly: "",
                    multiple: "",
                    selectable: false,
                    onCheck: onRoleViewAuthSelect
                  }, null, 8, ["checkedKeys", "onUpdate:checkedKeys", "treeData"])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
