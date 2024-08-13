import { resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import "node:path";
import "ant-design-vue";
import "pinia";
import "crypto-js";
const _imports_0 = "/assets/500-Co0uKnrX.svg";
const _sfc_main = {
  __name: "500",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const globalStore = useGLobalStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "err-500 f fc jc ac" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)}><div class="tips">服务器发生错误，请联系开发人员处理~</div><div><a href="javascript:void(0);">返回</a>`);
      _push(ssrRenderComponent(_component_RouterLink, {
        to: `/${unref(globalStore).preadmin}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`返回控制台`);
          } else {
            return [
              createTextVNode("返回控制台")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/500.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
