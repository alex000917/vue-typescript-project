import request from "@/utils/request"

export const getOrchestrators = () =>
  request({
    url: "/orchestrator/getOrchestrators",
    method: "get"

  })
export const saveOrchestrators = (orchestrators: []) =>
  request({
    url: "/orchestrator/saveOrchestrators",
    method: "post",
    params: orchestrators

  })

export const getAvailableOrchestratorIlios = () =>
  request({
    url: "/orchestrator/getAvailableOrchestratorIlios",
    method: "get"

  })

export const getAvailableOrchestratorOlios = () =>
  request({
    url: "/orchestrator/getAvailableOrchestratorOlios",
    method: "get"

  })
