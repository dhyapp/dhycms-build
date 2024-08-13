import { computed, ref, watchEffect, onMounted, resolveComponent, resolveDirective, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, withDirectives, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { l as logoImg } from "./logox-DC6lobCp.js";
import { Tooltip, Dropdown, Divider, Menu, MenuItem, Avatar, MenuDivider, Spin, message } from "ant-design-vue";
import { u as useGLobalStore, a as useAdminMenu } from "../entry-server.js";
import { useRoute, useRouter } from "vue-router";
import { g as getProfile, l as logout } from "./user-DniUCSmL.js";
import { r as restartThisSite } from "./sites-CNKC-LVu.js";
import { g as getDHYProducts } from "./dhy-CpRy-bJi.js";
import { a as asyncData } from "./asyncData.common-y3XAKvqf.js";
import { u as useSsrFetch } from "./ssrFetch-DNAH9Bfk.js";
import "node:path";
import "pinia";
import "crypto-js";
import "./common-ZcIx5rAG.js";
import "os";
const __default__ = {
  async asyncData({ store, server, ctx }) {
    await asyncData({ store, server, ctx });
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Admin",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const globalStore = useGLobalStore();
    const ssrStore = useSsrFetch();
    const siteinfo = computed(() => globalStore.siteinfo);
    const user = computed(() => globalStore.user);
    const preadmin = computed(() => globalStore.preadmin);
    const curMenu = ref(null);
    const curSubMenu = ref(null);
    const menu = ref(useAdminMenu());
    const menuPackup = ref(true);
    const theme = computed({
      get() {
        return globalStore.theme;
      },
      set(v) {
        globalStore.theme = v;
      }
    });
    const uip5000Plugin = computed(() => {
      const idx = ssrStore.plugins.findIndex((v) => v.name === "uip5000");
      return ssrStore.plugins[idx] || {};
    });
    const changeTheme = () => {
      theme.value = theme.value === "dark" ? "light" : "dark";
      document.body.setAttribute("theme", theme.value);
      localStorage.setItem("theme", theme.value);
    };
    const extendMenu = () => {
      menuPackup.value = !menuPackup.value;
      menuPackup.value ? localStorage.setItem("menuPackup", menuPackup.value) : localStorage.removeItem("menuPackup");
    };
    const onSubMenuClick = (index) => {
    };
    const mapVIPIcon = ["pro-gray", "pro", "pro-pro"];
    const mapVIPName = ["免费版", "专业版", "旗舰版"];
    watchEffect(() => {
      var _a;
      curMenu.value = null;
      if (route.path === `/${preadmin.value}`) {
        curMenu.value = 0;
        curSubMenu.value = null;
      } else {
        const matches = route.matched;
        outer:
          for (let i = 0; i < menu.value.length; i++) {
            const match0path = matches[0].path.replace(/\/:\w+\??$/, "");
            if (menu.value[i].to !== `/${preadmin.value}` && match0path.startsWith(menu.value[i].to)) {
              curMenu.value = i;
              menu.value[i].active = true;
              if (((_a = menu.value[i].children) == null ? void 0 : _a.length) && matches[1]) {
                inner:
                  for (let j = 0; j < menu.value[i].children.length; j++) {
                    const match1path = matches[1].path.replace(/\/:\w+\??$/, "");
                    if (menu.value[i].children[j].to.startsWith(match1path)) {
                      curSubMenu.value = j;
                      break inner;
                    }
                  }
              }
              break outer;
            }
          }
      }
    });
    const onLogout = async () => {
      const hideLoading = message.loading();
      try {
        await logout().then(() => {
          router.push(`/${preadmin.value}/login`);
        });
      } finally {
        hideLoading();
      }
    };
    const onRestartSite = async () => {
      await restartThisSite().then(() => {
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    };
    onMounted(() => {
      menuPackup.value = !!localStorage.getItem("menuPackup");
      getProfile();
      getDHYProducts("all").then((res) => {
        var _a;
        (_a = res == null ? void 0 : res.list) == null ? void 0 : _a.forEach((product) => {
          if (product.type === "plugin") {
            const idx = ssrStore.plugins.findIndex((v) => v.name === product.key);
            if (idx > -1) {
              ssrStore.plugins[idx].newestVersion = product.version;
              if (product.version > ssrStore.plugins[idx].version) {
                const menuIdx = menu.value.findIndex((v) => v.name === "插件管理");
                if (menuIdx > -1) {
                  menu.value[menuIdx].notice = "New";
                }
              }
            }
          } else if (product.type === "template") {
            const idx = ssrStore.templates.findIndex((v) => v.name === product.key);
            if (idx > -1) {
              ssrStore.templates[idx].newestVersion = product.version;
              if (product.version > ssrStore.templates[idx].version) {
                const menuIdx = menu.value.findIndex((v) => v.name === "模板管理");
                if (menuIdx > -1) {
                  menu.value[menuIdx].notice = "New";
                }
              }
            }
          } else if (product.type === "app") {
            ssrStore.lastestApp = product;
          }
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_MIcon = resolveComponent("MIcon");
      const _component_RouterLink = resolveComponent("RouterLink");
      const _directive_depic = resolveDirective("depic");
      if (user.value.id) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "f admin-layout" }, _attrs))}><nav class="${ssrRenderClass([{ "menu-packup": menuPackup.value }, "menu scroll"])}"><div class="logo f ac">`);
        if (siteinfo.value.ico || siteinfo.value.logo) {
          _push(`<img${ssrRenderAttrs(mergeProps({
            alt: siteinfo.value.shortTitle || siteinfo.value.title || ""
          }, ssrGetDirectiveProps(_ctx, _directive_depic, `${siteinfo.value.ico || siteinfo.value.logo}?100x60`)))}>`);
        } else {
          _push(`<img${ssrRenderAttr("src", logoImg)}${ssrRenderAttr("alt", siteinfo.value.shortTitle || siteinfo.value.title || "")}>`);
        }
        _push(`<b class="txt-ellipsis-1">管理后台</b></div><ul><!--[-->`);
        ssrRenderList(menu.value, (v, i) => {
          var _a2, _b, _c, _d;
          _push(`<!--[-->`);
          if (unref(globalStore).permission((_a2 = v.meta) == null ? void 0 : _a2.authkey)) {
            _push(`<li class="${ssrRenderClass([{ active: curMenu.value === i }, "itm"])}"><div class="a f ac jb"${ssrRenderAttr("title", v.name)}><div class="f ac">`);
            _push(ssrRenderComponent(_component_MIcon, {
              name: v.icon,
              class: "left-icon"
            }, null, _parent));
            _push(`<span>${ssrInterpolate(v.name)}</span>`);
            if (v.notice) {
              _push(`<span class="${ssrRenderClass(`sugar-${v.noticeType || "primary"} ml6 fs12`)}">${ssrInterpolate(v.notice)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if ((_b = v.children) == null ? void 0 : _b.length) {
              _push(ssrRenderComponent(_component_MIcon, {
                name: ((_c = v.children) == null ? void 0 : _c.length) && v.active ? "down" : "right"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (((_d = v.children) == null ? void 0 : _d.length) && v.active || menuPackup.value) {
              _push(`<ul class="fa"><!--[-->`);
              ssrRenderList(v.children, (child, j) => {
                _push(`<li class="${ssrRenderClass({ active: j === curSubMenu.value && curMenu.value === i })}">`);
                _push(ssrRenderComponent(_component_RouterLink, {
                  to: child.to,
                  onClick: ($event) => onSubMenuClick()
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(child.meta.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(child.meta.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></ul></nav><div class="c-right f fc"><div class="header f jb ac"><div class="h-left f ac">`);
        _push(ssrRenderComponent(unref(Tooltip), { title: "收展菜单" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MIcon, {
                name: "menu",
                class: "icon-btn",
                onClick: extendMenu
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_MIcon, {
                  name: "menu",
                  class: "icon-btn",
                  onClick: extendMenu
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (user.value.id == 1e4 || user.value.viewabledRoleAuth.includes("sites")) {
          _push(ssrRenderComponent(unref(Dropdown), null, {
            overlay: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="switch-sites-overlay"${_scopeId}><div class="body scroll"${_scopeId}><!--[-->`);
                ssrRenderList(unref(ssrStore).sites, (v) => {
                  _push2(`<a${ssrRenderAttr("href", `${v.origin}${unref(route).fullPath}`)} class="${ssrRenderClass([{ "event-none": v.name === unref(ssrStore).appname }, "site-item"])}"${_scopeId}>${ssrInterpolate(v.nickName)} `);
                  if (v.name === unref(ssrStore).appname) {
                    _push2(`<span class="sugar-primary fs12 ml6"${_scopeId}>当前</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</a>`);
                });
                _push2(`<!--]--></div>`);
                _push2(ssrRenderComponent(unref(Divider), null, null, _parent2, _scopeId));
                _push2(`<div class="body"${_scopeId}><div class="site-item"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_MIcon, {
                  name: "restart",
                  class: "mr8 txt-grey"
                }, null, _parent2, _scopeId));
                _push2(`重启站点</div>`);
                _push2(ssrRenderComponent(_component_RouterLink, {
                  to: `/${preadmin.value}/sites`,
                  class: "site-item"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_MIcon, {
                        name: "right-arrow",
                        class: "mr8 txt-grey"
                      }, null, _parent3, _scopeId2));
                      _push3(`站点管理 `);
                    } else {
                      return [
                        createVNode(_component_MIcon, {
                          name: "right-arrow",
                          class: "mr8 txt-grey"
                        }),
                        createTextVNode("站点管理 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "switch-sites-overlay" }, [
                    createVNode("div", { class: "body scroll" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(ssrStore).sites, (v) => {
                        return openBlock(), createBlock("a", {
                          href: `${v.origin}${unref(route).fullPath}`,
                          key: v.name,
                          class: ["site-item", { "event-none": v.name === unref(ssrStore).appname }]
                        }, [
                          createTextVNode(toDisplayString(v.nickName) + " ", 1),
                          v.name === unref(ssrStore).appname ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "sugar-primary fs12 ml6"
                          }, "当前")) : createCommentVNode("", true)
                        ], 10, ["href"]);
                      }), 128))
                    ]),
                    createVNode(unref(Divider)),
                    createVNode("div", { class: "body" }, [
                      createVNode("div", {
                        class: "site-item",
                        onClick: onRestartSite
                      }, [
                        createVNode(_component_MIcon, {
                          name: "restart",
                          class: "mr8 txt-grey"
                        }),
                        createTextVNode("重启站点")
                      ]),
                      createVNode(_component_RouterLink, {
                        to: `/${preadmin.value}/sites`,
                        class: "site-item"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, {
                            name: "right-arrow",
                            class: "mr8 txt-grey"
                          }),
                          createTextVNode("站点管理 ")
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ])
                  ])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="icon-btn switch-site-btn"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_MIcon, { name: "a-sorting2" }, null, _parent2, _scopeId));
                _push2(` 切换站点 </div>`);
              } else {
                return [
                  createVNode("div", { class: "icon-btn switch-site-btn" }, [
                    createVNode(_component_MIcon, { name: "a-sorting2" }),
                    createTextVNode(" 切换站点 ")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if ((_a = uip5000Plugin.value.dhy) == null ? void 0 : _a.link) {
          _push(ssrRenderComponent(_component_RouterLink, {
            to: `/${preadmin.value}/plugin/setting?url=${encodeURIComponent(uip5000Plugin.value.dhy.link)}`,
            class: "btn-uip5000"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>UIP5000一键换链</span>`);
                _push2(ssrRenderComponent(_component_MIcon, { name: "right-arrow" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode("span", null, "UIP5000一键换链"),
                  createVNode(_component_MIcon, { name: "right-arrow" })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="f ac h-right">`);
        _push(ssrRenderComponent(unref(Tooltip), {
          title: !unref(globalStore).authLevel || unref(globalStore).authLevel == 0 ? "点击升级专业版" : `导航蚁${mapVIPName[unref(globalStore).authLevel || 0]}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a${ssrRenderAttr("href", `${unref(ssrStore).config.dhy.gateway}`)} target="_blank"${_scopeId}><img${ssrRenderAttr("src", `/assets/img/${mapVIPIcon[unref(globalStore).authLevel || 0]}.gif`)}${_scopeId}></a>`);
            } else {
              return [
                createVNode("a", {
                  href: `${unref(ssrStore).config.dhy.gateway}`,
                  target: "_blank"
                }, [
                  createVNode("img", {
                    src: `/assets/img/${mapVIPIcon[unref(globalStore).authLevel || 0]}.gif`
                  }, null, 8, ["src"])
                ], 8, ["href"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Tooltip), { title: "产品食用指南" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a${ssrRenderAttr("href", `${unref(ssrStore).config.dhy.gateway}/help`)} target="_blank" class="icon-btn"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_MIcon, { name: "file-text" }, null, _parent2, _scopeId));
              _push2(`</a>`);
            } else {
              return [
                createVNode("a", {
                  href: `${unref(ssrStore).config.dhy.gateway}/help`,
                  target: "_blank",
                  class: "icon-btn"
                }, [
                  createVNode(_component_MIcon, { name: "file-text" })
                ], 8, ["href"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Tooltip), {
          title: theme.value === "light" ? "暗黑模式" : "明亮模式"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a href="javascript:void(0);" class="icon-btn"${_scopeId}>`);
              if (theme.value === "light") {
                _push2(ssrRenderComponent(_component_MIcon, { name: "moon" }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_MIcon, { name: "sun" }, null, _parent2, _scopeId));
              }
              _push2(`</a>`);
            } else {
              return [
                createVNode("a", {
                  href: "javascript:void(0);",
                  class: "icon-btn",
                  onClick: ($event) => changeTheme()
                }, [
                  theme.value === "light" ? (openBlock(), createBlock(_component_MIcon, {
                    key: 0,
                    name: "moon"
                  })) : (openBlock(), createBlock(_component_MIcon, {
                    key: 1,
                    name: "sun"
                  }))
                ], 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Tooltip), { title: "前台主页" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a href="/" target="_blank" class="icon-btn"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_MIcon, { name: "home" }, null, _parent2, _scopeId));
              _push2(`</a>`);
            } else {
              return [
                createVNode("a", {
                  href: "/",
                  target: "_blank",
                  class: "icon-btn"
                }, [
                  createVNode(_component_MIcon, { name: "home" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Dropdown), null, {
          overlay: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Menu), { style: { width: "160px" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_RouterLink, {
                            to: `/${preadmin.value}/uhub`,
                            class: "f ac"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (user.value.avatar) {
                                  _push5(ssrRenderComponent(unref(Avatar), {
                                    class: "mr12",
                                    size: "small"
                                  }, {
                                    icon: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, `${user.value.avatar}?100x100`))}${_scopeId5}>`);
                                      } else {
                                        return [
                                          withDirectives(createVNode("img", null, null, 512), [
                                            [_directive_depic, `${user.value.avatar}?100x100`]
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(unref(Avatar), {
                                    src: "/assets/img/avatar/avatar.jpg",
                                    class: "mr12",
                                    size: "small"
                                  }, null, _parent5, _scopeId4));
                                }
                                _push5(` ${ssrInterpolate(user.value.nickname || user.value.username)}`);
                              } else {
                                return [
                                  user.value.avatar ? (openBlock(), createBlock(unref(Avatar), {
                                    key: 0,
                                    class: "mr12",
                                    size: "small"
                                  }, {
                                    icon: withCtx(() => [
                                      withDirectives(createVNode("img", null, null, 512), [
                                        [_directive_depic, `${user.value.avatar}?100x100`]
                                      ])
                                    ]),
                                    _: 1
                                  })) : (openBlock(), createBlock(unref(Avatar), {
                                    key: 1,
                                    src: "/assets/img/avatar/avatar.jpg",
                                    class: "mr12",
                                    size: "small"
                                  })),
                                  createTextVNode(" " + toDisplayString(user.value.nickname || user.value.username), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_RouterLink, {
                              to: `/${preadmin.value}/uhub`,
                              class: "f ac"
                            }, {
                              default: withCtx(() => [
                                user.value.avatar ? (openBlock(), createBlock(unref(Avatar), {
                                  key: 0,
                                  class: "mr12",
                                  size: "small"
                                }, {
                                  icon: withCtx(() => [
                                    withDirectives(createVNode("img", null, null, 512), [
                                      [_directive_depic, `${user.value.avatar}?100x100`]
                                    ])
                                  ]),
                                  _: 1
                                })) : (openBlock(), createBlock(unref(Avatar), {
                                  key: 1,
                                  src: "/assets/img/avatar/avatar.jpg",
                                  class: "mr12",
                                  size: "small"
                                })),
                                createTextVNode(" " + toDisplayString(user.value.nickname || user.value.username), 1)
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MenuDivider), null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MenuItem), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_RouterLink, {
                            to: `/${preadmin.value}/uhub`,
                            class: "f ac"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_MIcon, {
                                  name: "user",
                                  class: "mr6"
                                }, null, _parent5, _scopeId4));
                                _push5(`个人中心`);
                              } else {
                                return [
                                  createVNode(_component_MIcon, {
                                    name: "user",
                                    class: "mr6"
                                  }),
                                  createTextVNode("个人中心")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_RouterLink, {
                              to: `/${preadmin.value}/uhub`,
                              class: "f ac"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_MIcon, {
                                  name: "user",
                                  class: "mr6"
                                }),
                                createTextVNode("个人中心")
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MenuItem), { onClick: onLogout }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, {
                            name: "restart",
                            class: "mr6"
                          }, null, _parent4, _scopeId3));
                          _push4(`退出 `);
                        } else {
                          return [
                            createVNode(_component_MIcon, {
                              name: "restart",
                              class: "mr6"
                            }),
                            createTextVNode("退出 ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(MenuItem), null, {
                        default: withCtx(() => [
                          createVNode(_component_RouterLink, {
                            to: `/${preadmin.value}/uhub`,
                            class: "f ac"
                          }, {
                            default: withCtx(() => [
                              user.value.avatar ? (openBlock(), createBlock(unref(Avatar), {
                                key: 0,
                                class: "mr12",
                                size: "small"
                              }, {
                                icon: withCtx(() => [
                                  withDirectives(createVNode("img", null, null, 512), [
                                    [_directive_depic, `${user.value.avatar}?100x100`]
                                  ])
                                ]),
                                _: 1
                              })) : (openBlock(), createBlock(unref(Avatar), {
                                key: 1,
                                src: "/assets/img/avatar/avatar.jpg",
                                class: "mr12",
                                size: "small"
                              })),
                              createTextVNode(" " + toDisplayString(user.value.nickname || user.value.username), 1)
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(MenuDivider)),
                      createVNode(unref(MenuItem), null, {
                        default: withCtx(() => [
                          createVNode(_component_RouterLink, {
                            to: `/${preadmin.value}/uhub`,
                            class: "f ac"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_MIcon, {
                                name: "user",
                                class: "mr6"
                              }),
                              createTextVNode("个人中心")
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(MenuItem), { onClick: onLogout }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, {
                            name: "restart",
                            class: "mr6"
                          }),
                          createTextVNode("退出 ")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(Menu), { style: { width: "160px" } }, {
                  default: withCtx(() => [
                    createVNode(unref(MenuItem), null, {
                      default: withCtx(() => [
                        createVNode(_component_RouterLink, {
                          to: `/${preadmin.value}/uhub`,
                          class: "f ac"
                        }, {
                          default: withCtx(() => [
                            user.value.avatar ? (openBlock(), createBlock(unref(Avatar), {
                              key: 0,
                              class: "mr12",
                              size: "small"
                            }, {
                              icon: withCtx(() => [
                                withDirectives(createVNode("img", null, null, 512), [
                                  [_directive_depic, `${user.value.avatar}?100x100`]
                                ])
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(unref(Avatar), {
                              key: 1,
                              src: "/assets/img/avatar/avatar.jpg",
                              class: "mr12",
                              size: "small"
                            })),
                            createTextVNode(" " + toDisplayString(user.value.nickname || user.value.username), 1)
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MenuDivider)),
                    createVNode(unref(MenuItem), null, {
                      default: withCtx(() => [
                        createVNode(_component_RouterLink, {
                          to: `/${preadmin.value}/uhub`,
                          class: "f ac"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_MIcon, {
                              name: "user",
                              class: "mr6"
                            }),
                            createTextVNode("个人中心")
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MenuItem), { onClick: onLogout }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, {
                          name: "restart",
                          class: "mr6"
                        }),
                        createTextVNode("退出 ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_RouterLink, {
                to: `/${preadmin.value}/uhub`,
                class: "pt4 pb4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (user.value.avatar) {
                      _push3(ssrRenderComponent(unref(Avatar), { class: "ml12" }, {
                        icon: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<img${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_depic, `${user.value.avatar}?100x100`))}${_scopeId3}>`);
                          } else {
                            return [
                              withDirectives(createVNode("img", null, null, 512), [
                                [_directive_depic, `${user.value.avatar}?100x100`]
                              ])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(Avatar), {
                        src: "/assets/img/avatar/avatar.jpg",
                        class: "ml12"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      user.value.avatar ? (openBlock(), createBlock(unref(Avatar), {
                        key: 0,
                        class: "ml12"
                      }, {
                        icon: withCtx(() => [
                          withDirectives(createVNode("img", null, null, 512), [
                            [_directive_depic, `${user.value.avatar}?100x100`]
                          ])
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(unref(Avatar), {
                        key: 1,
                        src: "/assets/img/avatar/avatar.jpg",
                        class: "ml12"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_RouterLink, {
                  to: `/${preadmin.value}/uhub`,
                  class: "pt4 pb4"
                }, {
                  default: withCtx(() => [
                    user.value.avatar ? (openBlock(), createBlock(unref(Avatar), {
                      key: 0,
                      class: "ml12"
                    }, {
                      icon: withCtx(() => [
                        withDirectives(createVNode("img", null, null, 512), [
                          [_directive_depic, `${user.value.avatar}?100x100`]
                        ])
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(Avatar), {
                      key: 1,
                      src: "/assets/img/avatar/avatar.jpg",
                      class: "ml12"
                    }))
                  ]),
                  _: 1
                }, 8, ["to"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="scroll main">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`<div class="mt30 fs12 txt-grey f jc a">Copyright © 2024</div></div></div></div>`);
      } else {
        _push(ssrRenderComponent(unref(Spin), mergeProps({ class: "admin-layout-spin" }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layout/Admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
