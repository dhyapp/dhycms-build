const sleep = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});
const preZero = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
};
const copy = (str) => {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(str).then(resolve).catch(reject);
    } else {
      const input = document.createElement("textarea");
      input.value = str;
      input.style.cssText = "position:fixed;opacity:0";
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      resolve();
    }
  });
};
const numFormat = (num) => {
  if (num > 1e4)
    return `${Math.round(num / 1e3 * 10) / 100}w`;
  if (num > 1e3)
    return `${Math.round(num / 100 * 10) / 100}k`;
  return num || 0;
};
const byteFormat = (size) => {
  const KB = 1024, MB = KB * 1024, GB = MB * 1024, TB = GB * 1024;
  if (size > TB)
    return `${Math.round(size / TB * 100) / 100}T`;
  if (size > GB)
    return `${Math.round(size / GB * 100) / 100}G`;
  if (size > MB)
    return `${Math.round(size / MB * 100) / 100}M`;
  if (size > KB)
    return `${Math.round(size / KB * 100) / 100}K`;
  else
    return `${size}B`;
};
const dateFormat = (date, format = "YYYY-MM-DD") => {
  if (!(date instanceof Date)) {
    date = date ? new Date(date) : /* @__PURE__ */ new Date();
  }
  const year = date.getFullYear();
  const month = preZero(date.getMonth() + 1);
  const day = preZero(date.getDate());
  const hours = preZero(date.getHours());
  const minutes = preZero(date.getMinutes());
  const seconds = preZero(date.getSeconds());
  return format.replace("YYYY", year).replace("MM", month).replace("DD", day).replace("hh", hours).replace("mm", minutes).replace("ss", seconds);
};
const dateFromID = (id, format = "YYYY-MM-DD") => {
  if (!id)
    return;
  const t = new Date(parseInt(id.toString().substring(0, 8), 16) * 1e3);
  return dateFormat(t, format);
};
const query2str = (query) => {
  const params = new URLSearchParams();
  for (const key in query) {
    params.append(key, query[key]);
  }
  return params.toString();
};
const toTree = (options) => {
  let { data = [], key = "_id", pKey = "pid", cKey = "children" } = options;
  if (!(data instanceof Array) && data.length === 0)
    return [];
  data = JSON.parse(JSON.stringify(data));
  return data.filter((father) => {
    let children = data.filter((child) => father[key] === child[pKey]);
    if (children.length)
      father[cKey] = children;
    return !father[pKey] || father[pKey] == "0";
  });
};
const generateMixed = (len = 6, justNum = false) => {
  const nums = "0123456789";
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (justNum)
    chars = nums;
  else
    chars += nums;
  let cLen = chars.length - 1;
  let res = "";
  for (let i = 0; i < len; i++) {
    let index = Math.ceil(Math.random() * cLen);
    res += chars[index];
  }
  return res;
};
const secondsFormat = (seconds, charLang = "cn") => {
  if (seconds > 3600) {
    let hours = Math.round(seconds / 3600 * 10) / 10;
    return `${hours}${charLang === "cn" ? "小时" : "h"}`;
  }
  if (seconds > 60) {
    let minutes = Math.round(seconds / 60 * 10) / 10;
    return `${minutes}${charLang === "cn" ? "分钟" : "m"}`;
  }
  return `${Math.round(seconds * 10) / 10}${charLang === "cn" ? "秒" : "s"}`;
};
const cn2charcode = (str) => {
  if (!str)
    return "";
  let codeStr = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 19968 && charCode <= 40959) {
      codeStr += `&#${charCode};`;
    } else {
      codeStr += str[i];
    }
  }
  return codeStr;
};
export {
  copy as a,
  dateFormat as b,
  cn2charcode as c,
  dateFromID as d,
  secondsFormat as e,
  byteFormat as f,
  generateMixed as g,
  numFormat as n,
  query2str as q,
  sleep as s,
  toTree as t
};
