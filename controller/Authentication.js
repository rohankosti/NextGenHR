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



//   // 🔐 JWT CREATE
//   const token = jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   // 🍪 COOKIE SET
//   res.cookie("token", token, {
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24,
//   });

//   res.status(200).json({
//     message: "Login Successful",
//     user,
//   });

// } catch (err) {
//   res.status(500).json({ msg: "Server Error" });
// }