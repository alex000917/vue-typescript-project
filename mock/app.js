var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")
var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var mainRouter = require("./routes/main")
var workflowRouter = require("./routes/workflow")
var formsRouter = require("./routes/forms")
var authRouter = require("./routes/authorization")
var myworkRouter = require("./routes/myWork")
var entitiesRouter = require("./routes/entities")
var bodyParser = require("body-parser")
var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", indexRouter)
app.use("/api/main", mainRouter)
app.use("/api/users", usersRouter)
app.use("/api/entities", entitiesRouter)
app.use("/api/workflow", workflowRouter)
app.use("/api/forms", formsRouter)
app.use("/api/myWork", myworkRouter)
app.use("/api/auth", authRouter)

app.use(bodyParser.json())

process.env.PORT = 9528

app.use(function(req, res, next) {
  console.log("delay 2 seconds.")
  setTimeout(() => {
    next()
  }, 2000)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})
console.log("api server stated on " + process.env.PORT)
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
