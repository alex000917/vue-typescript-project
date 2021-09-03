import request from "@/utils/request"

export const getMyWorkPolicies = () =>
  request({
    url: "/workflow/getMyWorkPolicies",
    method: "get"
  })

export const getWorkflows = () =>
  request({
    url: "/workflow/getWorkflows",
    method: "get"
  })

export const getWorkflow = (workflowId: string) =>
  request({
    url: `/workflow/getWorkflow?workflowId=${workflowId}`,
    method: "get"
  })

export const saveWorkflows = (workflows: []) =>
  request({
    url: "/workflow/saveWorkflows",
    method: "post",
    params: workflows
  })
export const getIconsInFolder = () =>
  request({
    url: "/workflow/getIconsInFolder",
    method: "get"
  })
export const getWorkflowsByEntityId = (entityId: string) =>
  request({
    url: "/workflow/getWorkflowsByEntityId",
    method: "get",
    params: entityId
  })
