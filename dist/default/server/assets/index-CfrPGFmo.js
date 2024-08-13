import { ref, inject, watch, onMounted, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext, computed, provide, reactive, resolveComponent, createVNode, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Select, SelectOption, Input, Table, message, Breadcrumb, BreadcrumbItem, Space, RangePicker, Spin, Divider } from "ant-design-vue";
import { a as getByMetrics, b as getActiveCount, L as LineChart, c as getOverview, g as getTodayOverview, d as getTrendOverview } from "./websites-CLim0lNO.js";
import { u as useGLobalStore } from "../entry-server.js";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { n as numFormat, e as secondsFormat } from "./common-ZcIx5rAG.js";
import "echarts/core";
import "echarts/charts";
import "echarts/components";
import "echarts/features";
import "echarts/renderers";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./dayjs-Cgr4VyVN.js";
import "dayjs";
import "node:path";
import "pinia";
import "crypto-js";
const _sfc_main$1 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const selectKey = ref(null);
    const searchKey = ref("");
    const list = ref([]);
    const loading = ref(false);
    const timekey = inject("timekey");
    const customDate = inject("customDate");
    const curMetric = inject("curMetric");
    const metricsPage = inject("metricsPage");
    const fetchList = async () => {
      try {
        loading.value = true;
        const query = { type: curMetric.value };
        if (timekey.value === "custom") {
          query.startAt = customDate.value[0].valueOf();
          query.endAt = customDate.value[1].valueOf();
        } else {
          query.timeType = timekey.value;
        }
        if (searchKey.value && selectKey.value)
          query[selectKey.value] = searchKey.value;
        await getByMetrics(query).then((res) => {
          if (res) {
            list.value = res;
          }
        });
      } catch (e) {
        console.error(e);
        message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "数据概况获取失败");
      } finally {
        loading.value = false;
      }
    };
    const onSearch = useDebounceFn(() => {
      fetchList();
    }, 500, { leading: false });
    const onSelectChange = () => {
      if (!selectKey.value) {
        searchKey.value = "";
        onSearch();
      }
    };
    watch(curMetric, () => {
      searchKey.value = "";
      fetchList();
    });
    watch(timekey, (time) => {
      if (time !== "custom") {
        searchKey.value = "";
        fetchList();
      }
    });
    onMounted(() => {
      fetchList();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "metric-page metric-pages" }, _attrs))}><div class="head f ac je mb20"> 筛选： `);
      _push(ssrRenderComponent(unref(Select), {
        value: selectKey.value,
        "onUpdate:value": ($event) => selectKey.value = $event,
        allowClear: "",
        placeholder: "请选择筛选类型",
        class: "mr10",
        style: { width: "140px" },
        onChange: onSelectChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(metricsPage), (v, k) => {
              _push2(ssrRenderComponent(unref(SelectOption), {
                key: k,
                value: k
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(v)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(v), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(metricsPage), (v, k) => {
                return openBlock(), createBlock(unref(SelectOption), {
                  key: k,
                  value: k
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(v), 1)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Input), {
        value: searchKey.value,
        "onUpdate:value": ($event) => searchKey.value = $event,
        style: { width: "260px" },
        placeholder: selectKey.value ? `请输入${unref(metricsPage)[selectKey.value]}` : "请先选择筛选类型",
        onChange: unref(onSearch)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Table), {
        columns: [
          { title: unref(metricsPage)[unref(curMetric)], dataIndex: "x", ellipsis: true },
          { title: "数量", dataIndex: "y", width: 200 }
        ],
        "data-source": list.value,
        size: "small",
        loading: loading.value,
        pagination: false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/stat/visit/metrics/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const initOverview = () => {
      return {
        legend: [],
        labels: [],
        series: [],
        bounces: { value: 0, prev: 0, ratio: 0, rate: 0 },
        pageviews: { value: 0, prev: 0, ratio: 0 },
        totaltime: { value: 0, prev: 0, ratio: 0, average: 0 },
        visitors: { value: 0, prev: 0, ratio: 0 },
        visits: { value: 0, prev: 0, ratio: 0 }
      };
    };
    const globalStore = useGLobalStore();
    const preadmin = computed(() => globalStore.preadmin);
    const route = useRoute();
    const timekey = ref("day");
    const customDate = ref([]);
    const mapTimekey = {
      day: "今天",
      week: "本周",
      month: "本月",
      week: "本周",
      "24h": "最近24小时",
      "7d": "最近7天",
      "30d": "最近30天",
      "90d": "最近90天",
      "custom": "自定义时间"
    };
    provide("timekey", timekey);
    provide("customDate", customDate);
    const overviewLoading = ref(true);
    const overview = reactive(initOverview());
    const webActiveConnect = ref(0);
    const curMetric = ref(route.params.metric || "url");
    const metricsPage = {
      url: "网页",
      referrer: "来源域名",
      event: "行为事件",
      browser: "浏览器",
      os: "操作系统",
      device: "设备",
      country: "国家",
      region: "州/省",
      city: "市/县",
      language: "语言",
      screen: "屏幕尺寸",
      query: "查询参数",
      host: "访问域名"
    };
    provide("curMetric", curMetric);
    provide("metricsPage", metricsPage);
    const fetchOverview = async () => {
      const hide = message.loading();
      try {
        const query = {};
        if (timekey.value === "custom") {
          query.startAt = customDate.value[0].valueOf();
          query.endAt = customDate.value[1].valueOf();
        } else {
          query.timeType = timekey.value;
        }
        await getOverview(query).then((res) => {
          const initState = (res == null ? void 0 : res.visits) ? res : initOverview();
          for (const k in initState) {
            overview[k] = initState[k];
          }
        });
      } catch (e) {
        console.error(e);
        message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "数据概况获取失败");
      } finally {
        hide();
      }
    };
    const fetchTrendVisits = () => {
      overviewLoading.value = true;
      if (timekey.value === "day") {
        getTodayOverview().then((res) => {
          overviewLoading.value = false;
          overview.legend = ["昨日访客", "今日访客"];
          overview.labels = new Array(24).fill(0).map((v, i) => `${i}时`);
          overview.series = (res == null ? void 0 : res.visitors) || [];
          return res;
        }).catch((e) => {
          message.error((e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "流量概况获取失败");
        });
      } else {
        const query = {};
        if (timekey.value === "custom") {
          query.startAt = customDate.value[0].startOf("day").valueOf();
          query.endAt = customDate.value[1].endOf("day").valueOf();
        } else {
          query.timeType = timekey.value;
        }
        getTrendOverview(query).then((res) => {
          overviewLoading.value = false;
          overview.legend = [`${mapTimekey[timekey.value]}访客`];
          overview.labels = res.sessions.map((v) => v.x);
          overview.series = [res.sessions.map((v) => v.y)];
        });
      }
    };
    const onTimeChange = () => {
      if (timekey.value !== "custom") {
        fetchOverview();
        fetchTrendVisits();
      }
    };
    const onRangeTimeChange = (dayjsArr) => {
      if (dayjsArr) {
        fetchOverview();
        fetchTrendVisits();
      }
    };
    onMounted(() => {
      getActiveCount().then((count) => webActiveConnect.value = count);
      fetchOverview();
      fetchTrendVisits();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Breadcrumb), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_RouterLink, {
                    to: `/${preadmin.value}`
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_MIcon, {
                          name: "dashboard",
                          class: "mr6"
                        }, null, _parent4, _scopeId3));
                        _push4(`控制台`);
                      } else {
                        return [
                          createVNode(_component_MIcon, {
                            name: "dashboard",
                            class: "mr6"
                          }),
                          createTextVNode("控制台")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_RouterLink, {
                      to: `/${preadmin.value}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, {
                          name: "dashboard",
                          class: "mr6"
                        }),
                        createTextVNode("控制台")
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`统计报表`);
                } else {
                  return [
                    createTextVNode("统计报表")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(BreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`访问统计`);
                } else {
                  return [
                    createTextVNode("访问统计")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createVNode(_component_RouterLink, {
                    to: `/${preadmin.value}`
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_MIcon, {
                        name: "dashboard",
                        class: "mr6"
                      }),
                      createTextVNode("控制台")
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("统计报表")
                ]),
                _: 1
              }),
              createVNode(unref(BreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("访问统计")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pannel mt14 stat-visit-page"><div class="overview f ac jb pt20 pl20 pb20 pr20"><div class="f"><div class="itm"><div class="label">访问量</div><div class="t"><b>${ssrInterpolate(unref(numFormat)(overview.visits.value))}</b></div><div><b class="${ssrRenderClass([`sugar-${overview.visits.ratio >= 0 ? "success" : "error"}`])}">`);
      _push(ssrRenderComponent(_component_MIcon, {
        name: `${overview.visits.ratio >= 0 ? "up" : "down"}-arrow`,
        class: "mr4"
      }, null, _parent));
      _push(` ${ssrInterpolate(overview.visits.ratio)}% </b></div></div><div class="itm"><div class="label">访客</div><div class="t"><b>${ssrInterpolate(unref(numFormat)(overview.visitors.value))}</b></div><div><b class="${ssrRenderClass([`sugar-${overview.visitors.ratio >= 0 ? "success" : "error"}`])}">`);
      _push(ssrRenderComponent(_component_MIcon, {
        name: `${overview.visitors.ratio >= 0 ? "up" : "down"}-arrow`,
        class: "mr4"
      }, null, _parent));
      _push(` ${ssrInterpolate(overview.visitors.ratio)}% </b></div></div><div class="itm"><div class="label">跳出率</div><div class="t"><b>${ssrInterpolate(overview.bounces.rate)}%</b></div><div><b class="${ssrRenderClass([`sugar-${overview.bounces.ratio >= 0 ? "success" : "error"}`])}">`);
      _push(ssrRenderComponent(_component_MIcon, {
        name: `${overview.bounces.ratio >= 0 ? "up" : "down"}-arrow`,
        class: "mr4"
      }, null, _parent));
      _push(` ${ssrInterpolate(overview.bounces.ratio)}% </b></div></div><div class="itm"><div class="label">平均访问时间</div><div class="t"><b>${ssrInterpolate(unref(secondsFormat)(overview.totaltime.average, "en"))}</b></div><div><b class="${ssrRenderClass([`sugar-${overview.totaltime.ratio >= 0 ? "success" : "error"}`])}">`);
      _push(ssrRenderComponent(_component_MIcon, {
        name: `${overview.totaltime.ratio >= 0 ? "up" : "down"}-arrow`,
        class: "mr4"
      }, null, _parent));
      _push(` ${ssrInterpolate(overview.totaltime.ratio)}% </b></div></div></div><div><div class="online-label f ac je mb20"><b>当前在线 ${ssrInterpolate(webActiveConnect.value)} 人</b></div>`);
      _push(ssrRenderComponent(unref(Space), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Select), {
              value: timekey.value,
              "onUpdate:value": ($event) => timekey.value = $event,
              style: { width: "160px" },
              onChange: onTimeChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(mapTimekey, (v, k) => {
                    _push3(ssrRenderComponent(unref(SelectOption), {
                      key: k,
                      value: k
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(v)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(v), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(mapTimekey, (v, k) => {
                      return createVNode(unref(SelectOption), {
                        key: k,
                        value: k
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(v), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (timekey.value === "custom") {
              _push2(ssrRenderComponent(unref(RangePicker), {
                value: customDate.value,
                "onUpdate:value": ($event) => customDate.value = $event,
                onChange: onRangeTimeChange
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Select), {
                value: timekey.value,
                "onUpdate:value": ($event) => timekey.value = $event,
                style: { width: "160px" },
                onChange: onTimeChange
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(mapTimekey, (v, k) => {
                    return createVNode(unref(SelectOption), {
                      key: k,
                      value: k
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(v), 1)
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
                ]),
                _: 1
              }, 8, ["value", "onUpdate:value"]),
              timekey.value === "custom" ? (openBlock(), createBlock(unref(RangePicker), {
                key: 0,
                value: customDate.value,
                "onUpdate:value": ($event) => customDate.value = $event,
                onChange: onRangeTimeChange
              }, null, 8, ["value", "onUpdate:value"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="chart pl20 pr20 mt10">`);
      _push(ssrRenderComponent(unref(Spin), {
        spinning: overviewLoading.value,
        class: "f ac jc",
        style: { height: "302px", width: "100%" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!overviewLoading.value) {
              _push2(ssrRenderComponent(LineChart, {
                style: { height: "302px" },
                legend: overview.legend,
                xAxis: overview.labels,
                series: overview.series
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !overviewLoading.value ? (openBlock(), createBlock(LineChart, {
                key: 0,
                style: { height: "302px" },
                legend: overview.legend,
                xAxis: overview.labels,
                series: overview.series
              }, null, 8, ["legend", "xAxis", "series"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Divider), null, null, _parent));
      _push(`</div><div class="visit-list pb30 pl20 pr20 f"><div class="metrics"><!--[-->`);
      ssrRenderList(metricsPage, (v, k) => {
        _push(`<div class="${ssrRenderClass([{ active: curMetric.value === k }, "mb4"])}">`);
        _push(ssrRenderComponent(_component_RouterLink, {
          to: `/${preadmin.value}/stat/visit/${k}`,
          class: "f ac",
          onClick: () => curMetric.value = k
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(v)}`);
            } else {
              return [
                createTextVNode(toDisplayString(v), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="fa w0 pl30">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/admin/stat/visit/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
