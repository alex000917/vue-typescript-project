var express = require("express")
var router = express.Router()

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource")
})

router.post("/login", function(req, res, next) {
  // res.send({ code: 200, data: { sessionId: "12345678912345" } })
  res.send("00000000000000000000000000000000")
})
router.post("/info", function(req, res, next) {
  res.send({

    id: 0,
    username: "admin",
    password: "any",
    name: "Dev Admin",
    avatar: "avatarurl.gif",
    introduction: "I am a super administrator",
    email: "admin@test.com",
    phone: "1234567890",
    roles: ["admin", "administrator"]

  })
})
module.exports = router
