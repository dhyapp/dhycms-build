var s=(e,r="_id")=>{const u=e.state.user[r],d=e.request.query.fieldby||"",i=e.request.query.field||"";e.request.query.fieldby=d?d+",uid":"uid",e.request.query.field=i?i+`,${u}`:u};export{s as default};
