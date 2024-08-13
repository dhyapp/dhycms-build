import{L as M}from"./loading-BEvWhuYv.js";import{k as Y}from"./coms-BGBaUFfq.js";import{S as $,F as p,I as y,f as I,e as A}from"./ant2-F-VMf9eP.js";import{ae as k,bR as E,aA as S,bG as N}from"./ant1-FgANxHEo.js";import{f as _,r as j,a6 as W,W as w,X as f,k as e,u as a,$ as s,G as d,V as u,F as B,ab as O,Z as v,a2 as h,a1 as R,J as z}from"./vue-DoSrNxHp.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const X={class:"f fc ac jc dhy-install-guide"},Z={class:"max-800"},K=f("h1",null,"DHYCMS 安装引导",-1),Q={class:"wrapper"},ee={class:"f ac jc"},ae=["innerHTML"],te={class:"f btn-group"},le={class:"dhy-install-footer f ac jc"},se={href:"",target:"_blank"},oe={href:"",target:"_blank"},pe={__name:"install",setup(re){const D=_(),b=_(!1),m=_(""),c=_(""),r=j({name:"",port:7200,preadmin:"dhycms",domains:"",dbport:27017,dbuser:"",dbpwd:"",rdport:6379,rdname:"",rdpwd:"",rdindex:0}),F={name:[{required:!0,message:"网站名称不能为空"}],port:[{required:!0,message:"网站监听端口不能为空"}]},g=_(0),T=_([{title:"配置网站信息"},{title:"配置 MongoDB 数据库"},{title:"配置 Redis 数据库"},{title:"安装"}]),i=j({status:"info",title:"安装中...",subTitle:""}),L=async()=>{switch(g.value){case 0:await D.value.validate(["name","port"]);break}},P=()=>{g.value--},V=async({maxRetry:t=10})=>{const n=()=>new Promise(o=>{try{fetch("/api/v1/__dhycms_install_heart").then(async l=>await l.text()).then(l=>{l==1?o(!0):o(!1)}).catch(()=>{o(!1)})}catch{o(!1)}});for(let o=0;o<t;o++){if(await n())return!0;await Y(5e3)}return!1},U=async()=>{try{b.value=!0,i.status="info",i.title="安装中...",i.subTitle="",await fetch("/api/dhycms/install",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(z(r))}).then(async t=>await t.json()).then(async t=>{if(i.title="检测安装状态..",await V({}))if(i.status="success",t.msg&&(i.subTitle=t.msg),t.redirect){let o=3;const l=()=>{i.title=`安装成功，将跳往管理面板..${o}s`};l();const G=setInterval(()=>{l(),o<=0&&(clearInterval(G),window.location.href=t.redirect),o--},1e3)}else i.title="安装成功";else i.status="error",i.title="安装超时，请重试",i.subTitle="或联系专业技术人员处理"})}catch(t){console.error(t),i.status="error",i.title=(t==null?void 0:t.msg)||(t==null?void 0:t.message)||"安装失败"}finally{b.value=!1}},q=async()=>{await L(),g.value++,g.value===T.value.length-1&&(b.value=!0,U())};let C;const H=async()=>{C&&clearTimeout(C);try{m.value="loading",await fetch("/api/v1/__dhycms_mongodb_heart",{method:"POST",body:JSON.stringify(z(r))}).then(async t=>await t.json()).then(t=>{t.ok?m.value="ok":(m.value="error",N.error(t.msg||"MongoDB数据库连接测试失败"))})}catch{m.value="error"}finally{C=setTimeout(()=>{m.value=""},1e4)}};let x;const J=async()=>{x&&clearTimeout(x);try{c.value="loading",await fetch("/api/v1/__dhycms_redis_heart",{method:"POST",body:JSON.stringify(z(r))}).then(async t=>await t.json()).then(t=>{t.ok?c.value="ok":(c.value="error",N.error(t.msg||"Redis数据库连接测试失败"))})}catch{c.value="error"}finally{x=setTimeout(()=>{c.value=""},1e4)}};return(t,n)=>{const o=W("MIcon");return u(),w("div",X,[f("div",Z,[K,e(a($),{current:g.value,items:T.value,class:"event-none"},null,8,["current","items"])]),f("div",Q,[e(a(A),{ref_key:"formRef",ref:D,model:r,rules:F,layout:"vertical",class:"form"},{default:s(()=>[g.value===0?(u(),w(B,{key:0},[e(a(p),{label:"网站名称",name:"name"},{default:s(()=>[e(a(y),{value:r.name,"onUpdate:value":n[0]||(n[0]=l=>r.name=l),size:"large",placeholder:"请输入网站名称"},null,8,["value"])]),_:1}),e(a(p),{label:"网站后台地址前缀（默认为 dhycms）",name:"preadmin"},{default:s(()=>[e(a(y),{value:r.preadmin,"onUpdate:value":n[1]||(n[1]=l=>r.preadmin=l),size:"large",placeholder:"网站后台地址前缀（默认为 dhycms）"},null,8,["value"])]),_:1}),e(a(p),{label:"域名",name:"domains"},{default:s(()=>[e(a(y),{value:r.domains,"onUpdate:value":n[2]||(n[2]=l=>r.domains=l),size:"large",rows:4,placeholder:"例：example.com"},null,8,["value"])]),_:1})],64)):g.value===1?(u(),w(B,{key:1},[e(a(p),{name:"dbport",rules:[{required:!0}]},{label:s(()=>[d(" MongoDB端口（默认为 27017） "),e(a(k),{title:"如果服务器已安装MongoDB数据库且端口发生变化，需手动填写已安装的MongoDB数据库端口"},{default:s(()=>[e(o,{name:"help-fill"})]),_:1})]),default:s(()=>[e(a(I),{value:r.dbport,"onUpdate:value":n[3]||(n[3]=l=>r.dbport=l),size:"large",placeholder:"MongoDB数据库（默认为 27017）",min:3e3,max:99999,style:{width:"100%"}},null,8,["value"])]),_:1}),e(a(p),{name:"dbuser",autoLink:!1},{label:s(()=>[d(" MongoDB用户名（默认为空） "),e(a(k),{title:"请确保该用户具有创建数据库、所有数据库读写权限，当数据库未启动权限认证时可为空"},{default:s(()=>[e(o,{name:"help-fill"})]),_:1})]),default:s(()=>[e(a(y),{value:r.dbuser,"onUpdate:value":n[4]||(n[4]=l=>r.dbuser=l),size:"large",placeholder:"MongoDB用户名（默认为空）",autoComplete:"new-user"},null,8,["value"])]),_:1}),e(a(p),{name:"dbpwd",autoLink:!1},{label:s(()=>[d(" MongoDB用户密码（默认为空） ")]),default:s(()=>[e(a(y),{value:r.dbpwd,"onUpdate:value":n[5]||(n[5]=l=>r.dbpwd=l),type:"password",size:"large",placeholder:"MongoDB用户密码（默认为空）",autoComplete:"new-password"},null,8,["value"])]),_:1}),f("div",{class:O(["connect-test",{"event-none":m.value==="loading"}]),onClick:H},[m.value==="loading"?(u(),v(M,{key:0,class:"mr4"})):h("",!0),m.value==="ok"?(u(),v(o,{key:1,name:"selected",class:"mr4 txt-success"})):h("",!0),m.value==="error"?(u(),v(o,{key:2,name:"close",class:"mr4 txt-error"})):h("",!0),d(" MongoDB数据库连接"+R(m.value==="ok"?"成功":m.value==="error"?"失败":"测试"),1)],2)],64)):g.value===2?(u(),w(B,{key:2},[e(a(p),{name:"rdport",rules:[{required:!0}]},{label:s(()=>[d(" Redis数据库端口（默认为 6379） "),e(a(k),{title:"如果服务器已安装Redis数据库且端口发生变化，需手动填写已安装的Redis数据库端口"},{default:s(()=>[e(o,{name:"help-fill"})]),_:1})]),default:s(()=>[e(a(I),{value:r.rdport,"onUpdate:value":n[6]||(n[6]=l=>r.rdport=l),size:"large",placeholder:"Redis数据库端口（默认为 6379）",min:3e3,max:99999,style:{width:"100%"}},null,8,["value"])]),_:1}),e(a(p),{name:"rdname"},{label:s(()=>[d(" Redis数据库用户名（默认为空） "),e(a(k),{title:"若已安装Redis数据库，请手动输入Redis数据库用户名"},{default:s(()=>[e(o,{name:"help-fill"})]),_:1})]),default:s(()=>[e(a(y),{value:r.rdname,"onUpdate:value":n[7]||(n[7]=l=>r.rdname=l),size:"large",placeholder:"Redis数据库用户名（默认为空）",autoComplete:"new-user"},null,8,["value"])]),_:1}),e(a(p),{name:"rdpwd"},{label:s(()=>[d(" Redis数据库密码（默认为空） "),e(a(k),{title:"若已安装Redis数据库，请手动输入Redis数据库密码"},{default:s(()=>[e(o,{name:"help-fill"})]),_:1})]),default:s(()=>[e(a(y),{value:r.rdpwd,"onUpdate:value":n[8]||(n[8]=l=>r.rdpwd=l),type:"password",size:"large",placeholder:"Redis数据库密码（默认为空）",autoComplete:"new-password"},null,8,["value"])]),_:1}),e(a(p),{name:"rdindex",label:"Redis数据库下标（默认为0）",rules:[{required:!0}]},{default:s(()=>[e(a(y),{value:r.rdindex,"onUpdate:value":n[9]||(n[9]=l=>r.rdindex=l),size:"large",placeholder:"Redis数据库下标（默认为0）"},null,8,["value"])]),_:1}),f("div",{class:O(["connect-test",{"event-none":c.value==="loading"}]),onClick:J},[c.value==="loading"?(u(),v(M,{key:0,class:"mr4"})):h("",!0),c.value==="ok"?(u(),v(o,{key:1,name:"selected",class:"mr4 txt-success"})):h("",!0),c.value==="error"?(u(),v(o,{key:2,name:"close",class:"mr4 txt-error"})):h("",!0),d(" Redis数据库连接"+R(c.value==="ok"?"成功":c.value==="error"?"失败":"测试"),1)],2)],64)):(u(),v(a(E),{key:3,status:i.status},{title:s(()=>[f("div",ee,[b.value?(u(),v(M,{key:0,class:"mr10"})):h("",!0),d(" "+R(i.title),1)])]),subTitle:s(()=>[f("div",{innerHTML:i.subTitle},null,8,ae)]),_:1},8,["status"])),i.status!=="success"?(u(),v(a(p),{key:4},{default:s(()=>[f("div",te,[e(a(S),{size:"large",block:"",disabled:g.value===0||b.value,onClick:P},{default:s(()=>[e(o,{name:"left-arrow",class:"mr6"}),d("上一步")]),_:1},8,["disabled"]),g.value===T.value.length-1?(u(),v(a(S),{key:0,size:"large",block:"",type:"primary",loading:b.value,onClick:U},{default:s(()=>[d(R(b.value?"安装中":"重新安装"),1)]),_:1},8,["loading"])):(u(),v(a(S),{key:1,size:"large",block:"",type:"primary",onClick:q},{default:s(()=>[d("下一步"),e(o,{name:"right-arrow",class:"ml6"})]),_:1}))])]),_:1})):h("",!0)]),_:1},8,["model"])]),f("div",le,[d(" @DHYCMS SUPPORT "),f("a",se,[e(o,{name:"tg"})]),f("a",oe,[e(o,{name:"github"})])])])}}};export{pe as default};
