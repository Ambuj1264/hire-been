const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../model/user");

const userController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      const user = await User.findOne({ email });

      if (user) {

        return res.json({ message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({ name, email, password: hashPassword });
      const result = await newUser.save();

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createUserByrole: async (req, res) => {
    try {
      const {role} = req.params;
      console.log(role.trim(),"========roledata=======")
     // Use && instead of || for the invalid role check
     if (role !== "admin" && role !== "seller") {
      return res.status(400).json({ message: "Invalid role" });
    }
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      const user = await User.findOne({ email });

      if (user) {
        return res.json({ message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({ name, email, password: hashPassword , role});
      const result = await newUser.save();

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllUser: (req, res) => {
    User.find()
      .then((result) => res.json(result))
      .catch((err) => res.status(400).send(err));
  },
  getUserById: (req, res) => {
    User.findById(req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(400).send(err));
  },
  getUserByRole: async (req, res) => {
    try {
      const role = req.params.role;

      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }

      if (role !== "admin" && role !== "buyer" && role !== "seller") {
        return res.status(400).json({ message: "Invalid role" });
      }

      User.find({ role: req.params.role }, { password: 0 })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const userId = req.params.id;
      const { role } = req.body;

      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }

      if (role !== "admin" && role !== "buyer" && role !== "seller") {
        return res.status(400).json({ message: "Invalid role" });
      }

      User.findByIdAndUpdate(userId, { role }, { new: true })
        .then((result) => res.json(result))
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;

