const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const cors = require("cors");
const app = express();
const secretKey = "secretkey";

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Veer$1907@",
  database: "banking_management",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/", (req, resp) => {
  resp.json({
    message: "a simple api",
  });
});

app.post("/login", (req, resp) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return resp.status(500).json({ error: err });
    }

    if (results.length > 0) {
      const user = results[0];
      jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
        if (err) {
          return resp.status(500).json({ error: err });
        }
        console.log("Login Successful");
        resp.json({ token });
      });
    } else {
      resp.status(401).json({ message: "Invalid credentials" });
    }
  });
});

app.post("/register", (req, resp) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return resp.status(400).json({ message: "All fields are required" });
  }

  // Check if the username already exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      return resp.status(500).json({ error: err });
    }

    if (results.length > 0) {
      return resp.status(409).json({ message: "User already exists" });
    }

    // If username does not exist, proceed with registration
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, result) => {
      if (err) {
        return resp.status(500).json({ message: "User not registered successfully" });
      }
      resp.json({ message: "Signup Successful" });
    });
    console.log("User registered");
  });
});

// // Protected route example
// app.get("/profile", verifyToken, (req, resp) => {
//   jwt.verify(req.token, secretKey, (err, authData) => {
//     if (err) {
//       return resp.status(403).json({ message: "Invalid token" });
//     } else {
//       resp.json({
//         message: "Profile accessed",
//         authData,
//       });
//     }
//   });
// });

function verifyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    resp.status(403).json({
      message: "Token is not valid",
    });
  }
}

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
