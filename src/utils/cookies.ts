import Cookies from "js-cookie"

// App
const sidebarStatusKey = "sidebar_status"
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = "language"
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) => Cookies.set(languageKey, language)

const sizeKey = "size"
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)

// User
const sessionIdKey = "sessionId"
export const getToken = () => Cookies.get(sessionIdKey)
export const setToken = (token: string) => {
  console.log("current cookie token is " + token)
  Cookies.set(sessionIdKey, token)
}
export const removeToken = () => Cookies.remove(sessionIdKey)
