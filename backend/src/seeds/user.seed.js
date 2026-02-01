import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

// const MONGO_URI = process.env.MONGO_URI;

const seedUsers = [
  {
    email: "alice@test.com",
    fullName: "Alice Johnson",
    password: "123456",
    profilePic: "",
  },
  {
    email: "bob@test.com",
    fullName: "Bob Smith",
    password: "123456",
    profilePic: "",
  },
  {
    email: "carol@test.com",
    fullName: "Carol White",
    password: "123456",
    profilePic: "",
  },
  {
    email: "david@test.com",
    fullName: "David Brown",
    password: "123456",
    profilePic: "",
  },
  {
    email: "emma@test.com",
    fullName: "Emma Wilson",
    password: "123456",
    profilePic: "",
  },
  {
    email: "frank@test.com",
    fullName: "Frank Miller",
    password: "123456",
    profilePic: "",
  },
  {
    email: "grace@test.com",
    fullName: "Grace Lee",
    password: "123456",
    profilePic: "",
  },
  {
    email: "henry@test.com",
    fullName: "Henry Clark",
    password: "123456",
    profilePic: "",
  },
  {
    email: "isla@test.com",
    fullName: "Isla Moore",
    password: "123456",
    profilePic: "",
  },
  {
    email: "jack@test.com",
    fullName: "Jack Taylor",
    password: "123456",
    profilePic: "",
  },
  {
    email: "kate@test.com",
    fullName: "Kate Anderson",
    password: "123456",
    profilePic: "",
  },
  {
    email: "leo@test.com",
    fullName: "Leo Thomas",
    password: "123456",
    profilePic: "",
  },
  {
    email: "mia@test.com",
    fullName: "Mia Harris",
    password: "123456",
    profilePic: "",
  },
  {
    email: "nina@test.com",
    fullName: "Nina Martin",
    password: "123456",
    profilePic: "",
  },
  {
    email: "oliver@test.com",
    fullName: "Oliver Scott",
    password: "123456",
    profilePic: "",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.log("Error seeding database:", error);
  }
};

seedDatabase();
