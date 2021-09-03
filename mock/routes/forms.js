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

router.get('/getForms', function(req, res, next) {
  res.send(new jsonReader().getFile('getForms.json'))
})

router.get('/getFormsApplicationPreferences', function(req, res, next) {
  res.send(new jsonReader().getFile('getFormsApplicationPreferences.json'))
})

// POST http://localhost/forms/saveForms
module.exports = router
