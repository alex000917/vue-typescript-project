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

router.get("/getEntities", function(req, res, next) {
  res.send(new jsonReader().getFile("getEntities.json"))
})

router.get("/getVirtualEntityProperties", function(req, res, next) {
  var sqlConnectionId = req.body.get("sqlConnectionId")
  var sql = req.body.get("sql")
  res.send(new jsonReader().getFile("getVirtualEntityProperties.json"))
})

router.get("/getEntityRelationshipIcons", function(req, res, next) {
  res.send(new jsonReader().getFile("getEntityRelationshipIcons.json"))
})

router.get("/getReportableEntitiesOrder", function(req, res, next) {
  res.send(new jsonReader().getFile("getReportableEntitiesOrder.json"))
})
module.exports = router
