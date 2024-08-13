import { a as asyncData } from "./asyncData.common-y3XAKvqf.js";
import { ssrRenderSlot } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "../entry-server.js";
import "node:path";
import "vue-router";
import "ant-design-vue";
import "pinia";
import "crypto-js";
import "./ssrFetch-DNAH9Bfk.js";
import "os";
const _sfc_main = {
  inheritAttrs: false,
  // 禁止自动继承非props属性，主要针对App.vue中的hideTab属性出现的警告
  asyncData
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layout/Blank.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Blank = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Blank as default
};
