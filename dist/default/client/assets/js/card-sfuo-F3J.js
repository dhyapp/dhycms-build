import{V as t,W as a,X as c,ab as r,a1 as i,a2 as l,Y as h,k as f,$ as S,G as b,u as x,F as u,a7 as C}from"./vue-DoSrNxHp.js";import{ae as N}from"./ant1-FgANxHEo.js";const V={class:"admin-card"},$={class:"info"},B={class:"t txt-ellipsis-2 mb4 f ac"},T=["title"],A={class:"f ac jb extra"},w={key:2},z={key:0,class:"f ctrl"},F=["onClick"],G={__name:"card",props:{type:{type:String,default:"plugin"},title:String,poster:String,price:String,auth:String,description:String,version:String,active:Boolean,controls:{type:Array,default:()=>[]},tag:String,tagType:{type:String,default:"primary"}},emits:["click"],setup(e,{emit:g}){const m=g,y={free:"free",pro:"gold",plus:"gold"},k={free:"免费版",pro:"专业版",plus:"旗舰版"},v=({index:n,key:o,record:s})=>{m("click",{index:n,key:o,record:s})};return(n,o)=>(t(),a("div",V,[c("div",{class:"img-wrapper",style:h({backgroundImage:`url(${e.poster})`})},[e.tag?(t(),a("span",{key:0,class:r(["admin-card-tag",`tag-${e.tagType}`])},i(e.tag),3)):l("",!0)],4),c("div",$,[c("div",null,[c("div",B,[e.auth?(t(),a("label",{key:0,class:r(`sugar-${y[e.auth]||"grey"}`)},i(k[e.auth]),3)):l("",!0),f(x(N),{title:e.title},{default:S(()=>[b(i(e.title),1)]),_:1},8,["title"])]),c("div",{class:"txt-ellipsis-2 brif mb6",title:e.description},i(e.description),9,T)]),c("div",A,[e.price?(t(),a("div",{key:0,class:r(["price",[e.price==="免费"?"sugar-success":"sugar-error"]])},i(e.price),3)):(t(),a("div",{key:1,class:r(["status",{active:e.active,"sugar-success":e.active,"sugar-error":!e.active}])},i(e.active?"已开启":"未开启"),3)),e.version?(t(),a("div",w,"v"+i(e.version),1)):l("",!0)])]),e.controls.length?(t(),a("div",z,[(t(!0),a(u,null,C(e.controls,(s,d)=>(t(),a(u,{key:d},[s?(t(),a("span",{key:0,class:r(s.class),onClick:j=>v({index:d,key:s.key,record:s})},i(s.label),11,F)):l("",!0)],64))),128))])):l("",!0)]))}};export{G as _};