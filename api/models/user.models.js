import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture:{
    type:String,
    default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Download.png"
  }
}, { timestamps: true });

const User = model("User", userSchema);

export default User;
