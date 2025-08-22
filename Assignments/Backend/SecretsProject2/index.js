import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.USER_NAME,
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
db.connect();
console.log(
  process.env.USER_NAME,
  process.env.DATABASE_NAME,
  process.env.DATABASE_PASSWORD
);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) res.render("submit.ejs");
  else res.redirect("/login");
});

app.post("/submit", async (req, res) => {
  const secret = req.body.secret;
  console.log(req.user.id);
  const userId = req.user.id;
  try {
    const result = await db.query(
      "UPDATE users SET secret = $1 where id = $2 RETURNING *",
      [secret, userId]
    );
    res.render("secrets.ejs", { secret: result.rows[0].secret || null });
  } catch (err) {
    console.log(err);
  }
});

app.get("/secrets", async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const result = await db.query("SELECT secret FROM users WHERE id = $1", [
      userId,
    ]);
    const userSecret = result.rows[0]?.secret || null;
    res.render("secrets.ejs", { secret: userSecret });
  } else res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) console.log(err);
            else res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            res.render("secrets.ejs", { secret: user.secret || null });
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  new Strategy(async function verify(username, password, done) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedhashedPassword = user.password;
        bcrypt.compare(password, storedhashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return done(err);
          } else {
            if (valid) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        });
      } else {
        return done("User not found");
      }
    } catch (err) {
      console.error("Error in passport strategy:", err);
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
