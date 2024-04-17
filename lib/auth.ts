import db from "./db";

export const createUser = async (data: { name: string; email: string }) => {
  const { email, name } = data;
  const user = await db.user.create({
    data: {
      email,
      name,
    },
    select: {
      id: true,
    },
  });
  return user;
};

export const isEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !user;
};
export const findUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};
