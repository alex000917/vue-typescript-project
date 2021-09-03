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

router.get('/getMyWorkPolicies', function(req, res, next) {
  res.send(new jsonReader().getFile('getMyWorkPolicies.json'))
})

router.get('/getMyWorkPolicy', function(req, res, next) {
  res.send(new jsonReader().getFile('getMyWorkPolicy.json'))
})

// POST http://localhost/myWork/saveMyWorkPolicies

router.get('/getMyWorkCalendars', function(req, res, next) {
  res.send(new jsonReader().getFile('getMyWorkCalendars.json'))
})

// POST http://localhost/myWork/saveMyWorkCalendars
module.exports = router
