var t=e=>{let r=e.request.headers["x-forwarded-for"]||e.request.headers["x-real-ip"]||e.request.ip||e.request?.connection?.remoteAddress||e.request?.socket?.remoteAddress||e.request?.connection?.socket?.remoteAddress||"";r&&(r=r.replace("::ffff:",""));let s=r?r.split(/\s*,\s*/):[];return s=s.slice(-2),s[0]||""};export{t as default};