var jwt = require("jsonwebtoken");

function checkJWTToken(req, res, next) {
  if (req.headers.token) {
    var token = req.headers.token;
    jwt.verify(token, "secretKey", function (error, data) {
      if (error) {
        res.send({ message: "Invalid Token" });
        next();
      } else {
        req.username = data.username;
        req.password = data.password;
        next();
      }
    });
  } else {
    res.send({ message: "No token attached to the request" });
  }
}

function changePasswordVerification(req, res, next) {
  if (
    req.body.newPassword == req.body.confirmPassword &&
    req.body.newPassword.length >= 6
  ) {
    req.newUserpassword = req.body.newPassword;
    next();
  } else if (req.body.newPassword.length < 6) {
    res.send({
      message: "The new password needs to be longer than six charaters.",
    });
    next();
  } else {
    res.send({
      message: "Conformation Password and New Password does not match.",
    });
    next();
  }
}

module.exports = {
  checkJWTToken,
  changePasswordVerification,
};
