const  db  = require("../../sequelizeConnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();
const User = db.user;
const generateOTP = () => {
  return Math.floor(Math.random() * 99999).toString();
};

exports.sendOtp = async (req, resp) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });

    if (user) {
      return resp.status(409).json({
        success:false,
        message : "User Already Exists"
      });
    } else {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "holidaywaale@gmail.com",
          pass: process.env.mail_pass,
        },
      });

      const _otp = generateOTP();
      const info = await transporter.sendMail({
        from: "holidaywaale@gmail.com",
        to: email,
        subject: "OTP verification",
        text: _otp,
        html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f4f4f4; text-align: center; padding: 20px;">
          <img src="../../assets/images/logo.png" alt="Logo" style="max-width: 100px;">
          <h3>HolidayWaale</h3>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
         
          <p style="font-size: 16px; line-height: 1.6;">Dear User,</p>
          <p style="font-size: 16px; line-height: 1.6;">Here is your  OTP:</p>
          <p style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px;">${_otp}</p>
          <p style="font-size: 16px; line-height: 1.6;">Please use this OTP to complete your action.</p>
        </div>
        <div style="background-color: #f4f4f4; text-align: center; padding: 10px; margin-top: 15px; border-radius: 5px;">
          <p style="font-size: 12px; color: #666666; margin: 0;">This is an automated message, please do not reply.</p>
        </div>
      </div>`,
      });

      const name = Math.random().toString(36).substring(2, 10);
      const password = Math.random().toString(36).substring(2, 11);

      // Create user record in database
      user = await User.create({
        email: email,
        OTP: _otp,
        name: name,
        password: password,
        avatar: {
          public_id: "demo_id",
          url: "demo_url",
        },
      });

      resp.status(200).json({
        success:true,
        data:user.email
      });
    }
  } catch (error) {
    console.error(error);
    return resp.status(400).json({ error: "Error" });
  }
};

exports.resendOtp = async (req, resp) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });

    if (!user) {
      return resp.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    const _otp = generateOTP();
    user.OTP = _otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "holidaywaale@gmail.com",
        pass: process.env.mail_pass,
      },
    });

    const info = await transporter.sendMail({
      from: "holidaywaale@gmail.com",
      to: email,
      subject: "Resent OTP",
      text: _otp,
      html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f4f4f4; text-align: center; padding: 20px;">
        <img src="../../assets/images/logo.png" alt="Logo" style="max-width: 100px;">
        <h3>HolidayWaale</h3>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333333; margin-bottom: 15px;">Resent OTP</h2>
        <p style="font-size: 16px; line-height: 1.6;">Dear User,</p>
        <p style="font-size: 16px; line-height: 1.6;">Here is your Resent OTP:</p>
        <p style="font-size: 24px; font-weight: bold; color: #333333; margin-bottom: 20px;">${_otp}</p>
        <p style="font-size: 16px; line-height: 1.6;">Please use this OTP to complete your action.</p>
      </div>
      <div style="background-color: #f4f4f4; text-align: center; padding: 10px; margin-top: 15px; border-radius: 5px;">
        <p style="font-size: 12px; color: #666666; margin: 0;">This is an automated message, please do not reply.</p>
      </div>
    </div>`,
    });

    resp.status(200).json(user.email);
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error: "Internal Server Error" });
  }
};

exports.userRegistration = async (req, resp) => {
  const { name, otp, password, email } = req.body;
  try {
    let user = await User.findOne({ where: { email: email } });

    if (!user) {
      return resp.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    if (user.OTP !== otp) {
      return resp.status(403).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const currentTime = new Date();
    const otpTime = new Date(user.createdAt);
    const timeDifference = (currentTime - otpTime) / 1000;

    if (timeDifference > 300) {
      return resp.status(410).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const result = await User.update(
      {
        name: name,
        password: hashpassword,
        OTP: "",
      },
      {
        where: { email: email },
      }
    );

    const token = jwt.sign({ userId: user.id }, process.env.secret_key, {
      expiresIn: "48h",
    });
    resp.cookie("jwt", token, { httpOnly: true, secure: true });

    user = await User.findOne({ where: { email: email } });

    return resp.status(200).json({
      success: true,
      message: "User profile created successfully",
      userData: user,
    });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({
      success: false,
      message: "Error while saving user",
    });
  }
};

exports.userLogin = async (req, resp) => {
  const { email, password } = req.body;
  try {
    let existingUser = await User.findOne({ where: { email: email } });

    if (!existingUser) {
      return resp.status(404).json({
        success: false,
        message: "User not registered yet",
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return resp.status(403).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.secret_key,
      { expiresIn: "48h" }
    );
    resp.cookie("jwt", token, { httpOnly: true, secure: true });

    existingUser = await User.findOne({ where: { email: email } });

    return resp.status(200).json({
      success: true,
      message: "Login success",
      userData: existingUser,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return resp.status(500).json({
      success: false,
      message: "Failed to login. Please try again later.",error,
    });
  }
};

exports.userLogout = (req, resp) => {
  resp.clearCookie("jwt");
  resp.cookie("jwt", null, { expires: new Date(Date.now()), httpOnly: true });
  resp.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
