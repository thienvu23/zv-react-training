const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

const jwt = require("./jwt");

const port = process.env.PORT || 9000;
const router = express.Router();
const routerAuth = express.Router();

const authMiddleware = require("./authMiddleware");

const users = [
  {
    fullName: "John Doe",
    email: "john@doe.com",
    password: "zigvy123",
    id: "fb3111f1-ea6e-11e9-ba42-2368758065ba",
    role: "Admin",
  },
  {
    fullName: "John Smith",
    email: "john@smith.com",
    password: "zigvy123",
    id: "781f9a70-ea6e-11e9-a9a5-4d422b2ea8f4",
    role: "User",
  },
  {
    fullName: "John Thien",
    email: "john@thien.com",
    password: "zigvy123",
    id: "781f9a70-ea6e-11e9-a9a5-4d422b2ea8f5",
    role: "User",
  },
  {
    fullName: "John Quoc",
    email: "john@quoc.com",
    password: "zigvy123",
    id: "781f9a70-ea6e-11e9-a9a5-4d422b2ea8f6",
    role: "User",
  },
];

app.use(cors());

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    res.status(400).json({
      error: "Incorrect password or email",
    });
  }

  const payload = {
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    id: user.id,
  };

  try {
    const token = await jwt.signToken(payload);
    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unexpected error",
    });
  }
});

routerAuth.get("/users/my", function (req, res) {
  const currentUser = req.user;
  const userId = req.user.id;
  const user = users.find(({ id }) => id === userId);
  res.json(user);
});

routerAuth.get("/users", function (req, res) {
  const currentUser = req.user;
  if (currentUser.role !== "Admin") {
    res.status(403).json({
      error: "You have not permission to perform this action",
    });
    return;
  }
  res.json({
    users,
  });
});

app.use("/", router);

app.use("/api", authMiddleware, routerAuth);

app.listen(port);
console.log("Server running on port " + port);
