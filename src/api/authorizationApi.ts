import request from "@/utils/request"

export const getAuthorizableEntities = () =>
  request({
    url: "/auth/getAuthorizableEntities",
    method: "get"

  })

export const getAuthorizationTree = (treeId: String) =>
  request({
    url: `/auth/getAuthorizationTree?treeId=${treeId}`,
    method: "get"

  })

export const saveAuthorizationTrees = (authorizationTrees: any[]) =>
  request({
    url: "/auth/saveAuthorizationTrees",
    method: "post",
    data: authorizationTrees
  })
