import{k as f}from"./ant2-F-VMf9eP.js";const u=a=>{let s,e;const t=f();if(["day","week","month","year"].includes(a))s=t.startOf(a).valueOf(),e=t.endOf(a).valueOf();else if(["yesterday","lastweek","lastmonth"].includes(a)){const r=a.replace(/^(last|yester)/,"");s=t.subtract(1,r).startOf(r).valueOf(),e=t.subtract(1,r).endOf(r).valueOf()}else a==="beforeyesterday"?(s=t.subtract(2,"day").startOf("day").valueOf(),e=t.subtract(2,"day").endOf("day").valueOf()):a.endsWith("h")?(e=t.endOf("hour").valueOf(),s=t.subtract(parseInt(a),"h").startOf("hour").valueOf()):a.endsWith("d")&&(e=t.endOf("day").valueOf(),s=t.subtract(parseInt(a),"d").startOf("day").valueOf());return{startAt:s,endAt:e}};export{u as g};