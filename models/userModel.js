const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { createTokenforUser } = require("../middlewares/auth");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const hashtoValidate = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");
    if (hashtoValidate !== user.password) {
      throw new Error("Password is incorrect");
    }
    const token = createTokenforUser(user);

    if (!token) {
      throw new Error("Something went wrong");
    }
    return token;
  }
);

const User = model("blogUser", userSchema);

module.exports = User;
