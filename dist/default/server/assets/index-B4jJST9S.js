import { computed, ref, resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { u as useGLobalStore } from "../entry-server.js";
import "node:path";
import "ant-design-vue";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const globalStore = useGLobalStore();
    computed(() => globalStore.preadmin);
    ref([route.path.split("/").pop() || "siteinfo"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterView = resolveComponent("RouterView");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "setting-page" }, _attrs))}><div class="setting-main scroll fa w0">`);
      _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/setting/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
