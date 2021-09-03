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

router.get('/getAuthorizableEntities', function(req, res, next) {
  res.send(new jsonReader().getFile('getAuthorizableEntities.json'))
})

router.get('/getAuthorizationTree', function(req, res, next) {
  res.send(new jsonReader().getFile('getAuthorizationTree.json'))
})

// POST http://localhost/auth/saveAuthorizationTrees
module.exports = router
