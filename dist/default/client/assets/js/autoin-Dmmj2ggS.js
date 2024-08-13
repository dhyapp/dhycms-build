import{r as N,u as A,g as G,h as O}from"./coms-BGBaUFfq.js";import{F as d,I as g,d as U,A as $,e as D}from"./ant2-F-VMf9eP.js";import{bN as R,bO as J,aA as T,bG as k}from"./ant1-FgANxHEo.js";import{c as E,f as c,r as P,o as W,a6 as X,W as y,X as e,k as t,$ as l,Y as f,u as a,V as p,G as u,F as H,a7 as Y,Z as z,a1 as _,a2 as I,J as Z}from"./vue-DoSrNxHp.js";const K=L=>N("/api/v1/autoin/submit",{method:"POST",body:JSON.stringify(L)}),Q=()=>N("/api/v1/autoin"),ee={class:"autoin-page"},ae=e("div",null,[e("a",{href:"#about"},"关于我们")],-1),te=e("div",null,[e("a",{href:"#coop"},"广告合作")],-1),le=e("div",null,[e("a",{href:"#contact"},"联系我们")],-1),ne=e("div",null,[e("a",{href:"#selfin",style:{color:"#ff0"}},"自助收录")],-1),oe=["innerHTML"],se=["innerHTML"],ue=["innerHTML"],re=["innerHTML"],ie={class:"form-row f"},ce={class:"form-row f"},de=e("b",null,"提交成功，正在审核中..",-1),me=e("br",null,null,-1),ve=e("br",null,null,-1),fe=e("br",null,null,-1),pe={class:"txt-error"},ke={__name:"autoin",setup(L){const q=A(),m=E(()=>q.appearance.themeLight),C=c(!1),v=c({}),M=c(),s=P({name:"",link:"",mid:null,code:""}),w=c(null),h=c(!1),i=c({}),x=c([]),b=async()=>{w.value.src=`/api/v1/captcha?${Date.now()}`},B=async()=>{G().then(r=>{x.value=r||[]})},F=async()=>{C.value=!0,await Q().then(r=>{v.value=r}),C.value=!1},V=async()=>{try{await M.value.validate(),h.value=!0,await K(Z(s)).then(r=>{i.value=r,k.success("提交成功")}).catch(r=>{b()})}finally{h.value=!1}},S=r=>{O(r).then(()=>{k.success("复制成功")}).catch(()=>{k.error("复制失败")})};return W(()=>{b(),B(),F()}),(r,o)=>{const j=X("RouterLink");return p(),y("div",ee,[e("nav",{class:"nav f fw",style:f({backgroundColor:m.value})},[e("div",null,[t(j,{to:"/"},{default:l(()=>[u("首页")]),_:1})]),ae,te,le,ne],4),e("div",{class:"module-title f jb ac",style:f({backgroundColor:m.value}),id:"about"},"关于我们",4),e("div",{class:"module-container",innerHTML:v.value.about},null,8,oe),e("div",{class:"module-title f jb ac",style:f({backgroundColor:m.value}),id:"coop"},"广告合作",4),e("div",{class:"module-container",innerHTML:v.value.cooperation},null,8,se),e("div",{class:"module-title f jb ac",style:f({backgroundColor:m.value}),id:"contact"},"联系我们",4),e("div",{class:"module-container",innerHTML:v.value.contact},null,8,ue),e("div",{class:"module-title f jb ac",style:f({backgroundColor:m.value}),id:"selfin"},"自助收录",4),t(a(D),{ref_key:"form",ref:M,model:s,class:"module-container"},{default:l(()=>[e("div",{innerHTML:v.value.description},null,8,re),e("div",ie,[t(a(d),{name:"name",rules:[{required:!0,message:"站点名称不能为空"}]},{default:l(()=>[t(a(g),{value:s.name,"onUpdate:value":o[0]||(o[0]=n=>s.name=n),placeholder:"请输入网站名称",size:"large"},null,8,["value"])]),_:1}),t(a(d),{name:"link",rules:[{required:!0,message:"站点链接不能为空"}]},{default:l(()=>[t(a(g),{value:s.link,"onUpdate:value":o[1]||(o[1]=n=>s.link=n),placeholder:"https:// 网站地址",size:"large"},null,8,["value"])]),_:1})]),e("div",ce,[t(a(d),{name:"mid",rules:[{required:!0,message:"请选择站点类型"}]},{default:l(()=>[t(a(R),{value:s.mid,"onUpdate:value":o[2]||(o[2]=n=>s.mid=n),placeholder:"请选择站点类型",size:"large"},{default:l(()=>[(p(!0),y(H,null,Y(x.value,n=>(p(),z(a(J),{key:n._id,value:n._id},{default:l(()=>[u(_(n.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1}),t(a(d),{name:"code",rules:[{required:!0,message:"验证码不能为空"}]},{default:l(()=>[t(a(U),{compact:""},{default:l(()=>[t(a(g),{value:s.code,"onUpdate:value":o[3]||(o[3]=n=>s.code=n),placeholder:"验证码",size:"large"},null,8,["value"]),t(a(T),{size:"large",onClick:b,class:"captcha-btn"},{default:l(()=>[e("img",{ref_key:"captcha",ref:w},null,512)]),_:1})]),_:1})]),_:1})]),i.value.ok?(p(),z(a(d),{key:0},{default:l(()=>[t(a($),{type:"success",showIcon:""},{message:l(()=>[de]),description:l(()=>[u(" 请将以下链接添加至您的站点中："),me,u(" 链接名称："),e("b",null,_(i.value.name||"<无>"),1),e("span",{class:"txt-info ml6 pointer",onClick:o[4]||(o[4]=n=>S(i.value.name))},"复制"),ve,u(" 链接地址："),e("b",null,_(i.value.link),1),e("span",{class:"txt-info ml6 pointer",onClick:o[5]||(o[5]=n=>S(i.value.link))},"复制"),fe,u(" 添加完成后，"),i.value.basein>0?(p(),y(H,{key:0},[u("且访问我站的"),e("b",pe,"来源量达到"+_(i.value.basein)+"个",1),u("，")],64)):I("",!0),u("我们将会在30分钟内进行自动收录。 ")]),_:1})]),_:1})):I("",!0),t(a(d),null,{default:l(()=>[t(a(T),{loading:h.value,type:"primary",size:"large",block:"",onClick:V},{default:l(()=>[u("提交")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])])}}};export{ke as default};