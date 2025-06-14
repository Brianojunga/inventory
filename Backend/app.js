const express = require("express");
require("dotenv").config();
const session = require("express-session");
const app = express();
const route = require("./routes/routes");
const passport = require("passport");
const pool = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_ORIGINS,
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionStore = new pgSession({
  pool: pool, // Use the existing pool
  tableName: "user_session",
});


app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    },
  }),
);
app.use(passport.session());

app.use("/", route);

app.listen(3000, () => console.log("The server is listening to port 3000"));
