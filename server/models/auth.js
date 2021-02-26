import mongoose from "mongoose";

const signIn = mongoose.Schema({
  username: String,
  password: String,
});

export const signUp = mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

export const SignIn = mongoose.model("SignIn", signIn);
export const SignUp = mongoose.model("SignUp", signUp);
