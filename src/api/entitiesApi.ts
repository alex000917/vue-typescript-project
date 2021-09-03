import request from "@/utils/request"

export const getEntities = () =>
  request({
    url: "/entities/getEntities",
    method: "get"

  })

export const getVirtualEntityProperties = (sqlConnectionId:string, sql:string) =>
  request({
    url: "/entities/getVirtualEntityProperties",
    method: "post",
    data: ({ sqlConnectionId: sqlConnectionId, sql: sql })
  })

export const getEntityRelationshipIcons = () =>
  request({
    url: "/entities/getEntityRelationshipIcons",
    method: "get"

  })

export const getReportableEntitiesOrder = () =>
  request({
    url: "/entities/getReportableEntitiesOrder",
    method: "get"

  })
