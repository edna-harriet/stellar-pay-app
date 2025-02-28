// const User = require("../models/User");
// const argon2 = require('argon2');

// module.exports.signup_get = (req, res) => {
//   res.render("signup");
// };
// module.exports.login_get = (req, res) => {
//   res.render("login");
// };
// module.exports.signup_post = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password,
//     });
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("error, user not created");
//   }
// };

// module.exports.login_post = (req, res) => {
//   const { email, password } = req.body;

//   console.log(email,password);
//   res.send("user login");
// };
const User = require("../models/User");
const argon2 = require("argon2");

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

// module.exports.signup_post = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body; // Removed phoneNumber

//   try {
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password,
//     });

//     res.status(201).json({ message: "User created successfully!", user });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(400).json({ error: "User creation failed!" });
//   }
// };

module.exports.signup_post = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; // Remove phoneNumber

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err); // Log actual error
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports.login_post = (req, res) => {
  const { email, password } = req.body;

  console.log("Login Attempt:", email, password);
  res.send("User login");
};
