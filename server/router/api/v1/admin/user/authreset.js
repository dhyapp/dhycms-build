
export default function(){
  return {
    put: async ctx => {
      const {db} = this.app
      const {common:db_common} = db
      const { ids, body } = ctx.request.body
      await db_common.models.User.updateMany({_id:{$in:ids}}, {
        editabledRoleAuth: body.editabledRoleAuth || [],
        viewabledRoleAuth: body.viewabledRoleAuth || [],
      }).then(res => {
        ctx.body = res.matchedCount ? {ok:1} : {err:1}
      }).catch(e => {
        ctx.body = {err:1, msg:e.message||'权限设置失败'}
      })
    }
  }
}