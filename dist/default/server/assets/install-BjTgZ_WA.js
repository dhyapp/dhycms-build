import { ref, reactive, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, useSSRContext, toRaw } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Steps, Form, FormItem, Input, Tooltip, InputNumber, Result, Button, message } from "ant-design-vue";
import { L as Loading } from "./loading-DosIVvch.js";
import { s as sleep } from "./common-ZcIx5rAG.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "install",
  __ssrInlineRender: true,
  setup(__props) {
    const formRef = ref();
    const installing = ref(false);
    const mongodbConStatus = ref("");
    const redisConStatus = ref("");
    const siteState = reactive({
      name: "",
      port: 7200,
      preadmin: "dhycms",
      domains: "",
      dbport: 27017,
      dbuser: "",
      dbpwd: "",
      rdport: 6379,
      rdname: "",
      rdpwd: "",
      rdindex: 0
    });
    const rules = {
      name: [
        { required: true, message: "网站名称不能为空" }
      ],
      port: [
        { required: true, message: "网站监听端口不能为空" }
      ]
    };
    const curstep = ref(0);
    const steps = ref([
      { title: "配置网站信息" },
      { title: "配置 MongoDB 数据库" },
      { title: "配置 Redis 数据库" },
      { title: "安装" }
    ]);
    const result = reactive({
      status: "info",
      title: "安装中...",
      subTitle: ""
    });
    const validateForm = async () => {
      switch (curstep.value) {
        case 0:
          await formRef.value.validate(["name", "port"]);
          break;
      }
    };
    const prev = () => {
      curstep.value--;
    };
    const checkIsInstalled = async ({ maxRetry = 10 }) => {
      const checkHandle = () => {
        return new Promise((resolve) => {
          try {
            fetch("/api/v1/__dhycms_install_heart").then(async (res) => await res.text()).then((res) => {
              res == 1 ? resolve(true) : resolve(false);
            }).catch(() => {
              resolve(false);
            });
          } catch (e) {
            resolve(false);
          }
        });
      };
      for (let i = 0; i < maxRetry; i++) {
        const ok = await checkHandle();
        if (ok)
          return true;
        else
          await sleep(5e3);
      }
      return false;
    };
    const done = async () => {
      try {
        installing.value = true;
        result.status = "info";
        result.title = "安装中...";
        result.subTitle = "";
        await fetch("/api/dhycms/install", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toRaw(siteState))
        }).then(async (res) => await res.json()).then(async (res) => {
          result.title = "检测安装状态..";
          const installed = await checkIsInstalled({});
          if (installed) {
            result.status = "success";
            if (res.msg) {
              result.subTitle = res.msg;
            }
            if (res.redirect) {
              let time = 3;
              const timedowner = () => {
                result.title = `安装成功，将跳往管理面板..${time}s`;
              };
              timedowner();
              const timer = setInterval(() => {
                timedowner();
                if (time <= 0) {
                  clearInterval(timer);
                  window.location.href = res.redirect;
                }
                time--;
              }, 1e3);
            } else {
              result.title = `安装成功`;
            }
          } else {
            result.status = "error";
            result.title = "安装超时，请重试";
            result.subTitle = "或联系专业技术人员处理";
          }
        });
      } catch (e) {
        console.error(e);
        result.status = "error";
        result.title = (e == null ? void 0 : e.msg) || (e == null ? void 0 : e.message) || "安装失败";
      } finally {
        installing.value = false;
      }
    };
    const next = async () => {
      await validateForm();
      curstep.value++;
      if (curstep.value === steps.value.length - 1) {
        installing.value = true;
        done();
      }
    };
    let mongoStatusTimer;
    const onMongoConTest = async () => {
      if (mongoStatusTimer)
        clearTimeout(mongoStatusTimer);
      try {
        mongodbConStatus.value = "loading";
        await fetch("/api/v1/__dhycms_mongodb_heart", {
          method: "POST",
          body: JSON.stringify(toRaw(siteState))
        }).then(async (res) => await res.json()).then((res) => {
          if (res.ok)
            mongodbConStatus.value = "ok";
          else {
            mongodbConStatus.value = "error";
            message.error(res.msg || "MongoDB数据库连接测试失败");
          }
        });
      } catch (e) {
        mongodbConStatus.value = "error";
      } finally {
        mongoStatusTimer = setTimeout(() => {
          mongodbConStatus.value = "";
        }, 1e4);
      }
    };
    let redisStatusTimer;
    const onRedisConTest = async () => {
      if (redisStatusTimer)
        clearTimeout(redisStatusTimer);
      try {
        redisConStatus.value = "loading";
        await fetch("/api/v1/__dhycms_redis_heart", {
          method: "POST",
          body: JSON.stringify(toRaw(siteState))
        }).then(async (res) => await res.json()).then((res) => {
          if (res.ok)
            redisConStatus.value = "ok";
          else {
            redisConStatus.value = "error";
            message.error(res.msg || "Redis数据库连接测试失败");
          }
        });
      } catch (e) {
        redisConStatus.value = "error";
      } finally {
        redisStatusTimer = setTimeout(() => {
          redisConStatus.value = "";
        }, 1e4);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MIcon = resolveComponent("MIcon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "f fc ac jc dhy-install-guide" }, _attrs))}><div class="max-800"><h1>DHYCMS 安装引导</h1>`);
      _push(ssrRenderComponent(unref(Steps), {
        current: curstep.value,
        items: steps.value,
        class: "event-none"
      }, null, _parent));
      _push(`</div><div class="wrapper">`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "formRef",
        ref: formRef,
        model: siteState,
        rules,
        layout: "vertical",
        class: "form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (curstep.value === 0) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(FormItem), {
                label: "网站名称",
                name: "name"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.name,
                      "onUpdate:value": ($event) => siteState.name = $event,
                      size: "large",
                      placeholder: "请输入网站名称"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.name,
                        "onUpdate:value": ($event) => siteState.name = $event,
                        size: "large",
                        placeholder: "请输入网站名称"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), {
                label: "网站后台地址前缀（默认为 dhycms）",
                name: "preadmin"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.preadmin,
                      "onUpdate:value": ($event) => siteState.preadmin = $event,
                      size: "large",
                      placeholder: "网站后台地址前缀（默认为 dhycms）"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.preadmin,
                        "onUpdate:value": ($event) => siteState.preadmin = $event,
                        size: "large",
                        placeholder: "网站后台地址前缀（默认为 dhycms）"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), {
                label: "域名",
                name: "domains"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.domains,
                      "onUpdate:value": ($event) => siteState.domains = $event,
                      size: "large",
                      rows: 4,
                      placeholder: "例：example.com"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.domains,
                        "onUpdate:value": ($event) => siteState.domains = $event,
                        size: "large",
                        rows: 4,
                        placeholder: "例：example.com"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else if (curstep.value === 1) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(FormItem), {
                name: "dbport",
                rules: [{ required: true }]
              }, {
                label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` MongoDB端口（默认为 27017） `);
                    _push3(ssrRenderComponent(unref(Tooltip), { title: "如果服务器已安装MongoDB数据库且端口发生变化，需手动填写已安装的MongoDB数据库端口" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, { name: "help-fill" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_MIcon, { name: "help-fill" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" MongoDB端口（默认为 27017） "),
                      createVNode(unref(Tooltip), { title: "如果服务器已安装MongoDB数据库且端口发生变化，需手动填写已安装的MongoDB数据库端口" }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, { name: "help-fill" })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(InputNumber), {
                      value: siteState.dbport,
                      "onUpdate:value": ($event) => siteState.dbport = $event,
                      size: "large",
                      placeholder: "MongoDB数据库（默认为 27017）",
                      min: 3e3,
                      max: 99999,
                      style: { width: "100%" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(InputNumber), {
                        value: siteState.dbport,
                        "onUpdate:value": ($event) => siteState.dbport = $event,
                        size: "large",
                        placeholder: "MongoDB数据库（默认为 27017）",
                        min: 3e3,
                        max: 99999,
                        style: { width: "100%" }
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), {
                name: "dbuser",
                autoLink: false
              }, {
                label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` MongoDB用户名（默认为空） `);
                    _push3(ssrRenderComponent(unref(Tooltip), { title: "请确保该用户具有创建数据库、所有数据库读写权限，当数据库未启动权限认证时可为空" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, { name: "help-fill" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_MIcon, { name: "help-fill" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" MongoDB用户名（默认为空） "),
                      createVNode(unref(Tooltip), { title: "请确保该用户具有创建数据库、所有数据库读写权限，当数据库未启动权限认证时可为空" }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, { name: "help-fill" })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.dbuser,
                      "onUpdate:value": ($event) => siteState.dbuser = $event,
                      size: "large",
                      placeholder: "MongoDB用户名（默认为空）",
                      autoComplete: "new-user"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.dbuser,
                        "onUpdate:value": ($event) => siteState.dbuser = $event,
                        size: "large",
                        placeholder: "MongoDB用户名（默认为空）",
                        autoComplete: "new-user"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), {
                name: "dbpwd",
                autoLink: false
              }, {
                label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` MongoDB用户密码（默认为空） `);
                  } else {
                    return [
                      createTextVNode(" MongoDB用户密码（默认为空） ")
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.dbpwd,
                      "onUpdate:value": ($event) => siteState.dbpwd = $event,
                      type: "password",
                      size: "large",
                      placeholder: "MongoDB用户密码（默认为空）",
                      autoComplete: "new-password"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.dbpwd,
                        "onUpdate:value": ($event) => siteState.dbpwd = $event,
                        type: "password",
                        size: "large",
                        placeholder: "MongoDB用户密码（默认为空）",
                        autoComplete: "new-password"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="${ssrRenderClass([{ "event-none": mongodbConStatus.value === "loading" }, "connect-test"])}"${_scopeId}>`);
              if (mongodbConStatus.value === "loading") {
                _push2(ssrRenderComponent(Loading, { class: "mr4" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (mongodbConStatus.value === "ok") {
                _push2(ssrRenderComponent(_component_MIcon, {
                  name: "selected",
                  class: "mr4 txt-success"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (mongodbConStatus.value === "error") {
                _push2(ssrRenderComponent(_component_MIcon, {
                  name: "close",
                  class: "mr4 txt-error"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` MongoDB数据库连接${ssrInterpolate(mongodbConStatus.value === "ok" ? "成功" : mongodbConStatus.value === "error" ? "失败" : "测试")}</div><!--]-->`);
            } else if (curstep.value === 2) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(unref(FormItem), {
                name: "rdport",
                rules: [{ required: true }]
              }, {
                label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Redis数据库端口（默认为 6379） `);
                    _push3(ssrRenderComponent(unref(Tooltip), { title: "如果服务器已安装Redis数据库且端口发生变化，需手动填写已安装的Redis数据库端口" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, { name: "help-fill" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_MIcon, { name: "help-fill" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Redis数据库端口（默认为 6379） "),
                      createVNode(unref(Tooltip), { title: "如果服务器已安装Redis数据库且端口发生变化，需手动填写已安装的Redis数据库端口" }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, { name: "help-fill" })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(InputNumber), {
                      value: siteState.rdport,
                      "onUpdate:value": ($event) => siteState.rdport = $event,
                      size: "large",
                      placeholder: "Redis数据库端口（默认为 6379）",
                      min: 3e3,
                      max: 99999,
                      style: { width: "100%" }
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(InputNumber), {
                        value: siteState.rdport,
                        "onUpdate:value": ($event) => siteState.rdport = $event,
                        size: "large",
                        placeholder: "Redis数据库端口（默认为 6379）",
                        min: 3e3,
                        max: 99999,
                        style: { width: "100%" }
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), { name: "rdname" }, {
                label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Redis数据库用户名（默认为空） `);
                    _push3(ssrRenderComponent(unref(Tooltip), { title: "若已安装Redis数据库，请手动输入Redis数据库用户名" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, { name: "help-fill" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_MIcon, { name: "help-fill" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Redis数据库用户名（默认为空） "),
                      createVNode(unref(Tooltip), { title: "若已安装Redis数据库，请手动输入Redis数据库用户名" }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, { name: "help-fill" })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.rdname,
                      "onUpdate:value": ($event) => siteState.rdname = $event,
                      size: "large",
                      placeholder: "Redis数据库用户名（默认为空）",
                      autoComplete: "new-user"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.rdname,
                        "onUpdate:value": ($event) => siteState.rdname = $event,
                        size: "large",
                        placeholder: "Redis数据库用户名（默认为空）",
                        autoComplete: "new-user"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), { name: "rdpwd" }, {
                label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Redis数据库密码（默认为空） `);
                    _push3(ssrRenderComponent(unref(Tooltip), { title: "若已安装Redis数据库，请手动输入Redis数据库密码" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, { name: "help-fill" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_MIcon, { name: "help-fill" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" Redis数据库密码（默认为空） "),
                      createVNode(unref(Tooltip), { title: "若已安装Redis数据库，请手动输入Redis数据库密码" }, {
                        default: withCtx(() => [
                          createVNode(_component_MIcon, { name: "help-fill" })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.rdpwd,
                      "onUpdate:value": ($event) => siteState.rdpwd = $event,
                      type: "password",
                      size: "large",
                      placeholder: "Redis数据库密码（默认为空）",
                      autoComplete: "new-password"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.rdpwd,
                        "onUpdate:value": ($event) => siteState.rdpwd = $event,
                        type: "password",
                        size: "large",
                        placeholder: "Redis数据库密码（默认为空）",
                        autoComplete: "new-password"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(FormItem), {
                name: "rdindex",
                label: "Redis数据库下标（默认为0）",
                rules: [{ required: true }]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Input), {
                      value: siteState.rdindex,
                      "onUpdate:value": ($event) => siteState.rdindex = $event,
                      size: "large",
                      placeholder: "Redis数据库下标（默认为0）"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Input), {
                        value: siteState.rdindex,
                        "onUpdate:value": ($event) => siteState.rdindex = $event,
                        size: "large",
                        placeholder: "Redis数据库下标（默认为0）"
                      }, null, 8, ["value", "onUpdate:value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="${ssrRenderClass([{ "event-none": redisConStatus.value === "loading" }, "connect-test"])}"${_scopeId}>`);
              if (redisConStatus.value === "loading") {
                _push2(ssrRenderComponent(Loading, { class: "mr4" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (redisConStatus.value === "ok") {
                _push2(ssrRenderComponent(_component_MIcon, {
                  name: "selected",
                  class: "mr4 txt-success"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (redisConStatus.value === "error") {
                _push2(ssrRenderComponent(_component_MIcon, {
                  name: "close",
                  class: "mr4 txt-error"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(` Redis数据库连接${ssrInterpolate(redisConStatus.value === "ok" ? "成功" : redisConStatus.value === "error" ? "失败" : "测试")}</div><!--]-->`);
            } else {
              _push2(ssrRenderComponent(unref(Result), {
                status: result.status
              }, {
                title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="f ac jc"${_scopeId2}>`);
                    if (installing.value) {
                      _push3(ssrRenderComponent(Loading, { class: "mr10" }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(` ${ssrInterpolate(result.title)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "f ac jc" }, [
                        installing.value ? (openBlock(), createBlock(Loading, {
                          key: 0,
                          class: "mr10"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(result.title), 1)
                      ])
                    ];
                  }
                }),
                subTitle: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}>${result.subTitle}</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        innerHTML: result.subTitle
                      }, null, 8, ["innerHTML"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            if (result.status !== "success") {
              _push2(ssrRenderComponent(unref(FormItem), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="f btn-group"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Button), {
                      size: "large",
                      block: "",
                      disabled: curstep.value === 0 || installing.value,
                      onClick: prev
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_MIcon, {
                            name: "left-arrow",
                            class: "mr6"
                          }, null, _parent4, _scopeId3));
                          _push4(`上一步`);
                        } else {
                          return [
                            createVNode(_component_MIcon, {
                              name: "left-arrow",
                              class: "mr6"
                            }),
                            createTextVNode("上一步")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (curstep.value === steps.value.length - 1) {
                      _push3(ssrRenderComponent(unref(Button), {
                        size: "large",
                        block: "",
                        type: "primary",
                        loading: installing.value,
                        onClick: done
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(installing.value ? "安装中" : "重新安装")}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(installing.value ? "安装中" : "重新安装"), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(Button), {
                        size: "large",
                        block: "",
                        type: "primary",
                        onClick: next
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`下一步`);
                            _push4(ssrRenderComponent(_component_MIcon, {
                              name: "right-arrow",
                              class: "ml6"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createTextVNode("下一步"),
                              createVNode(_component_MIcon, {
                                name: "right-arrow",
                                class: "ml6"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "f btn-group" }, [
                        createVNode(unref(Button), {
                          size: "large",
                          block: "",
                          disabled: curstep.value === 0 || installing.value,
                          onClick: prev
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_MIcon, {
                              name: "left-arrow",
                              class: "mr6"
                            }),
                            createTextVNode("上一步")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        curstep.value === steps.value.length - 1 ? (openBlock(), createBlock(unref(Button), {
                          key: 0,
                          size: "large",
                          block: "",
                          type: "primary",
                          loading: installing.value,
                          onClick: done
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(installing.value ? "安装中" : "重新安装"), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"])) : (openBlock(), createBlock(unref(Button), {
                          key: 1,
                          size: "large",
                          block: "",
                          type: "primary",
                          onClick: next
                        }, {
                          default: withCtx(() => [
                            createTextVNode("下一步"),
                            createVNode(_component_MIcon, {
                              name: "right-arrow",
                              class: "ml6"
                            })
                          ]),
                          _: 1
                        }))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              curstep.value === 0 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode(unref(FormItem), {
                  label: "网站名称",
                  name: "name"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.name,
                      "onUpdate:value": ($event) => siteState.name = $event,
                      size: "large",
                      placeholder: "请输入网站名称"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  label: "网站后台地址前缀（默认为 dhycms）",
                  name: "preadmin"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.preadmin,
                      "onUpdate:value": ($event) => siteState.preadmin = $event,
                      size: "large",
                      placeholder: "网站后台地址前缀（默认为 dhycms）"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  label: "域名",
                  name: "domains"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.domains,
                      "onUpdate:value": ($event) => siteState.domains = $event,
                      size: "large",
                      rows: 4,
                      placeholder: "例：example.com"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                })
              ], 64)) : curstep.value === 1 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode(unref(FormItem), {
                  name: "dbport",
                  rules: [{ required: true }]
                }, {
                  label: withCtx(() => [
                    createTextVNode(" MongoDB端口（默认为 27017） "),
                    createVNode(unref(Tooltip), { title: "如果服务器已安装MongoDB数据库且端口发生变化，需手动填写已安装的MongoDB数据库端口" }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, { name: "help-fill" })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(InputNumber), {
                      value: siteState.dbport,
                      "onUpdate:value": ($event) => siteState.dbport = $event,
                      size: "large",
                      placeholder: "MongoDB数据库（默认为 27017）",
                      min: 3e3,
                      max: 99999,
                      style: { width: "100%" }
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  name: "dbuser",
                  autoLink: false
                }, {
                  label: withCtx(() => [
                    createTextVNode(" MongoDB用户名（默认为空） "),
                    createVNode(unref(Tooltip), { title: "请确保该用户具有创建数据库、所有数据库读写权限，当数据库未启动权限认证时可为空" }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, { name: "help-fill" })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.dbuser,
                      "onUpdate:value": ($event) => siteState.dbuser = $event,
                      size: "large",
                      placeholder: "MongoDB用户名（默认为空）",
                      autoComplete: "new-user"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  name: "dbpwd",
                  autoLink: false
                }, {
                  label: withCtx(() => [
                    createTextVNode(" MongoDB用户密码（默认为空） ")
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.dbpwd,
                      "onUpdate:value": ($event) => siteState.dbpwd = $event,
                      type: "password",
                      size: "large",
                      placeholder: "MongoDB用户密码（默认为空）",
                      autoComplete: "new-password"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode("div", {
                  class: ["connect-test", { "event-none": mongodbConStatus.value === "loading" }],
                  onClick: onMongoConTest
                }, [
                  mongodbConStatus.value === "loading" ? (openBlock(), createBlock(Loading, {
                    key: 0,
                    class: "mr4"
                  })) : createCommentVNode("", true),
                  mongodbConStatus.value === "ok" ? (openBlock(), createBlock(_component_MIcon, {
                    key: 1,
                    name: "selected",
                    class: "mr4 txt-success"
                  })) : createCommentVNode("", true),
                  mongodbConStatus.value === "error" ? (openBlock(), createBlock(_component_MIcon, {
                    key: 2,
                    name: "close",
                    class: "mr4 txt-error"
                  })) : createCommentVNode("", true),
                  createTextVNode(" MongoDB数据库连接" + toDisplayString(mongodbConStatus.value === "ok" ? "成功" : mongodbConStatus.value === "error" ? "失败" : "测试"), 1)
                ], 2)
              ], 64)) : curstep.value === 2 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                createVNode(unref(FormItem), {
                  name: "rdport",
                  rules: [{ required: true }]
                }, {
                  label: withCtx(() => [
                    createTextVNode(" Redis数据库端口（默认为 6379） "),
                    createVNode(unref(Tooltip), { title: "如果服务器已安装Redis数据库且端口发生变化，需手动填写已安装的Redis数据库端口" }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, { name: "help-fill" })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(InputNumber), {
                      value: siteState.rdport,
                      "onUpdate:value": ($event) => siteState.rdport = $event,
                      size: "large",
                      placeholder: "Redis数据库端口（默认为 6379）",
                      min: 3e3,
                      max: 99999,
                      style: { width: "100%" }
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), { name: "rdname" }, {
                  label: withCtx(() => [
                    createTextVNode(" Redis数据库用户名（默认为空） "),
                    createVNode(unref(Tooltip), { title: "若已安装Redis数据库，请手动输入Redis数据库用户名" }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, { name: "help-fill" })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.rdname,
                      "onUpdate:value": ($event) => siteState.rdname = $event,
                      size: "large",
                      placeholder: "Redis数据库用户名（默认为空）",
                      autoComplete: "new-user"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), { name: "rdpwd" }, {
                  label: withCtx(() => [
                    createTextVNode(" Redis数据库密码（默认为空） "),
                    createVNode(unref(Tooltip), { title: "若已安装Redis数据库，请手动输入Redis数据库密码" }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, { name: "help-fill" })
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.rdpwd,
                      "onUpdate:value": ($event) => siteState.rdpwd = $event,
                      type: "password",
                      size: "large",
                      placeholder: "Redis数据库密码（默认为空）",
                      autoComplete: "new-password"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(unref(FormItem), {
                  name: "rdindex",
                  label: "Redis数据库下标（默认为0）",
                  rules: [{ required: true }]
                }, {
                  default: withCtx(() => [
                    createVNode(unref(Input), {
                      value: siteState.rdindex,
                      "onUpdate:value": ($event) => siteState.rdindex = $event,
                      size: "large",
                      placeholder: "Redis数据库下标（默认为0）"
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode("div", {
                  class: ["connect-test", { "event-none": redisConStatus.value === "loading" }],
                  onClick: onRedisConTest
                }, [
                  redisConStatus.value === "loading" ? (openBlock(), createBlock(Loading, {
                    key: 0,
                    class: "mr4"
                  })) : createCommentVNode("", true),
                  redisConStatus.value === "ok" ? (openBlock(), createBlock(_component_MIcon, {
                    key: 1,
                    name: "selected",
                    class: "mr4 txt-success"
                  })) : createCommentVNode("", true),
                  redisConStatus.value === "error" ? (openBlock(), createBlock(_component_MIcon, {
                    key: 2,
                    name: "close",
                    class: "mr4 txt-error"
                  })) : createCommentVNode("", true),
                  createTextVNode(" Redis数据库连接" + toDisplayString(redisConStatus.value === "ok" ? "成功" : redisConStatus.value === "error" ? "失败" : "测试"), 1)
                ], 2)
              ], 64)) : (openBlock(), createBlock(unref(Result), {
                key: 3,
                status: result.status
              }, {
                title: withCtx(() => [
                  createVNode("div", { class: "f ac jc" }, [
                    installing.value ? (openBlock(), createBlock(Loading, {
                      key: 0,
                      class: "mr10"
                    })) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(result.title), 1)
                  ])
                ]),
                subTitle: withCtx(() => [
                  createVNode("div", {
                    innerHTML: result.subTitle
                  }, null, 8, ["innerHTML"])
                ]),
                _: 1
              }, 8, ["status"])),
              result.status !== "success" ? (openBlock(), createBlock(unref(FormItem), { key: 4 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "f btn-group" }, [
                    createVNode(unref(Button), {
                      size: "large",
                      block: "",
                      disabled: curstep.value === 0 || installing.value,
                      onClick: prev
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_MIcon, {
                          name: "left-arrow",
                          class: "mr6"
                        }),
                        createTextVNode("上一步")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    curstep.value === steps.value.length - 1 ? (openBlock(), createBlock(unref(Button), {
                      key: 0,
                      size: "large",
                      block: "",
                      type: "primary",
                      loading: installing.value,
                      onClick: done
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(installing.value ? "安装中" : "重新安装"), 1)
                      ]),
                      _: 1
                    }, 8, ["loading"])) : (openBlock(), createBlock(unref(Button), {
                      key: 1,
                      size: "large",
                      block: "",
                      type: "primary",
                      onClick: next
                    }, {
                      default: withCtx(() => [
                        createTextVNode("下一步"),
                        createVNode(_component_MIcon, {
                          name: "right-arrow",
                          class: "ml6"
                        })
                      ]),
                      _: 1
                    }))
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="dhy-install-footer f ac jc"> @DHYCMS SUPPORT <a href="" target="_blank">`);
      _push(ssrRenderComponent(_component_MIcon, { name: "tg" }, null, _parent));
      _push(`</a><a href="" target="_blank">`);
      _push(ssrRenderComponent(_component_MIcon, { name: "github" }, null, _parent));
      _push(`</a></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/install.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
