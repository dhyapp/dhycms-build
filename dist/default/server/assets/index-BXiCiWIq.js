import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "pinia";
const _sfc_main = {
  asyncData({ server, store }) {
    useSsrFetch(store);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_RouterView = resolveComponent("RouterView");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/stat/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
