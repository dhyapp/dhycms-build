import { defineStore } from "pinia";
const useSsrFetch = defineStore("ssrFetch", {
  state: () => {
    return {
      appname: "",
      config: {
        dhy: {}
      },
      plugins: [],
      templates: [],
      lastestApp: {},
      sites: [],
      roleAuth: [],
      localIP: ""
    };
  },
  actions: {}
});
export {
  useSsrFetch as u
};
