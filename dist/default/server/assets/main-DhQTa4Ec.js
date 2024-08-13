import { inject, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, ref, computed, provide, reactive, watchEffect, onMounted, nextTick, onBeforeUnmount, resolveComponent, resolveDirective, createTextVNode, openBlock, createBlock, Fragment, renderList, withModifiers, withDirectives, createCommentVNode, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrGetDirectiveProps } from "vue/server-renderer";
import { Tooltip, Button, Checkbox, Popconfirm, Spin, Space, Empty, Pagination, Modal, Form, FormItem, Input, Image, message } from "ant-design-vue";
import { f as byteFormat, a as copy } from "./common-ZcIx5rAG.js";
import { e as cloud } from "./index-0psH9gUa.js";
import { r as request, u as useGLobalStore } from "../entry-server.js";
import "crypto-js";
const addNetPicture = (body) => {
  return request("/api/v1/admin/cloud/netpic", {
    method: "POST",
    body: JSON.stringify(body)
  });
};
const _sfc_main$3 = {
  __name: "statusList",
  __ssrInlineRender: true,
  setup(__props) {
    const uploadStatusList = inject("uploadStatusList", []);
    const show = inject("showUploadStatus", false);
    const onCancel = (v) => {
      var _a;
      v.err = 1;
      v.msg = "已取消";
      (_a = v.xhr) == null ? void 0 : _a.abort();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cloud-upload-status-list" }, _attrs))}>`);
      if (unref(show) && unref(uploadStatusList).length) {
        _push(`<div class="status-wrapper"><div class="f jb ac head"><b>上传进度</b><span class="close">×</span></div><div class="status-list scroll"><!--[-->`);
        ssrRenderList(unref(uploadStatusList), (v, i) => {
          _push(`<div class="f ac item"><div class="left"><div class="progress-wrapper"><div class="${ssrRenderClass([{ done: v.err || v.ok }, "progress-bar"])}" style="${ssrRenderStyle({ width: `${v.percent || 0}%`, background: v.err ? "var(--error)" : "var(--success)" })}"></div></div><div class="f jb ac fs12 mt4">`);
          _push(ssrRenderComponent(unref(Tooltip), {
            title: v.name,
            class: "filename"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="nowrap txt-ellipsis"${_scopeId}>${ssrInterpolate(v.name)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "nowrap txt-ellipsis" }, toDisplayString(v.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<span>`);
          if (!v.ok && v.loaded) {
            _push(`<!--[-->${ssrInterpolate(unref(byteFormat)(v.loaded))}/<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`${ssrInterpolate(v.sizeInfo || "处理中")}</span></div></div><div class="right">`);
          _push(ssrRenderComponent(unref(Tooltip), {
            title: v.ok ? "完成" : v.err ? v.msg || "已取消" : "取消"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="${ssrRenderClass([{ "txt-success": v.ok, "txt-error": v.err }, "fs11 cancel txt-ellipsis"])}"${_scopeId}>${ssrInterpolate(v.ok ? "完成" : v.err ? v.msg || "已取消" : "取消")}</span>`);
              } else {
                return [
                  createVNode("span", {
                    class: ["fs11 cancel txt-ellipsis", { "txt-success": v.ok, "txt-error": v.err }],
                    onClick: ($event) => onCancel(v)
                  }, toDisplayString(v.ok ? "完成" : v.err ? v.msg || "已取消" : "取消"), 11, ["onClick"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else if (unref(uploadStatusList).length) {
        _push(`<div class="status-show-btn">»</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/cloud/modules/statusList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "localUpload",
  __ssrInlineRender: true,
  emits: ["uploaded", "error", "beforeUpload"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const globalStore = useGLobalStore();
    computed(() => globalStore.cloud || {});
    inject("uploadStatusList", []);
    inject("showUploadStatus", false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cloud-upload" }, _attrs))}><span class="upload-btn">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<input type="file" name="files" multiple></span></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/cloud/modules/localUpload.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "TGUpload",
  __ssrInlineRender: true,
  emits: ["uploaded", "error", "beforeUpload"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const globalStore = useGLobalStore();
    const cloudSetting = computed(() => globalStore.cloud || {});
    inject("uploadStatusList", []);
    inject("showUploadStatus", false);
    `${cloudSetting.value.tgDomain}/bot${cloudSetting.value.tgToken}`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cloud-upload" }, _attrs))}><span class="upload-btn">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<input type="file" name="files" multiple></span></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/cloud/modules/TGUpload.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "main",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const bodyRef = ref(null);
    const globalStore = useGLobalStore();
    const cloudSetting = computed(() => globalStore.cloud || {});
    const mapPlatform = ["本地", "网络", "TG", "TGCF"];
    const mapFileType = {
      video: "video-file",
      audio: "audio",
      app: "app",
      zip: "zip"
    };
    const list = ref([]);
    const loading = ref(true);
    const deleting = ref(false);
    const uploading = ref(false);
    const uploadStatusList = ref([]);
    const showUploadStatus = ref(false);
    provide("uploadStatusList", uploadStatusList);
    provide("showUploadStatus", showUploadStatus);
    const pagination = reactive({
      current: 1,
      pageSize: 20,
      total: 0
    });
    const showNetworkPic = ref(false);
    const netpicFormRef = ref(null);
    const netpicConfirmLoading = ref(false);
    const netpicForm = reactive({
      src: "",
      alt: ""
    });
    const selectedList = ref([]);
    let withCtrl = false;
    let withShift = false;
    let lastClickItemIndex = -1;
    watchEffect(() => {
      emits("update:modelValue", selectedList.value.map((selectedId) => {
        const idx = list.value.findIndex((v) => v._id === selectedId);
        return list.value[idx];
      }));
    });
    const fetchList = async () => {
      loading.value = true;
      await cloud.list({
        query: {
          current: pagination.current,
          pageSize: pagination.pageSize
        }
      }).then((res) => {
        list.value = (res.list || []).map((file) => {
          switch (file.platform) {
            case 0:
              file.src = `/${file.src}?180`;
              break;
            case 2:
              file.tgSrc = `${cloudSetting.value.tgDomain}/${file.src}`;
              break;
            case 3:
              file.cfSrc = `${cloudSetting.value.staticDomain}/${file.src}`;
              break;
          }
          return file;
        });
        pagination.total = res.total || 0;
      });
      loading.value = false;
    };
    const onDel = async () => {
      if (selectedList.value.length === 0)
        return message.error("未选中删除目标");
      try {
        deleting.value = true;
        await cloud.del({
          ids: selectedList.value
        }).then(() => {
          message.success("删除成功");
          fetchList();
          checkall.value = false;
        });
      } finally {
        deleting.value = false;
      }
    };
    const netPicPost = async () => {
      try {
        netpicConfirmLoading.value = true;
        await netpicFormRef.value.validate();
        await addNetPicture(toRaw(netpicForm)).then(() => {
          message.success("添加成功");
          fetchList();
          netpicForm.src = "";
          netpicForm.alt = "";
          showNetworkPic.value = false;
        });
      } finally {
        netpicConfirmLoading.value = false;
      }
    };
    const onBeforeUpload = () => {
      uploading.value = true;
    };
    const onUploaded = () => {
      fetchList();
      uploading.value = false;
    };
    const curPreview = ref("");
    const showPreview = ref(false);
    const onPreview = async (record) => {
      curPreview.value = record.blobSrc || record.src;
      showPreview.value = true;
    };
    const onPreviewHide = () => {
      curPreview.value = "";
      showPreview.value = false;
    };
    const onCopy = (record) => {
      let url;
      const localurl = location.origin;
      switch (record.platform) {
        case 0:
          url = `${localurl}${record.src}`;
          break;
        case 2:
          url = `${cloudSetting.value.tgDomain}/${record.src}`;
          break;
        case 3:
          url = `${cloudSetting.value.staticDomain}/${record.src}`;
          break;
        default:
          url = record.src;
      }
      copy(url).then(() => message.success("链接复制成功")).catch(() => message.error("链接复制失败"));
    };
    const onSelected = (v, i) => {
      if (withCtrl) {
        const existIndex = selectedList.value.findIndex((_) => _ === v._id);
        if (existIndex > -1)
          selectedList.value.splice(existIndex, 1);
        else
          selectedList.value.push(v._id);
      } else if (withShift) {
        const toRight = i >= lastClickItemIndex;
        let selected = toRight ? list.value.slice(lastClickItemIndex, i + 1) : list.value.slice(i, lastClickItemIndex + 1);
        if (!toRight)
          selected = selected.reverse();
        selected.forEach((selectedItem) => {
          const existIndex = selectedList.value.findIndex((_) => _ === selectedItem._id);
          if (existIndex === -1)
            selectedList.value.push(selectedItem._id);
        });
      } else if (selectedList.value[0] === v._id) {
        selectedList.value = [];
      } else {
        selectedList.value = [v._id];
      }
      lastClickItemIndex = i;
    };
    const checkall = ref(false);
    const onCheckAll = (e) => {
      if (e.target.checked) {
        selectedList.value = list.value.map((v) => v._id);
      } else {
        selectedList.value = [];
      }
    };
    const keydownFn = (e) => {
      if (e.key === "Control" && navigator.platform.indexOf("Mac") === -1 || e.key === "Meta") {
        withCtrl = true;
      } else if (e.key === "Shift") {
        withShift = true;
      }
    };
    const keyupFn = () => {
      withCtrl = false;
      withShift = false;
      lastClickItemIndex = -1;
    };
    const clickOutside = () => {
      selectedList.value = [];
    };
    const cfImgLoaded = (event, fileInfo) => {
      fileInfo.blobSrc = event.target.src;
    };
    onMounted(() => {
      nextTick(() => {
        const cloudBodyWidth = bodyRef.value.offsetWidth - 24;
        const itemWidth = 176;
        const countInRow = Math.floor(cloudBodyWidth / itemWidth);
        pagination.pageSize = countInRow * 3;
        fetchList();
      });
      document.addEventListener("keydown", keydownFn);
      document.addEventListener("keyup", keyupFn);
      document.addEventListener("click", clickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", keydownFn);
      document.removeEventListener("keyup", keyupFn);
      document.removeEventListener("click", clickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MIcon = resolveComponent("MIcon");
      const _component_MIconJs = resolveComponent("MIconJs");
      const _directive_depic = resolveDirective("depic");
      _push(`<!--[--><div class="cloud-main"><div class="cloud-toolsbar f ac"><div class="f ac">`);
      _push(ssrRenderComponent(unref(Button), {
        type: "text",
        onClick: () => {
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Checkbox), {
              checked: checkall.value,
              "onUpdate:checked": ($event) => checkall.value = $event,
              onChange: onCheckAll
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`全选`);
                } else {
                  return [
                    createTextVNode("全选")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Checkbox), {
                checked: checkall.value,
                "onUpdate:checked": ($event) => checkall.value = $event,
                onChange: onCheckAll
              }, {
                default: withCtx(() => [
                  createTextVNode("全选")
                ]),
                _: 1
              }, 8, ["checked", "onUpdate:checked"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="divider-vertical"></span>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        class: { "event-none": uploading.value },
        onBeforeUpload,
        onUploaded
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Button), {
              type: "text",
              loading: uploading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_MIcon, {
                    name: "upload",
                    class: "mr4"
                  }, null, _parent3, _scopeId2));
                  _push3(`本地上传 `);
                } else {
                  return [
                    createVNode(_component_MIcon, {
                      name: "upload",
                      class: "mr4"
                    }),
                    createTextVNode("本地上传 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Button), {
                type: "text",
                loading: uploading.value
              }, {
                default: withCtx(() => [
                  createVNode(_component_MIcon, {
                    name: "upload",
                    class: "mr4"
                  }),
                  createTextVNode("本地上传 ")
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        class: { "event-none": uploading.value },
        onBeforeUpload,
        onUploaded
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Button), {
              type: "text",
              loading: uploading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_MIcon, {
                    name: "cloudup",
                    class: "mr4"
                  }, null, _parent3, _scopeId2));
                  _push3(`云上传 `);
                } else {
                  return [
                    createVNode(_component_MIcon, {
                      name: "cloudup",
                      class: "mr4"
                    }),
                    createTextVNode("云上传 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Button), {
                type: "text",
                loading: uploading.value
              }, {
                default: withCtx(() => [
                  createVNode(_component_MIcon, {
                    name: "cloudup",
                    class: "mr4"
                  }),
                  createTextVNode("云上传 ")
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Button), {
        type: "text",
        onClick: () => showNetworkPic.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_MIcon, {
              name: "earth",
              class: "mr4"
            }, null, _parent2, _scopeId));
            _push2(`网络资源 `);
          } else {
            return [
              createVNode(_component_MIcon, {
                name: "earth",
                class: "mr4"
              }),
              createTextVNode("网络资源 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="divider-vertical"></span>`);
      _push(ssrRenderComponent(unref(Popconfirm), {
        title: "确认删除？",
        "cancel-text": "取消",
        "ok-text": "删除",
        onClick: () => {
        },
        onConfirm: onDel
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Button), {
              type: "text",
              loading: deleting.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="f ac remove"${_scopeId2}><span class="mr4 fs20"${_scopeId2}>×</span>删除</span>`);
                } else {
                  return [
                    createVNode("span", { class: "f ac remove" }, [
                      createVNode("span", { class: "mr4 fs20" }, "×"),
                      createTextVNode("删除")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Button), {
                type: "text",
                loading: deleting.value
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "f ac remove" }, [
                    createVNode("span", { class: "mr4 fs20" }, "×"),
                    createTextVNode("删除")
                  ])
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><hr class="mb10"><div class="${ssrRenderClass([{ "cloud-body-loading": loading.value }, "cloud-body"])}">`);
      if (list.value.length) {
        _push(ssrRenderComponent(unref(Spin), { spinning: loading.value }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Space), {
                size: "middle",
                wrap: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(list.value, (v, i) => {
                      _push3(`<div class="${ssrRenderClass([{ active: selectedList.value.indexOf(v._id) > -1 }, "item"])}"${ssrRenderAttr("title", `${v.name}.${v.ext}`)}${_scopeId2}><div class="img-box"${_scopeId2}>`);
                      if (v.pid === "pic") {
                        _push3(`<img${ssrRenderAttrs(mergeProps({
                          alt: v.alt
                        }, ssrGetDirectiveProps(_ctx, _directive_depic, v.src)))}${_scopeId2}>`);
                      } else {
                        _push3(ssrRenderComponent(_component_MIconJs, {
                          name: mapFileType[v.pid]
                        }, null, _parent3, _scopeId2));
                      }
                      _push3(`<div class="tags"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Space), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(mapPlatform[v.platform])}</span>`);
                          } else {
                            return [
                              createVNode("span", null, toDisplayString(mapPlatform[v.platform]), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div><div class="info"${_scopeId2}><div class="f"${_scopeId2}><div class="name txt-ellipsis"${_scopeId2}>${ssrInterpolate(v.name)}</div><div class="ext"${_scopeId2}>.${ssrInterpolate(v.ext)}</div></div><div class="f ac jb txt-grey fs11 mt4"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(v.size > 0 ? unref(byteFormat)(v.size) : "未知")}</span><div class="f ac right"${_scopeId2}>`);
                      if (v.pid === "pic") {
                        _push3(`<span${_scopeId2}>预览</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<span${_scopeId2}>复制链接</span></div></div></div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(list.value, (v, i) => {
                        return openBlock(), createBlock("div", {
                          key: v._id,
                          class: ["item", { active: selectedList.value.indexOf(v._id) > -1 }],
                          title: `${v.name}.${v.ext}`,
                          onClick: withModifiers(($event) => onSelected(v, i), ["stop"])
                        }, [
                          createVNode("div", { class: "img-box" }, [
                            v.pid === "pic" ? withDirectives((openBlock(), createBlock("img", {
                              key: 0,
                              alt: v.alt,
                              onLoad: (e) => cfImgLoaded(e, v)
                            }, null, 40, ["alt", "onLoad"])), [
                              [_directive_depic, v.src]
                            ]) : (openBlock(), createBlock(_component_MIconJs, {
                              key: 1,
                              name: mapFileType[v.pid]
                            }, null, 8, ["name"])),
                            createVNode("div", { class: "tags" }, [
                              createVNode(unref(Space), null, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(mapPlatform[v.platform]), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          createVNode("div", { class: "info" }, [
                            createVNode("div", { class: "f" }, [
                              createVNode("div", { class: "name txt-ellipsis" }, toDisplayString(v.name), 1),
                              createVNode("div", { class: "ext" }, "." + toDisplayString(v.ext), 1)
                            ]),
                            createVNode("div", { class: "f ac jb txt-grey fs11 mt4" }, [
                              createVNode("span", null, toDisplayString(v.size > 0 ? unref(byteFormat)(v.size) : "未知"), 1),
                              createVNode("div", { class: "f ac right" }, [
                                v.pid === "pic" ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  onClick: withModifiers(($event) => onPreview(v), ["stop"])
                                }, "预览", 8, ["onClick"])) : createCommentVNode("", true),
                                createVNode("span", {
                                  onClick: withModifiers(($event) => onCopy(v), ["stop"])
                                }, "复制链接", 8, ["onClick"])
                              ])
                            ])
                          ])
                        ], 10, ["title", "onClick"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Space), {
                  size: "middle",
                  wrap: ""
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(list.value, (v, i) => {
                      return openBlock(), createBlock("div", {
                        key: v._id,
                        class: ["item", { active: selectedList.value.indexOf(v._id) > -1 }],
                        title: `${v.name}.${v.ext}`,
                        onClick: withModifiers(($event) => onSelected(v, i), ["stop"])
                      }, [
                        createVNode("div", { class: "img-box" }, [
                          v.pid === "pic" ? withDirectives((openBlock(), createBlock("img", {
                            key: 0,
                            alt: v.alt,
                            onLoad: (e) => cfImgLoaded(e, v)
                          }, null, 40, ["alt", "onLoad"])), [
                            [_directive_depic, v.src]
                          ]) : (openBlock(), createBlock(_component_MIconJs, {
                            key: 1,
                            name: mapFileType[v.pid]
                          }, null, 8, ["name"])),
                          createVNode("div", { class: "tags" }, [
                            createVNode(unref(Space), null, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(mapPlatform[v.platform]), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        createVNode("div", { class: "info" }, [
                          createVNode("div", { class: "f" }, [
                            createVNode("div", { class: "name txt-ellipsis" }, toDisplayString(v.name), 1),
                            createVNode("div", { class: "ext" }, "." + toDisplayString(v.ext), 1)
                          ]),
                          createVNode("div", { class: "f ac jb txt-grey fs11 mt4" }, [
                            createVNode("span", null, toDisplayString(v.size > 0 ? unref(byteFormat)(v.size) : "未知"), 1),
                            createVNode("div", { class: "f ac right" }, [
                              v.pid === "pic" ? (openBlock(), createBlock("span", {
                                key: 0,
                                onClick: withModifiers(($event) => onPreview(v), ["stop"])
                              }, "预览", 8, ["onClick"])) : createCommentVNode("", true),
                              createVNode("span", {
                                onClick: withModifiers(($event) => onCopy(v), ["stop"])
                              }, "复制链接", 8, ["onClick"])
                            ])
                          ])
                        ])
                      ], 10, ["title", "onClick"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Empty), {
          class: "mt30 pt30",
          description: "暂无资源"
        }, null, _parent));
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Pagination), {
        showQuickJumper: "",
        simple: "",
        current: pagination.current,
        "onUpdate:current": ($event) => pagination.current = $event,
        pageSize: pagination.pageSize,
        "onUpdate:pageSize": ($event) => pagination.pageSize = $event,
        total: pagination.total,
        onChange: fetchList
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Modal), {
        open: showNetworkPic.value,
        "onUpdate:open": ($event) => showNetworkPic.value = $event,
        centered: "",
        title: "添加网络图片",
        "cancel-text": "取消",
        "ok-text": "添加",
        confirmLoading: netpicConfirmLoading.value,
        onOk: netPicPost
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Form), {
              ref_key: "netpicFormRef",
              ref: netpicFormRef,
              model: netpicForm,
              "label-col": { span: 4 },
              "wrapper-col": { span: 20 },
              class: "pt30 pb10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "资源链接",
                    name: "src",
                    rules: [{ required: true, message: "资源链接不能为空" }]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          placeholder: "https://",
                          value: netpicForm.src,
                          "onUpdate:value": ($event) => netpicForm.src = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            placeholder: "https://",
                            value: netpicForm.src,
                            "onUpdate:value": ($event) => netpicForm.src = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormItem), {
                    label: "资源描述",
                    name: "alt"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Input), {
                          placeholder: "请输入资源描述",
                          value: netpicForm.alt,
                          "onUpdate:value": ($event) => netpicForm.alt = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Input), {
                            placeholder: "请输入资源描述",
                            value: netpicForm.alt,
                            "onUpdate:value": ($event) => netpicForm.alt = $event
                          }, null, 8, ["value", "onUpdate:value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FormItem), {
                      label: "资源链接",
                      name: "src",
                      rules: [{ required: true, message: "资源链接不能为空" }]
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          placeholder: "https://",
                          value: netpicForm.src,
                          "onUpdate:value": ($event) => netpicForm.src = $event
                        }, null, 8, ["value", "onUpdate:value"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FormItem), {
                      label: "资源描述",
                      name: "alt"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Input), {
                          placeholder: "请输入资源描述",
                          value: netpicForm.alt,
                          "onUpdate:value": ($event) => netpicForm.alt = $event
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
                ref_key: "netpicFormRef",
                ref: netpicFormRef,
                model: netpicForm,
                "label-col": { span: 4 },
                "wrapper-col": { span: 20 },
                class: "pt30 pb10"
              }, {
                default: withCtx(() => [
                  createVNode(unref(FormItem), {
                    label: "资源链接",
                    name: "src",
                    rules: [{ required: true, message: "资源链接不能为空" }]
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        placeholder: "https://",
                        value: netpicForm.src,
                        "onUpdate:value": ($event) => netpicForm.src = $event
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(FormItem), {
                    label: "资源描述",
                    name: "alt"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Input), {
                        placeholder: "请输入资源描述",
                        value: netpicForm.alt,
                        "onUpdate:value": ($event) => netpicForm.alt = $event
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
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(unref(Image), {
        style: { display: "none" },
        src: curPreview.value,
        preview: {
          visible: showPreview.value,
          onVisibleChange: onPreviewHide
        }
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/cloud/modules/main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
