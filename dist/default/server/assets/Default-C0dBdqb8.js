import { mergeProps, unref, useSSRContext, createSlots, withCtx, renderSlot, createCommentVNode, createTextVNode, toDisplayString, createVNode, computed, ref, onMounted, resolveComponent, resolveDirective, withDirectives, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Modal, Button, Drawer } from "ant-design-vue";
import { useRoute } from "vue-router";
import { r as request, u as useGLobalStore, s as sendStat, e as encrypt } from "../entry-server.js";
import { g as getMenu } from "./menu-Dt_xrlWs.js";
import { useThrottleFn } from "@vueuse/core";
import { BellOutlined } from "@ant-design/icons-vue";
import { c as cn2charcode } from "./common-ZcIx5rAG.js";
import { a as asyncData } from "./asyncData.common-y3XAKvqf.js";
import "node:path";
import "pinia";
import "crypto-js";
import "./ssrFetch-DNAH9Bfk.js";
import "os";
const _imports_0 = "/assets/img/scj.png";
const getNotice = () => {
  return request("/api/v1/notice");
};
const set = (key, value) => {
  if (typeof value === "object")
    value = JSON.stringify(value);
  localStorage.setItem(key, value);
};
const get = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
const update = (key, childKey, value) => {
  const data = getStore(key);
  if (data)
    throw `${key}不存在`;
  data[childKey] = value;
  return data;
};
const remove = (key) => {
  localStorage.removeItem(key);
};
const add = (key, childKey, value) => {
  const data = getStore(key);
  if (data)
    throw `${key}不存在`;
  if (childKey) {
    data[childKey] = value;
  } else {
    data.push(value);
  }
};
const localStore = {
  set,
  get,
  add,
  update,
  remove
};
const _sfc_main$2 = {
  __name: "marquee",
  __ssrInlineRender: true,
  props: {
    content: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dhy-notice f ac" }, _attrs))}><span class="icon mr6">`);
      _push(ssrRenderComponent(unref(BellOutlined), null, null, _parent));
      _push(`</span><div class="fa w0"><div style="${ssrRenderStyle({ "animation-duration": `${__props.content.length / 3}s` })}">${__props.content}</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/marquee.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CModal",
  __ssrInlineRender: true,
  props: {
    cancelText: { type: String, default: "取消" },
    confirmText: { type: String, default: "确定" },
    loading: Boolean
  },
  emits: ["cancel", "confirm"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const onCancel = (e) => {
      emits("cancel", e);
    };
    const onConfirm = () => {
      emits("confirm");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps(_ctx.$attrs, {
        centered: "",
        class: "c-modal",
        footer: _ctx.$attrs.footer,
        onCancel
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (_ctx.$slots.footer) {
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 0 }) : createCommentVNode("", true)
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.title ? {
          name: "title",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "title")
              ];
            }
          }),
          key: "0"
        } : void 0,
        !_ctx.$slots.footer && _ctx.$attrs.footer !== null ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="footer f jc ac"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Button), {
                class: "grey-btn mr10",
                onClick: ($event) => onCancel()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.cancelText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.cancelText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Button), {
                type: "primary",
                onClick: onConfirm,
                loading: __props.loading
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.confirmText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.confirmText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "footer f jc ac" }, [
                  createVNode(unref(Button), {
                    class: "grey-btn mr10",
                    onClick: ($event) => onCancel()
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.cancelText), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(unref(Button), {
                    type: "primary",
                    onClick: onConfirm,
                    loading: __props.loading
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.confirmText), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/cui/CModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __default__ = {
  async asyncData({ store, ctx, server }) {
    const globalStore = useGLobalStore(store);
    await Promise.allSettled([
      asyncData({ store, ctx, server }),
      server.db.ego.models.Setting.findOne({ key: `template-${ctx.state.template}` }).then((res) => {
        globalStore.appearance = (res == null ? void 0 : res.value) || {};
      }).catch((e) => console.error(e))
    ]);
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Default",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const route = useRoute();
    const navMenu = computed(() => globalStore.menu);
    const banner = computed(() => globalStore.appearance.banner);
    const bgThemeLight = computed(() => ({ backgroundColor: globalStore.appearance.themeLight }));
    const appearanceStyle = computed(() => {
      const { theme } = globalStore.appearance;
      const style = {};
      if (theme) {
        style.backgroundColor = theme;
        style.color = "#fff";
      }
      return style;
    });
    const noticeTitleStyle = computed(() => {
      const { theme, themeLight } = globalStore.appearance;
      const style = {};
      if (theme && themeLight) {
        style.backgroundColor = theme;
        style.background = `linear-gradient(45deg,${theme},${themeLight})`;
      }
      return style;
    });
    const notice = computed(() => globalStore.notice);
    const marquee = computed(() => globalStore.notice.marquee);
    const showNoticePop = ref(false);
    const onCloseNoticePop = () => {
      const nowUnix = Math.round(Date.now() / 1e3);
      localStore.set("noticePop", { expire: 3600 * 24 + nowUnix });
    };
    const showGotop = ref(false);
    const openMenuDrawer = ref(false);
    onMounted(() => {
      const { dhycode } = route.query;
      if (window.umami && dhycode) {
        window.umami = () => {
        };
        sendStat({
          name: "nav-referrer-stat",
          data: {
            [dhycode]: ""
          }
        }).catch((e) => console.error(e));
      }
      getNotice().then((res) => {
        globalStore.notice = res;
        const noticePop = localStore.get("noticePop");
        const nowUnix = Math.round(Date.now() / 1e3);
        if (notice.value.content && (!(noticePop == null ? void 0 : noticePop.expire) || (noticePop == null ? void 0 : noticePop.expire) < nowUnix)) {
          showNoticePop.value = true;
        } else {
          showNoticePop.value = false;
        }
      });
      getMenu({ type: "nav,link,app,post" }).then((res) => {
        globalStore.menu = res;
      });
      const scrollHandle = useThrottleFn(() => {
        const top = window.scrollY;
        if (top > 400)
          showGotop.value = true;
        else
          showGotop.value = false;
      }, 60);
      window.addEventListener("scroll", scrollHandle);
      scrollHandle();
      if (globalStore.thirdstat.statistics) {
        document.body.append(document.createRange().createContextualFragment(globalStore.thirdstat.statistics));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      const _directive_depic = resolveDirective("depic");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "layout-default",
        style: appearanceStyle.value
      }, _attrs))}>`);
      if (unref(globalStore).isMobile) {
        _push(`<div class="m-header f ac jb" style="${ssrRenderStyle(bgThemeLight.value)}">`);
        _push(ssrRenderComponent(_component_RouterLink, {
          to: "/",
          class: "logo"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(globalStore).siteinfo.logo) {
                _push2(`<img${ssrRenderAttrs(mergeProps({
                  alt: unref(globalStore).siteinfo.shortTitle || unref(globalStore).siteinfo.title
                }, ssrGetDirectiveProps(_ctx, _directive_depic, unref(globalStore).siteinfo.logo)))}${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<b${_scopeId}>${ssrInterpolate(unref(globalStore).siteinfo.shortTitle || unref(globalStore).siteinfo.title)}</b>`);
            } else {
              return [
                unref(globalStore).siteinfo.logo ? withDirectives((openBlock(), createBlock("img", {
                  key: 0,
                  alt: unref(globalStore).siteinfo.shortTitle || unref(globalStore).siteinfo.title
                }, null, 8, ["alt"])), [
                  [_directive_depic, unref(globalStore).siteinfo.logo]
                ]) : createCommentVNode("", true),
                createVNode("b", null, toDisplayString(unref(globalStore).siteinfo.shortTitle || unref(globalStore).siteinfo.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div><span class="pl12 pt4 pb4">`);
        _push(ssrRenderComponent(_component_MIcon, {
          name: "menu",
          class: "fs22"
        }, null, _parent));
        _push(`</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max max-1200">`);
      if (banner.value) {
        _push(`<div class="banner"><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, banner.value))}></div>`);
      } else {
        _push(`<!---->`);
      }
      if (marquee.value) {
        _push(ssrRenderComponent(_sfc_main$2, { content: marquee.value }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="max max-1200"><footer style="${ssrRenderStyle(bgThemeLight.value)}">${unref(cn2charcode)(unref(globalStore).siteinfo.footer)}</footer>`);
      if (!unref(globalStore).isMobile) {
        _push(`<div class="aside aside-left"><div><div><img${ssrRenderAttr("src", _imports_0)}></div><a class="item" href="/autoin" style="${ssrRenderStyle(bgThemeLight.value)}">自助收录</a><a class="item" href="/autoin#about" style="${ssrRenderStyle(bgThemeLight.value)}">关于我们</a><a class="item" href="/autoin#contact" style="${ssrRenderStyle(bgThemeLight.value)}">联系我们</a><a class="item" href="/autoin#ad" style="${ssrRenderStyle(bgThemeLight.value)}">广告刊登</a></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(globalStore).isMobile) {
        _push(`<div class="aside aside-right"><div><!--[-->`);
        ssrRenderList(navMenu.value, (v) => {
          _push(`<!--[-->`);
          if (v.subType === "link") {
            _push(`<a${ssrRenderAttr("href", v.link)} target="_blank" class="item" style="${ssrRenderStyle(bgThemeLight.value)}">${ssrInterpolate(v.name)}</a>`);
          } else {
            _push(`<a${ssrRenderAttr("href", `/#${unref(encrypt)(v.name)}`)} class="item" style="${ssrRenderStyle(bgThemeLight.value)}">${ssrInterpolate(v.name)}</a>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
        if (showGotop.value) {
          _push(`<a href="javascript:void(0);" style="${ssrRenderStyle(bgThemeLight.value)}" class="item f ac jc">`);
          _push(ssrRenderComponent(_component_MIcon, { name: "up" }, null, _parent));
          _push(`TOP</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showNoticePop.value,
        "onUpdate:open": ($event) => showNoticePop.value = $event,
        maskClosable: false,
        footer: null,
        wrapClassName: "publish-modal",
        onCancel: onCloseNoticePop
      }, createSlots({
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle(noticeTitleStyle.value)}"${_scopeId}><span class="mr4 fs16"${_scopeId}>❤</span>${ssrInterpolate(notice.value.title || "最新公告")}</div>`);
          } else {
            return [
              createVNode("div", { style: noticeTitleStyle.value }, [
                createVNode("span", { class: "mr4 fs16" }, "❤"),
                createTextVNode(toDisplayString(notice.value.title || "最新公告"), 1)
              ], 4)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pl10 pr10"${_scopeId}>${notice.value.content}</div>`);
          } else {
            return [
              createVNode("div", {
                class: "pl10 pr10",
                innerHTML: notice.value.content
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 2
      }, [
        notice.value.appurl || notice.value.publishurl ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="f je ac mt30"${_scopeId}>`);
              if (notice.value.appurl) {
                _push2(`<a${ssrRenderAttr("href", notice.value.appurl)} target="_blank"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Button), {
                  class: "sugar-primary mr10 pl20 pr20",
                  style: { border: 0 }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(notice.value.appText || "下载APP")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(notice.value.appText || "下载APP"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</a>`);
              } else {
                _push2(`<!---->`);
              }
              if (notice.value.publishurl) {
                _push2(`<a${ssrRenderAttr("href", notice.value.publishurl)} target="_blank"${_scopeId}>`);
                if (notice.value.publishurl) {
                  _push2(ssrRenderComponent(unref(Button), {
                    type: "primary",
                    class: "pl20 pr20"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(notice.value.publishText || "发布地址")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(notice.value.publishText || "发布地址"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "f je ac mt30" }, [
                  notice.value.appurl ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: notice.value.appurl,
                    target: "_blank"
                  }, [
                    createVNode(unref(Button), {
                      class: "sugar-primary mr10 pl20 pr20",
                      style: { border: 0 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(notice.value.appText || "下载APP"), 1)
                      ]),
                      _: 1
                    })
                  ], 8, ["href"])) : createCommentVNode("", true),
                  notice.value.publishurl ? (openBlock(), createBlock("a", {
                    key: 1,
                    href: notice.value.publishurl,
                    target: "_blank"
                  }, [
                    notice.value.publishurl ? (openBlock(), createBlock(unref(Button), {
                      key: 0,
                      type: "primary",
                      class: "pl20 pr20"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(notice.value.publishText || "发布地址"), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ], 8, ["href"])) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      if (unref(globalStore).appearance.bgtop) {
        _push(`<img${ssrRenderAttrs(mergeProps({ class: "body-bg body-bg-top" }, ssrGetDirectiveProps(_ctx, _directive_depic, unref(globalStore).appearance.bgtop)))}>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(globalStore).appearance.bgbottom) {
        _push(`<img${ssrRenderAttrs(mergeProps({ class: "body-bg body-bg-btm" }, ssrGetDirectiveProps(_ctx, _directive_depic, unref(globalStore).appearance.bgbottom)))}>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(globalStore).isMobile) {
        _push(ssrRenderComponent(unref(Drawer), {
          open: openMenuDrawer.value,
          "onUpdate:open": ($event) => openMenuDrawer.value = $event,
          style: bgThemeLight.value,
          placement: "left",
          width: "300",
          class: "menu-drawer"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(navMenu.value, (v) => {
                _push2(`<div style="${ssrRenderStyle({ color: v.color })}"${_scopeId}>`);
                if (v.subType === "link") {
                  _push2(`<a${ssrRenderAttr("href", v.link)} target="_blank" class="item"${_scopeId}>${ssrInterpolate(v.name)}</a>`);
                } else {
                  _push2(`<a${ssrRenderAttr("href", `/#${unref(encrypt)(v.name)}`)} class="item"${_scopeId}>${ssrInterpolate(v.name)}</a>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><hr${_scopeId}><a class="item item2" href="/autoin" style="${ssrRenderStyle(bgThemeLight.value)}"${_scopeId}>自助收录</a><a class="item item2" href="/autoin#about" style="${ssrRenderStyle(bgThemeLight.value)}"${_scopeId}>关于我们</a><a class="item item2" href="/autoin#contact" style="${ssrRenderStyle(bgThemeLight.value)}"${_scopeId}>联系我们</a><a class="item item2" href="/autoin#ad" style="${ssrRenderStyle(bgThemeLight.value)}"${_scopeId}>广告刊登</a>`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(navMenu.value, (v) => {
                  return openBlock(), createBlock("div", {
                    key: v._id,
                    style: { color: v.color },
                    onClick: () => openMenuDrawer.value = false
                  }, [
                    v.subType === "link" ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: v.link,
                      target: "_blank",
                      class: "item"
                    }, toDisplayString(v.name), 9, ["href"])) : (openBlock(), createBlock("a", {
                      key: 1,
                      href: `/#${unref(encrypt)(v.name)}`,
                      class: "item"
                    }, toDisplayString(v.name), 9, ["href"]))
                  ], 12, ["onClick"]);
                }), 128)),
                createVNode("hr"),
                createVNode("a", {
                  class: "item item2",
                  href: "/autoin",
                  style: bgThemeLight.value
                }, "自助收录", 4),
                createVNode("a", {
                  class: "item item2",
                  href: "/autoin#about",
                  style: bgThemeLight.value
                }, "关于我们", 4),
                createVNode("a", {
                  class: "item item2",
                  href: "/autoin#contact",
                  style: bgThemeLight.value
                }, "联系我们", 4),
                createVNode("a", {
                  class: "item item2",
                  href: "/autoin#ad",
                  style: bgThemeLight.value
                }, "广告刊登", 4)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layout/Default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
