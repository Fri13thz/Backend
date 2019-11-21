const user = require("../../models/user");
const profile = require("../../models/profile");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  user
    .findOne()
    .populate({
      path: "profile",
      select: "firstName"
    })
    .select("username")
    .exec((err, resp) => {
      if (err) {
        console.log("err", err);
        res.send(err);
      } else {
        console.log("res", resp);
        res.send(resp);
      }
    });
};

module.exports.signIn = async (req, res) => {
  let data = await user.findOne({
    username: req.body.username,
    password: req.body.password
  });
  jwt.sign({ data }, "Fri13th", { expiresIn: "1440s" }, (err, token) => {
    // console.log('token :', token);
    if (data) {
      res.send({
        status: { code: 1, message: "Login Successful", token: token }
      });
    } else {
      res.send({
        status: { code: 0, message: "Username or Password is Wrong" }
      });
    }
  });
};

module.exports.signUp = (req, res) => {
  let Profile = new profile({
    username: req.body.username,
    password: req.body.password,
    firstName: "",
    lastName: "",
    age: ""
  });
  let User = new user({
    username: req.body.username,
    password: req.body.password,
    profile: Profile.id
  });

  Profile.save();
  User.save();
  // .then(res.status(200).send('saved!!!'))
  jwt.sign({ User }, "Fri13th", { expiresIn: "1440s" }, (err, token) => {
    if (err) {
      res.send({ status: { code: 0, message: "Failed" } });
    }
    res.send({ status: { code: 1, message: "Successful", token: token } });
  });
};
