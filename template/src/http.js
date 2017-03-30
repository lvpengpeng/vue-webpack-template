import axios from 'axios'
import qs from 'qs'


// 允许跨域情况下携带cookie
axios.defaults.withCredentials = true
// 设置超时时间
axios.defaults.timeout = 100000


function onSuccess(response) {
  if (response.data.code === '200') {
    return response.data.data
  }
  throw Error(response.data.message)
}


export default {
  /**
   *
   */
  post(url, params) {
    return axios.post(url, params).then(onSuccess)
  },

  /**
   *
   */
  get(url, params = {}) {
    params._t = Date.now()
    return axios.get(url, { params }).then(onSuccess)
  },
}
