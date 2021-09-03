import request from "@/utils/request"

export const getMyWorkPolicies = () =>
  request({
    url: "/myWork/getMyWorkPolicies",
    method: "get"
  })

export const getMyWorkCalendars = () =>
  request({
    url: "/myWork/getMyWorkCalendars",
    method: "get"
  })

export const getMyWorkPolicy = (myPolicySystemName: String) =>
  request({
    url: `/myWork/getMyWorkPolicy?myWorkPolicySystemName=${myPolicySystemName}`,
    method: "get"
  })

export const saveMyWorkCalendars = (myWorkCalendars: []) =>
  request({
    url: "/myWork/saveMyWorkCalendars",
    method: "post",
    params: myWorkCalendars
  })

export const saveMyWorkPolicies = (myWorkPolicies: []) =>
  request({
    url: "/myWork/saveMyWorkPolicies",
    method: "post",
    params: myWorkPolicies
  })
