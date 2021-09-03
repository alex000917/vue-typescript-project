const { json } = require("express")
var express = require("express")
var router = express.Router()
var jsonReader = require("./jsonReader")

router.get("/", function(req, res, next) {
  var routesData = []
  router.stack.forEach(r => {
    routesData.push(r.route.path)
  })
  res.render("index", { title: "Api List", routes: routesData })
})

router.get("/getDialogRoles", function(req, res, next) {
  res.send(new jsonReader().getFile("getDialogRoles.json"))
})

router.get("/getProducts", function(req, res, next) {
  res.send(new jsonReader().getFile("getProducts.json"))
})

router.get("/getApplicationPreferences", function(req, res, next) {
  res.send(new jsonReader().getFile("getApplicationPreferences.json"))
})

// POST http://localhost/main/saveApplicationPreferences', function(req, res, next) {
//  res.send(new jsonReader().getFile('getRecentItems10.json'))
// })

router.get("/getFlexApplicationPreferences", function(req, res, next) {
  res.send(new jsonReader().getFile("getFlexApplicationPreferences.json"))
})

router.get("/getProducts", function(req, res, next) {
  res.send(new jsonReader().getFile("getProducts.json"))
})

// POST http://localhost/main/saveProducts', function(req, res, next) {
//  res.send(new jsonReader().getFile('getRecentItems10.json'))
// })

// router.get('/getEntities', function(req, res, next) {
// var ids = req.body
// res.send(new jsonReader().getFile('getEntities.json'))
// })

router.put("/saveEntities", function(req, res, next) {
  // res.send(new jsonReader().getFile('getRecentItems10.json'))
  var entities = req.body
  res.send("done. recevied " + entities.length)
})

router.get("/getEntity", function(req, res, next) {
  var id = req.query.id
  var path = "getEntity_" + id + ".json"
  res.send(new jsonReader().getFile(path))
})

router.get("/getEntityCategoriesOfEntity", function(req, res, next) {
  res.send(new jsonReader().getFile("getEntityCategoriesOfEntity.json"))
})

router.post("/getEntityDataByQueryString", function(req, res, next) {
  console.log("getting body url " + JSON.stringify(req.body))

  var entityId = req.body.entityId
  var queryString = req.body.queryString
  var pageSize = req.body.pageSize
  res.send(
    new jsonReader().getFile("getEntityDataByQueryString_" + entityId + ".json")
  )
})

router.get("/getForm", function(req, res, next) {
  var id = req.query.formId

  res.send(new jsonReader().getFile("getForm_" + id + ".json"))
})

router.get("/getRecentItems", function(req, res, next) {
  res.send(new jsonReader().getFile("getRecentItems10.json"))
})

router.get("/getWorkflow", function(req, res, next) {
  var id = req.query.workflowId
  res.send(new jsonReader().getFile("getWorkflow+" + id + ".json"))
})

router.get("/getDialogRoles", function(req, res, next) {
  res.send(new jsonReader().getFile("getDialogRoles.json"))
})

// POST http://localhost/main/saveDialogRoles', function(req, res, next) {
//  res.send(new jsonReader().getFile('getRecentItems10.json'))
// })

router.get("/getDisplayLanguages", function(req, res, next) {
  res.send(new jsonReader().getFile("getDisplayLanguages.json"))
})

// router.get('/getEntityDataByQueryString', function(req, res, next) {
//   var entityId = req.query.entityId
//   res.send(
//     new jsonReader().getFile('getEntityDataByQueryString_' + entityId + '.json')
//   )
// })

router.get("/getGeneralApplicationInformation", function(req, res, next) {
  res.send(new jsonReader().getFile("getGeneralApplicationInformation.json"))
})

// POST http://localhost/main/saveGeneralApplicationInformation', function(req, res, next) {
//  res.send(new jsonReader().getFile('getRecentItems10.json'))
// })

router.get("/startImportPreRestart", function(req, res, next) {
  res.send(new jsonReader().getFile("startImportPreRestart.json"))
})

router.get("/startImportPostRestart", function(req, res, next) {
  res.send(new jsonReader().getFile("startImportPostRestart.json"))
})

router.get("/reloadSettings", function(req, res, next) {
  res.send(new jsonReader().getFile("getRecentItems10.json"))
})

router.get("/startExport", function(req, res, next) {
  res.send(new jsonReader().getFile("startExport.json"))
})

let startTime = null
let endTime = null

router.get("/getImportExportStatus", function(req, res, next) {
  let isDone = false
  if (startTime === null) {
    startTime = new Date()
    endTime = startTime
    startTime.setMinutes(startTime.getMinutes() + 2)
  }
  const currentTime = new Date()
  if (endTime <= currentTime) {
    const obj = {
      message: " some log " + currentTime.toTimeString(),
      timeStamp: new Date(),
      messageType: 1,
      done: isDone
    }
    res.send(obj)
  } else {
    startTime = null
    endTime = null
    isDone = true
    const obj = {
      message: " some log " + currentTime.toTimeString(),
      timeStamp: new Date(),
      messageType: 1,
      done: isDone
    }
    res.send(obj)
  }
})

router.get("/importLanguages", function(req, res, next) {
  res.send(new jsonReader().getFile("importLanguages.json"))
})

router.get("/exportLanguages", function(req, res, next) {
  res.send(new jsonReader().getFile("exportLanguages.json"))
})

router.get("/getLongRunningOperationsList", function(req, res, next) {
  res.send(new jsonReader().getFile("getLongRunningOperationsList.json"))
})
module.exports = router
