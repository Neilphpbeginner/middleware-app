var express = require("express");
var router = express.Router();
var { checkJWTToken, changePasswordVerification } = require("./middleware");
var jwt = require("jsonwebtoken");

var todos = [
  {
    username: "admin@test.co.za",
    id: 1,
    title: "Implement post route for logging in.",
    completed: true,
  },
  {
    username: "admin@test.co.za",
    id: 2,
    title: "Implement custom middleware to authinticate user..",
    completed: true,
  },
];

var userInformation = {
  username: "admin@test.co.za",
  password: "P@ssw0rd1",
};

router.post("/login", function (req, res) {
  if (
    req.body.username == userInformation.username &&
    req.body.password == userInformation.password
  ) {
    var jwtToken = jwt.sign(
      {
        username: userInformation.username,
        password: userInformation.password,
      },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.send(jwtToken);
  } else {
    res.send({ message: "user not Authenticated" });
  }
});

router.get("/", checkJWTToken, function (req, res) {
  res.send(JSON.stringify(todos));
});

router.put(
  "/changePassword",
  checkJWTToken,
  changePasswordVerification,
  function (req, res) {
    userInformation.password = req.newUserpassword;
    res.send({
      message: "Password Successfully changed",
      newPassword: userInformation.password,
    });
  }
);

module.exports = router;
