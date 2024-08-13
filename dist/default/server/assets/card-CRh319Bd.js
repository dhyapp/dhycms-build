import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { Tooltip } from "ant-design-vue";
const _sfc_main = {
  __name: "card",
  __ssrInlineRender: true,
  props: {
    type: { type: String, default: "plugin" },
    title: String,
    poster: String,
    price: String,
    auth: String,
    description: String,
    version: String,
    active: Boolean,
    controls: { type: Array, default: () => [] },
    tag: String,
    tagType: { type: String, default: "primary" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const mapAuthColor = {
      free: "free",
      pro: "gold",
      plus: "gold"
    };
    const mapAuthName = {
      free: "免费版",
      pro: "专业版",
      plus: "旗舰版"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-card" }, _attrs))}><div class="img-wrapper" style="${ssrRenderStyle({ backgroundImage: `url(${__props.poster})` })}">`);
      if (__props.tag) {
        _push(`<span class="${ssrRenderClass(["admin-card-tag", `tag-${__props.tagType}`])}">${ssrInterpolate(__props.tag)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="info"><div><div class="t txt-ellipsis-2 mb4 f ac">`);
      if (__props.auth) {
        _push(`<label class="${ssrRenderClass(`sugar-${mapAuthColor[__props.auth] || "grey"}`)}">${ssrInterpolate(mapAuthName[__props.auth])}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Tooltip), { title: __props.title }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="txt-ellipsis-2 brif mb6"${ssrRenderAttr("title", __props.description)}>${ssrInterpolate(__props.description)}</div></div><div class="f ac jb extra">`);
      if (__props.price) {
        _push(`<div class="${ssrRenderClass([[__props.price === "免费" ? "sugar-success" : "sugar-error"], "price"])}">${ssrInterpolate(__props.price)}</div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{ active: __props.active, "sugar-success": __props.active, "sugar-error": !__props.active }, "status"])}">${ssrInterpolate(__props.active ? "已开启" : "未开启")}</div>`);
      }
      if (__props.version) {
        _push(`<div>v${ssrInterpolate(__props.version)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.controls.length) {
        _push(`<div class="f ctrl"><!--[-->`);
        ssrRenderList(__props.controls, (v, i) => {
          _push(`<!--[-->`);
          if (v) {
            _push(`<span class="${ssrRenderClass(v.class)}">${ssrInterpolate(v.label)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/components/card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
