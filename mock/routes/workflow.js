var express = require('express')
var router = express.Router()
var jsonReader = require('./jsonReader')

router.get('/getWorkflows', function(req, res, next) {
  res.send(new jsonReader().getFile('getWorkflows.json'))
})

router.get('/saveWorkflows', function(req, res, next) {
  res.send(new jsonReader().getFile('saveWorkflows.json'))
})

router.get('/getIconsInFolder', function(req, res, next) {
  res.send(new jsonReader().getFile('getIconsInFolder.json'))
})

router.get('/getWorkflowsByEntityId', function(req, res, next) {
  res.send(new jsonReader().getFile('getWorkflowsByEntityId.json'))
})
module.exports = router
