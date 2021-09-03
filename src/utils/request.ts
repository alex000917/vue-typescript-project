import axios, { AxiosResponse } from "axios"
import { Message, MessageBox } from "element-ui"
import { UserModule } from "@/store/modules/user"
import { EventBus } from "./event-bus"
            
declare module "axios" {
  export type AxiosResponse<T = any> = Promise<T>
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 30000, // half minute
  withCredentials: true // send cookies when cross-domain requests
})
// console.log(service)
// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add user session id header to every request, you can add other custom headers here
    const session = UserModule.token
    // config.headers["Content-Type"]= "application/json;charset=UTF-8"
    if (session && session !== "undefined") {
      config.headers.sessionId = session
    }
    console.log("requesing url " + config.url)
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 200: success
    // code == 501: invalid access token
    // code == 502: already login in other place
    // code == 503: access token expired
    // code == 504: invalid user (user not exist)
    // code == 505: username or password is incorrect
    // You can change this part for your own usage.

    // const res = response.data

    // return res;

    const res = response

    // avoid temprary as json api does n't have stautus code . in response.
    if (res.status !== 200) {
      Message({
        message: res.statusText || "Error",
        type: "error",
        duration: 5 * 1000
      })
      if (res.status === 508 || res.status === 512 || res.status === 514) {
        MessageBox.confirm(
          "Server Side Error",
          "Error",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.statusText || "Error"))
    } else {
      return response.data
    }
  },
  (error) => {
    console.warn("error while requesting api ")
    // suppress message box
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)
export default service
