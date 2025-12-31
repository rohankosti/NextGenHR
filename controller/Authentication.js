import User from "../Model/User.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // console.log(user);

    if (!user) {
      res.status(404).json({ msg: "User Not Found" });
    }
    
    if (password !== user.password) {
      res.status(401).json({ msg: "Invalid Password" });
    }

    req.session.user = {
      userdata:user
    };
    res.status(200).json({ message: "Login Sucsesfull", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { login };
