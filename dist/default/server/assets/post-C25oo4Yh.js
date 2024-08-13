import { computed, ref, onMounted, resolveComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { u as useGLobalStore, d as decrypt, e as encrypt } from "../entry-server.js";
import { Breadcrumb, BreadcrumbItem } from "ant-design-vue";
import { L as Loading } from "./loading-DosIVvch.js";
import { d as dateFromID } from "./common-ZcIx5rAG.js";
import { useRoute, useRouter } from "vue-router";
import { a as getPost } from "./post-DuWgPNIF.js";
import "node:path";
import "pinia";
import "crypto-js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "post",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const route = useRoute();
    useRouter();
    const themeLight = computed(() => globalStore.appearance.themeLight);
    const navMenu = computed(() => globalStore.menu);
    const loading = ref(false);
    const post = ref({});
    const cateName = computed(() => decrypt(route.query.cname));
    onMounted(async () => {
      loading.value = true;
      await getPost(route.params.id).then((res) => {
        post.value = res || {};
      });
      loading.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "post-page" }, _attrs))}>`);
      if (!unref(globalStore).isMobile) {
        _push(`<nav class="nav f fw" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}"><div>`);
        _push(ssrRenderComponent(_component_RouterLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`首页`);
            } else {
              return [
                createTextVNode("首页")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--[-->`);
        ssrRenderList(navMenu.value, (v) => {
          _push(`<div style="${ssrRenderStyle({ color: v.color })}">`);
          if (v.subType === "link") {
            _push(`<a${ssrRenderAttr("href", v.link)} target="_blank">${ssrInterpolate(v.name)}</a>`);
          } else {
            _push(`<a${ssrRenderAttr("href", `/#${unref(encrypt)(v.name)}`)}>${ssrInterpolate(v.name)}</a>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="f ac"><span class="breadcrumb-back">`);
      _push(ssrRenderComponent(_component_MIcon, {
        name: "left",
        class: "mr4"
      }, null, _parent));
      _push(` 返回 </span>`);
      _push(ssrRenderComponent(unref(Breadcrumb), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RouterLink, { to: "/" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`首页`);
                      } else {
                        return [
                          createTextVNode("首页")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, { to: "/" }, {
                      default: withCtx(() => [
                        createTextVNode("首页")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    to: `/#${unref(route).query.cname}`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(cateName.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(cateName.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/#${unref(route).query.cname}`
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(cateName.value), 1)
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
                  _push3(`${ssrInterpolate(post.value.title)}${ssrInterpolate(post.value.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(post.value.title) + toDisplayString(post.value.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, { to: "/" }, {
                    default: withCtx(() => [
                      createTextVNode("首页")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/#${unref(route).query.cname}`
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(cateName.value), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(post.value.title) + toDisplayString(post.value.title), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="content" style="${ssrRenderStyle({ backgroundColor: themeLight.value })}">`);
      if (loading.value) {
        _push(`<div class="loading-box">`);
        _push(ssrRenderComponent(Loading, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><h2>${ssrInterpolate(post.value.title)}</h2><div class="extra"><span>发布时间：${ssrInterpolate(unref(dateFromID)(post.value._id))}</span><span>分类：`);
        _push(ssrRenderComponent(_component_RouterLink, {
          to: `/#${unref(route).query.cname}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(cateName.value)}`);
            } else {
              return [
                createTextVNode(toDisplayString(cateName.value), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span></div><hr><div>${post.value.content}</div><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/default/post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
