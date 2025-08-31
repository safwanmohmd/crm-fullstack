import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    return res.status(400).json({ message: 'username , password are required' })
  }

  const userExist = await userModel.findOne({ name })
  if (userExist) {
    return res.status(409).json({ message: "username already exist" }) 
  }

  const hashpass = await bcrypt.hash(password, 10)
  const newUser = await userModel.create({ name, password: hashpass })
  res.status(201).json({ message: "created new user", newUser })
}

export const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "username or password are required" })
  }

  const userExist = await userModel.findOne({ name });
  if (!userExist) {
    return res.status(404).json({ success: false, message: "user not found" })
  }

  const verifyed = await bcrypt.compare(password, userExist.password)
  if (!verifyed) {
    return res.status(401).json({ success: false, message: "password not match" }) 
  }

  const token = jwt.sign({ userid: userExist._id, name }, process.env.secret)
  res.status(200).json({ success: true, message: "logged in successfully", token })
}
