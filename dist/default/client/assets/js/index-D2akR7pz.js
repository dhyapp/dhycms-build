import{s as F,m as be}from"./index-EJK1-8dv.js";import{r as P,u as ge,n as $,j as he,l as we,t as Ie}from"./coms-BGBaUFfq.js";import{bP as ee,bQ as xe,bT as H,aM as Ce,by as ae,bK as f,aA as x,bN as q,bO as J,ae as Se,aL as Te,bH as V,bG as d}from"./ant1-FgANxHEo.js";import{I as te,h as Me,A as Oe,i as Fe,T as Be,e as le,F as ne}from"./ant2-F-VMf9eP.js";import{c as Le,r as z,f as _,P as Re,a6 as re,V as i,W as m,k as t,$ as a,u as e,G as o,X as Y,F as p,a7 as j,Z as B,a1 as c,a2 as Ne,J as oe}from"./vue-DoSrNxHp.js";const $e=(g={},b={})=>P("/api/v1/admin/selfreg/in",{method:"POST",body:JSON.stringify(g),...b}),ze=(g={},b={})=>P("/api/v1/admin/selfreg/out",{method:"POST",body:JSON.stringify(g),...b}),Pe=(g={},b={})=>P("/api/v1/admin/selfreg/block",{method:"POST",body:JSON.stringify(g),...b}),Ye=(g={},b={})=>P("/api/v1/admin/selfreg/unblock",{method:"POST",body:JSON.stringify(g),...b}),Ae={class:"pannel pt20 pl20 pb20 pr20 mt14 nav-list-page"},De=Y("span",{class:"txt-error"},"删除",-1),Ue=Y("hr",{class:"mt20 mb14"},null,-1),He=["href"],qe=Y("span",{class:"txt-error"},"删除",-1),Qe={__name:"index",setup(g){const b=ge(),L=Le(()=>b.preadmin),y=z({keyword:"",mid:null,status:null}),K={in:"已收录",out:"未收录",refuse:"驳回",block:"拉黑",unblock:"移除黑名单"},se={in:"green",out:"",refuse:"red",block:"red",unblock:""},A=_([]),D=_(!1),h=z({current:1,pageSize:20,pageSizeOptions:[20,50,200,500],total:0,showQuickJumper:!0,position:["bottomCenter"]}),R=_([]),G=_({}),k=_([]),w=_(!1),ue=l=>{k.value=l},de=()=>{h.current=1,h.total=0},ie=async()=>{const l={sortby:"sort",fieldby:"type,subType",field:"main,nav",pageSize:1e3};await be.list({query:l}).then(n=>{R.value=Ie({data:n.list});for(const u of R.value)G.value[u._id]=u.name})},C=async()=>{try{D.value=!0;const l={current:h.current,pageSize:h.pageSize,fieldby:[],field:[]};y.mid&&(l.fieldby.push("mid"),l.field.push(y.mid)),y.keyword&&(l.keywordby="name,link",l.keyword=y.keyword),l.fieldby=l.fieldby.join(","),l.field=l.field.join(","),A.value=[],await F.list({query:l}).then(n=>{A.value=n.list||[],h.total=n.total})}finally{D.value=!1}},S=()=>{C()},Q=async l=>{V.confirm({title:"确认删除？",content:"删除后将无法恢复",centered:!0,onOk:async()=>new Promise((n,u)=>{F.del({ids:l}).then(()=>{d.success("删除成功"),S(),n()}).catch(v=>{console.error(v),d.error(v.message||"删除失败"),u()})})})},N=async(l,n="block")=>{const u=d.loading();try{await(n==="block"?Pe:Ye)({ids:l}).then(async()=>{await U(l,{status:n}),S()}).catch(s=>{console.error(s),d.error("操作失败")})}finally{u()}},T=_(!1),I=z({mid:null}),E=_(null),fe=async()=>{try{w.value=!0,await E.value.validate(),await F.update({ids:k.value,body:oe(I)}).then(()=>{d.success("归类成功"),T.value=!1,I.mid=null,S()}).catch(l=>{console.error(l),d.error("归类失败")})}finally{w.value=!1}},M=_(!1),O=z({remark:"",status:"refuse"}),W=_(null),ce=async()=>{try{w.value=!0,await W.value.validate(),await F.update({ids:k.value,body:oe(O)}).then(()=>{d.success("操作成功"),M.value=!1,O.remark="",S()}).catch(l=>{console.error(l),d.error("操作失败")})}finally{w.value=!1}},U=async(l,n)=>{const u=d.loading();try{await F.update({ids:l,body:n}).then(()=>{d.success("操作成功"),S()}).catch(v=>{console.error(v),d.error("操作失败")})}finally{u()}},X=async l=>{const n=d.loading();try{await $e({ids:l}).then(u=>{U(l,{status:"in",inAt:Date.now()}),d.info(`成功收录${u.success}数据，${u.fail}条失败`)}).catch(u=>{console.error(u),d.error("收录失败")})}finally{n()}},Z=async l=>{const n=d.loading();try{await ze({ids:l}).then(u=>{U(l,{status:"out"}),d.info(`成功操作${u.success}数据，${u.fail}条失败`)}).catch(u=>{console.error(u),d.error("操作失败")})}finally{n()}},me=async({key:l},n)=>{switch(l){case"menu":I.mid=n.mid,k.value=[n._id],T.value=!0;break;case"in":X([n._id]);break;case"out":Z([n._id]);break;case"refuse":k.value=[n._id],M.value=!0;break;case"block":await N([n._id]);break;case"unblock":await N([n._id],"unblock");break;case"del":Q([n._id]);break}},ye=async({key:l})=>{if(!k.value.length&&l!=="import")return d.error("未选中目标");switch(l){case"del":await Q(k.value);break;case"menu":T.value=!0;break;case"block":await N(k.value);break;case"unblock":await N(k.value,"unblock");break;case"refuse":M.value=!0;break;case"out":Z(k.value);break;case"in":X(k.value);break}},ke=()=>{C()},pe=()=>{y.keyword="",y.mid=null,de(),C()},ve=l=>{h.current=l.current,h.pageSize=l.pageSize,C()};return Re(()=>{C(),ie()}),(l,n)=>{const u=re("MIcon"),v=re("RouterLink");return i(),m(p,null,[t(e(xe),null,{default:a(()=>[t(e(ee),null,{default:a(()=>[t(v,{to:`/${L.value}`},{default:a(()=>[t(u,{name:"dashboard",class:"mr6"}),o("控制台")]),_:1},8,["to"])]),_:1}),t(e(ee),null,{default:a(()=>[o("自助收录管理")]),_:1})]),_:1}),Y("div",Ae,[t(e(Me),{justify:"space-between"},{default:a(()=>[t(e(H),{wrap:""},{default:a(()=>[t(e(Ce),{loading:w.value},{overlay:a(()=>[t(e(ae),{onClick:ye},{default:a(()=>[t(e(f),{key:"menu"},{default:a(()=>[o("归类")]),_:1}),t(e(f),{key:"in"},{default:a(()=>[o("收录")]),_:1}),t(e(f),{key:"out"},{default:a(()=>[o("取消收录")]),_:1}),t(e(f),{key:"refuse"},{default:a(()=>[o("驳回")]),_:1}),t(e(f),{key:"block"},{default:a(()=>[o("拉黑（IP&域名）")]),_:1}),t(e(f),{key:"unblock"},{default:a(()=>[o("取消拉黑")]),_:1}),t(e(f),{key:"del"},{default:a(()=>[De]),_:1})]),_:1})]),default:a(()=>[o(" 批量操作 ")]),_:1},8,["loading"]),t(v,{to:`/${L.value}/selfreg/edit`},{default:a(()=>[t(e(x),{type:"primary"},{default:a(()=>[o("添加收录")]),_:1})]),_:1},8,["to"])]),_:1}),t(e(H),{wrap:""},{default:a(()=>[t(e(q),{value:y.mid,"onUpdate:value":n[0]||(n[0]=r=>y.mid=r),placeholder:"所属菜单分类",style:{width:"160px"}},{default:a(()=>[(i(!0),m(p,null,j(R.value,r=>(i(),B(e(J),{key:r._id,value:r._id},{default:a(()=>[o(c(r.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"]),t(e(q),{value:y.status,"onUpdate:value":n[1]||(n[1]=r=>y.status=r),placeholder:"状态筛选",style:{width:"160px"}},{default:a(()=>[(i(),m(p,null,j(K,(r,s)=>t(e(J),{key:s,value:s},{default:a(()=>[o(c(r),1)]),_:2},1032,["value"])),64))]),_:1},8,["value"]),t(e(te),{value:y.keyword,"onUpdate:value":n[2]||(n[2]=r=>y.keyword=r),placeholder:"名称/链接/关键词"},null,8,["value"]),t(e(x),{type:"primary",onClick:ke},{default:a(()=>[o("搜索")]),_:1}),t(e(x),{onClick:pe},{default:a(()=>[o("重置")]),_:1})]),_:1})]),_:1}),Ue,t(e(Oe),{message:"来源统计需安装并开启【自动收录】插件。此处来源量仅限对未收录链接进行统计，拉黑、驳回链接将不进行统计",class:"mb14",showIcon:"",type:"warning"}),t(e(Be),{columns:[{title:"名称",dataIndex:"name",ellipsis:!0},{title:"链接",dataIndex:"link",ellipsis:!0},{title:"所属分类",dataIndex:"mid"},{title:"今日来源",dataIndex:"referrerTodayCount",sorter:!0},{title:"昨日来源",dataIndex:"referrerYesterdayCount",sorter:!0},{title:"前日来源",dataIndex:"referrerBeforeyesterdayCount",sorter:!0},{title:"累计来源",dataIndex:"referrerTotal",sorter:!0},{title:"来源码",dataIndex:"referrerCode"},{title:"收录时间",dataIndex:"inAt"},{title:"申请时间",dataIndex:"_id"},{title:"备注",dataIndex:"remark",ellipsis:!0},{title:"状态",dataIndex:"status",align:"center",fixed:"right",width:80},{title:"操作",dataIndex:"ctrl",align:"right",fixed:"right",width:210}],"data-source":A.value,size:"small",loading:D.value,pagination:h,"row-selection":{selectedRowKeys:k.value,onChange:ue},rowKey:"_id",onChange:ve},{bodyCell:a(({column:r,record:s})=>[r.dataIndex==="link"?(i(),m("a",{key:0,href:s.link,rel:"noreferrer",target:"_blank"},c(s.link),9,He)):r.dataIndex==="mid"?(i(),m(p,{key:1},[o(c(G.value[s.mid]||"-"),1)],64)):r.dataIndex==="referrerTodayCount"?(i(),m(p,{key:2},[o(c(e($)(s.referrerTodayCount)),1)],64)):r.dataIndex==="referrerYesterdayCount"?(i(),m(p,{key:3},[o(c(e($)(s.referrerYesterdayCount)),1)],64)):r.dataIndex==="referrerBeforeyesterdayCount"?(i(),m(p,{key:4},[o(c(e($)(s.referrerBeforeyesterdayCount)),1)],64)):r.dataIndex==="referrerTotal"?(i(),m(p,{key:5},[o(c(e($)(s.referrerTotal+s.referrerTodayCount)),1)],64)):r.dataIndex==="referrerCode"?(i(),m(p,{key:6},[o(c(s.referrerCode||""),1)],64)):r.dataIndex==="_id"?(i(),m(p,{key:7},[o(c(e(he)(s._id,"YYYY-MM-DD")),1)],64)):r.dataIndex==="inAt"?(i(),m(p,{key:8},[o(c(s.inAt?e(we)(s.inAt,"YYYY-MM-DD"):"-"),1)],64)):r.dataIndex==="remark"?(i(),B(e(Se),{key:9,title:s.remark},{default:a(()=>[o(c(s.remark||"-"),1)]),_:2},1032,["title"])):r.dataIndex==="status"?(i(),B(e(Fe),{key:10,bordered:!1,color:se[s.status]},{default:a(()=>[o(c(K[s.status]),1)]),_:2},1032,["color"])):r.dataIndex==="ctrl"?(i(),B(e(H),{key:11},{default:a(()=>[t(v,{to:`/${L.value}/selfreg/edit/${s._id}`},{default:a(()=>[t(e(x),{type:"primary",size:"small"},{default:a(()=>[o("编辑")]),_:1})]),_:2},1032,["to"]),t(v,{to:`/${L.value}/stat/selfreg/${s._id}`},{default:a(()=>[t(e(x),{size:"small"},{default:a(()=>[o("报表")]),_:1})]),_:2},1032,["to"]),t(e(Te),null,{overlay:a(()=>[t(e(ae),{onClick:_e=>me(_e,s)},{default:a(()=>[t(e(f),{key:"menu"},{default:a(()=>[o("归类")]),_:1}),t(e(f),{key:"in"},{default:a(()=>[o("收录")]),_:1}),t(e(f),{key:"out"},{default:a(()=>[o("取消收录")]),_:1}),t(e(f),{key:"refuse"},{default:a(()=>[o("驳回")]),_:1}),t(e(f),{key:"block"},{default:a(()=>[o("拉黑（IP&域名）")]),_:1}),t(e(f),{key:"unblock"},{default:a(()=>[o("取消拉黑")]),_:1}),t(e(f),{key:"del"},{default:a(()=>[qe]),_:1})]),_:2},1032,["onClick"])]),default:a(()=>[t(e(x),{size:"small"},{default:a(()=>[o("...")]),_:1})]),_:2},1024)]),_:2},1024)):Ne("",!0)]),_:1},8,["data-source","loading","pagination","row-selection"])]),t(e(V),{open:T.value,"onUpdate:open":n[4]||(n[4]=r=>T.value=r),title:"批量设置所属分类",centered:"",confirmLoading:w.value,onOk:fe},{default:a(()=>[t(e(le),{ref_key:"menuModalFormRef",ref:E,model:I,class:"mt20"},{default:a(()=>[t(e(ne),{name:"mid",rules:[{required:!0,message:"请选择所属分类"}]},{default:a(()=>[t(e(q),{value:I.mid,"onUpdate:value":n[3]||(n[3]=r=>I.mid=r),placeholder:"所属菜单分类"},{default:a(()=>[(i(!0),m(p,null,j(R.value,r=>(i(),B(e(J),{key:r._id,value:r._id},{default:a(()=>[o(c(r.name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","confirmLoading"]),t(e(V),{open:M.value,"onUpdate:open":n[6]||(n[6]=r=>M.value=r),title:"驳回理由",centered:"",confirmLoading:w.value,onOk:ce},{default:a(()=>[t(e(le),{ref_key:"refuseModalFormRef",ref:W,model:O,class:"mt20"},{default:a(()=>[t(e(ne),{name:"remark"},{default:a(()=>[t(e(te),{value:O.remark,"onUpdate:value":n[5]||(n[5]=r=>O.remark=r),placeholder:"请输入驳回理由"},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["open","confirmLoading"])],64)}}};export{Qe as default};