import { IronSession, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = async () => {
  const session = await getIronSession<{ id?: number }>(cookies(), {
    cookieName: "iron-session",
    password: "wwMp29Vy4KMWnswEc2WLJ6wHXpkMqHmVVLqPPaN4bUfH5q",
  });
  return session;
};
export const saveSession = async (
  session: IronSession<{
    id?: number;
  }>,
  id: number
) => {
  session.id = id;
  await session.save();
};
