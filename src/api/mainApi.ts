import { ApplicationPreference } from "@/models/ApplicationPreference"
import { BaseContent } from "@/models/BaseContent"
import { Entity } from "@/models/Entity"
import { SDData } from "@/models/SdData"
import request from "@/utils/request"

export const getFlexApplicationPreferences = () =>
  request({
    url: "/main/getFlexApplicationPreferences",
    method: "get"
  })

export const getEntityById = (entityId: string) =>
  request({
    url: `/main/getEntity?id=${entityId}`,
    method: "get"
  })

export const getEntities = (ids: string[]) =>
  request({
    url: "/main/getEntities",
    method: "get",
    params: ids
  })

export const getForm = (formId: string) =>
  request({
    url: `/main/getForm?formId=${formId}`,
    method: "get"
  })

// export const getEntityDataByQueryString = (entityId: string, queryString: string, pageSize: number) =>{
export const getEntityDataByQueryString = (data: any) =>
  // const data = { 'entityId': entityId, 'queryString': queryString, 'pageSize': pageSize }
  request({
    url: "/main/getEntityDataByQueryString",
    method: "post",
    data
  })

export const getApplicationPreferences = () =>
  request({
    url: "/main/getApplicationPreferences",
    method: "get"
  })

export const saveApplicationPreferences = (
  applicationPreferences: ApplicationPreference[]
) =>
  request({
    url: "/main/saveApplicationPreferences",
    method: "post",
    data: applicationPreferences
  })

export const saveEntities = (entities: Entity[]) =>
  request({
    url: "/main/saveEntities",
    method: "post",
    data: entities
  })

export const getEntityCategoriesOfEntity = (entityId: string) =>
  request({
    url: `/main/getEntityCategoriesOfEntity?entityId=${entityId}`,
    method: "get"
  })

export const getDisplayLanguages = () =>
  request({
    url: "/main/getDisplayLanguages",
    method: "get"
  })

export const getDialogRoles = () =>
  request({
    url: "/main/getDialogRoles",
    method: "get"
  })

// export const saveDialogRoles = (roles: DialogRole[]) =>
export const saveDialogRoles = (roles: any[]) =>
  request({
    url: "/main/saveDialogRoles",
    method: "post",
    data: roles
  })

export const getProducts = () =>
  request({
    url: "/main/getProducts",
    method: "get"
  })

export const saveProducts = (ProductsView: any[]) =>
  request({
    url: "/main/saveProducts",
    method: "post",
    data: ProductsView
  })

export const getRecentItems = (size: number) =>
  request({
    url: `/main/getRecentItems?size=${size}`,
    method: "get"
  })

// export const getGeneralApplicationInformation = (obj: BaseGeneralApplicationInformationRequest) =>
export const getGeneralApplicationInformation = (data: any) =>
  request({
    url: "/main/getGeneralApplicationInformation",
    method: "get",
    params: data
  })

// export const saveGeneralApplicationInformation = (infos: BaseGeneralApplicationInformationRequest[]) =>
export const saveGeneralApplicationInformation = (infos: any[]) =>
  request({
    url: "/main/saveGeneralApplicationInformation",
    method: "post",
    data: infos
  })

export const cloneBaseContentObject = (baseContent: BaseContent) =>
  request({
    url: "/main/cloneBaseContentObject",
    method: "post",
    data: baseContent
  })

export const startImportPreRestart = (backupConfiguration: boolean) =>
  request({
    url: "/main/startImportPreRestart", // `/main/startImportPreRestart?backupConfiguration=${backupConfiguration}`,
    method: "get",
    params: {backupConfiguration:backupConfiguration}
  })

export const startImportPostRestart = (
  importEnvironmentApplicationPreferences: boolean
) =>
  request({
    url: "/main/startImportPostRestart",
    method: "get",
    params: {importEnvironmentApplicationPreferences:importEnvironmentApplicationPreferences}
  })

export const reloadSettings = () =>
  request({
    url: "/main/reloadSettings",
    method: "get"
  })

export const startExport = (exportEnvironmentApplicationPreferences: boolean) =>
  request({
    url: `/main/startExport?exportEnvironmentApplicationPreferences=${exportEnvironmentApplicationPreferences}`,
    method: "get"
  })

export const getImportExportStatus = () =>
  request({
    url: "/main/getImportExportStatus",
    method: "get"
  })

// export const validateOperationDependency = (baseContent: BaseContent, baseContentUID: string, dependentOperationType: number, dirtyData: SDData) =>
export const validateOperationDependency = (
  baseContent: BaseContent,
  baseContentUID: string,
  dependentOperationType: number,
  dirtyData: SDData
) =>
  request({
    url: "/main/validateOperationDependency",
    method: "get",
    params: {
      baseContent: baseContent,
      baseContentUID: baseContentUID,
      dependentOperationType: dependentOperationType,
      dirtyData: dirtyData
    }
  })
// export const importLanguages = (fileName: string, fileContent: ByteArray) =>
export const importLanguages = (fileName: string, fileContent: any) =>
  request({
    url: "/main/importLanguages",
    method: "get",
    params: { fileName: fileName, fileContent: fileContent }
  })

export const exportLanguages = (
  exportSolutionOnly: boolean,
  exportOnlyMissing: boolean
) =>
  request({
    url: "/main/exportLanguages",
    method: "post",
    data: {
      exportSolutionOnly: exportSolutionOnly,
      exportOnlyMissing: exportOnlyMissing
    }
  })

export const getLongRunningOperationsList = (
  rows: number,
  orderBy: string,
  type: string,
  from: number,
  to: number
) =>
  request({
    url: "/main/getLongRunningOperationsList",
    method: "get",
    params: { rows: rows, orderBy: orderBy, type: type, from: from, to: to }
  })
  export const getWorkflow = (workflowId: string) =>
  request({
    url: `/main/getWorkflow?workflowId=${workflowId}`,
    method: "get"
  })