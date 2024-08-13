import { r as request } from "../entry-server.js";
import { q as query2str } from "./common-ZcIx5rAG.js";
const useRESTFullAPI = ({ baseurl }) => {
  return {
    /**
     * 添加单个数据
     * @param {object,array} body 
     * @param {function} error 自定义错误回调
     * @returns {response}
     */
    add: ({ body, error }) => {
      return request(baseurl, {
        method: "POST",
        body: JSON.stringify(body),
        error
      });
    },
    /**
     * 获取单个数据
     * @param {ObjectId,string,number} id
     * @param {object} query
     * @param {function} error 自定义错误回调
     * @returns {response}
     */
    get: ({ id = 0, query = {}, error }) => {
      return request(`${baseurl}/${id}?${query2str(query)}`, {
        error
      });
    },
    /**
     * 获取列表数据
     * @param {object} query
     * @param {function} error 自定义错误回调
     * @returns {response}
     */
    list: ({ query = {} } = {}, error) => {
      return request(`${baseurl}/list?${query2str(query)}`, {
        error
      });
    },
    /**
     * 更新单个或多个数据
     * @param {ObjectId,string,number} id
     * @param {object} query
     * @param {object} body 更新数据
     * @param {array} ids [id1,id2,id3...]传入时表示批量更新
     * @param {string} fieldby 表示对应的ids字段名，默认为_id
     * @param {function} error 自定义错误回调
     * @returns {response}
     */
    update: ({ id = 0, query = {}, body, ids, fieldby, error }) => {
      return request(`${baseurl}/${id}?${query2str(query)}`, {
        method: "PUT",
        body: JSON.stringify({ ...body, ids, fieldby }),
        error
      });
    },
    /**
     * 更新单个或多个数据
     * @param {ObjectId,string,number} id
     * @param {object} query
     * @param {object} body 筛选数据
     * @param {array} ids [id1,id2,id3...]传入时表示批量更新
     * @param {string} fieldby 表示对应的ids字段名，默认为_id
     * @param {function} error 自定义错误回调
     * @returns {response}
     */
    del: ({ id = 0, query = {}, body, ids, fieldby, error }) => {
      return request(`${baseurl}/${id}?${query2str(query)}`, {
        method: "DELETE",
        body: JSON.stringify({ ...body, ids, fieldby }),
        error
      });
    }
  };
};
const setting = useRESTFullAPI({
  baseurl: "/api/v1/admin/setting"
});
const menu = useRESTFullAPI({
  baseurl: "/api/v1/admin/menu"
});
const user = useRESTFullAPI({
  baseurl: "/api/v1/admin/user"
});
const post = useRESTFullAPI({
  baseurl: "/api/v1/admin/post"
});
const cloud = useRESTFullAPI({
  baseurl: "/api/v1/admin/cloud"
});
const ad = useRESTFullAPI({
  baseurl: "/api/v1/admin/ad"
});
const nav = useRESTFullAPI({
  baseurl: "/api/v1/admin/nav"
});
const selfreg = useRESTFullAPI({
  baseurl: "/api/v1/admin/selfreg"
});
const sites = useRESTFullAPI({
  baseurl: "/api/v1/admin/sites"
});
const blockIps = useRESTFullAPI({
  baseurl: "/api/v1/admin/blockIps"
});
const blockDomain = useRESTFullAPI({
  baseurl: "/api/v1/admin/blockDomain"
});
export {
  ad as a,
  blockIps as b,
  blockDomain as c,
  setting as d,
  cloud as e,
  sites as f,
  menu as m,
  nav as n,
  post as p,
  selfreg as s,
  user as u
};
