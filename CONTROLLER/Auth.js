const User = require("../Model/userModel");
const asyncHandler = require("express-async-handler");
const ganerateToken = require("../Utils/Jwt");
const authMiddleWare = require("../middlewares/authMiddleware")
const ganerateRefreshToken = require("../Utils/refreshToken")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const validateMongoDbId = require("../Utils/validateMongoDBid");
const sendEmail = require("./emailController");


//register a user
const createUser = asyncHandler(async (req, res) => {

  const email = req.body.email;

  const findUser = await User.findOne({ email: email });

  if (!findUser) {

    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {

    throw new Error("User Already Exists");
  }
});
// const createUser = asyncHandler(async (req, res) => {
//   const { firstname, lastname, email, mobile, password } = req.body;
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = bcrypt.hashSync(password, salt);
//   try {
//     const checkmail = await User.findOne({ email });
//     if (!checkmail) {
//       const addUser = await User.create({
//         firstname,
//         lastname,
//         email,
//         mobile,
//         password: hashPassword,
//       });
//       return res
//         .status(201)
//         .json({ messgage: "Successfuly Registered...", addUser });
//     } else {
//       res.status(500).json({ message: "Email already registered.." });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: "Something went wrong.." });
//   }
// });


// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await ganerateRefreshToken(findUser?.id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      id: findUser?.id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: ganerateToken(findUser?.id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error("No refresh token in cookies..")
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("NO Refresh token in DataBase");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");

    }
    const accessToken = ganerateToken(user?._id);
    res.json({ accessToken });
  });
});

//logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh token in cookies..")
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden 
  }
  await User.findOneAndUpdate({refreshToken}, {
    refreshToken: ""
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({message:"LogOut success"});
})

// admin login

// const loginAdmin = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   // check if user exists or not
//   const findAdmin = await User.findOne({ email });
//   if (findAdmin.role !== "admin") throw new Error("Not Authorised");
//   if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
//     const refreshToken = await generateRefreshToken(findAdmin?._id);
//     const updateuser = await User.findByIdAndUpdate(
//       findAdmin.id,
//       {
//         refreshToken: refreshToken,
//       },
//       { new: true }
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       maxAge: 72 * 60 * 60 * 1000,
//     });
//     res.json({
//       _id: findAdmin?._id,
//       firstname: findAdmin?.firstname,
//       lastname: findAdmin?.lastname,
//       email: findAdmin?.email,
//       mobile: findAdmin?.mobile,
//       token: generateToken(findAdmin?._id),
//     });
//   } else {
//     throw new Error("Invalid Credentials");
//   }
// });

//change Password
const updatePassword = asyncHandler(async(req,res) => {
  const { _id } = req.user;
  const {password} = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);

  if(password){
    user.password =password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  }else {
    res.json(user);
  }
});

//forgot password token
const forgotPasswordToken = asyncHandler(async(req,res) => {
  const { email } = req.body;
  const user = await User.findOne({email});
  if(!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Please follow this link to reset your password. This link is valid till 10 minutes from now.
                       <a href='http://localhost:1234/api/users/reset-password/${token}'>Click Here<a/>`

    const data = {
      to : email,
      text : "Hey User",
      subject : "Forgot Password Link",
      htm : resetURL,
    }; 
    sendEmail(data)               ;
    res.json(token)
  } catch (error) {
    throw new Error(error)
  }
})

//reset password 
const resetPassword = asyncHandler(async(req,res) => {
  const { password } = req.body;
  const {token} = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if(!user) throw new Error(" Token Expired. Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
})

module.exports = { createUser, loginUser, handleRefreshToken, logout , updatePassword,forgotPasswordToken, resetPassword};
