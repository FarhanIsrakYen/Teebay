import prisma from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../configs/config.js";

const prismaClient = new prisma.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authController = {
  register: async (_, { email, password, firstName, lastName, address, phone }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        salt,
        firstName,
        lastName,
        address,
        phone
      },
    });

    return "User registered successfully!";
  },

  login: async (_, { email, password }) => {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    return jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: "1d" });
  },
};
