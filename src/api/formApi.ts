
import request from "@/utils/request"

export const getForms = () =>
  request({
    url: "/forms/getForms",
    method: "get"
  })

export const saveForms = (forms: any[]) =>
  request({
    url: "/forms/saveForms",
    method: "post"

  })

export const getFormsApplicationPreferences = () =>
  request({
    url: "/forms/getFormsApplicationPreferences",
    method: "get"
  })
