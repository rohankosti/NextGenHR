import Register from "../Model/Register.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    const user = await Register.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (password === user.password) {
      return res.status(200).json(user);
    }
    return res.status(401).json({ message: "Invalid Password" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { login };
