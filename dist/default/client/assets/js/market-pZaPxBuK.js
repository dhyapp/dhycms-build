import{c as m,ae as R,f as k,w as A,o as D,a6 as P,W as y,k as c,$ as u,u as l,X as C,F as w,V as r,G as g,Z as x,a7 as F}from"./vue-DoSrNxHp.js";import{u as U,d as H}from"./coms-BJ4SXf9r.js";import{_ as W}from"./card-sfuo-F3J.js";import{g as Q,c as N}from"./dhy-CPC2JIDw.js";import{bP as v,bQ as X,bU as S,bW as Y,bV as Z,bA as $,bD as j,bG as b}from"./ant1-FgANxHEo.js";import"./ant2-F-VMf9eP.js";const q={class:"pannel mt14 plugin-page"},z={class:"pb20 pl20 pr20 pt20"},J={key:0,class:"f fw list"},oe={__name:"market",setup(O){const L=U(),d=H(),I=m(()=>L.preadmin),B=R(),h=k("plugins/market"),_=k(!1),i=k([]),E=["free","pro","plus"],V=m(()=>d.config.dhy.gateway||""),f=m(()=>d.plugins),T=m(()=>{for(const s of d.plugins)if(s.newestVersion&&s.newestVersion>s.version)return!0;return!1});A(h,s=>{B.push(`/${I.value}/${s}`)});const M=async()=>{try{_.value=!0,await Q("plugin").then(s=>{var a;console.log(s.list),i.value=((a=s==null?void 0:s.list)==null?void 0:a.map((t,p)=>{var e;if((e=f.value)!=null&&e.length){const n=f.value.findIndex(o=>o.name===t.key);if(n>-1){const o=f.value[n];t.hasNew=t.version>o.version,t.installed=!0}}return t.controls=[{label:t.installed?"已安装":"安装",key:"install",class:t.installed?"txt-grey event-none":"",product:t,productIndex:p}],t.hasNew&&t.controls.push({label:"更新",key:"update",class:"txt-success",product:t,productIndex:p}),t}))||[]})}finally{_.value=!1}},G=async({key:s,record:a})=>{const t=b.loading(),p={install:"安装",update:"更新"};try{switch(s){case"install":if(!a.installed){const n=i.value[a.productIndex].controls[0];n.label="安装中..",n.class="txt-grey event-none",await N({productId:a.product.id}).then(o=>{n.label="已安装",b.success("安装并启动成功"),o.pluginConf&&d.plugins.unshift(o.pluginConf)}).catch(o=>{console.error(o),n.label="安装",n.class=""})}break;case"update":let e=i.value[a.productIndex].controls[1];e.label="更新中..",e.class="txt-grey event-none",await N({productId:a.product.id}).then(n=>{if(b.success("更新成功"),n.pluginConf){const o=f.value.findIndex(K=>K.name===a.product.key);d.plugins[o]=n.pluginConf}i.value[a.productIndex].controls[1]=null}).catch(n=>{console.error(n),e.label="更新",e.class=""});break}}catch(e){console.error(e),b.error((e==null?void 0:e.msg)||(e==null?void 0:e.message)||`${p[s]}操作失败`)}finally{t()}};return D(()=>{M()}),(s,a)=>{const t=P("MIcon"),p=P("RouterLink");return r(),y(w,null,[c(l(X),null,{default:u(()=>[c(l(v),null,{default:u(()=>[c(p,{to:`/${I.value}`},{default:u(()=>[c(t,{name:"dashboard",class:"mr6"}),g("控制台")]),_:1},8,["to"])]),_:1}),c(l(v),null,{default:u(()=>[g("插件管理")]),_:1}),c(l(v),null,{default:u(()=>[g("插件市场")]),_:1})]),_:1}),C("div",q,[c(l(Z),{activeKey:h.value,"onUpdate:activeKey":a[0]||(a[0]=e=>h.value=e)},{default:u(()=>[c(l(S),{key:"plugins",tab:"插件列表"}),c(l(S),{key:"plugins/market"},{tab:u(()=>[T.value?(r(),x(l(Y),{key:0,count:"New",numberStyle:{backgroundColor:"var(--success)"},offset:[18,0]},{default:u(()=>[g("插件市场")]),_:1},8,["numberStyle"])):(r(),y(w,{key:1},[g("插件市场")],64))]),_:1})]),_:1},8,["activeKey"]),C("div",z,[c(l(j),{spinning:_.value,style:{minHeight:"300px",width:"100%"}},{default:u(()=>[i.value.length?(r(),y("div",J,[(r(!0),y(w,null,F(i.value,e=>(r(),x(W,{key:e.id,type:"plugin",poster:e.poster?`${V.value}${e.poster}`:"",title:e.title,auth:E[e.authLevel],description:e.brif,controls:e.controls,version:e.version,price:e.price>0?`${e.price}U`:"免费",tag:e.hasNew?"最新":"",tagType:"success",onClick:G},null,8,["poster","title","auth","description","controls","version","price","tag"]))),128))])):(r(),x(l($),{key:1,image:l($).PRESENTED_IMAGE_SIMPLE,description:"暂无市场插件"},null,8,["image"]))]),_:1},8,["spinning"])])])],64)}}};export{oe as default};
