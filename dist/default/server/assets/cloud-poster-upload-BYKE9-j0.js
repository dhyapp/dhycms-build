import { ref, resolveDirective, useSSRContext } from "vue";
import { ssrRenderClass, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./modal-CbztPSM0.js";
const _sfc_main = {
  __name: "cloud-poster-upload",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    previewURL: String,
    mode: { type: String, default: "cover" },
    text: { type: String, default: "上传图片" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const showCloud = ref(false);
    const emits = __emit;
    const insertLoading = ref(false);
    const blobURL = ref("");
    const onPosterInsert = async (files) => {
      if (!files.length)
        return;
      try {
        insertLoading.value = true;
        if (files[0].blobSrc)
          blobURL.value = files[0].blobSrc;
        emits("update:modelValue", "");
        setTimeout(() => emits("update:modelValue", files[0].src), 0);
        showCloud.value = false;
      } finally {
        insertLoading.value = false;
      }
    };
    const onCancel = () => {
      insertLoading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_depic = resolveDirective("depic");
      _push(`<!--[--><div class="${ssrRenderClass([[`cloud-poster-mode-${__props.mode}`, __props.mode === "whole" ? "whole" : ""], "cloud-poster-upload"])}">`);
      if (__props.modelValue) {
        _push(`<!--[--><img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, blobURL.value || __props.previewURL || __props.modelValue))}><div class="close">×</div><!--]-->`);
      } else {
        _push(`<div class="f fc"><div class="fs30">+</div><div>${ssrInterpolate(__props.text)}</div></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showCloud.value,
        "onUpdate:open": ($event) => showCloud.value = $event,
        confirmLoading: insertLoading.value,
        onInsert: onPosterInsert,
        onCancel
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/cloud-poster-upload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
