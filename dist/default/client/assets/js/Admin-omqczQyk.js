import{l as se}from"./logox-BX9_wdrp.js";import{u as le,d as ne,e as ie,a as oe}from"./coms-BJ4SXf9r.js";import{a4 as ce,ae as ue,c as C,f as D,h as re,o as me,a6 as K,n as de,V as l,W as m,X as s,m as R,F as V,a7 as A,u as t,ab as S,k as a,a1 as M,a2 as $,Z as f,$ as i,G as k,a0 as he}from"./vue-DoSrNxHp.js";import{g as ve,l as fe}from"./user-COF2e92G.js";import{r as _e}from"./sites-Gm5Y6lo6.js";import{g as pe}from"./dhy-CPC2JIDw.js";import{ae as L,aL as O,by as ge,bK as B,bL as j,bM as ye,bD as ke,bG as be}from"./ant1-FgANxHEo.js";import{b as $e}from"./ant2-F-VMf9eP.js";const xe={key:0,class:"f admin-layout"},we={class:"logo f ac"},Ie=["alt"],Ce=["alt"],Se=s("b",{class:"txt-ellipsis-1"},"管理后台",-1),Me=["onClick","title"],Le={class:"f ac"},Pe={key:0,class:"fa"},De={class:"c-right f fc"},Ve={class:"header f jb ac"},je={class:"h-left f ac"},Ne={class:"icon-btn switch-site-btn"},Te={class:"switch-sites-overlay"},Re={class:"body scroll"},Ae=["href"],Be={key:0,class:"sugar-primary fs12 ml6"},ze={class:"body"},Ee=s("span",null,"UIP5000一键换链",-1),Fe={class:"f ac h-right"},Ge=["href"],We=["src"],Ue=["href"],He={href:"/",target:"_blank",class:"icon-btn"},Ke={class:"scroll main"},Oe=s("div",{class:"mt30 fs12 txt-grey f jc a"},"Copyright © 2024",-1),Xe={async asyncData({store:z,server:w,ctx:P}){await oe({store:z,server:w,ctx:P})}},lt=Object.assign(Xe,{__name:"Admin",setup(z){const w=ce(),P=ue(),v=le(),r=ne(),p=C(()=>v.siteinfo),_=C(()=>v.user),g=C(()=>v.preadmin),I=D(null),N=D(null),d=D(ie()),b=D(!0),x=C({get(){return v.theme},set(o){v.theme=o}}),E=C(()=>{const o=r.plugins.findIndex(h=>h.name==="uip5000");return r.plugins[o]||{}}),X=()=>{x.value=x.value==="dark"?"light":"dark",document.body.setAttribute("theme",x.value),localStorage.setItem("theme",x.value)},Y=()=>{b.value=!b.value,b.value?localStorage.setItem("menuPackup",b.value):localStorage.removeItem("menuPackup")},Z=(o,h)=>{var e;(e=o.children)!=null&&e.length?o.active=!o.active:P.push(o.to)},q=o=>{},J=["pro-gray","pro","pro-pro"],Q=["免费版","专业版","旗舰版"];re(()=>{var o;if(I.value=null,w.path===`/${g.value}`)I.value=0,N.value=null;else{const h=w.matched;e:for(let e=0;e<d.value.length;e++){const u=h[0].path.replace(/\/:\w+\??$/,"");if(d.value[e].to!==`/${g.value}`&&u.startsWith(d.value[e].to)){if(I.value=e,d.value[e].active=!0,(o=d.value[e].children)!=null&&o.length&&h[1])t:for(let c=0;c<d.value[e].children.length;c++){const y=h[1].path.replace(/\/:\w+\??$/,"");if(d.value[e].children[c].to.startsWith(y)){N.value=c;break t}}break e}}}});const ee=async()=>{const o=be.loading();try{await fe().then(()=>{P.push(`/${g.value}/login`)})}finally{o()}},te=async()=>{await _e().then(()=>{setTimeout(()=>{location.reload()},1500)})};return me(()=>{b.value=!!localStorage.getItem("menuPackup"),ve(),pe("all").then(o=>{var h;(h=o==null?void 0:o.list)==null||h.forEach(e=>{if(e.type==="plugin"){const u=r.plugins.findIndex(c=>c.name===e.key);if(u>-1&&(r.plugins[u].newestVersion=e.version,e.version>r.plugins[u].version)){const c=d.value.findIndex(y=>y.name==="插件管理");c>-1&&(d.value[c].notice="New")}}else if(e.type==="template"){const u=r.templates.findIndex(c=>c.name===e.key);if(u>-1&&(r.templates[u].newestVersion=e.version,e.version>r.templates[u].version)){const c=d.value.findIndex(y=>y.name==="模板管理");c>-1&&(d.value[c].notice="New")}}else e.type==="app"&&(r.lastestApp=e)})})}),(o,h)=>{var y;const e=K("MIcon"),u=K("RouterLink"),c=de("depic");return _.value.id?(l(),m("div",xe,[s("nav",{class:S(["menu scroll",{"menu-packup":b.value}])},[s("div",we,[p.value.ico||p.value.logo?R((l(),m("img",{key:0,alt:p.value.shortTitle||p.value.title||""},null,8,Ie)),[[c,`${p.value.ico||p.value.logo}?100x60`]]):(l(),m("img",{key:1,src:se,alt:p.value.shortTitle||p.value.title||""},null,8,Ce)),Se]),s("ul",null,[(l(!0),m(V,null,A(d.value,(n,F)=>{var G,W,U,H;return l(),m(V,{key:n.to},[t(v).permission((G=n.meta)==null?void 0:G.authkey)?(l(),m("li",{key:0,class:S(["itm",{active:I.value===F}])},[s("div",{class:"a f ac jb",onClick:T=>Z(n),title:n.name},[s("div",Le,[a(e,{name:n.icon,class:"left-icon"},null,8,["name"]),s("span",null,M(n.name),1),n.notice?(l(),m("span",{key:0,class:S(`sugar-${n.noticeType||"primary"} ml6 fs12`)},M(n.notice),3)):$("",!0)]),(W=n.children)!=null&&W.length?(l(),f(e,{key:0,name:(U=n.children)!=null&&U.length&&n.active?"down":"right"},null,8,["name"])):$("",!0)],8,Me),(H=n.children)!=null&&H.length&&n.active||b.value?(l(),m("ul",Pe,[(l(!0),m(V,null,A(n.children,(T,ae)=>(l(),m("li",{class:S({active:ae===N.value&&I.value===F})},[a(u,{to:T.to,onClick:Ye=>q()},{default:i(()=>[k(M(T.meta.title),1)]),_:2},1032,["to","onClick"])],2))),256))])):$("",!0)],2)):$("",!0)],64)}),128))])],2),s("div",De,[s("div",Ve,[s("div",je,[a(t(L),{title:"收展菜单"},{default:i(()=>[a(e,{name:"menu",class:"icon-btn",onClick:Y})]),_:1}),_.value.id==1e4||_.value.viewabledRoleAuth.includes("sites")?(l(),f(t(O),{key:0},{overlay:i(()=>[s("div",Te,[s("div",Re,[(l(!0),m(V,null,A(t(r).sites,n=>(l(),m("a",{href:`${n.origin}${t(w).fullPath}`,key:n.name,class:S(["site-item",{"event-none":n.name===t(r).appname}])},[k(M(n.nickName)+" ",1),n.name===t(r).appname?(l(),m("span",Be,"当前")):$("",!0)],10,Ae))),128))]),a(t($e)),s("div",ze,[s("div",{class:"site-item",onClick:te},[a(e,{name:"restart",class:"mr8 txt-grey"}),k("重启站点")]),a(u,{to:`/${g.value}/sites`,class:"site-item"},{default:i(()=>[a(e,{name:"right-arrow",class:"mr8 txt-grey"}),k("站点管理 ")]),_:1},8,["to"])])])]),default:i(()=>[s("div",Ne,[a(e,{name:"a-sorting2"}),k(" 切换站点 ")])]),_:1})):$("",!0),(y=E.value.dhy)!=null&&y.link?(l(),f(u,{key:1,to:`/${g.value}/plugin/setting?url=${encodeURIComponent(E.value.dhy.link)}`,class:"btn-uip5000"},{default:i(()=>[Ee,a(e,{name:"right-arrow"})]),_:1},8,["to"])):$("",!0)]),s("div",Fe,[a(t(L),{title:!t(v).authLevel||t(v).authLevel==0?"点击升级专业版":`导航蚁${Q[t(v).authLevel||0]}`},{default:i(()=>[s("a",{href:`${t(r).config.dhy.gateway}`,target:"_blank"},[s("img",{src:`/assets/img/${J[t(v).authLevel||0]}.gif`},null,8,We)],8,Ge)]),_:1},8,["title"]),a(t(L),{title:"产品食用指南"},{default:i(()=>[s("a",{href:`${t(r).config.dhy.gateway}/help`,target:"_blank",class:"icon-btn"},[a(e,{name:"file-text"})],8,Ue)]),_:1}),a(t(L),{title:x.value==="light"?"暗黑模式":"明亮模式"},{default:i(()=>[s("a",{href:"javascript:void(0);",class:"icon-btn",onClick:h[0]||(h[0]=n=>X())},[x.value==="light"?(l(),f(e,{key:0,name:"moon"})):(l(),f(e,{key:1,name:"sun"}))])]),_:1},8,["title"]),a(t(L),{title:"前台主页"},{default:i(()=>[s("a",He,[a(e,{name:"home"})])]),_:1}),a(t(O),null,{overlay:i(()=>[a(t(ge),{style:{width:"160px"}},{default:i(()=>[a(t(B),null,{default:i(()=>[a(u,{to:`/${g.value}/uhub`,class:"f ac"},{default:i(()=>[_.value.avatar?(l(),f(t(j),{key:0,class:"mr12",size:"small"},{icon:i(()=>[R(s("img",null,null,512),[[c,`${_.value.avatar}?100x100`]])]),_:1})):(l(),f(t(j),{key:1,src:"/assets/img/avatar/avatar.jpg",class:"mr12",size:"small"})),k(" "+M(_.value.nickname||_.value.username),1)]),_:1},8,["to"])]),_:1}),a(t(ye)),a(t(B),null,{default:i(()=>[a(u,{to:`/${g.value}/uhub`,class:"f ac"},{default:i(()=>[a(e,{name:"user",class:"mr6"}),k("个人中心")]),_:1},8,["to"])]),_:1}),a(t(B),{onClick:ee},{default:i(()=>[a(e,{name:"restart",class:"mr6"}),k("退出 ")]),_:1})]),_:1})]),default:i(()=>[a(u,{to:`/${g.value}/uhub`,class:"pt4 pb4"},{default:i(()=>[_.value.avatar?(l(),f(t(j),{key:0,class:"ml12"},{icon:i(()=>[R(s("img",null,null,512),[[c,`${_.value.avatar}?100x100`]])]),_:1})):(l(),f(t(j),{key:1,src:"/assets/img/avatar/avatar.jpg",class:"ml12"}))]),_:1},8,["to"])]),_:1})])]),s("div",Ke,[he(o.$slots,"default"),Oe])])])):(l(),f(t(ke),{key:1,class:"admin-layout-spin"}))}}});export{lt as default};