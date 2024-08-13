import { ref, unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./main-DhQTa4Ec.js";
import { Modal } from "ant-design-vue";
const _sfc_main = {
  __name: "modal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue", "insert"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const cloudSelectedList = ref([]);
    const onCloudInsert = () => {
      emits("update:modelValue", cloudSelectedList.value);
      emits("insert", cloudSelectedList.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps(_ctx.$attrs, {
        wrapClassName: "cloud-modal",
        centered: "",
        title: "云盘",
        width: 1600,
        "cancel-text": "取消",
        "ok-text": "插入",
        onOk: onCloudInsert
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: cloudSelectedList.value,
              "onUpdate:modelValue": ($event) => cloudSelectedList.value = $event
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_sfc_main$1, {
                  modelValue: cloudSelectedList.value,
                  "onUpdate:modelValue": ($event) => cloudSelectedList.value = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/cloud/modules/modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
