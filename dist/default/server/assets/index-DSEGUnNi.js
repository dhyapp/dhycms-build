import { ssrRenderAttr, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { ref, onMounted, onBeforeUnmount, useSSRContext } from "vue";
import { _ as _sfc_main$1 } from "./modal-CbztPSM0.js";
import { u as useGLobalStore, l as lazy, b as decodePicture } from "../entry-server.js";
const useTinyConfig = () => {
  return {
    suffix: ".min",
    language: "zh_CN",
    language_url: "/assets/tinymce/langs/zh_CN.js",
    base_url: "/assets/tinymce",
    relative_urls: false,
    // 禁用自动处理相对路径
    document_base_url: "",
    menubar: false,
    default_link_target: "_blank",
    placeholder: "请输入正文内容",
    branding: false,
    // 显示 tinymec logo
    toolbar: "styles bold italic underline strikethrough forecolor backcolor | link unlink alignleft aligncenter numlist bullist emoticons image cloud | code removeformat fullscreen |",
    plugins: "code emoticons link image lists fullscreen",
    valid_children: "+div[style]",
    statusbar: false
  };
};
const cloudUploader = function(editor, files) {
  if (files && files.length) {
    let content = "";
    for (let file of files) {
      let { src, blobSrc } = file;
      const isCF = file.platform == 3;
      switch (file.pid) {
        case "pic":
          content += `<img img-lazy class=cf-source src="${blobSrc ? blobSrc : `${src}?980`}" alt="${file.name}" data-cf=${isCF ? 1 : 0} data-src="${src}?980">`;
          break;
        default:
          content += `附件:<a class=cf-source target="_blank" href="${src}" data-cf=${isCF ? 1 : 0} data-src="${src}">${file.name}.${file.ext}</a>`;
      }
    }
    if (content) {
      editor.execCommand("mceInsertContent", false, content);
    }
  }
};
let isLoadedTinyMCE = false;
const loadjs = () => {
  return new Promise((resolve, reject) => {
    if (isLoadedTinyMCE)
      return resolve();
    let js = document.querySelector("#tinymce");
    if (!js) {
      js = document.createElement("script");
      js.id = "tinymce";
      js.src = "/assets/tinymce/tinymce.min.js";
      document.body.append(js);
    }
    const okHandle = () => {
      isLoadedTinyMCE = true;
      resolve();
      js.removeEventListener("load", okHandle);
    };
    const errHandle = () => {
      reject("TinyMCE编辑器加载失败");
      js.removeEventListener("error", errHandle);
    };
    js.addEventListener("load", okHandle);
    js.addEventListener("error", errHandle);
  });
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    imgBaseUrl: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: "editor"
    },
    imgDomain: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => ({})
    },
    dark: Boolean,
    placeholder: { type: String, default: "请输入内容" }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const globalStore = useGLobalStore();
    const { key, staticDomain } = globalStore.cloud;
    const showCloud = ref(false);
    let editor;
    const onCloudInsert = (filesInfo) => {
      cloudUploader(editor, filesInfo);
      showCloud.value = false;
    };
    const init = async () => {
      let content_style = '.mce-content-body{font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB", "Microsoft Yahei", sans-serif;font-size:14px;}';
      if (props.dark)
        content_style += ".mce-content-body{color:#fff}.mce-content-body[data-mce-placeholder]::before{color:#525252!important}";
      return new Promise((resolve, reject) => {
        tinymce.init({
          selector: `#${props.id}`,
          ...useTinyConfig(),
          ...props.options,
          dark: props.dark ? "dark" : "",
          placeholder: props.placeholder,
          content_style,
          setup(e) {
            editor = e;
            editor.on("change input undo redo", () => {
              let newContent = editor.getContent();
              if (newContent) {
                const cloudSourceInitReg = /(<(img|a).*?)\s(src|href)=".*?"(.*?data\-cf=.*?data\-src=.*?>)/g;
                newContent = newContent.replace(cloudSourceInitReg, "$1$4");
              }
              emit("update:modelValue", newContent);
            });
            e.ui.registry.addButton("cloud", {
              tooltip: "云盘",
              icon: "gallery",
              onAction: () => {
                showCloud.value = true;
              }
            });
          },
          init_instance_callback(editor2) {
            editor2.setContent(props.modelValue);
            let lazyImg = [], aLinks = [];
            if (props.options.inline) {
              lazyImg = document.querySelectorAll("img.cf-source");
              aLinks = document.querySelectorAll("a.cf-source");
            } else {
              const editorIframe = document.querySelector(`#${props.id}+.tox-tinymce iframe`);
              lazyImg = editorIframe.contentWindow.document.querySelectorAll("img.cf-source");
              aLinks = editorIframe.contentWindow.document.querySelectorAll("a.cf-source");
            }
            lazyImg.forEach((el) => {
              const isCloudFlare = el.dataset["cf"] == 1;
              lazy(el, () => {
                decodePicture({
                  url: isCloudFlare ? `${staticDomain}/${el.dataset["src"]}` : el.dataset["src"],
                  key
                }).then((bloburl) => {
                  el.src = bloburl;
                }).catch((e) => {
                  console.error(e);
                });
              });
            });
            aLinks.forEach((el) => {
              const isCloudFlare = el.dataset["cf"] == 1;
              el.href = isCloudFlare ? `${staticDomain}/${el.dataset["src"]}` : el.dataset["src"];
            });
            resolve(editor2);
          },
          ...props.options
        });
      });
    };
    const reload = () => {
      setTimeout(() => {
        editor.destroy();
        init();
      }, 0);
    };
    __expose({
      reload
    });
    onMounted(async () => {
      loadjs().then(init);
    });
    onBeforeUnmount(() => {
      if (editor)
        editor.destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div${ssrRenderAttr("id", props.id)} class="${ssrRenderClass({ "tinymce-inline-editor": __props.options.inline })}"></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showCloud.value,
        "onUpdate:open": ($event) => showCloud.value = $event,
        onInsert: onCloudInsert
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editor/tinymce/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
