import { computed, resolveComponent, mergeProps, useSSRContext, ref, onMounted, nextTick, resolveDirective, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps } from "vue/server-renderer";
import { r as request, u as useGLobalStore, e as encrypt } from "../entry-server.js";
import { q as query2str } from "./common-ZcIx5rAG.js";
import { g as getPosts } from "./post-DuWgPNIF.js";
import { L as Loading } from "./loading-DosIVvch.js";
import { useRoute } from "vue-router";
import "node:path";
import "ant-design-vue";
import "pinia";
import "crypto-js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const getModuleNavs = (query = {}, options = {}) => {
  return request(`/api/v1/moduledata?${query2str(query)}`, options);
};
const getNavs = (query = {}) => {
  return request(`/api/v1/navs?${query2str(query)}`);
};
const _sfc_main$1 = {
  __name: "tinyPagination",
  __ssrInlineRender: true,
  props: {
    current: { type: Number, default: 1 },
    pageSize: { type: Number, default: 20 },
    total: { type: Number, default: 0 }
  },
  emits: ["change", "update:current"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const pagesCount = computed(() => Math.ceil(props.total / props.pageSize));
    const isFirstPage = computed(() => pagesCount.value === 0 || props.current === 1);
    const isLastPage = computed(() => pagesCount.value === 0 || props.current === pagesCount.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dhy-tiny-pagination" }, _attrs))}><div class="${ssrRenderClass([{ disabled: isFirstPage.value }, "left"])}" title="上一页">`);
      _push(ssrRenderComponent(_component_MIcon, { name: "left" }, null, _parent));
      _push(`</div><div class="${ssrRenderClass([{ disabled: isLastPage.value }, "right"])}" title="下一页">`);
      _push(ssrRenderComponent(_component_MIcon, { name: "right" }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/tinyPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const globalStore = useGLobalStore();
    const themeLight = computed(() => globalStore.appearance.themeLight);
    const pcColWidth = computed(() => Math.round(100 / (globalStore.appearance.pccols || 10) * 1e6) / 1e6);
    const pcPostColWidth = computed(() => Math.round(100 / (globalStore.appearance.pccolsPost || 2) * 1e6) / 1e6);
    const pcAppColWidth = computed(() => Math.round(100 / (globalStore.appearance.appcols || 12) * 1e6) / 1e6);
    const modules = ref([]);
    const navMenu = computed(() => globalStore.menu);
    const onPageChange = async (m, type) => {
      const mapMethod = {
        nav: getNavs,
        post: getPosts
      };
      try {
        m.loading = true;
        await mapMethod[type]({
          current: m.current,
          pageSize: m.pageSize,
          mid: m._id
        }).then((res) => {
          m.data = res.result || [];
          m.total = res.total;
        });
      } finally {
        m.loading = false;
      }
    };
    onMounted(() => {
      getModuleNavs().then((res) => {
        modules.value = res || [];
        globalStore.menu = (res == null ? void 0 : res.filter((m) => ["nav", "link", "post", "app"].includes(m.subType))) || [];
        nextTick(() => {
          if (route.hash) {
            const moduleEl = document.getElementById(route.hash.slice(1));
            window.scrollTo(0, moduleEl.offsetTop);
          }
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _directive_depic = resolveDirective("depic");
      const _directive_navexpos = resolveDirective("navexpos");
      const _directive_navclick = resolveDirective("navclick");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))}>`);
      if (!unref(globalStore).isMobile) {
        _push(`<nav class="nav f fw" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}"><!--[-->`);
        ssrRenderList(navMenu.value, (v) => {
          _push(`<div style="${ssrRenderStyle({ color: v.color })}">`);
          if (v.subType === "link") {
            _push(`<a${ssrRenderAttr("href", v.link)} target="_blank">${ssrInterpolate(v.name)}</a>`);
          } else {
            _push(`<a${ssrRenderAttr("href", `#${unref(encrypt)(v.name)}`)}>${ssrInterpolate(v.name)}</a>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(modules.value, (v) => {
        var _a;
        _push(`<!--[-->`);
        if ((_a = v.data) == null ? void 0 : _a.length) {
          _push(`<!--[-->`);
          if (v.subType === "app") {
            _push(`<div${ssrRenderAttr("id", unref(encrypt)(v.name))}><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}">${ssrInterpolate(v.name)} `);
            _push(ssrRenderComponent(_sfc_main$1, {
              current: v.current,
              "onUpdate:current": ($event) => v.current = $event,
              pageSize: v.pageSize,
              total: v.total,
              onChange: ($event) => onPageChange(v, "nav")
            }, null, _parent));
            _push(`</div><div class="f fw module-app"><!--[-->`);
            ssrRenderList(v.data, (item) => {
              _push(`<a${ssrRenderAttrs(mergeProps({
                class: ["item", [`item-mcol-${unref(globalStore).appearance.mappcols || 5}`]],
                href: item.link,
                target: "_blank",
                style: `${item.styles};flex:0 0 ${pcAppColWidth.value}%`
              }, ssrGetDirectiveProps(_ctx, _directive_navexpos, item.referrerCode), ssrGetDirectiveProps(_ctx, _directive_navclick, item.referrerCode)))}><div class="img-box"><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, item.logo))}></div><span>${ssrInterpolate(item.name)} `);
              if (item.tag) {
                _push(`<label style="${ssrRenderStyle(item.tagStyles)}">${ssrInterpolate(item.tag)}</label>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</span></a>`);
            });
            _push(`<!--]-->`);
            if (v.loading) {
              _push(`<div class="mask">`);
              _push(ssrRenderComponent(Loading, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else if (v.subType === "nav") {
            _push(`<div${ssrRenderAttr("id", unref(encrypt)(v.name))}><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}">${ssrInterpolate(v.name)} `);
            _push(ssrRenderComponent(_sfc_main$1, {
              current: v.current,
              "onUpdate:current": ($event) => v.current = $event,
              pageSize: v.pageSize,
              total: v.total,
              onChange: ($event) => onPageChange(v, "nav")
            }, null, _parent));
            _push(`</div><div class="f fw module-nav"><!--[-->`);
            ssrRenderList(v.data, (item) => {
              _push(`<a${ssrRenderAttrs(mergeProps({
                class: ["item", [`item-mcol-${unref(globalStore).appearance.mcols || 4}`]],
                href: item.link,
                target: "_blank",
                style: `${item.styles};flex:0 0 ${pcColWidth.value}%`
              }, ssrGetDirectiveProps(_ctx, _directive_navexpos, item.referrerCode), ssrGetDirectiveProps(_ctx, _directive_navclick, item.referrerCode)))}><span>${ssrInterpolate(item.name)} `);
              if (item.tag) {
                _push(`<label style="${ssrRenderStyle(item.tagStyles)}">${ssrInterpolate(item.tag)}</label>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</span></a>`);
            });
            _push(`<!--]-->`);
            if (v.loading) {
              _push(`<div class="mask">`);
              _push(ssrRenderComponent(Loading, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else if (v.subType === "post") {
            _push(`<div${ssrRenderAttr("id", unref(encrypt)(v.name))}><div class="module-title f jb ac" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}">${ssrInterpolate(v.name)} `);
            _push(ssrRenderComponent(_sfc_main$1, {
              current: v.current,
              "onUpdate:current": ($event) => v.current = $event,
              pageSize: v.pageSize,
              total: v.total,
              onChange: ($event) => onPageChange(v, "post")
            }, null, _parent));
            _push(`</div><div class="f fw module-post"><!--[-->`);
            ssrRenderList(v.data, (item) => {
              _push(ssrRenderComponent(_component_RouterLink, {
                class: ["item", [`item-mcol-${unref(globalStore).appearance.mcolsPost || 1}`]],
                to: `/post/${item.id}?cname=${unref(encrypt)(v.name)}`,
                style: `${item.styles};flex:0 0 ${pcPostColWidth.value}%`
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span${_scopeId}><span class="txt-ellipsis-1"${_scopeId}>${ssrInterpolate(item.title)}</span>`);
                    if (item.tag) {
                      _push2(`<label style="${ssrRenderStyle(item.tagStyles)}"${_scopeId}>${ssrInterpolate(item.tag)}</label>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</span>`);
                  } else {
                    return [
                      createVNode("span", null, [
                        createVNode("span", { class: "txt-ellipsis-1" }, toDisplayString(item.title), 1),
                        item.tag ? (openBlock(), createBlock("label", {
                          key: 0,
                          style: item.tagStyles
                        }, toDisplayString(item.tag), 5)) : createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]-->`);
            if (v.loading) {
              _push(`<div class="mask">`);
              _push(ssrRenderComponent(Loading, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          } else if (v.subType === "ad") {
            _push(`<div class="module-ad"><!--[-->`);
            ssrRenderList(v.data, (v2) => {
              _push(`<a${ssrRenderAttr("href", v2.link)} target="_blank" class="item"><img${ssrRenderAttrs(mergeProps({
                alt: v2.name
              }, ssrGetDirectiveProps(_ctx, _directive_depic, v2.imgurl)))}></a>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/default/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
