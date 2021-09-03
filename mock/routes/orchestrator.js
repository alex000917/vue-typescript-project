var express = require('express')
var router = express.Router()
var jsonReader = require('./jsonReader')
router.get('/', function(req, res, next) {
  var routesData = []
  router.stack.forEach(r => {
    routesData.push(r.route.path)
  })
  res.render('index', { title: 'Api List', routes: routesData })
})

router.get('/getOrchestrators', function(req, res, next) {
  res.send(new jsonReader().getFile('getOrchestrators.json'))
})

router.get('/getAvailableOrchestratorIlios', function(req, res, next) {
  res.send(new jsonReader().getFile('getAvailableOrchestratorIlios.json'))
})

router.get('/getAvailableOrchestratorOlios', function(req, res, next) {
  res.send(new jsonReader().getFile('getAvailableOrchestratorOlios.json'))
})

// POST http://localhost/orchestrator/saveOrchestrators
module.exports = router
