const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const fileStore = require("session-file-store")(session)
const flash = require("express-flash")
const conn = require("./db/conn")
const app = express()

const port = 3000

// Routes

const authRoutes = require("./routes/authRoutes")
const missionRoutes = require("./routes/missionRoutes.js")

// Controller

const MissionController = require("./controllers/missionController.js")
const authController = require("./controllers/authController")

// Start Engine ( Handlebars ) compiler
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// Start Session 

app.use(session({
    name: "session",
    secret: "C@odinh0",
    resave: true,
    saveUninitialized: true,
    store: new fileStore({
        logFn: function() {},
        path: require("path").join(require("os").tmpdir(), "sessions")
    }),
    cookie:{
        secure: false,
        maxAge: 360000,
        httpOnly: true,
    } 
}))

// Flash Messages

app.use(flash())

// Public Path

app.use(express.static("public"))

// Set Sessions to Web

app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

app.use("/", authRoutes);
app.use("/mission", missionRoutes);

app.get("/", authController.login);

// Connection & Port Listen

conn.sync().then(() => {
    app.listen(3000)
    console.log("conectou no Postgres")
}).catch((err) => {
    console.log("deu ruim ó: ", err)
})