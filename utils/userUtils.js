import prisma from "./database.js";
import bcrypt from "bcrypt";

const findUser = async ({ email, username }) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        { username: username }
      ]
    }
  });
};

const forgetPassword = async ({ email, encryptedPassword }) => {

  return await prisma.user.update({
    where: {
      email
    },
    data: {
      password: encryptedPassword
    }
  })
}

const login = async ({ email, password }) => {

  const findEmail = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!findEmail) {
    throw new Error("Email Not found")
  }

  let comparedPass = bcrypt.compareSync(password, findEmail.password)

  if (!comparedPass) {
    throw new Error("Password is wrong.")
  }

  return findEmail;

}

const register = async ({ data }) => {
  return await prisma.user.create({
    data
  })

}

const getUser = async ({ id }) => {
  return await prisma.user.findFirst({
    where: {
      id
    },
    include: {
      bid: true,
      notification: true
    }
  })
}

export default {
  forgetPassword,
  login,
  findUser,
  register,
  getUser,
}