import{u as F,d as K}from"./coms-BJ4SXf9r.js";import{c as w,ae as U,f as $,w as A,o as D,a6 as B,V as o,W as h,k as a,$ as l,u as s,G as p,X as E,Z as x,F as I,a7 as H}from"./vue-DoSrNxHp.js";import{_ as W}from"./card-sfuo-F3J.js";import{a as O,s as Q}from"./dhy-CPC2JIDw.js";import{bP as S,bQ as X,bU as N,bW as Z,bV as j,bA as C,bD as q,bG as r,bH as z}from"./ant1-FgANxHEo.js";import"./ant2-F-VMf9eP.js";const J={class:"pannel mt14 plugin-page"},Y={class:"pb20 pl20 pr20 pt20"},ee={key:0,class:"f fw list"},ue={__name:"index",setup(ne){const L=F(),d=K(),_=w(()=>L.preadmin),V=U(),b=$("plugins"),M=$(!1),k=w(()=>d.plugins),R=w(()=>{for(const i of d.plugins)if(i.newestVersion&&i.newestVersion>i.version)return!0;return!1});A(b,i=>{V.push(`/${_.value}/${i}`)});const G=async({key:i,record:t})=>{var g,e;const v=r.loading();try{switch(i){case"active":const n=!t.plugin.dhy.active;Q({active:n,name:t.plugin.name}).then(u=>{d.plugins[t.pluginIndex]=u,r[n?"success":"warning"](`插件已${n?"开启":"关闭"}`)});break;case"uninstall":if(t.plugin.dhy.active)return r.error("需先关闭插件");z.confirm({title:"确认卸载？",okText:"卸载",centered:!0,onOk(){return new Promise((u,m)=>{O({name:t.plugin.name}).then(c=>{const y=k.value.findIndex(f=>f.name===t.plugin.name);d.plugins.splice(y,1),r.success("卸载成功"),u()}).catch(c=>{r.error("卸载失败"),m(c)})})}});break;default:(e=(g=t.plugin)==null?void 0:g.dhy)!=null&&e.link&&V.push(`/${_.value}/plugin/setting?url=${encodeURIComponent(t.plugin.dhy.link)}`);break}}catch(n){console.error(n),r.error((n==null?void 0:n.msg)||(n==null?void 0:n.message)||"操作失败")}finally{v()}};return D(()=>{}),(i,t)=>{const v=B("MIcon"),g=B("RouterLink");return o(),h(I,null,[a(s(X),null,{default:l(()=>[a(s(S),null,{default:l(()=>[a(g,{to:`/${_.value}`},{default:l(()=>[a(v,{name:"dashboard",class:"mr6"}),p("控制台")]),_:1},8,["to"])]),_:1}),a(s(S),null,{default:l(()=>[p("插件管理")]),_:1}),a(s(S),null,{default:l(()=>[p("插件列表")]),_:1})]),_:1}),E("div",J,[a(s(j),{activeKey:b.value,"onUpdate:activeKey":t[0]||(t[0]=e=>b.value=e)},{default:l(()=>[a(s(N),{key:"plugins",tab:"插件列表"}),a(s(N),{key:"plugins/market"},{tab:l(()=>[R.value?(o(),x(s(Z),{key:0,count:"New",numberStyle:{backgroundColor:"var(--success)"},offset:[18,0]},{default:l(()=>[p("插件市场")]),_:1},8,["numberStyle"])):(o(),h(I,{key:1},[p("插件市场")],64))]),_:1})]),_:1},8,["activeKey"]),E("div",Y,[a(s(q),{spinning:M.value,style:{minHeight:"300px",width:"100%"}},{default:l(()=>[k.value.length?(o(),h("div",ee,[(o(!0),h(I,null,H(k.value,(e,n)=>{var u,m,c,y,f,P,T;return o(),x(W,{key:e.name,type:"plugin",poster:(u=e.dhy)==null?void 0:u.poster,title:(m=e.dhy)==null?void 0:m.title,active:(c=e.dhy)==null?void 0:c.active,auth:(y=e.dhy)==null?void 0:y.auth,description:e.description,version:e.version,tag:e.newestVersion&&e.newestVersion>e.version?"New":"",tagType:"success",controls:[(f=e.dhy)!=null&&f.link?{label:e.dhy.linkText||"进入",key:"entry",plugin:e,pluginIndex:n}:null,{label:(P=e.dhy)!=null&&P.active?"关闭":"开启",key:"active",plugin:e,pluginIndex:n},{label:"卸载",key:"uninstall",class:(T=e.dhy)!=null&&T.active?"txt-grey":"txt-error",plugin:e,pluginIndex:n}],onClick:G},null,8,["poster","title","active","auth","description","version","tag","controls"])}),128))])):(o(),x(s(C),{key:1,image:s(C).PRESENTED_IMAGE_SIMPLE,description:"暂无插件"},null,8,["image"]))]),_:1},8,["spinning"])])])],64)}}};export{ue as default};