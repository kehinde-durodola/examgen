import { create, findByEmail } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (
  email: string,
  password: string,
  name?: string
) => {
  const existingUser = await findByEmail(email);

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const user = await create({
    email,
    password: hashedPassword,
    name,
  });

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      tokensRemaining: user.tokensRemaining,
      tokensLastRefreshed: user.tokensLastRefreshed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};

export const login = async (email: string, password: string) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      tokensRemaining: user.tokensRemaining,
      tokensLastRefreshed: user.tokensLastRefreshed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};
