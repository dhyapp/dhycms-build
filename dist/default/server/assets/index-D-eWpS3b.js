import { inject, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, ref, h, watch, onMounted, nextTick, onBeforeUnmount, provide, openBlock, createBlock, createCommentVNode, createTextVNode, Fragment } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { Spin, Tooltip, Modal, notification, Button, message, Table, Empty } from "ant-design-vue";
import { u as useGLobalStore, r as request } from "../entry-server.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import { n as numFormat, q as query2str } from "./common-ZcIx5rAG.js";
import { L as Loading } from "./loading-DosIVvch.js";
import { u as updateLastestVersion } from "./dhy-CpRy-bJi.js";
import { a as restartAllActivedSites } from "./sites-CNKC-LVu.js";
import { g as getTodayOverview, L as LineChart } from "./websites-CLim0lNO.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import * as echarts from "echarts/core";
import { g as getSystemInfo } from "./system-OLfmn2RD.js";
import { g as getPosts } from "./post-DuWgPNIF.js";
import { s as selfreg } from "./index-0psH9gUa.js";
import "node:path";
import "vue-router";
import "pinia";
import "crypto-js";
import "echarts/charts";
import "echarts/components";
import "echarts/features";
import "echarts/renderers";
import "./dayjs-Cgr4VyVN.js";
import "dayjs";
const _sfc_main$5 = {
  __name: "overview",
  __ssrInlineRender: true,
  setup(__props) {
    const overview = inject("overview", { loading: false });
    const visitRate = computed(() => {
      const { yesterdayVisitorSum, todayVisitorSum } = overview.value;
      if (yesterdayVisitorSum) {
        const diff = todayVisitorSum - yesterdayVisitorSum;
        return Math.round(diff / yesterdayVisitorSum * 1e4) / 100;
      }
      return 0;
    });
    const incomeRate = computed(() => {
      const { yesterdayIncome, todayIncome } = overview.value;
      if (yesterdayIncome) {
        return Math.round(todayIncome / yesterdayIncome * 1e4) / 100;
      }
      return 0;
    });
    const selfregRate = computed(() => {
      const { selfregInCount, selfregCount } = overview.value;
      if (selfregInCount) {
        return Math.round(selfregInCount / selfregCount * 1e4) / 100;
      }
      return 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MIconJs = resolveComponent("MIconJs");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "f ac stat" }, _attrs))}><div class="f3p f ac itm"><span>`);
      _push(ssrRenderComponent(_component_MIconJs, { name: "shujutongji" }, null, _parent));
      _push(`</span><div class="fa w0">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: unref(overview).loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="txt-cg"${_scopeId}>日访客/日访量</div><div class="mt6"${_scopeId}><span class="fs26"${_scopeId}>${ssrInterpolate(unref(numFormat)(unref(overview).todayVisitorSum || 0))}</span><span class="ml4"${_scopeId}>/${ssrInterpolate(unref(numFormat)(unref(overview).todayVisitSum || 0))}</span>`);
            _push2(ssrRenderComponent(unref(Tooltip), {
              title: `访客较昨日${visitRate.value < 0 ? "下降" + visitRate.value : "增长" + visitRate.value}%`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass(`fs12 ml4 ${visitRate.value < 0 ? "txt-error" : "txt-success"}`)}"${_scopeId2}>${ssrInterpolate(visitRate.value)}%</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: `fs12 ml4 ${visitRate.value < 0 ? "txt-error" : "txt-success"}`
                    }, toDisplayString(visitRate.value) + "%", 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "txt-cg" }, "日访客/日访量"),
              createVNode("div", { class: "mt6" }, [
                createVNode("span", { class: "fs26" }, toDisplayString(unref(numFormat)(unref(overview).todayVisitorSum || 0)), 1),
                createVNode("span", { class: "ml4" }, "/" + toDisplayString(unref(numFormat)(unref(overview).todayVisitSum || 0)), 1),
                createVNode(unref(Tooltip), {
                  title: `访客较昨日${visitRate.value < 0 ? "下降" + visitRate.value : "增长" + visitRate.value}%`
                }, {
                  default: withCtx(() => [
                    createVNode("span", {
                      class: `fs12 ml4 ${visitRate.value < 0 ? "txt-error" : "txt-success"}`
                    }, toDisplayString(visitRate.value) + "%", 3)
                  ]),
                  _: 1
                }, 8, ["title"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="f3p f ac itm"><span>`);
      _push(ssrRenderComponent(_component_MIconJs, { name: "yue" }, null, _parent));
      _push(`</span><div class="fa w0">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: unref(overview).loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="txt-cg"${_scopeId}>日收入/总收入</div><div class="mt6"${_scopeId}><span class="fs26"${_scopeId}>${ssrInterpolate(unref(overview).todayIncome || 0)}</span><span class="ml4"${_scopeId}>/${ssrInterpolate(unref(numFormat)(unref(overview).allIncome) || 0)}</span>`);
            _push2(ssrRenderComponent(unref(Tooltip), {
              title: `较昨日${incomeRate.value < 0 ? "下降" + incomeRate.value : "增长" + incomeRate.value}%`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="${ssrRenderClass(`fs12 ml4 ${incomeRate.value < 0 ? "txt-error" : "txt-success"}`)}"${_scopeId2}>${ssrInterpolate(incomeRate.value)}%</span>`);
                } else {
                  return [
                    createVNode("span", {
                      class: `fs12 ml4 ${incomeRate.value < 0 ? "txt-error" : "txt-success"}`
                    }, toDisplayString(incomeRate.value) + "%", 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "txt-cg" }, "日收入/总收入"),
              createVNode("div", { class: "mt6" }, [
                createVNode("span", { class: "fs26" }, toDisplayString(unref(overview).todayIncome || 0), 1),
                createVNode("span", { class: "ml4" }, "/" + toDisplayString(unref(numFormat)(unref(overview).allIncome) || 0), 1),
                createVNode(unref(Tooltip), {
                  title: `较昨日${incomeRate.value < 0 ? "下降" + incomeRate.value : "增长" + incomeRate.value}%`
                }, {
                  default: withCtx(() => [
                    createVNode("span", {
                      class: `fs12 ml4 ${incomeRate.value < 0 ? "txt-error" : "txt-success"}`
                    }, toDisplayString(incomeRate.value) + "%", 3)
                  ]),
                  _: 1
                }, 8, ["title"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="f3p f ac itm"><span>`);
      _push(ssrRenderComponent(_component_MIconJs, { name: "sannongzhengce" }, null, _parent));
      _push(`</span><div class="fa w0">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: unref(overview).loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="txt-cg"${_scopeId}>已收录/总记录</div><div class="mt6"${_scopeId}><span class="fs26"${_scopeId}>${ssrInterpolate(unref(numFormat)(unref(overview).selfregInCount || 0))}</span><span class="ml4"${_scopeId}>/${ssrInterpolate(unref(numFormat)(unref(overview).selfregCount || 0))}</span>`);
            _push2(ssrRenderComponent(unref(Tooltip), {
              title: `收录率${selfregRate.value}%`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="tag tag-sm tag-e sugar-warning fs12 ml4"${_scopeId2}>${ssrInterpolate(`收录率${selfregRate.value}%`)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "tag tag-sm tag-e sugar-warning fs12 ml4" }, toDisplayString(`收录率${selfregRate.value}%`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "txt-cg" }, "已收录/总记录"),
              createVNode("div", { class: "mt6" }, [
                createVNode("span", { class: "fs26" }, toDisplayString(unref(numFormat)(unref(overview).selfregInCount || 0)), 1),
                createVNode("span", { class: "ml4" }, "/" + toDisplayString(unref(numFormat)(unref(overview).selfregCount || 0)), 1),
                createVNode(unref(Tooltip), {
                  title: `收录率${selfregRate.value}%`
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "tag tag-sm tag-e sugar-warning fs12 ml4" }, toDisplayString(`收录率${selfregRate.value}%`), 1)
                  ]),
                  _: 1
                }, 8, ["title"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="f3p f ac itm"><span>`);
      _push(ssrRenderComponent(_component_MIconJs, { name: "shequ" }, null, _parent));
      _push(`</span><div class="fa w0">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: unref(overview).loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="txt-cg"${_scopeId}>线上资源总数</div><div class="mt6"${_scopeId}><span class="fs26"${_scopeId}>${ssrInterpolate(unref(numFormat)(unref(overview).postCount || 0 + unref(overview).navCount || 0))}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "txt-cg" }, "线上资源总数"),
              createVNode("div", { class: "mt6" }, [
                createVNode("span", { class: "fs26" }, toDisplayString(unref(numFormat)(unref(overview).postCount || 0 + unref(overview).navCount || 0)), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/home/overview.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const updateNoticeKey = "globalUpdate";
const _sfc_main$4 = {
  __name: "updateModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const ssrStore = useSsrFetch();
    const lastestApp = computed(() => ssrStore.lastestApp);
    const systemInfo = inject("systemInfo", {});
    const show = computed({
      get() {
        return props.show;
      },
      set(v) {
        emits("update:show", v);
      }
    });
    const confirmLoading = ref(false);
    const mapVersionUpdateLog = computed(() => {
      if (!systemInfo.value.version || !lastestApp.value.updateLog)
        return "";
      let logs = "";
      for (const version in lastestApp.value.updateLog) {
        if (version > systemInfo.value.version) {
          logs += lastestApp.value.updateLog[version];
        }
      }
      return logs;
    });
    const onRestartApp = async () => {
      await restartAllActivedSites().then(() => {
        notification.destroy({ key: updateNoticeKey });
      });
    };
    const onCancel = () => {
      localStorage.setItem("ignoreUpdateVersion", lastestApp.value.version);
    };
    const onOk = async () => {
      show.value = false;
      notification.open({
        key: updateNoticeKey,
        message: "系统更新中",
        description: "系统正在后台更新，请在更新完成后重启",
        icon: h(Loading),
        duration: null,
        placement: "bottomRight"
      });
      await updateLastestVersion({
        productId: lastestApp.value.id
      }).then(() => {
        notification.success({
          key: updateNoticeKey,
          message: "系统更新完成",
          description: "系统最新版本已更新，将在系统下次重启后生效",
          duration: null,
          placement: "bottomRight",
          btn: () => h(Button, { type: "primary", size: "small", onClick: onRestartApp }, "立即重启")
        });
      }).catch((e) => {
        notification.error({
          key: updateNoticeKey,
          message: "系统更新失败",
          description: `错误信息：${(e == null ? void 0 : e.msg) || (e == null ? void 0 : e.messasge) || "系统最新版本已，将在系统下次重启后生效"}`,
          duration: null,
          placement: "bottomRight"
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Modal), mergeProps({
        open: show.value,
        "onUpdate:open": ($event) => show.value = $event,
        wrapClassName: "lastestapp-modal",
        centered: "",
        title: `导航蚁CMS更新内容`,
        okText: "立即更新",
        cancelText: "忽略本次更新",
        confirmLoading: confirmLoading.value,
        onCancel,
        onOk
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="scroll"${_scopeId}>${mapVersionUpdateLog.value}</div>`);
          } else {
            return [
              createVNode("div", {
                innerHTML: mapVersionUpdateLog.value,
                class: "scroll"
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/home/updateModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const usePieOptions = ({ names, series, isDark }) => {
  const colors = ["#249EFF", "#313CA9", "#21CCFF"];
  const darkColors = ["#3D72F6", "#A079DC", "#6CAAF5"];
  const options = {
    legend: {
      left: "center",
      data: names,
      bottom: 0,
      icon: "circle",
      itemWidth: 8,
      textStyle: {
        color: isDark ? "#fff" : "#4E5969"
      },
      itemStyle: {
        borderWidth: 0
      }
    },
    tooltip: {
      show: true,
      trigger: "item"
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        center: ["50%", "50%"],
        label: {
          formatter: "{d}%",
          fontSize: 14,
          color: isDark ? "#fff" : "#4E5969"
        },
        itemStyle: {
          borderColor: isDark ? "#232324" : "#fff",
          borderWidth: 1
        },
        data: series.map((v, i) => {
          const color = isDark ? darkColors[i] || darkColors[i % darkColors.length] : colors[i] || colors[i % colors.length];
          return {
            value: [v],
            name: names[i],
            itemStyle: { color }
          };
        })
      }
    ]
  };
  return options;
};
const _sfc_main$3 = {
  __name: "pie",
  __ssrInlineRender: true,
  props: {
    names: { type: Array, default: () => [] },
    series: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const globalStore = useGLobalStore();
    const chartRef = ref(null);
    let options = usePieOptions({ ...props, echarts, isDark: globalStore.theme === "dark" });
    let chart;
    const resizeHandle = () => {
      chart.resize();
    };
    watch(() => globalStore.theme, (theme) => {
      options = usePieOptions({ ...props, echarts, isDark: theme === "dark" });
      chart.setOption(options);
    });
    onMounted(() => {
      nextTick(() => {
        chart = echarts.init(chartRef.value);
        chart.setOption(options);
        window.addEventListener("resize", resizeHandle);
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandle);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "chartRef",
        ref: chartRef,
        class: "echarts-area"
      }, _attrs))} data-v-d3a19a06></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/echarts/pie.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const PieChart = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d3a19a06"]]);
const _sfc_main$2 = {
  __name: "tabs-card",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [Number, String], default: 0 },
    tabs: Array
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tabs-card" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.tabs, (v, i) => {
        _push(`<div class="${ssrRenderClass([{ active: v.value === __props.modelValue || i === __props.modelValue }, "tab"])}">${ssrInterpolate(v.name || v)}</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/tabs-card.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "list-label",
  __ssrInlineRender: true,
  props: {
    title: String,
    labels: { type: Array, default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-label-item f ac" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.labels, (v, i) => {
        _push(`<label class="${ssrRenderClass(`sugar-${v.color} fs12`)}">${ssrInterpolate(v.name)}</label>`);
      });
      _push(`<!--]--><div class="txt-ellipsis-1">${ssrInterpolate(__props.title)}</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/list-label.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const getLocalOverview = (query = {}, options = {}) => {
  return request(`/api/v1/admin/stats/overview?${query2str(query)}`, {
    ...options
  });
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const lastestApp = computed(() => ssrStore.lastestApp);
    const user = computed(() => globalStore.user);
    const preadmin = computed(() => globalStore.preadmin);
    const systemInfo = ref({ loading: true });
    const overview = ref({
      loading: true,
      labels: new Array(24).fill(0).map((v, i) => `${i}时`),
      series: [[], []],
      todayPerHours: [],
      todayIncome: 0,
      yesterdayIncome: 0,
      allIncome: 0,
      postCount: 0,
      navCount: 0,
      selfregInCount: 0,
      selfregCount: 0
    });
    provide("overview", overview);
    provide("systemInfo", systemInfo);
    const showUpdateLog = ref(false);
    const quickActions = ref([
      { name: "添加链接", icon: "link", href: `nav/edit` },
      { name: "发布文章", icon: "book-fill", href: `post/edit` },
      { name: "广告投放", icon: "zhuanzhu", href: `ads/edit` },
      { name: "访问报表", icon: "group", href: `stat/visit` },
      { name: "链接报表", icon: "stat", href: `stat/nav` },
      { name: "广告报表", icon: "coin-fill", href: `stat/ad` }
    ]);
    ref([
      // {name: '写文章', icon: 'edit', href:`post/edit`},
      // {name: '发布册子', icon: 'book-fill', href:`book/edit`},
      // {name: '发布灵感', icon: 'image-fill', href:`gallery/edit`},
    ]);
    const dynamicMsgs = ref([
      { label: "活动", title: "『Javascript之光』限时特惠进行中", labelType: "error" },
      { label: "消息", title: "新增内容因存在违规词未通过，详情请点击查看", labelType: "warning" },
      { label: "消息", title: "评论存在违规词，请及时查看处理", labelType: "warning" },
      { label: "通知", title: "2月份系统升级计划", labelType: "info" },
      { label: "公告", title: "3月份用户活动计划表", labelType: "info" },
      { label: "通知", title: "4月份系统升级计划", labelType: "info" },
      { label: "公告", title: "5月份用户活动计划表", labelType: "info" }
    ]);
    const hostPosts = ref([]);
    const fetchPosts = (sortby = "viewCount") => {
      getPosts({ pageSize: 6, sortby }).then((res) => {
        var _a;
        hostPosts.value = (_a = res == null ? void 0 : res.result) == null ? void 0 : _a.map((v, i) => ({
          id: v.id,
          sort: i + 1,
          title: v.title,
          viewCount: numFormat(v.viewCount)
        }));
      });
    };
    const mapSelfNavStatus = {
      out: "未收录",
      in: "已收录",
      refuse: "拒绝",
      block: "拉黑"
    };
    const mapSelfNavColor = {
      out: "info",
      in: "success",
      refuse: "error",
      block: "grey"
    };
    const fetchRecentSelfNav = () => {
      selfreg.list({ pageSize: 10 }).then((res) => {
        var _a;
        dynamicMsgs.value = ((_a = res == null ? void 0 : res.list) == null ? void 0 : _a.map((v) => ({
          labels: [
            { name: mapSelfNavStatus[v.status], color: mapSelfNavColor[v.status] },
            { name: `来源${v.referrerCount || 0}`, color: "grey" }
          ],
          title: v.name
        }))) || [];
      }).catch((e) => {
        message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "收录近况获取失败");
      });
    };
    const onShowLastestUpdate = () => {
      showUpdateLog.value = true;
    };
    onMounted(() => {
      getSystemInfo().then((res) => {
        res.loading = false;
        systemInfo.value = res || {};
      });
      fetchPosts();
      fetchRecentSelfNav();
      Promise.allSettled([
        getTodayOverview().then((res) => {
          if (res) {
            overview.value.series = (res == null ? void 0 : res.visitors) || [];
            overview.value.todayVisitorSum = res == null ? void 0 : res.visitors[1].reduce((a, b) => a + b);
            overview.value.todayVisitSum = res == null ? void 0 : res.visits[1].reduce((a, b) => a + b);
            overview.value.yesterdayVisitorSum = res == null ? void 0 : res.visitors[0].reduce((a, b) => a + b);
            overview.value.yesterdayVisitSum = res == null ? void 0 : res.visits[0].reduce((a, b) => a + b);
          }
          return res;
        }).catch((e) => {
          message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "流量概况获取失败");
        }),
        getLocalOverview().then((res) => {
          if (res) {
            for (const k in res) {
              overview.value[k] = res[k];
            }
          }
        }).catch((e) => {
          message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "资源概览获取失败");
        })
      ]).then(() => {
        overview.value.loading = false;
        if (lastestApp.value.version) {
          const ignoreUpdateVersion = localStorage.getItem("ignoreUpdateVersion");
          if (ignoreUpdateVersion !== lastestApp.value.version) {
            showUpdateLog.value = true;
          }
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<!--[--><div class="f pagehome"><div class="fa w0"><div class="pannel banner"><div class="phead"><span class="t">欢迎回来！${ssrInterpolate(user.value.nickname || user.value.username)}</span></div><hr><div class="pbody">`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`<hr class="mt20"><div class="head">今日流量概况</div>`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: overview.value.loading,
        class: "f ac jc",
        style: { height: "302px", width: "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!overview.value.loading) {
              _push2(ssrRenderComponent(LineChart, {
                style: { height: "302px" },
                legend: ["昨日", "今日"],
                xAxis: overview.value.labels,
                series: overview.value.series
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !overview.value.loading ? (openBlock(), createBlock(LineChart, {
                key: 0,
                style: { height: "302px" },
                legend: ["昨日", "今日"],
                xAxis: overview.value.labels,
                series: overview.value.series
              }, null, 8, ["xAxis", "series"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="f as mt16"><div class="f6p pannel"><div class="phead f jb ac"><span class="t">线上热门内容</span><a${ssrRenderAttr("href", `/${preadmin.value}/post`)} class="fs13 txt-i">查看更多</a></div><div class="pbody pt0"><div class="f jb ac"><div class="minipagination">`);
      _push(ssrRenderComponent(_sfc_main$2, { tabs: ["文章"] }, null, _parent));
      _push(`</div></div><div class="mt16">`);
      _push(ssrRenderComponent(unref(Table), {
        columns: [
          { title: "排名", dataIndex: "sort", width: 60 },
          { title: "标题", dataIndex: "title", ellipsis: true },
          { title: "阅读量", dataIndex: "viewCount", width: 80, align: "center" }
          // {title:'点赞', dataIndex:'up', width:80, align:'center'},
        ],
        "data-source": hostPosts.value,
        pagination: false,
        ellipsis: "",
        size: "small"
      }, null, _parent));
      _push(`</div></div></div><div class="fa w0 pannel ml16"><div class="phead f jb ac"><span class="t">线上内容占比</span></div><div class="f ac jc pb30">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: overview.value.loading,
        class: "f ac jc",
        style: { width: "440px", height: "270px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!overview.value.loading) {
              _push2(ssrRenderComponent(PieChart, {
                style: { width: "440px", height: "270px" },
                names: ["链接", "文章"],
                series: [overview.value.navCount || 0, overview.value.postCount]
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !overview.value.loading ? (openBlock(), createBlock(PieChart, {
                key: 0,
                style: { width: "440px", height: "270px" },
                names: ["链接", "文章"],
                series: [overview.value.navCount || 0, overview.value.postCount]
              }, null, 8, ["series"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="ph-right"><div class="pannel quick-actions"><div class="phead f ac jb"><span class="t">快捷操作</span></div><div class="pbody pt0"><div class="f fw"><!--[-->`);
      ssrRenderList(quickActions.value, (v, i) => {
        _push(ssrRenderComponent(_component_RouterLink, {
          to: `/${preadmin.value}/${v.href}`,
          class: "itm f4p"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MIcon, {
                name: v.icon
              }, null, _parent2, _scopeId));
              _push2(`<div class="fs12"${_scopeId}>${ssrInterpolate(v.name)}</div>`);
            } else {
              return [
                createVNode(_component_MIcon, {
                  name: v.icon
                }, null, 8, ["name"]),
                createVNode("div", { class: "fs12" }, toDisplayString(v.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div><div class="pannel system-status mt16">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: systemInfo.value.loading
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="phead f ac jb"${_scopeId}><span class="f ac"${_scopeId}><span class="t"${_scopeId}>系统状态</span><span class="txt-g restart-btn fs13"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MIcon, {
              name: "restart",
              class: "mr4"
            }, null, _parent2, _scopeId));
            _push2(`重启系统 </span></span><span class="sugar-success fs13"${_scopeId}>良好</span></div><div class="pbody f fw fs13"${_scopeId}><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>当前系统：</label><span${_scopeId}>${ssrInterpolate(systemInfo.value.os)}</span></div><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>CPU：</label><span${_scopeId}>${ssrInterpolate(systemInfo.value.cpu)}</span></div><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>内存：</label><span${_scopeId}>${ssrInterpolate(systemInfo.value.usedMemory)}G/${ssrInterpolate(systemInfo.value.memory)}G</span></div><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>Nginx：</label> ${ssrInterpolate(systemInfo.value.nginxVersion || "未安装")}</div><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>Node版本：</label> ${ssrInterpolate(systemInfo.value.nodeVersion)}</div><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>MongoDB：</label> ${ssrInterpolate(systemInfo.value.mongoDB || "未知")}</div><div class="item"${_scopeId}><label class="txt-g"${_scopeId}>程序：</label><div${_scopeId}> 当前版本 v${ssrInterpolate(systemInfo.value.version)} `);
            if (lastestApp.value.version > systemInfo.value.version) {
              _push2(`<!--[--> （最新版本 v${ssrInterpolate(lastestApp.value.version)}） <span class="sugar-primary lastestapp-btn"${_scopeId}>点击更新</span><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "phead f ac jb" }, [
                createVNode("span", { class: "f ac" }, [
                  createVNode("span", { class: "t" }, "系统状态"),
                  createVNode("span", {
                    class: "txt-g restart-btn fs13",
                    onClick: unref(restartAllActivedSites)
                  }, [
                    createVNode(_component_MIcon, {
                      name: "restart",
                      class: "mr4"
                    }),
                    createTextVNode("重启系统 ")
                  ], 8, ["onClick"])
                ]),
                createVNode("span", { class: "sugar-success fs13" }, "良好")
              ]),
              createVNode("div", { class: "pbody f fw fs13" }, [
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "当前系统："),
                  createVNode("span", null, toDisplayString(systemInfo.value.os), 1)
                ]),
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "CPU："),
                  createVNode("span", null, toDisplayString(systemInfo.value.cpu), 1)
                ]),
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "内存："),
                  createVNode("span", null, toDisplayString(systemInfo.value.usedMemory) + "G/" + toDisplayString(systemInfo.value.memory) + "G", 1)
                ]),
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "Nginx："),
                  createTextVNode(" " + toDisplayString(systemInfo.value.nginxVersion || "未安装"), 1)
                ]),
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "Node版本："),
                  createTextVNode(" " + toDisplayString(systemInfo.value.nodeVersion), 1)
                ]),
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "MongoDB："),
                  createTextVNode(" " + toDisplayString(systemInfo.value.mongoDB || "未知"), 1)
                ]),
                createVNode("div", { class: "item" }, [
                  createVNode("label", { class: "txt-g" }, "程序："),
                  createVNode("div", null, [
                    createTextVNode(" 当前版本 v" + toDisplayString(systemInfo.value.version) + " ", 1),
                    lastestApp.value.version > systemInfo.value.version ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(" （最新版本 v" + toDisplayString(lastestApp.value.version) + "） ", 1),
                      createVNode("span", {
                        class: "sugar-primary lastestapp-btn",
                        onClick: onShowLastestUpdate
                      }, "点击更新")
                    ], 64)) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pannel system-dynamic mt16"><div class="phead f ac jb"><span class="t">最近收录</span><a${ssrRenderAttr("href", `/${preadmin.value}/selfreg`)} class="fs13 txt-i">查看更多</a></div><div class="pbody pt0 list-label-wrapper">`);
      if (dynamicMsgs.value.length) {
        _push(`<!--[-->`);
        ssrRenderList(dynamicMsgs.value, (v, i) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: i,
            labels: v.labels,
            title: v.title
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(unref(Empty), {
          image: unref(Empty).PRESENTED_IMAGE_SIMPLE,
          description: "暂无收录数据"
        }, null, _parent));
      }
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        show: showUpdateLog.value,
        "onUpdate:show": ($event) => showUpdateLog.value = $event
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/home/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
