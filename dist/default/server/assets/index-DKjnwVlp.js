import { ref, computed, inject, watchEffect, watch, unref, mergeProps, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, createVNode, useSSRContext, reactive, toRaw, provide, onActivated, resolveComponent } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { Modal, Select, SelectOption, Checkbox, message, Alert, Spin, Form, FormItem, Textarea, Space, Button, Input, Breadcrumb, BreadcrumbItem, Flex, Table, Tag, Tooltip, Dropdown, Menu, MenuItem } from "ant-design-vue";
import { s as syncSitesSave, u as updateDomains, b as updateNginx, c as setSSL, g as getNginx, d as stopSite, e as startSite, r as restartThisSite, f as restartSite, h as deleteSite } from "./sites-CNKC-LVu.js";
import { f as sites } from "./index-0psH9gUa.js";
import { d as dateFromID } from "./common-ZcIx5rAG.js";
import { u as useGLobalStore } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { g as getSystemInfo } from "./system-OLfmn2RD.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
const useSyncSiteTree = () => {
  return [
    { name: "菜单分类", key: "Menu" },
    { name: "链接管理", key: "Nav" },
    { name: "文章管理", key: "Post" },
    { name: "自助收录", key: "Selfreg" },
    { name: "广告推广", key: "Ad" },
    { name: "系统设置", key: "Setting", children: [
      { name: "自助收录", key: "Setting.selfreg-base|selfreg-in" },
      { name: "公告", key: "Setting.notice" },
      { name: "第三方统计", key: "Setting.thirdstat" },
      { name: "云盘", recommend: true, key: "Setting.cloud" },
      { name: "网站地图", key: "Setting.sitemap" }
    ] }
  ];
};
const _sfc_main$3 = {
  __name: "singleControl",
  __ssrInlineRender: true,
  props: {
    siteName: String,
    show: Boolean,
    sites: { type: Array, default: () => [] },
    singleToGroup: { type: Array, default: () => [] },
    singleToGroupKeys: { type: Array, default: () => [] }
  },
  emits: ["update:show", "save"],
  setup(__props, { emit: __emit }) {
    const auto = ref(true);
    const props = __props;
    const emits = __emit;
    const show = computed({
      get() {
        return props.show;
      },
      set(v) {
        emits("update:show", v);
      }
    });
    const confirmLoading = ref(false);
    const targetSites = ref([]);
    const siteSyncTree = ref(useSyncSiteTree());
    const mapSiteNickname = inject("mapSiteNickname");
    const initIndeterminate = (parent) => {
      var _a;
      const childCount = (_a = parent.children) == null ? void 0 : _a.length;
      if (childCount) {
        const childCheckedCount = parent.children.filter((v) => v.checked).length;
        if (childCheckedCount === 0) {
          parent.checked = false;
          parent.indeterminate = false;
          return;
        } else if (childCount === childCheckedCount) {
          parent.checked = true;
          parent.indeterminate = false;
        } else {
          parent.checked = false;
          parent.indeterminate = true;
        }
      }
    };
    watchEffect(() => {
      var _a;
      for (const level1 of siteSyncTree.value) {
        if (props.singleToGroupKeys.includes(level1.key))
          level1.checked = true;
        else
          level1.checked = false;
        if ((_a = level1.children) == null ? void 0 : _a.length) {
          for (const level2 of level1.children) {
            if (props.singleToGroupKeys.includes(level2.key))
              level2.checked = true;
            else
              level2.checked = false;
          }
        }
      }
      targetSites.value = props.singleToGroup;
    });
    watch(props.singleToGroupKeys, () => {
      for (const level1 of siteSyncTree.value) {
        initIndeterminate(level1);
      }
    });
    const selectedSyncSiteKeys = computed(() => {
      const keys = [];
      siteSyncTree.value.forEach((v) => {
        var _a;
        if (v.checked)
          keys.push(v.key);
        if ((_a = v.children) == null ? void 0 : _a.length) {
          v.children.forEach((v2) => {
            if (v2.checked)
              keys.push(v2.key);
          });
        }
      });
      return keys;
    });
    const onSyncSiteParentCheck = (level1) => {
      var _a;
      if ((_a = level1.children) == null ? void 0 : _a.length) {
        let checkAll = false;
        level1.indeterminate = false;
        if (level1.checked)
          checkAll = true;
        for (const level2 of level1.children) {
          level2.checked = checkAll;
        }
      }
    };
    const onSave = async () => {
      if (targetSites.value.length === 0)
        return message.error("请选择目标站点");
      try {
        confirmLoading.value = true;
        const keys = new Set(selectedSyncSiteKeys.value);
        for (const key of selectedSyncSiteKeys.value) {
          if (key.indexOf(".") > -1) {
            keys.add(key.split(".").shift());
          }
        }
        syncSitesSave({
          keys: Array.from(keys),
          sites: targetSites.value,
          names: [props.siteName],
          auto: auto.value
          // cover: cover.value,
        }).then(() => {
          show.value = false;
          message.success("操作成功");
          emits("saved");
        });
      } finally {
        confirmLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: show.value,
        "onUpdate:open": ($event) => show.value = $event,
        centered: "",
        title: `[${(_a = unref(mapSiteNickname)[__props.siteName]) == null ? void 0 : _a.nickName}] 站点内容同步（一对多）`,
        confirmLoading: confirmLoading.value,
        width: 600,
        onOk: onSave
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="sites-sync-body"${_scopeId}><hr class="mt20 mb10"${_scopeId}><div class="f select-group"${_scopeId}><div class="f1"${_scopeId}><div class="nowrap mb6 required"${_scopeId}><b${_scopeId}>[${ssrInterpolate((_a2 = unref(mapSiteNickname)[__props.siteName]) == null ? void 0 : _a2.nickName)}] 增删改时，自动同步内容到目标站点（仅限勾选内容）：</b></div>`);
            _push2(ssrRenderComponent(unref(Select), {
              value: targetSites.value,
              "onUpdate:value": ($event) => targetSites.value = $event,
              style: { width: "100%" },
              mode: "tags",
              placeholder: "请选择需要同步内容的站点"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.sites, (v) => {
                    _push3(`<!--[-->`);
                    if (__props.siteName !== v.name) {
                      _push3(ssrRenderComponent(unref(SelectOption), {
                        value: v.name
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(v.nickName)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(v.nickName), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.sites, (v) => {
                      return openBlock(), createBlock(Fragment, {
                        key: v.name
                      }, [
                        __props.siteName !== v.name ? (openBlock(), createBlock(unref(SelectOption), {
                          key: 0,
                          value: v.name
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(v.nickName), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"])) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt20"${_scopeId}><b${_scopeId}>同步内容：</b></div><div class="checkbox-group mt10 f fw"${_scopeId}><!--[-->`);
            ssrRenderList(siteSyncTree.value, (v) => {
              var _a3, _b2;
              _push2(`<div class="${ssrRenderClass({ hasChildren: Boolean((_a3 = v.children) == null ? void 0 : _a3.length) })}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Checkbox), {
                checked: v.checked,
                "onUpdate:checked": ($event) => v.checked = $event,
                indeterminate: v.indeterminate,
                onChange: ($event) => onSyncSiteParentCheck(v)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(v.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(v.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if ((_b2 = v.children) == null ? void 0 : _b2.length) {
                _push2(`<div class="checkbox-group f fw"${_scopeId}><!--[-->`);
                ssrRenderList(v.children, (v2) => {
                  _push2(`<div${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Checkbox), {
                    checked: v2.checked,
                    "onUpdate:checked": ($event) => v2.checked = $event,
                    onChange: ($event) => initIndeterminate(v)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(v2.name)} `);
                        if (v2.recommend) {
                          _push3(`<span class="txt-error"${_scopeId2}>(强烈推荐)</span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                      } else {
                        return [
                          createTextVNode(toDisplayString(v2.name) + " ", 1),
                          v2.recommend ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "txt-error"
                          }, "(强烈推荐)")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sites-sync-body" }, [
                createVNode("hr", { class: "mt20 mb10" }),
                createVNode("div", { class: "f select-group" }, [
                  createVNode("div", { class: "f1" }, [
                    createVNode("div", { class: "nowrap mb6 required" }, [
                      createVNode("b", null, "[" + toDisplayString((_b = unref(mapSiteNickname)[__props.siteName]) == null ? void 0 : _b.nickName) + "] 增删改时，自动同步内容到目标站点（仅限勾选内容）：", 1)
                    ]),
                    createVNode(unref(Select), {
                      value: targetSites.value,
                      "onUpdate:value": ($event) => targetSites.value = $event,
                      style: { width: "100%" },
                      mode: "tags",
                      placeholder: "请选择需要同步内容的站点"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.sites, (v) => {
                          return openBlock(), createBlock(Fragment, {
                            key: v.name
                          }, [
                            __props.siteName !== v.name ? (openBlock(), createBlock(unref(SelectOption), {
                              key: 0,
                              value: v.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v.nickName), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["value", "onUpdate:value"])
                  ])
                ]),
                createVNode("div", { class: "mt20" }, [
                  createVNode("b", null, "同步内容：")
                ]),
                createVNode("div", { class: "checkbox-group mt10 f fw" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(siteSyncTree.value, (v) => {
                    var _a3, _b2;
                    return openBlock(), createBlock("div", {
                      key: v.key,
                      class: { hasChildren: Boolean((_a3 = v.children) == null ? void 0 : _a3.length) }
                    }, [
                      createVNode(unref(Checkbox), {
                        checked: v.checked,
                        "onUpdate:checked": ($event) => v.checked = $event,
                        indeterminate: v.indeterminate,
                        onChange: ($event) => onSyncSiteParentCheck(v)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(v.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["checked", "onUpdate:checked", "indeterminate", "onChange"]),
                      ((_b2 = v.children) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "checkbox-group f fw"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(v.children, (v2) => {
                          return openBlock(), createBlock("div", {
                            key: v2.key
                          }, [
                            createVNode(unref(Checkbox), {
                              checked: v2.checked,
                              "onUpdate:checked": ($event) => v2.checked = $event,
                              onChange: ($event) => initIndeterminate(v)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v2.name) + " ", 1),
                                v2.recommend ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "txt-error"
                                }, "(强烈推荐)")) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["checked", "onUpdate:checked", "onChange"])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/sites/singleControl.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "groupControl",
  __ssrInlineRender: true,
  props: {
    siteName: String,
    show: Boolean,
    sites: { type: Array, default: () => [] },
    groupToGroupKeys: { type: Array, default: () => [] }
  },
  emits: ["update:show", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const show = computed({
      get() {
        return props.show;
      },
      set(v) {
        emits("update:show", v);
      }
    });
    const confirmLoading = ref(false);
    const siteSyncTree = ref(useSyncSiteTree());
    const mapSiteNickname = inject("mapSiteNickname");
    const initIndeterminate = (parent) => {
      var _a;
      const childCount = (_a = parent.children) == null ? void 0 : _a.length;
      if (childCount) {
        const childCheckedCount = parent.children.filter((v) => v.checked).length;
        if (childCheckedCount === 0) {
          parent.checked = false;
          parent.indeterminate = false;
          return;
        } else if (childCount === childCheckedCount) {
          parent.checked = true;
          parent.indeterminate = false;
        } else {
          parent.checked = false;
          parent.indeterminate = true;
        }
      }
    };
    watchEffect(() => {
      var _a;
      for (const level1 of siteSyncTree.value) {
        if (props.groupToGroupKeys.includes(level1.key))
          level1.checked = true;
        else
          level1.checked = false;
        if ((_a = level1.children) == null ? void 0 : _a.length) {
          for (const level2 of level1.children) {
            if (props.groupToGroupKeys.includes(level2.key))
              level2.checked = true;
            else
              level2.checked = false;
          }
        }
      }
    });
    watch(() => props.groupToGroupKeys, () => {
      for (const level1 of siteSyncTree.value) {
        initIndeterminate(level1);
      }
    });
    const selectedSyncSiteKeys = computed(() => {
      const keys = [];
      siteSyncTree.value.forEach((v) => {
        var _a;
        if (v.checked)
          keys.push(v.key);
        if ((_a = v.children) == null ? void 0 : _a.length) {
          v.children.forEach((v2) => {
            if (v2.checked)
              keys.push(v2.key);
          });
        }
      });
      return keys;
    });
    const onSyncSiteParentCheck = (level1) => {
      var _a;
      if ((_a = level1.children) == null ? void 0 : _a.length) {
        let checkAll = false;
        level1.indeterminate = false;
        if (level1.checked)
          checkAll = true;
        for (const level2 of level1.children) {
          level2.checked = checkAll;
        }
      }
    };
    const onSave = async () => {
      try {
        confirmLoading.value = true;
        const keys = new Set(selectedSyncSiteKeys.value);
        for (const key of selectedSyncSiteKeys.value) {
          if (key.indexOf(".") > -1) {
            keys.add(key.split(".").shift());
          }
        }
        syncSitesSave({
          groupKeys: Array.from(keys),
          names: [props.siteName]
        }).then(() => {
          show.value = false;
          message.success("操作成功");
          emits("saved");
        });
      } finally {
        confirmLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: show.value,
        "onUpdate:open": ($event) => show.value = $event,
        centered: "",
        title: `站点内容同步（多对多）`,
        confirmLoading: confirmLoading.value,
        width: 600,
        onOk: onSave
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="sites-sync-body"${_scopeId}><hr class="mt20 mb10"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Alert), {
              class: "mb20",
              showIcon: "",
              type: "warning",
              message: `其它站点增删改内容时，自动同步到 [${(_a = unref(mapSiteNickname)[__props.siteName]) == null ? void 0 : _a.nickName}] 站点（仅限勾选内容）`
            }, null, _parent2, _scopeId));
            _push2(`<div class="mt20"${_scopeId}><b${_scopeId}>同步内容：</b></div><div class="checkbox-group mt10 f fw"${_scopeId}><!--[-->`);
            ssrRenderList(siteSyncTree.value, (v) => {
              var _a2, _b2;
              _push2(`<div class="${ssrRenderClass({ hasChildren: Boolean((_a2 = v.children) == null ? void 0 : _a2.length) })}"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Checkbox), {
                checked: v.checked,
                "onUpdate:checked": ($event) => v.checked = $event,
                indeterminate: v.indeterminate,
                onChange: ($event) => onSyncSiteParentCheck(v)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(v.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(v.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if ((_b2 = v.children) == null ? void 0 : _b2.length) {
                _push2(`<div class="checkbox-group f fw"${_scopeId}><!--[-->`);
                ssrRenderList(v.children, (v2) => {
                  _push2(`<div${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Checkbox), {
                    checked: v2.checked,
                    "onUpdate:checked": ($event) => v2.checked = $event,
                    onChange: ($event) => initIndeterminate(v)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(v2.name)} `);
                        if (v2.recommend) {
                          _push3(`<span class="txt-error"${_scopeId2}>(强烈推荐)</span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                      } else {
                        return [
                          createTextVNode(toDisplayString(v2.name) + " ", 1),
                          v2.recommend ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "txt-error"
                          }, "(强烈推荐)")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sites-sync-body" }, [
                createVNode("hr", { class: "mt20 mb10" }),
                createVNode(unref(Alert), {
                  class: "mb20",
                  showIcon: "",
                  type: "warning",
                  message: `其它站点增删改内容时，自动同步到 [${(_b = unref(mapSiteNickname)[__props.siteName]) == null ? void 0 : _b.nickName}] 站点（仅限勾选内容）`
                }, null, 8, ["message"]),
                createVNode("div", { class: "mt20" }, [
                  createVNode("b", null, "同步内容：")
                ]),
                createVNode("div", { class: "checkbox-group mt10 f fw" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(siteSyncTree.value, (v) => {
                    var _a2, _b2;
                    return openBlock(), createBlock("div", {
                      key: v.key,
                      class: { hasChildren: Boolean((_a2 = v.children) == null ? void 0 : _a2.length) }
                    }, [
                      createVNode(unref(Checkbox), {
                        checked: v.checked,
                        "onUpdate:checked": ($event) => v.checked = $event,
                        indeterminate: v.indeterminate,
                        onChange: ($event) => onSyncSiteParentCheck(v)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(v.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["checked", "onUpdate:checked", "indeterminate", "onChange"]),
                      ((_b2 = v.children) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "checkbox-group f fw"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(v.children, (v2) => {
                          return openBlock(), createBlock("div", {
                            key: v2.key
                          }, [
                            createVNode(unref(Checkbox), {
                              checked: v2.checked,
                              "onUpdate:checked": ($event) => v2.checked = $event,
                              onChange: ($event) => initIndeterminate(v)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(v2.name) + " ", 1),
                                v2.recommend ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "txt-error"
                                }, "(强烈推荐)")) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["checked", "onUpdate:checked", "onChange"])
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/sites/groupControl.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nginxModal",
  __ssrInlineRender: true,
  props: {
    site: { type: Object, default: () => ({}) },
    show: Boolean
  },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emits = __emit;
    const show = computed({
      get() {
        return props.show;
      },
      set(v) {
        emits("update:show", v);
      }
    });
    const confirmLoading = ref(false);
    const nav = ref([
      { name: "域名", key: "domains" },
      { name: "Nginx配置", key: "nginx" },
      { name: "SSL证书", key: "ssl" }
    ]);
    const curNav = ref("domains");
    const systemInfo = inject("systemInfo");
    const nginxFetching = ref(false);
    const fetchNginx = async () => {
      try {
        nginxFetching.value = true;
        await getNginx({ name: props.site.name }).then((res) => {
          nginxForm.nginxConf = res;
        });
      } finally {
        nginxFetching.value = false;
      }
    };
    const onNavChange = (key) => {
      curNav.value = key;
      if (key === "nginx")
        fetchNginx();
    };
    const domainFormRef = ref();
    const domainLoading = ref(false);
    const domainForm = reactive({
      domains: ((_a = props.site.domains) == null ? void 0 : _a.join("\n")) || ""
    });
    const domainSubmit = async () => {
      domainLoading.value = true;
      try {
        await domainFormRef.value.validate();
        await updateDomains({
          domains: domainForm.domains,
          name: props.site.name,
          port: props.site.port
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        domainLoading.value = false;
      }
    };
    const nginxFormRef = ref();
    const nginxSaving = ref(false);
    const nginxForm = reactive({
      nginxConf: ""
    });
    const onNginxConfSave = async () => {
      try {
        nginxSaving.value = true;
        await nginxFormRef.value.validate();
        await updateNginx({
          name: props.site.name,
          content: nginxForm.nginxConf
        }).then(() => {
          message.success("保存成功");
        });
      } finally {
        nginxSaving.value = false;
      }
    };
    const sslFormRef = ref();
    const sslLoading = ref(false);
    const sslForm = reactive({
      email: "",
      key: "",
      cert: ""
    });
    const sslSubmit = async () => {
      try {
        sslLoading.value = true;
        await sslFormRef.value.validate();
        await setSSL({
          ...toRaw(sslForm),
          domains: props.site.domains,
          name: props.site.name
        }).then((res) => {
          console.log(res);
        });
      } finally {
        sslLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: show.value,
        "onUpdate:open": ($event) => show.value = $event,
        centered: "",
        title: `域名、Nginx配置、SSL证书 - [${__props.site.nickName}]`,
        confirmLoading: confirmLoading.value,
        width: 800,
        footer: false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sites-nginx-body"${_scopeId}><hr class="mt20 mb0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Spin), {
              spinning: unref(systemInfo).loading
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="f snb-box"${_scopeId2}><div class="snb-nav"${_scopeId2}><!--[-->`);
                  ssrRenderList(nav.value, (v) => {
                    _push3(`<div class="${ssrRenderClass([{ active: curNav.value === v.key }, "item"])}"${_scopeId2}>${ssrInterpolate(v.name)}</div>`);
                  });
                  _push3(`<!--]--></div><div class="snb-content"${_scopeId2}>`);
                  if (curNav.value === "domains") {
                    _push3(`<div${_scopeId2}>`);
                    if (unref(systemInfo).nginxVersion > "0") {
                      _push3(ssrRenderComponent(unref(Form), {
                        ref_key: "domainFormRef",
                        ref: domainFormRef,
                        model: domainForm,
                        layout: "vertical"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(FormItem), {
                              name: "domains",
                              rules: [{ required: true, message: "域名不能为空" }]
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Textarea), {
                                    value: domainForm.domains,
                                    "onUpdate:value": ($event) => domainForm.domains = $event,
                                    rows: 8,
                                    placeholder: "默认80端口，支持泛域名，自定义端口请在冒号后添加，多个域名请换行，例：\rexample.com\r*.example.com\rexample.com:443",
                                    rules: [{ required: true, message: "请填写域名" }]
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Textarea), {
                                      value: domainForm.domains,
                                      "onUpdate:value": ($event) => domainForm.domains = $event,
                                      rows: 8,
                                      placeholder: "默认80端口，支持泛域名，自定义端口请在冒号后添加，多个域名请换行，例：\rexample.com\r*.example.com\rexample.com:443",
                                      rules: [{ required: true, message: "请填写域名" }]
                                    }, null, 8, ["value", "onUpdate:value"])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(FormItem), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Space), { size: 15 }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Button), {
                                          loading: domainLoading.value,
                                          type: "primary",
                                          onClick: domainSubmit
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`保存`);
                                            } else {
                                              return [
                                                createTextVNode("保存")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Button), {
                                            loading: domainLoading.value,
                                            type: "primary",
                                            onClick: domainSubmit
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("保存")
                                            ]),
                                            _: 1
                                          }, 8, ["loading"])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(`<div class="mt20 fs12"${_scopeId4}>* 保存后，将<b class="txt-primary"${_scopeId4}>自动生成 Nginx 配置</b></div>`);
                                } else {
                                  return [
                                    createVNode(unref(Space), { size: 15 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Button), {
                                          loading: domainLoading.value,
                                          type: "primary",
                                          onClick: domainSubmit
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("保存")
                                          ]),
                                          _: 1
                                        }, 8, ["loading"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "mt20 fs12" }, [
                                      createTextVNode("* 保存后，将"),
                                      createVNode("b", { class: "txt-primary" }, "自动生成 Nginx 配置")
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(FormItem), {
                                name: "domains",
                                rules: [{ required: true, message: "域名不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: domainForm.domains,
                                    "onUpdate:value": ($event) => domainForm.domains = $event,
                                    rows: 8,
                                    placeholder: "默认80端口，支持泛域名，自定义端口请在冒号后添加，多个域名请换行，例：\rexample.com\r*.example.com\rexample.com:443",
                                    rules: [{ required: true, message: "请填写域名" }]
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), { size: 15 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        loading: domainLoading.value,
                                        type: "primary",
                                        onClick: domainSubmit
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt20 fs12" }, [
                                    createTextVNode("* 保存后，将"),
                                    createVNode("b", { class: "txt-primary" }, "自动生成 Nginx 配置")
                                  ])
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!--[-->未检测到 Nginx 环境，请先安装 Nginx 服务<!--]-->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (curNav.value === "nginx") {
                    _push3(`<div${_scopeId2}>`);
                    if (unref(systemInfo).nginxVersion > "0") {
                      _push3(ssrRenderComponent(unref(Form), {
                        ref_key: "nginxFormRef",
                        ref: nginxFormRef,
                        model: nginxForm,
                        layout: "vertical"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(FormItem), { name: "nginxConf" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Spin), { spinning: nginxFetching.value }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Textarea), {
                                          value: nginxForm.nginxConf,
                                          "onUpdate:value": ($event) => nginxForm.nginxConf = $event,
                                          rows: 15
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Textarea), {
                                            value: nginxForm.nginxConf,
                                            "onUpdate:value": ($event) => nginxForm.nginxConf = $event,
                                            rows: 15
                                          }, null, 8, ["value", "onUpdate:value"])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Spin), { spinning: nginxFetching.value }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Textarea), {
                                          value: nginxForm.nginxConf,
                                          "onUpdate:value": ($event) => nginxForm.nginxConf = $event,
                                          rows: 15
                                        }, null, 8, ["value", "onUpdate:value"])
                                      ]),
                                      _: 1
                                    }, 8, ["spinning"])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(unref(FormItem), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(Space), {
                                    size: 15,
                                    class: "mt20"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(Button), {
                                          loading: nginxSaving.value,
                                          onClick: onNginxConfSave
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`保存`);
                                            } else {
                                              return [
                                                createTextVNode("保存")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(Button), {
                                            loading: nginxSaving.value,
                                            onClick: onNginxConfSave
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("保存")
                                            ]),
                                            _: 1
                                          }, 8, ["loading"])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(Space), {
                                      size: 15,
                                      class: "mt20"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Button), {
                                          loading: nginxSaving.value,
                                          onClick: onNginxConfSave
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("保存")
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
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(FormItem), { name: "nginxConf" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Spin), { spinning: nginxFetching.value }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Textarea), {
                                        value: nginxForm.nginxConf,
                                        "onUpdate:value": ($event) => nginxForm.nginxConf = $event,
                                        rows: 15
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ]),
                                    _: 1
                                  }, 8, ["spinning"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), {
                                    size: 15,
                                    class: "mt20"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        loading: nginxSaving.value,
                                        onClick: onNginxConfSave
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
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
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!--[-->未检测到 Nginx 环境，请先安装 Nginx 服务<!--]-->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (curNav.value === "ssl") {
                    _push3(ssrRenderComponent(unref(Form), {
                      ref_key: "sslFormRef",
                      ref: sslFormRef,
                      model: sslForm,
                      layout: "vertical"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(FormItem), {
                            label: "邮箱",
                            name: "email",
                            rules: [{ required: true, message: "邮箱不能为空" }]
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Input), {
                                  value: sslForm.email,
                                  "onUpdate:value": ($event) => sslForm.email = $event,
                                  placeholder: "请输入邮箱"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(Input), {
                                    value: sslForm.email,
                                    "onUpdate:value": ($event) => sslForm.email = $event,
                                    placeholder: "请输入邮箱"
                                  }, null, 8, ["value", "onUpdate:value"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(FormItem), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Space), {
                                  size: 15,
                                  class: "snb-ssl-wrapper"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div${_scopeId5}><div class="mb8"${_scopeId5}>密钥(KEY)</div>`);
                                      _push6(ssrRenderComponent(unref(Textarea), {
                                        value: sslForm.key,
                                        "onUpdate:value": ($event) => sslForm.key = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div><div${_scopeId5}><div class="mb8"${_scopeId5}>证书(PEM格式)</div>`);
                                      _push6(ssrRenderComponent(unref(Textarea), {
                                        value: sslForm.pem,
                                        "onUpdate:value": ($event) => sslForm.pem = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", null, [
                                          createVNode("div", { class: "mb8" }, "密钥(KEY)"),
                                          createVNode(unref(Textarea), {
                                            value: sslForm.key,
                                            "onUpdate:value": ($event) => sslForm.key = $event,
                                            rows: 8,
                                            placeholder: "申请 Let's Encrypt 证书后自动生成"
                                          }, null, 8, ["value", "onUpdate:value"])
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("div", { class: "mb8" }, "证书(PEM格式)"),
                                          createVNode(unref(Textarea), {
                                            value: sslForm.pem,
                                            "onUpdate:value": ($event) => sslForm.pem = $event,
                                            rows: 8,
                                            placeholder: "申请 Let's Encrypt 证书后自动生成"
                                          }, null, 8, ["value", "onUpdate:value"])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(Space), {
                                    size: 15,
                                    class: "snb-ssl-wrapper"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", null, [
                                        createVNode("div", { class: "mb8" }, "密钥(KEY)"),
                                        createVNode(unref(Textarea), {
                                          value: sslForm.key,
                                          "onUpdate:value": ($event) => sslForm.key = $event,
                                          rows: 8,
                                          placeholder: "申请 Let's Encrypt 证书后自动生成"
                                        }, null, 8, ["value", "onUpdate:value"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "mb8" }, "证书(PEM格式)"),
                                        createVNode(unref(Textarea), {
                                          value: sslForm.pem,
                                          "onUpdate:value": ($event) => sslForm.pem = $event,
                                          rows: 8,
                                          placeholder: "申请 Let's Encrypt 证书后自动生成"
                                        }, null, 8, ["value", "onUpdate:value"])
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(FormItem), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(Space), { size: 15 }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Button), {
                                        type: "primary",
                                        loading: sslLoading.value,
                                        onClick: sslSubmit
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`申请 Let&#39;s Encrypt 证书`);
                                          } else {
                                            return [
                                              createTextVNode("申请 Let's Encrypt 证书")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(Button), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`续签`);
                                          } else {
                                            return [
                                              createTextVNode("续签")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(Button), {
                                          type: "primary",
                                          loading: sslLoading.value,
                                          onClick: sslSubmit
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("申请 Let's Encrypt 证书")
                                          ]),
                                          _: 1
                                        }, 8, ["loading"]),
                                        createVNode(unref(Button), null, {
                                          default: withCtx(() => [
                                            createTextVNode("续签")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`<div class="mt20 fs12"${_scopeId4}>* 申请 Let&#39;s Encrypt 证书后，SSL 到期<b class="txt-primary"${_scopeId4}>默认自动续签</b>，若自动续签失败，请手动续签</div><div class="mt6 fs12"${_scopeId4}><b class="txt-error"${_scopeId4}>* Let&#39;s Encrypt 限制申请次数，请勿频繁申请</b>，否则可能导致申请失败</div>`);
                              } else {
                                return [
                                  createVNode(unref(Space), { size: 15 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        type: "primary",
                                        loading: sslLoading.value,
                                        onClick: sslSubmit
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("申请 Let's Encrypt 证书")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"]),
                                      createVNode(unref(Button), null, {
                                        default: withCtx(() => [
                                          createTextVNode("续签")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt20 fs12" }, [
                                    createTextVNode("* 申请 Let's Encrypt 证书后，SSL 到期"),
                                    createVNode("b", { class: "txt-primary" }, "默认自动续签"),
                                    createTextVNode("，若自动续签失败，请手动续签")
                                  ]),
                                  createVNode("div", { class: "mt6 fs12" }, [
                                    createVNode("b", { class: "txt-error" }, "* Let's Encrypt 限制申请次数，请勿频繁申请"),
                                    createTextVNode("，否则可能导致申请失败")
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(FormItem), {
                              label: "邮箱",
                              name: "email",
                              rules: [{ required: true, message: "邮箱不能为空" }]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: sslForm.email,
                                  "onUpdate:value": ($event) => sslForm.email = $event,
                                  placeholder: "请输入邮箱"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), null, {
                              default: withCtx(() => [
                                createVNode(unref(Space), {
                                  size: 15,
                                  class: "snb-ssl-wrapper"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "mb8" }, "密钥(KEY)"),
                                      createVNode(unref(Textarea), {
                                        value: sslForm.key,
                                        "onUpdate:value": ($event) => sslForm.key = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "mb8" }, "证书(PEM格式)"),
                                      createVNode(unref(Textarea), {
                                        value: sslForm.pem,
                                        "onUpdate:value": ($event) => sslForm.pem = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), null, {
                              default: withCtx(() => [
                                createVNode(unref(Space), { size: 15 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: sslLoading.value,
                                      onClick: sslSubmit
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("申请 Let's Encrypt 证书")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"]),
                                    createVNode(unref(Button), null, {
                                      default: withCtx(() => [
                                        createTextVNode("续签")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt20 fs12" }, [
                                  createTextVNode("* 申请 Let's Encrypt 证书后，SSL 到期"),
                                  createVNode("b", { class: "txt-primary" }, "默认自动续签"),
                                  createTextVNode("，若自动续签失败，请手动续签")
                                ]),
                                createVNode("div", { class: "mt6 fs12" }, [
                                  createVNode("b", { class: "txt-error" }, "* Let's Encrypt 限制申请次数，请勿频繁申请"),
                                  createTextVNode("，否则可能导致申请失败")
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "f snb-box" }, [
                      createVNode("div", { class: "snb-nav" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(nav.value, (v) => {
                          return openBlock(), createBlock("div", {
                            key: v.key,
                            class: ["item", { active: curNav.value === v.key }],
                            onClick: ($event) => onNavChange(v.key)
                          }, toDisplayString(v.name), 11, ["onClick"]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "snb-content" }, [
                        curNav.value === "domains" ? (openBlock(), createBlock("div", { key: 0 }, [
                          unref(systemInfo).nginxVersion > "0" ? (openBlock(), createBlock(unref(Form), {
                            key: 0,
                            ref_key: "domainFormRef",
                            ref: domainFormRef,
                            model: domainForm,
                            layout: "vertical"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                name: "domains",
                                rules: [{ required: true, message: "域名不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: domainForm.domains,
                                    "onUpdate:value": ($event) => domainForm.domains = $event,
                                    rows: 8,
                                    placeholder: "默认80端口，支持泛域名，自定义端口请在冒号后添加，多个域名请换行，例：\rexample.com\r*.example.com\rexample.com:443",
                                    rules: [{ required: true, message: "请填写域名" }]
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), { size: 15 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        loading: domainLoading.value,
                                        type: "primary",
                                        onClick: domainSubmit
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt20 fs12" }, [
                                    createTextVNode("* 保存后，将"),
                                    createVNode("b", { class: "txt-primary" }, "自动生成 Nginx 配置")
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode("未检测到 Nginx 环境，请先安装 Nginx 服务")
                          ], 64))
                        ])) : createCommentVNode("", true),
                        curNav.value === "nginx" ? (openBlock(), createBlock("div", { key: 1 }, [
                          unref(systemInfo).nginxVersion > "0" ? (openBlock(), createBlock(unref(Form), {
                            key: 0,
                            ref_key: "nginxFormRef",
                            ref: nginxFormRef,
                            model: nginxForm,
                            layout: "vertical"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), { name: "nginxConf" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Spin), { spinning: nginxFetching.value }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Textarea), {
                                        value: nginxForm.nginxConf,
                                        "onUpdate:value": ($event) => nginxForm.nginxConf = $event,
                                        rows: 15
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ]),
                                    _: 1
                                  }, 8, ["spinning"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), {
                                    size: 15,
                                    class: "mt20"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        loading: nginxSaving.value,
                                        onClick: onNginxConfSave
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode("未检测到 Nginx 环境，请先安装 Nginx 服务")
                          ], 64))
                        ])) : createCommentVNode("", true),
                        curNav.value === "ssl" ? (openBlock(), createBlock(unref(Form), {
                          key: 2,
                          ref_key: "sslFormRef",
                          ref: sslFormRef,
                          model: sslForm,
                          layout: "vertical"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), {
                              label: "邮箱",
                              name: "email",
                              rules: [{ required: true, message: "邮箱不能为空" }]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: sslForm.email,
                                  "onUpdate:value": ($event) => sslForm.email = $event,
                                  placeholder: "请输入邮箱"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), null, {
                              default: withCtx(() => [
                                createVNode(unref(Space), {
                                  size: 15,
                                  class: "snb-ssl-wrapper"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "mb8" }, "密钥(KEY)"),
                                      createVNode(unref(Textarea), {
                                        value: sslForm.key,
                                        "onUpdate:value": ($event) => sslForm.key = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "mb8" }, "证书(PEM格式)"),
                                      createVNode(unref(Textarea), {
                                        value: sslForm.pem,
                                        "onUpdate:value": ($event) => sslForm.pem = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), null, {
                              default: withCtx(() => [
                                createVNode(unref(Space), { size: 15 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: sslLoading.value,
                                      onClick: sslSubmit
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("申请 Let's Encrypt 证书")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"]),
                                    createVNode(unref(Button), null, {
                                      default: withCtx(() => [
                                        createTextVNode("续签")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt20 fs12" }, [
                                  createTextVNode("* 申请 Let's Encrypt 证书后，SSL 到期"),
                                  createVNode("b", { class: "txt-primary" }, "默认自动续签"),
                                  createTextVNode("，若自动续签失败，请手动续签")
                                ]),
                                createVNode("div", { class: "mt6 fs12" }, [
                                  createVNode("b", { class: "txt-error" }, "* Let's Encrypt 限制申请次数，请勿频繁申请"),
                                  createTextVNode("，否则可能导致申请失败")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model"])) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "sites-nginx-body" }, [
                createVNode("hr", { class: "mt20 mb0" }),
                createVNode(unref(Spin), {
                  spinning: unref(systemInfo).loading
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "f snb-box" }, [
                      createVNode("div", { class: "snb-nav" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(nav.value, (v) => {
                          return openBlock(), createBlock("div", {
                            key: v.key,
                            class: ["item", { active: curNav.value === v.key }],
                            onClick: ($event) => onNavChange(v.key)
                          }, toDisplayString(v.name), 11, ["onClick"]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "snb-content" }, [
                        curNav.value === "domains" ? (openBlock(), createBlock("div", { key: 0 }, [
                          unref(systemInfo).nginxVersion > "0" ? (openBlock(), createBlock(unref(Form), {
                            key: 0,
                            ref_key: "domainFormRef",
                            ref: domainFormRef,
                            model: domainForm,
                            layout: "vertical"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), {
                                name: "domains",
                                rules: [{ required: true, message: "域名不能为空" }]
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Textarea), {
                                    value: domainForm.domains,
                                    "onUpdate:value": ($event) => domainForm.domains = $event,
                                    rows: 8,
                                    placeholder: "默认80端口，支持泛域名，自定义端口请在冒号后添加，多个域名请换行，例：\rexample.com\r*.example.com\rexample.com:443",
                                    rules: [{ required: true, message: "请填写域名" }]
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), { size: 15 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        loading: domainLoading.value,
                                        type: "primary",
                                        onClick: domainSubmit
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "mt20 fs12" }, [
                                    createTextVNode("* 保存后，将"),
                                    createVNode("b", { class: "txt-primary" }, "自动生成 Nginx 配置")
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode("未检测到 Nginx 环境，请先安装 Nginx 服务")
                          ], 64))
                        ])) : createCommentVNode("", true),
                        curNav.value === "nginx" ? (openBlock(), createBlock("div", { key: 1 }, [
                          unref(systemInfo).nginxVersion > "0" ? (openBlock(), createBlock(unref(Form), {
                            key: 0,
                            ref_key: "nginxFormRef",
                            ref: nginxFormRef,
                            model: nginxForm,
                            layout: "vertical"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FormItem), { name: "nginxConf" }, {
                                default: withCtx(() => [
                                  createVNode(unref(Spin), { spinning: nginxFetching.value }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Textarea), {
                                        value: nginxForm.nginxConf,
                                        "onUpdate:value": ($event) => nginxForm.nginxConf = $event,
                                        rows: 15
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ]),
                                    _: 1
                                  }, 8, ["spinning"])
                                ]),
                                _: 1
                              }),
                              createVNode(unref(FormItem), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Space), {
                                    size: 15,
                                    class: "mt20"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Button), {
                                        loading: nginxSaving.value,
                                        onClick: onNginxConfSave
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("保存")
                                        ]),
                                        _: 1
                                      }, 8, ["loading"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode("未检测到 Nginx 环境，请先安装 Nginx 服务")
                          ], 64))
                        ])) : createCommentVNode("", true),
                        curNav.value === "ssl" ? (openBlock(), createBlock(unref(Form), {
                          key: 2,
                          ref_key: "sslFormRef",
                          ref: sslFormRef,
                          model: sslForm,
                          layout: "vertical"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(FormItem), {
                              label: "邮箱",
                              name: "email",
                              rules: [{ required: true, message: "邮箱不能为空" }]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Input), {
                                  value: sslForm.email,
                                  "onUpdate:value": ($event) => sslForm.email = $event,
                                  placeholder: "请输入邮箱"
                                }, null, 8, ["value", "onUpdate:value"])
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), null, {
                              default: withCtx(() => [
                                createVNode(unref(Space), {
                                  size: 15,
                                  class: "snb-ssl-wrapper"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "mb8" }, "密钥(KEY)"),
                                      createVNode(unref(Textarea), {
                                        value: sslForm.key,
                                        "onUpdate:value": ($event) => sslForm.key = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "mb8" }, "证书(PEM格式)"),
                                      createVNode(unref(Textarea), {
                                        value: sslForm.pem,
                                        "onUpdate:value": ($event) => sslForm.pem = $event,
                                        rows: 8,
                                        placeholder: "申请 Let's Encrypt 证书后自动生成"
                                      }, null, 8, ["value", "onUpdate:value"])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(FormItem), null, {
                              default: withCtx(() => [
                                createVNode(unref(Space), { size: 15 }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Button), {
                                      type: "primary",
                                      loading: sslLoading.value,
                                      onClick: sslSubmit
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("申请 Let's Encrypt 证书")
                                      ]),
                                      _: 1
                                    }, 8, ["loading"]),
                                    createVNode(unref(Button), null, {
                                      default: withCtx(() => [
                                        createTextVNode("续签")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt20 fs12" }, [
                                  createTextVNode("* 申请 Let's Encrypt 证书后，SSL 到期"),
                                  createVNode("b", { class: "txt-primary" }, "默认自动续签"),
                                  createTextVNode("，若自动续签失败，请手动续签")
                                ]),
                                createVNode("div", { class: "mt6 fs12" }, [
                                  createVNode("b", { class: "txt-error" }, "* Let's Encrypt 限制申请次数，请勿频繁申请"),
                                  createTextVNode("，否则可能导致申请失败")
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model"])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["spinning"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/sites/nginxModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const preadmin = computed(() => globalStore.preadmin);
    const systemInfo = ref({ loading: true });
    provide("systemInfo", systemInfo);
    const searchState = reactive({
      keyword: ""
    });
    const mapStatus = {
      active: "运行中",
      stop: "停止",
      restart: "重启中"
    };
    const list = ref([]);
    const mapSiteNickname = computed(() => {
      const names = {};
      list.value.forEach((v) => {
        names[v.name] = v;
      });
      return names;
    });
    const tableLoading = ref(false);
    const selectedRowKeys = ref([]);
    const pagination = reactive({
      current: 1,
      pageSize: 20,
      pageSizeOptions: [20, 50, 200, 500],
      total: 0,
      showQuickJumper: true,
      position: ["bottomCenter"]
    });
    provide("mapSiteNickname", mapSiteNickname);
    const showSingleControl = ref(false);
    const showGroupControl = ref(false);
    const curSite = ref({});
    const singleToGroupKeys = ref([]);
    const groupToGroupKeys = ref([]);
    const singleToGroup = ref([]);
    const showNginxModal = ref(false);
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
          query.keywordby = "name,link";
          query.keyword = searchState.keyword;
        }
        query.fieldby = query.fieldby.join(",");
        query.field = query.field.join(",");
        list.value = [];
        await sites.list({ query }).then((res) => {
          var _a;
          ssrStore.sites = list.value = ((_a = res.list) == null ? void 0 : _a.map((v) => {
            var _a2;
            v.domains = ((_a2 = v.domains) == null ? void 0 : _a2.split("\n")) || [];
            if (v.domains.length) {
              v.origin += `https://${v.domains[0]}`;
            } else {
              v.origin = `http://${ssrStore.localIP}:${v.port}`;
            }
            return v;
          })) || [];
          pagination.total = res.total;
        });
      } finally {
        tableLoading.value = false;
      }
    };
    const onReset = () => {
      searchState.keyword = "";
    };
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys;
    };
    const onTableChange = (paginate, filters, _sorter) => {
      pagination.current = paginate.current;
      pagination.pageSize = paginate.pageSize;
      sorter = _sorter;
      fetchList();
    };
    const stopHandle = async (name) => {
      await stopSite({ name }).then(() => {
        message.success("操作成功");
        fetchList();
      });
    };
    const startHandle = async (name) => {
      await startSite({ name }).then(() => {
        message.success("操作成功");
        fetchList();
      });
    };
    const restartHandle = async (name) => {
      if (ssrStore.appname === name) {
        await restartThisSite().then(() => {
          setTimeout(() => {
            location.reload();
          }, 1500);
        });
      } else {
        await restartSite({ name }).then(() => {
          message.success("操作成功");
          fetchList();
        });
      }
    };
    const delHandle = async (name) => {
      Modal.confirm({
        title: `确认删除 ${name} 站点？`,
        content: "删除后将无法恢复，请谨慎操作！",
        centered: true,
        onOk() {
          return new Promise((resolve, reject) => {
            deleteSite({ name }).then(() => {
              message.success("删除成功");
              fetchList();
              resolve();
            }).catch(reject);
          });
        }
      });
    };
    const onMoreOptions = async ({ key }, record) => {
      try {
        record.loading = true;
        curSite.value = record;
        switch (key) {
          case "stop":
            await stopHandle(record.name);
            break;
          case "start":
            await startHandle(record.name);
            break;
          case "restart":
            await restartHandle(record.name);
            break;
          case "single":
            showSingleControl.value = true;
            singleToGroup.value = record.singleToGroup;
            singleToGroupKeys.value = record.singleToGroupKeys;
            break;
          case "group":
            showGroupControl.value = true;
            groupToGroupKeys.value = record.groupToGroupKeys;
            break;
          case "del":
            if (record.status === "active")
              return message.error("请先停止站点");
            await delHandle(record.name);
            break;
          case "nginx":
            showNginxModal.value = true;
            break;
        }
      } finally {
        record.loading = false;
      }
    };
    const onSearch = async () => {
    };
    onActivated(() => {
      fetchList();
      getSystemInfo().then((res) => {
        res.loading = false;
        systemInfo.value = res || {};
      });
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
                  _push3(`站点管理`);
                } else {
                  return [
                    createTextVNode("站点管理")
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
                  createTextVNode("站点管理")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel pt20 pl20 pb20 pr20 mt14 post-list-page">`);
      _push(ssrRenderComponent(unref(Flex), { justify: "space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Space), { wrap: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    to: `/${preadmin.value}/sites/edit`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Button), { type: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`添加站点`);
                            } else {
                              return [
                                createTextVNode("添加站点")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Button), { type: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("添加站点")
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
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}/sites/edit`
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Button), { type: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("添加站点")
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
                  _push3(ssrRenderComponent(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "站点名称/关键词"
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
                      placeholder: "站点名称/关键词"
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
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/sites/edit`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), { type: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("添加站点")
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
                  createVNode(unref(Input), {
                    value: searchState.keyword,
                    "onUpdate:value": ($event) => searchState.keyword = $event,
                    placeholder: "站点名称/关键词"
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
          { title: "站点名称(ID)", dataIndex: "nickName", ellipsis: true },
          { title: "端口", dataIndex: "port" },
          { title: "添加时间", dataIndex: "_id" },
          { title: "状态", dataIndex: "status", align: "center", fixed: "right", width: 80 },
          { title: "操作", dataIndex: "ctrl", align: "right", fixed: "right", width: 210 }
        ],
        "data-source": list.value,
        size: "small",
        loading: tableLoading.value,
        pagination,
        "row-selection": { selectedRowKeys: selectedRowKeys.value, onChange: onSelectChange },
        rowKey: "_id",
        onChange: onTableChange
      }, {
        bodyCell: withCtx(({ column, record }, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (column.dataIndex === "nickName") {
              _push2(`<div${_scopeId}>${ssrInterpolate(record.nickName)} <span class="sugar-grey fs12" style="${ssrRenderStyle({ borderRadius: "5px", padding: "1px 5px" })}"${_scopeId}>${ssrInterpolate(record.name)}</span></div>`);
            } else if (column.dataIndex === "status") {
              _push2(ssrRenderComponent(unref(Tag), {
                bordered: false,
                color: record.status === "active" ? "success" : "error"
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
            } else if (column.dataIndex === "_id") {
              _push2(`<!--[-->${ssrInterpolate(unref(dateFromID)(record._id))}<!--]-->`);
            } else if (column.dataIndex === "domains") {
              _push2(`<!--[-->`);
              if ((_a = record.domains) == null ? void 0 : _a.length) {
                _push2(`<div class="pointer"${_scopeId}>`);
                if (record.domains.length > 2) {
                  _push2(ssrRenderComponent(unref(Tooltip), {
                    title: record.domains.join(",")
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(Space), { size: 5 }, {
                          default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<!--[-->`);
                              ssrRenderList(record.domains.slice(0, 2), (v, i) => {
                                _push4(`<span class="sugar-primary"${_scopeId3}>${ssrInterpolate(v)}</span>`);
                              });
                              _push4(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(record.domains.slice(0, 2), (v, i) => {
                                  return openBlock(), createBlock("span", {
                                    class: "sugar-primary",
                                    key: i
                                  }, toDisplayString(v), 1);
                                }), 128))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(Space), { size: 5 }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(record.domains.slice(0, 2), (v, i) => {
                                return openBlock(), createBlock("span", {
                                  class: "sugar-primary",
                                  key: i
                                }, toDisplayString(v), 1);
                              }), 128))
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
                _push2(`</div>`);
              } else {
                _push2(`<span${_scopeId}><span class="sugar-primary pointer"${_scopeId}>配置</span></span>`);
              }
              _push2(`<!--]-->`);
            } else if (column.dataIndex === "ssl") {
              _push2(`<!--[-->`);
              if (record.ssl) {
                _push2(`<!--[--><!--]-->`);
              } else {
                _push2(`<span class="sugar-primary pointer"${_scopeId}>免费申请</span>`);
              }
              _push2(`<!--]-->`);
            } else if (column.dataIndex === "ctrl") {
              _push2(ssrRenderComponent(unref(Space), null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_RouterLink, {
                      to: `/${preadmin.value}/sites/edit/${record._id}?name=${record.name}`
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), {
                            type: "primary",
                            size: "small",
                            loading: record.loading
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
                              size: "small",
                              loading: record.loading
                            }, {
                              default: withCtx(() => [
                                createTextVNode("编辑")
                              ]),
                              _: 2
                            }, 1032, ["loading"])
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
                                _push5(ssrRenderComponent(unref(MenuItem), {
                                  key: "start",
                                  disabled: record.type === "main" || record.status === "active"
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`启动`);
                                    } else {
                                      return [
                                        createTextVNode("启动")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), {
                                  key: "stop",
                                  disabled: record.type === "main" || unref(ssrStore).appname === record.name || record.status !== "active"
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`停止`);
                                    } else {
                                      return [
                                        createTextVNode("停止")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), {
                                  key: "restart",
                                  disabled: record.status === "stop"
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`重启`);
                                    } else {
                                      return [
                                        createTextVNode("重启")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "single" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`站点同步（一对多）`);
                                    } else {
                                      return [
                                        createTextVNode("站点同步（一对多）")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), { key: "group" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`站点同步（多对多）`);
                                    } else {
                                      return [
                                        createTextVNode("站点同步（多对多）")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(MenuItem), {
                                  key: "del",
                                  disabled: record.type === "main"
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<span class="${ssrRenderClass({ "txt-error": record.type !== "main" })}"${_scopeId5}>删除</span>`);
                                    } else {
                                      return [
                                        createVNode("span", {
                                          class: { "txt-error": record.type !== "main" }
                                        }, "删除", 2)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(MenuItem), {
                                    key: "start",
                                    disabled: record.type === "main" || record.status === "active"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("启动")
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled"]),
                                  createVNode(unref(MenuItem), {
                                    key: "stop",
                                    disabled: record.type === "main" || unref(ssrStore).appname === record.name || record.status !== "active"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("停止")
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled"]),
                                  createVNode(unref(MenuItem), {
                                    key: "restart",
                                    disabled: record.status === "stop"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("重启")
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled"]),
                                  createVNode(unref(MenuItem), { key: "single" }, {
                                    default: withCtx(() => [
                                      createTextVNode("站点同步（一对多）")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), { key: "group" }, {
                                    default: withCtx(() => [
                                      createTextVNode("站点同步（多对多）")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(MenuItem), {
                                    key: "del",
                                    disabled: record.type === "main"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", {
                                        class: { "txt-error": record.type !== "main" }
                                      }, "删除", 2)
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled"])
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
                                createVNode(unref(MenuItem), {
                                  key: "start",
                                  disabled: record.type === "main" || record.status === "active"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("启动")
                                  ]),
                                  _: 2
                                }, 1032, ["disabled"]),
                                createVNode(unref(MenuItem), {
                                  key: "stop",
                                  disabled: record.type === "main" || unref(ssrStore).appname === record.name || record.status !== "active"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("停止")
                                  ]),
                                  _: 2
                                }, 1032, ["disabled"]),
                                createVNode(unref(MenuItem), {
                                  key: "restart",
                                  disabled: record.status === "stop"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("重启")
                                  ]),
                                  _: 2
                                }, 1032, ["disabled"]),
                                createVNode(unref(MenuItem), { key: "single" }, {
                                  default: withCtx(() => [
                                    createTextVNode("站点同步（一对多）")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), { key: "group" }, {
                                  default: withCtx(() => [
                                    createTextVNode("站点同步（多对多）")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(MenuItem), {
                                  key: "del",
                                  disabled: record.type === "main"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", {
                                      class: { "txt-error": record.type !== "main" }
                                    }, "删除", 2)
                                  ]),
                                  _: 2
                                }, 1032, ["disabled"])
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ];
                        }
                      }),
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Button), {
                            size: "small",
                            loading: record.loading
                          }, {
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
                            createVNode(unref(Button), {
                              size: "small",
                              loading: record.loading
                            }, {
                              default: withCtx(() => [
                                createTextVNode("...")
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
                      createVNode(_component_RouterLink, {
                        to: `/${preadmin.value}/sites/edit/${record._id}?name=${record.name}`
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Button), {
                            type: "primary",
                            size: "small",
                            loading: record.loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("编辑")
                            ]),
                            _: 2
                          }, 1032, ["loading"])
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(unref(Dropdown), null, {
                        overlay: withCtx(() => [
                          createVNode(unref(Menu), {
                            onClick: (e) => onMoreOptions(e, record)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MenuItem), {
                                key: "start",
                                disabled: record.type === "main" || record.status === "active"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("启动")
                                ]),
                                _: 2
                              }, 1032, ["disabled"]),
                              createVNode(unref(MenuItem), {
                                key: "stop",
                                disabled: record.type === "main" || unref(ssrStore).appname === record.name || record.status !== "active"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("停止")
                                ]),
                                _: 2
                              }, 1032, ["disabled"]),
                              createVNode(unref(MenuItem), {
                                key: "restart",
                                disabled: record.status === "stop"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("重启")
                                ]),
                                _: 2
                              }, 1032, ["disabled"]),
                              createVNode(unref(MenuItem), { key: "single" }, {
                                default: withCtx(() => [
                                  createTextVNode("站点同步（一对多）")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), { key: "group" }, {
                                default: withCtx(() => [
                                  createTextVNode("站点同步（多对多）")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(MenuItem), {
                                key: "del",
                                disabled: record.type === "main"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", {
                                    class: { "txt-error": record.type !== "main" }
                                  }, "删除", 2)
                                ]),
                                _: 2
                              }, 1032, ["disabled"])
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        default: withCtx(() => [
                          createVNode(unref(Button), {
                            size: "small",
                            loading: record.loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("...")
                            ]),
                            _: 2
                          }, 1032, ["loading"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!--[-->${ssrInterpolate(record[column.dataIndex] || "-")}<!--]-->`);
            }
          } else {
            return [
              column.dataIndex === "nickName" ? (openBlock(), createBlock("div", { key: 0 }, [
                createTextVNode(toDisplayString(record.nickName) + " ", 1),
                createVNode("span", {
                  class: "sugar-grey fs12",
                  style: { borderRadius: "5px", padding: "1px 5px" }
                }, toDisplayString(record.name), 1)
              ])) : column.dataIndex === "status" ? (openBlock(), createBlock(unref(Tag), {
                key: 1,
                bordered: false,
                color: record.status === "active" ? "success" : "error"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(mapStatus[record.status]), 1)
                ]),
                _: 2
              }, 1032, ["color"])) : column.dataIndex === "_id" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                createTextVNode(toDisplayString(unref(dateFromID)(record._id)), 1)
              ], 64)) : column.dataIndex === "domains" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                ((_b = record.domains) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "pointer",
                  onClick: ($event) => onMoreOptions({ key: "nginx" }, record)
                }, [
                  record.domains.length > 2 ? (openBlock(), createBlock(unref(Tooltip), {
                    key: 0,
                    title: record.domains.join(",")
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Space), { size: 5 }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(record.domains.slice(0, 2), (v, i) => {
                            return openBlock(), createBlock("span", {
                              class: "sugar-primary",
                              key: i
                            }, toDisplayString(v), 1);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["title"])) : createCommentVNode("", true)
                ], 8, ["onClick"])) : (openBlock(), createBlock("span", { key: 1 }, [
                  createVNode("span", {
                    class: "sugar-primary pointer",
                    onClick: ($event) => onMoreOptions({ key: "nginx" }, record)
                  }, "配置", 8, ["onClick"])
                ]))
              ], 64)) : column.dataIndex === "ssl" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                record.ssl ? (openBlock(), createBlock(Fragment, { key: 0 }, [], 64)) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "sugar-primary pointer"
                }, "免费申请"))
              ], 64)) : column.dataIndex === "ctrl" ? (openBlock(), createBlock(unref(Space), { key: 5 }, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}/sites/edit/${record._id}?name=${record.name}`
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        type: "primary",
                        size: "small",
                        loading: record.loading
                      }, {
                        default: withCtx(() => [
                          createTextVNode("编辑")
                        ]),
                        _: 2
                      }, 1032, ["loading"])
                    ]),
                    _: 2
                  }, 1032, ["to"]),
                  createVNode(unref(Dropdown), null, {
                    overlay: withCtx(() => [
                      createVNode(unref(Menu), {
                        onClick: (e) => onMoreOptions(e, record)
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(MenuItem), {
                            key: "start",
                            disabled: record.type === "main" || record.status === "active"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("启动")
                            ]),
                            _: 2
                          }, 1032, ["disabled"]),
                          createVNode(unref(MenuItem), {
                            key: "stop",
                            disabled: record.type === "main" || unref(ssrStore).appname === record.name || record.status !== "active"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("停止")
                            ]),
                            _: 2
                          }, 1032, ["disabled"]),
                          createVNode(unref(MenuItem), {
                            key: "restart",
                            disabled: record.status === "stop"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("重启")
                            ]),
                            _: 2
                          }, 1032, ["disabled"]),
                          createVNode(unref(MenuItem), { key: "single" }, {
                            default: withCtx(() => [
                              createTextVNode("站点同步（一对多）")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), { key: "group" }, {
                            default: withCtx(() => [
                              createTextVNode("站点同步（多对多）")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(MenuItem), {
                            key: "del",
                            disabled: record.type === "main"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: { "txt-error": record.type !== "main" }
                              }, "删除", 2)
                            ]),
                            _: 2
                          }, 1032, ["disabled"])
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    default: withCtx(() => [
                      createVNode(unref(Button), {
                        size: "small",
                        loading: record.loading
                      }, {
                        default: withCtx(() => [
                          createTextVNode("...")
                        ]),
                        _: 2
                      }, 1032, ["loading"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)) : (openBlock(), createBlock(Fragment, { key: 6 }, [
                createTextVNode(toDisplayString(record[column.dataIndex] || "-"), 1)
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        show: showSingleControl.value,
        "onUpdate:show": ($event) => showSingleControl.value = $event,
        singleToGroupKeys: singleToGroupKeys.value,
        singleToGroup: singleToGroup.value,
        siteName: curSite.value.name,
        sites: list.value,
        onSaved: fetchList
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        show: showGroupControl.value,
        "onUpdate:show": ($event) => showGroupControl.value = $event,
        groupToGroupKeys: groupToGroupKeys.value,
        siteName: curSite.value.name,
        sites: list.value,
        onSaved: fetchList
      }, null, _parent));
      if (showNginxModal.value) {
        _push(ssrRenderComponent(_sfc_main$1, {
          show: showNginxModal.value,
          "onUpdate:show": ($event) => showNginxModal.value = $event,
          site: curSite.value
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/sites/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
