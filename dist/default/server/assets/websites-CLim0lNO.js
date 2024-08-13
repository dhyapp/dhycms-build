import { ref, watch, onMounted, nextTick, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import * as echarts from "echarts/core";
import { LineChart as LineChart$1, PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, DatasetComponent, TransformComponent } from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { u as useGLobalStore, r as request } from "../entry-server.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { g as getDurationUnix } from "./dayjs-Cgr4VyVN.js";
import { q as query2str } from "./common-ZcIx5rAG.js";
import dayjs from "dayjs";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  LineChart$1,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
const useLineOptions = ({ xAxis, series, echarts: echarts2, isDark, legend = [] }) => {
  const lineStyles = [
    {
      width: 3,
      color: new echarts2.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "rgba(255, 0, 60, .3)"
        },
        {
          offset: 0.5,
          color: "rgba(255, 0, 72, .4)"
        },
        {
          offset: 1,
          color: "rgba(255, 0, 72, .5)"
        }
      ])
    },
    {
      width: 3,
      color: new echarts2.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: "rgba(30, 231, 255, 1)"
        },
        {
          offset: 0.5,
          color: "rgba(36, 154, 255, 1)"
        },
        {
          offset: 1,
          color: "rgba(111, 66, 251, 1)"
        }
      ])
    }
  ];
  const areasStyle = [
    {
      opacity: 0.8,
      color: new echarts2.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(255, 0, 72, .2)"
        },
        {
          offset: 1,
          color: "rgba(255, 0, 72, .01)"
        }
      ])
    },
    {
      opacity: 0.8,
      color: new echarts2.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(17, 126, 255, 0.8)"
        },
        {
          offset: 1,
          color: "rgba(17, 128, 255, 0.1)"
        }
      ])
    }
  ];
  const legendColors = ["rgba(255, 0, 72, .5)", "rgba(111, 66, 251, 1)"];
  const options = {
    legend: {
      data: legend.map((v, i) => ({
        name: v,
        itemStyle: {
          color: legendColors[i]
        }
      }))
    },
    grid: {
      left: "40",
      right: "10",
      top: legend.length ? "30" : "10",
      bottom: "20"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis,
      splitLine: {
        show: true,
        interval: (idx) => {
          if (idx === 0)
            return false;
          if (idx === xAxis.length - 1)
            return false;
          return true;
        },
        lineStyle: {
          color: isDark ? "#333" : "#E5E8EF"
        }
      }
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: isDark ? "#333" : "#E5E8EF"
        }
      }
    },
    series: series.map((data, i) => ({
      name: legend[i],
      data,
      type: "line",
      smooth: true,
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: 2
        }
      },
      showSymbol: false,
      lineStyle: lineStyles[i],
      areaStyle: areasStyle[i]
    }))
  };
  return options;
};
const _sfc_main = {
  __name: "line",
  __ssrInlineRender: true,
  props: {
    xAxis: { type: Array, default: () => [] },
    series: { type: Array, default: () => [] },
    legend: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const globalStore = useGLobalStore();
    const lineChart = ref(null);
    let options = useLineOptions({ ...props, echarts, isDark: globalStore.theme === "dark" });
    let chart;
    const resizeHandle = () => {
      chart.resize();
    };
    watch(() => globalStore.theme, (theme) => {
      options = useLineOptions({ ...props, echarts, isDark: theme === "dark" });
      chart.setOption(options);
    });
    onMounted(() => {
      nextTick(() => {
        chart = echarts.init(lineChart.value);
        chart.setOption(options);
        window.addEventListener("resize", resizeHandle);
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandle);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "lineChart",
        ref: lineChart,
        class: "echarts-line"
      }, _attrs))} data-v-3516ff63></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/echarts/line.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LineChart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3516ff63"]]);
const timezone = "Asia/Shanghai";
const getTodayOverview = () => {
  return new Promise((resolve, reject) => {
    const store = useGLobalStore();
    if (!store.webID)
      return reject({ err: 1, msg: "未授权webID" });
    let startAt = dayjs().subtract(1, "day").startOf("day").valueOf(), endAt = dayjs().endOf("day").valueOf();
    request(`/api/v1/admin/stat/websites/${store.webID}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=hour&timezone=${timezone}`).then((res) => {
      const todayLabel = dayjs().format("YYYY-MM-DD");
      const todaySeries = new Array(24).fill(0), yesterdaySeries = new Array(24).fill(0), todayVisitSeries = new Array(24).fill(0), yesterdayVisitSeries = new Array(24).fill(0);
      for (let i = 0; i < res.sessions.length; i++) {
        const label = res.sessions[i].x;
        const hourIndex = parseInt(label.match(/.*?\s(\d{2}).*/)[1]);
        if (label.includes(todayLabel)) {
          todaySeries[hourIndex] = res.sessions[i].y;
        } else {
          yesterdaySeries[hourIndex] = res.sessions[i].y;
        }
      }
      for (let i = 0; i < res.pageviews.length; i++) {
        const label = res.pageviews[i].x;
        const hourIndex = parseInt(label.match(/.*?\s(\d{2}).*/)[1]);
        if (label.includes(todayLabel)) {
          todayVisitSeries[hourIndex] = res.pageviews[i].y;
        } else {
          yesterdayVisitSeries[hourIndex] = res.pageviews[i].y;
        }
      }
      resolve({
        visitors: [yesterdaySeries, todaySeries],
        visits: [yesterdayVisitSeries, todayVisitSeries]
      });
    }).catch(reject);
  });
};
const getActiveCount = () => {
  return new Promise((resolve, reject) => {
    const store = useGLobalStore();
    if (!store.webID)
      return reject({ err: 1, msg: "未授权webID" });
    request(`/api/v1/admin/stat/websites/${store.webID}/active`).then((res) => resolve((res == null ? void 0 : res.x) || 0)).catch(reject);
  });
};
const getOverview = ({ timeType = "day", startAt, endAt, ...state }) => {
  return new Promise((resolve, reject) => {
    if (!startAt && !endAt) {
      const unix = getDurationUnix(timeType);
      startAt = unix.startAt;
      endAt = unix.endAt;
    }
    const store = useGLobalStore();
    if (!store.webID)
      return reject({ err: 1, msg: "未授权webID" });
    const query = { startAt, endAt, ...state };
    request(`/api/v1/admin/stat/websites/${store.webID}/stats?${query2str(query)}`).then((res) => {
      if (res.visits) {
        if (res.visits.value) {
          res.bounces.rate = Math.round(res.bounces.value / res.visits.value * 1e4) / 100;
          res.totaltime.average = Math.round(res.totaltime.value / res.visits.value * 10) / 10;
        } else {
          res.bounces.rate = 0;
          res.totaltime.average = 0;
        }
        if (res.visits.prev) {
          res.totaltime.prevaverage = Math.round(res.totaltime.prev / res.visits.prev * 10) / 10;
          const visitsDiff = res.visits.value - res.visits.prev;
          res.visits.ratio = Math.round(visitsDiff / res.visits.prev * 1e3) / 100;
        } else {
          res.visits.ratio = 0;
        }
        if (res.totaltime.prevaverage) {
          const averageDiff = res.totaltime.average - res.totaltime.prevaverage;
          res.totaltime.ratio = Math.round(averageDiff / res.totaltime.prevaverage * 1e3) / 100;
        } else {
          res.totaltime.ratio = 0;
        }
        if (res.bounces.prev) {
          const bouncesDiff = res.bounces.value - res.bounces.prev;
          res.bounces.ratio = Math.round(bouncesDiff / res.bounces.prev * 1e3) / 100;
        } else {
          res.bounces.ratio = 0;
        }
        if (res.pageviews.prev) {
          const pageviewsDiff = res.pageviews.value - res.pageviews.prev;
          res.pageviews.ratio = Math.round(pageviewsDiff / res.pageviews.prev * 1e3) / 100;
        } else {
          res.pageviews.ratio = 0;
        }
        if (res.visitors.prev) {
          const visitorsiff = res.visitors.value - res.visitors.prev;
          res.visitors.ratio = Math.round(visitorsiff / res.visitors.prev * 1e3) / 100;
        } else {
          res.visitors.ratio = 0;
        }
      }
      resolve(res);
      return res;
    }).catch(reject);
  });
};
const getTrendOverview = ({ timeType = "day", startAt, endAt }) => {
  return new Promise((resolve, reject) => {
    if (!startAt && !endAt) {
      const unix = getDurationUnix(timeType);
      startAt = unix.startAt;
      endAt = unix.endAt;
    }
    const store = useGLobalStore();
    if (!store.webID)
      return reject({ err: 1, msg: "未授权webID" });
    const query = {
      startAt,
      endAt,
      timezone,
      unit: timeType === "day" || timeType === "24h" ? "hour" : timeType === "year" || timeType === "90d" ? "month" : "day"
    };
    request(`/api/v1/admin/stat/websites/${store.webID}/pageviews?${query2str(query)}`).then(resolve).catch(reject);
  });
};
const getByMetrics = ({ timeType = "day", startAt, endAt, ...args }) => {
  return new Promise((resolve, reject) => {
    if (!startAt && !endAt) {
      const unix = getDurationUnix(timeType);
      startAt = unix.startAt;
      endAt = unix.endAt;
    }
    const store = useGLobalStore();
    if (!store.webID)
      return reject({ err: 1, msg: "未授权webID" });
    const query = {
      startAt,
      endAt,
      ...args
    };
    request(`/api/v1/admin/stat/websites/${store.webID}/metrics?${query2str(query)}`).then(resolve).catch(reject);
  });
};
export {
  LineChart as L,
  getByMetrics as a,
  getActiveCount as b,
  getOverview as c,
  getTrendOverview as d,
  getTodayOverview as g
};
