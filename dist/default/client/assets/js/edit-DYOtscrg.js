import{_ as x}from"./admin-form-action-bar-CaxKRg0f.js";import{f as y}from"./index-fks0TXNb.js";import{i as F}from"./sites-Gm5Y6lo6.js";import{a4 as $,ae as A,c as C,f,r as M,o as V,a6 as w,W as D,k as a,$ as t,u as e,X as u,F as G,J as h,V as L,G as d,a1 as q}from"./vue-DoSrNxHp.js";import{u as U}from"./coms-BJ4SXf9r.js";import{bP as _,bQ as E,aA as J,bD as P,bG as N}from"./ant1-FgANxHEo.js";import{e as Q,F as B,I as T,f as W}from"./ant2-F-VMf9eP.js";const X={class:"f ac"},j={class:"pannel site-edit-page"},z=u("div",{class:"phead"},"站点编辑",-1),H={class:"form-max pt20 pr20 pb30 pl30"},oa={__name:"edit",setup(K){const l=$(),v=A(),I=U(),b=C(()=>I.preadmin),g={label:5,wrapper:17},k=f(null),s=M({nickName:"",port:""}),m=f(!1),p=f(!1),R=async n=>{try{m.value=!0,await y.get({id:n}).then(o=>{const c=h(s);for(const r in c)s[r]=o[r]||s[r]})}finally{m.value=!1}},S=async()=>{try{p.value=!0,await k.value.validate();const n={body:h(s)};l.params.id&&(n.id=l.params.id),!l.params.id?await F(n.body).then(()=>{N.success("站点添加并启动成功"),v.back()}):await y.update(n).then(()=>{N.success("保存成功"),v.back()})}finally{p.value=!1}};return V(()=>{l.params.id&&R(l.params.id)}),(n,o)=>{const c=w("MIcon"),r=w("RouterLink");return L(),D(G,null,[a(e(E),null,{default:t(()=>[a(e(_),null,{default:t(()=>[a(r,{to:`/${b.value}`},{default:t(()=>[a(c,{name:"dashboard",class:"mr6"}),d("控制台")]),_:1},8,["to"])]),_:1}),a(e(_),null,{default:t(()=>[a(r,{to:`/${b.value}/sites`},{default:t(()=>[d("站点管理")]),_:1},8,["to"])]),_:1}),a(e(_),null,{default:t(()=>[d("编辑")]),_:1})]),_:1}),a(x,{class:"mt14"},{default:t(()=>[u("div",X,[a(e(J),{type:"primary",loading:p.value,onClick:o[0]||(o[0]=i=>S())},{default:t(()=>[d(q(e(l).params.id?"保存修改":"添加"),1)]),_:1},8,["loading"])])]),_:1}),u("div",j,[z,u("div",H,[a(e(P),{spinning:m.value},{default:t(()=>[a(e(Q),{ref_key:"formRef",ref:k,model:s,labelAlign:"left","label-col":{span:g.label},"wrapper-col":{span:g.wrapper}},{default:t(()=>[a(e(B),{label:"站点名称",name:"nickName",rules:[{required:!0,message:"站点名称不能为空"}]},{default:t(()=>[a(e(T),{value:s.nickName,"onUpdate:value":o[1]||(o[1]=i=>s.nickName=i),placeholder:"请输入站点名称"},null,8,["value"])]),_:1}),a(e(B),{label:"监听端口",name:"port",rules:[{required:!0,message:"监听端口不能为空且唯一"}]},{default:t(()=>[a(e(W),{value:s.port,"onUpdate:value":o[2]||(o[2]=i=>s.port=i),placeholder:"8802~9000未使用的端口",disabled:!!e(l).params.id,style:{width:"100%"}},null,8,["value","disabled"])]),_:1})]),_:1},8,["model","label-col","wrapper-col"])]),_:1},8,["spinning"])])])],64)}}};export{oa as default};