import { ref, onMounted, onBeforeUnmount, resolveComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { useRouter } from "vue-router";
const _sfc_main = {
  __name: "admin-form-action-bar",
  __ssrInlineRender: true,
  props: {
    showBack: { type: Boolean, default: true }
  },
  setup(__props) {
    useRouter();
    const isSticky = ref(false);
    const stickyRef = ref(null);
    let scroller;
    const scrollHandle = () => {
      const scrollTop = scroller.scrollTop;
      const stickyTop = stickyRef.value.offsetTop;
      isSticky.value = scrollTop >= stickyTop;
    };
    onMounted(() => {
      scroller = document.querySelector(".main");
      scrollHandle();
      scroller.addEventListener("scroll", scrollHandle);
    });
    onBeforeUnmount(() => {
      if (scroller) {
        scroller.removeEventListener("scroll", scrollHandle);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "stickyRef",
        ref: stickyRef,
        class: ["admin-form-action-bar f ac jb", { isSticky: isSticky.value }]
      }, _attrs))}>`);
      if (__props.showBack) {
        _push(`<button class="go-back">`);
        _push(ssrRenderComponent(_component_MIcon, {
          name: "left",
          size: "small"
        }, null, _parent));
        _push(`返回</button>`);
      } else {
        _push(`<div></div>`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/form/admin-form-action-bar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
