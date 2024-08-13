import { computed, ref, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useGLobalStore } from "../entry-server.js";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import "node:path";
import "ant-design-vue";
import "pinia";
import "crypto-js";
const _sfc_main = {
  __name: "setting",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const iframeRef = ref();
    onMounted(() => {
      iframeRef.value.parentNode.classList.add("plugin-setting-page");
    });
    onBeforeRouteLeave(() => {
      iframeRef.value.parentNode.classList.remove("plugin-setting-page");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<iframe${ssrRenderAttrs(mergeProps({
        ref_key: "iframeRef",
        ref: iframeRef,
        src: unref(route).query.url.startsWith("http") ? unref(route).query.url : `/${preadmin.value}${decodeURIComponent(unref(route).query.url)}`,
        width: "100%",
        height: "100%",
        border: "0",
        frameborder: "no",
        marginwidth: "0",
        marginheight: "0",
        scrolling: "auto",
        allowtransparency: "yes"
      }, _attrs))}></iframe>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/plugin/setting.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
