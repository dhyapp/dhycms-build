import{ae as m,f as l,o as k,j as d,a6 as p,V as a,W as n,u as v,k as y,G as _,a0 as b,ab as B}from"./vue-DoSrNxHp.js";const T={key:1},E={__name:"admin-form-action-bar",props:{showBack:{type:Boolean,default:!0}},setup(i){const f=m(),r=l(!1),c=l(null);let e;const s=()=>{const t=e.scrollTop,o=c.value.offsetTop;r.value=t>=o};return k(()=>{e=document.querySelector(".main"),s(),e.addEventListener("scroll",s)}),d(()=>{e&&e.removeEventListener("scroll",s)}),(t,o)=>{const u=p("MIcon");return a(),n("div",{ref_key:"stickyRef",ref:c,class:B(["admin-form-action-bar f ac jb",{isSticky:r.value}])},[i.showBack?(a(),n("button",{key:0,class:"go-back",onClick:o[0]||(o[0]=S=>v(f).back())},[y(u,{name:"left",size:"small"}),_("返回")])):(a(),n("div",T)),b(t.$slots,"default")],2)}}};export{E as _};
