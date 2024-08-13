import{_ as q}from"./cloud-poster-upload-BX1FWnPW.js";import{_ as F}from"./admin-form-action-bar-CaxKRg0f.js";import{n as R,m as N}from"./index-EJK1-8dv.js";import{a4 as h,ae as A,c as D,f,r as j,o as z,a6 as U,W as x,k as e,$ as t,u as a,X as m,F as $,J as L,V as b,G as n,a1 as B,a7 as E,Z as J}from"./vue-DoSrNxHp.js";import{u as P,t as Q,p as W}from"./coms-BGBaUFfq.js";import{bP as _,bQ as X,aA as Z,bN as H,bO as K,bT as Y,ae as ee,bD as ae,bG as le}from"./ant1-FgANxHEo.js";import{e as te,F as u,I as g,s as se,t as I,f as oe,j as V}from"./ant2-F-VMf9eP.js";import"./modal-DZ8O4vOv.js";import"./main-CiTClfZk.js";import"./index-DoS9QrfY.js";const ne={class:"f ac"},ue={class:"pannel nav-edit-page"},re=m("div",{class:"phead"},"链接编辑",-1),de={class:"form-max pt20 pr20 pb30 pl30"},ie=m("br",null,null,-1),we={__name:"edit",setup(me){const d=h(),C=A(),G=P(),y=D(()=>G.preadmin),k={label:4,wrapper:18},S=f(null),s=j({name:"",logo:"",link:"",status:"on",mid:null,sort:0,styles:"",tag:"",tagStyles:""}),v=f(!1),c=f(!1),w=f([]),M=async r=>{try{v.value=!0,await R.get({id:r}).then(l=>{const p=L(s);for(const i in p)s[i]=l[i]||s[i]})}finally{v.value=!1}},O=async()=>{const r={sortby:"sort",fieldby:"type,subType",field:"main,in:nav|app",pageSize:1e3};await N.list({query:r}).then(l=>{w.value=Q({data:l.list})})},T=async()=>{try{c.value=!0,await S.value.validate();const r={body:L(s)};d.params.id&&(r.id=d.params.id);const l=!d.params.id;l&&(r.body.referrerCode=W(6)),await R[l?"add":"update"](r).then(()=>{le.success(`${l?"添加":"保存"}成功`),C.back()})}finally{c.value=!1}};return z(()=>{d.params.id&&M(d.params.id),O()}),(r,l)=>{const p=U("MIcon"),i=U("RouterLink");return b(),x($,null,[e(a(X),null,{default:t(()=>[e(a(_),null,{default:t(()=>[e(i,{to:`/${y.value}`},{default:t(()=>[e(p,{name:"dashboard",class:"mr6"}),n("控制台")]),_:1},8,["to"])]),_:1}),e(a(_),null,{default:t(()=>[e(i,{to:`/${y.value}/nav`},{default:t(()=>[n("链接管理")]),_:1},8,["to"])]),_:1}),e(a(_),null,{default:t(()=>[n("编辑")]),_:1})]),_:1}),e(F,{class:"mt14"},{default:t(()=>[m("div",ne,[e(a(Z),{type:"primary",loading:c.value,onClick:l[0]||(l[0]=o=>T())},{default:t(()=>[n(B(a(d).params.id?"保存修改":"添加"),1)]),_:1},8,["loading"])])]),_:1}),m("div",ue,[re,m("div",de,[e(a(ae),{spinning:v.value},{default:t(()=>[e(a(te),{ref_key:"formRef",ref:S,model:s,labelAlign:"left","label-col":{span:k.label},"wrapper-col":{span:k.wrapper}},{default:t(()=>[e(a(u),{label:"LOGO"},{default:t(()=>[e(q,{mode:"whole",text:"上传LOGO",modelValue:s.logo,"onUpdate:modelValue":l[1]||(l[1]=o=>s.logo=o),previewURL:`${s.logo}?100x100`},null,8,["modelValue","previewURL"])]),_:1}),e(a(u),{label:"名称",name:"name",rules:[{required:!0,message:"名称不能为空"}]},{default:t(()=>[e(a(g),{value:s.name,"onUpdate:value":l[2]||(l[2]=o=>s.name=o)},null,8,["value"])]),_:1}),e(a(u),{label:"跳转链接",name:"link",rules:[{required:!0,message:"跳转链接不能为空"}]},{default:t(()=>[e(a(g),{value:s.link,"onUpdate:value":l[3]||(l[3]=o=>s.link=o),placeholder:"https://"},null,8,["value"])]),_:1}),e(a(u),{label:"所属分类",name:"mid",rules:[{required:!0,message:"请选择所属分类"}]},{default:t(()=>[e(a(H),{value:s.mid,"onUpdate:value":l[4]||(l[4]=o=>s.mid=o),placeholder:"所属菜单分类"},{default:t(()=>[(b(!0),x($,null,E(w.value,o=>(b(),J(a(K),{key:o._id,value:o._id},{default:t(()=>[n(B(o.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),e(a(u),{label:"上下线",name:"status"},{default:t(()=>[e(a(se),{value:s.status,"onUpdate:value":l[5]||(l[5]=o=>s.status=o)},{default:t(()=>[e(a(I),{value:"on"},{default:t(()=>[n("上线")]),_:1}),e(a(I),{value:"off"},{default:t(()=>[n("下线")]),_:1})]),_:1},8,["value"])]),_:1}),e(a(u),{label:"排序",name:"sort"},{default:t(()=>[e(a(Y),null,{default:t(()=>[e(a(oe),{value:s.sort,"onUpdate:value":l[6]||(l[6]=o=>s.sort=o),min:0},null,8,["value"]),e(a(ee),null,{title:t(()=>[n("数值越高排序越靠前，0表示默认排序"),ie,n("排序优先规则：手动排序>昨日>今日>总量")]),default:t(()=>[e(p,{name:"help"})]),_:1})]),_:1})]),_:1}),e(a(u),{label:"标签",name:"tag"},{default:t(()=>[e(a(g),{value:s.tag,"onUpdate:value":l[7]||(l[7]=o=>s.tag=o),placeholder:"请输入1~2个中文字符或1~4个英文字符"},null,8,["value"])]),_:1}),e(a(u),{label:"标签样式"},{default:t(()=>[e(a(V),{value:s.tagStyles,"onUpdate:value":l[8]||(l[8]=o=>s.tagStyles=o),placeholder:"例：background:red;color:#fff"},null,8,["value"])]),_:1}),e(a(u),{label:"CSS样式"},{default:t(()=>[e(a(V),{value:s.styles,"onUpdate:value":l[9]||(l[9]=o=>s.styles=o),placeholder:"例：font-weight:bold"},null,8,["value"])]),_:1})]),_:1},8,["model","label-col","wrapper-col"])]),_:1},8,["spinning"])])])],64)}}};export{we as default};
