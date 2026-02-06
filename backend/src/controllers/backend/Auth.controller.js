const userModel = require("../../models/Auth");
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.register = async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const data = new userModel({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      Email: request.body.Email,
      password: hashedPassword,
      gender: request.body.gender,
    });

    const result = await data.save();

    response.status(201).send({
      status: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {
    console.error("Register error:", error);

    response.status(400).send({
      status: false,
      message: error.code === 11000
        ? "Email already exists"
        : "Registration failed",
      error_messages: [error.message],
    });
  }
};


exports.login = async (request, response) => {
    try {
        // ✅ Corrected: request used instead of req
        let loginDataCheckEmail = await userModel.findOne({ Email: request.body.Email });

        if (loginDataCheckEmail) {
            let userDbPassword = loginDataCheckEmail.password;

const passwordCheck = await bcrypt.compare(
  request.body.password,
  userDbPassword
);
            if (passwordCheck) {
                let resObj = {
                    status: 1,
                    msg: "Login successful",
                    loginDataCheckEmail
                };
                response.send(resObj);
            } else {
                let resObj = {
                    status: 0,
                    msg: "Invalid password",
                    loginData: null,
                };
                response.send(resObj);
            }
        } else {
            // ✅ This will now properly execute when email is not found
            let resObj = {
                status: 0,
                msg: "Invalid email",
                loginData: null,
            };
            response.send(resObj);
        }
    } catch (error) {
        response.status(500).send({
            status: 0,
            msg: "Server error during login",
            error: error.message,
        });
    }
};
