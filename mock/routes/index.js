var express = require("express")
var router = express.Router()
var jsonReader = require("./jsonReader")

/* GET home page. */
router.get("/", function(req, res, next) {
  var routesData = []
  router.stack.forEach(r => {
    routesData.push(r.route.path)
  })
  res.render("index", { title: "Api List", routes: routesData })
})

// All moved to orignal router files

// router.get('/getEntities', function(req, res, next) {
//   res.send(new jsonReader().getFile('getEntities.json'))
// })

// router.get('/getAuthorizableEntities', function(req, res, next) {
//   res.send(new jsonReader().getFile('getAuthorizableEntities.json'))
// })

// router.get('/getEntityRelationshipIcons', function(req, res, next) {
//   res.send(new jsonReader().getFile('getEntityRelationshipIcons.json'))
// })

// router.get('/getForms', function(req, res, next) {
//   res.send(new jsonReader().getFile('getForms.json'))
// })

// router.get('/getIconsInFolder', function(req, res, next) {
//   res.send(new jsonReader().getFile('getIconsInFolder.json'))
// })

// router.get('/getWorkflows', function(req, res, next) {
//   res.send(new jsonReader().getFile('getWorkflows.json'))
// })

// router.get('/getMyWorkPolicies', function(req, res, next) {
//   res.send(new jsonReader().getFile('getMyWorkPolicies.json'))
// })
// router.get('/getMyWorkCalendars', function(req, res, next) {
//   res.send(new jsonReader().getFile('getMyWorkCalendars.json'))
// })
// router.get('/getEntityRelationshipIcons', function(req, res, next) {
//   res.send(new jsonReader().getFile('getEntityRelationshipIcons.json'))
// })

// router.get('/getFormsApplicationPreferences', function(req, res, next) {
//   res.send(new jsonReader().getFile('getFormsApplicationPreferences.json'))
// })

// router.get('/getOrchestrators', function(req, res, next) {
//   res.send(new jsonReader().getFile('getOrchestrators.json'))
// })

// router.get('/getDisplayLanguages', function(req, res, next) {
//   res.send(new jsonReader().getFile('getDisplayLanguages.json'))
// })

// router.get('/getAvailableOrchestratorIlios', function(req, res, next) {
//   // res.send(new jsonReader().getFile('getProducts.json'));
//   res.send({
//     resp: 'no data for getAvailableOrchestratorIlios'
//   })
// })
// router.get('/getAvailableOrchestratorOlios', function(req, res, next) {
//   res.send({
//     resp: 'no data for getAvailableOrchestratorOlios'
//   })
//   // res.send(new jsonReader().getFile('getProducts.json'));
// })

// router.get('/getEntityDataByQueryString/:entityId', function(req, res, next) {
//   var entity = req.params.entityId
//
//   var path = 'getEntityDataByQueryString_' + entity + '.json'

//   res.send(new jsonReader().getFile(path))
// })
//= (entityId: string, queryString: string, pageSize: number) =>')

module.exports = router
