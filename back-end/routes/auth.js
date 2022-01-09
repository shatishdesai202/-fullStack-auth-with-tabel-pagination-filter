const routes = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");
const data = require("../data/mock-data");

const { loginValidation } = require("../validationSchema/login");
const { signupValidation } = require("../validationSchema/signup");

routes.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check email is exist or not
  const emailExist = await userModel.findOne({ email: email });
  if (emailExist) {
    return res.status(422).send("user already exist");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(1);
  const hashedpassword = await bcrypt.hash(password, salt);

  const saveUser = await new userModel({
    firstName,
    lastName,
    email,
    password: hashedpassword,
  });

  await saveUser.save((err, Person) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("success");
    }
  });
});

routes.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  let findUser = await userModel.findOne({ email: req.body.email });

  if (!findUser) {
    return res.status(401).send("Email Not Found");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    findUser.password
  );
  if (!validPassword) {
    return res.status(401).send("username or password are wrong!");
  }

  const token = jwt.sign({ _id: findUser._id }, "shatish_desai");
  res
    .header("auth-token", token)
    .status(200)
    .send({ token: token, userDetail: findUser });
});

routes.get("/mock-data", async (req, res) => {
  res.status(200).send(data);
});

module.exports = routes;
