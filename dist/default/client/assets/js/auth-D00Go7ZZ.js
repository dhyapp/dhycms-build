import{g as D,d as k}from"./setting-i7Ud-o8u.js";import{d as K,u as S}from"./coms-BGBaUFfq.js";import{bU as C,bD as W,bT as x,aA as A,bV as F,bG as T}from"./ant1-FgANxHEo.js";import{e as U,F as r,A as h,I as b}from"./ant2-F-VMf9eP.js";import{f as p,r as V,o as B,V as $,W as E,k as a,$ as s,u as e,X as u,G,J as L}from"./vue-DoSrNxHp.js";const N={class:"pannel setting-auth-page"},R={class:"setting-max-800 pt30 pr20 pb30 pl30"},q={class:"mt4"},M=["href"],P={class:"mt4"},z=["href"],Y={__name:"auth",setup(J){const v=K(),_=S(),y=p("dhystat2"),i={label:6,wrapper:24},g=p(null),l=V({appID:"",appKey:"",umamiWebID:"",authLevel:"",authDomains:[],authProducts:[]}),d={dhystat2:l},m=p(!1),f=p(!1),w=async o=>{try{f.value=!0,await D({key:o},{error(){}}).then(t=>{if(t){const n=d[o];for(const c in n)d[o][c]=t[c]??d[o][c]}})}finally{f.value=!1}},I=async()=>{try{await g.value.validate(),m.value=!0,await k(L(l)).then(o=>{l.umamiWebID=o.umamiWebID||"",_.webID=o.umamiWebID||"",T.success("授权成功")})}catch(o){console.error(o)}finally{m.value=!1}};return B(()=>{w("dhystat2")}),(o,t)=>($(),E("div",N,[a(e(F),{activeKey:y.value,"onUpdate:activeKey":t[4]||(t[4]=n=>y.value=n)},{default:s(()=>[a(e(C),{key:"dhystat2",tab:"官方授权"},{default:s(()=>[u("div",R,[a(e(W),{spinning:f.value},{default:s(()=>[a(e(U),{ref_key:"formRef",ref:g,model:l,labelAlign:"left","label-col":{span:i.label}},{default:s(()=>[a(e(r),{wrapperCol:{offset:i.label}},{default:s(()=>[a(e(h),{message:"授权后将自动生成webID(用于数据统计)，若生成失败请重新授权或联系客服",type:"info","show-icon":"",banner:""}),a(e(h),{message:"授权后若存在部分插件或模板不可用，请重启程序",type:"warning","show-icon":"",banner:"",class:"mt10"})]),_:1},8,["wrapperCol"]),a(e(r),{label:"appID",name:"appID",rules:[{required:!0,message:"appID不能为空"}]},{default:s(()=>[a(e(b),{value:l.appID,"onUpdate:value":t[0]||(t[0]=n=>l.appID=n)},null,8,["value"]),u("div",q,[u("a",{href:`${e(v).config.dhy.gateway}/uhub`,target:"_blank",class:"txt-info"},"点我获取appID",8,M)])]),_:1}),a(e(r),{label:"appKey",name:"appKey",rules:[{required:!0,message:"appKey不能为空"}]},{default:s(()=>[a(e(b),{value:l.appKey,"onUpdate:value":t[1]||(t[1]=n=>l.appKey=n),type:"password",autoComplete:"new-password"},null,8,["value"]),u("div",P,[u("a",{href:`${e(v).config.dhy.gateway}/uhub`,target:"_blank",class:"txt-info"},"点我获取appKey",8,z)])]),_:1}),a(e(r),{label:"webID(选填)",name:"umamiWebID"},{default:s(()=>[a(e(b),{value:l.umamiWebID,"onUpdate:value":t[2]||(t[2]=n=>l.umamiWebID=n)},null,8,["value"])]),_:1}),a(e(r),{wrapperCol:{offset:i.label}},{default:s(()=>[a(e(x),{size:"middle"},{default:s(()=>[a(e(A),{type:"primary",loading:m.value,onClick:t[3]||(t[3]=n=>I())},{default:s(()=>[G("授权或刷新")]),_:1},8,["loading"])]),_:1})]),_:1},8,["wrapperCol"])]),_:1},8,["model","label-col"])]),_:1},8,["spinning"])])]),_:1})]),_:1},8,["activeKey"])]))}};export{Y as default};
