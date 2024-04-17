import db from "@/lib/db";
import { getSession } from "@/lib/session";
const getUser = async () => {
  "use server";
  const id = (await getSession()).id;
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  return user;
};
export default async function Home() {
  const user = await getUser();
  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <p>Your email is : {user?.email}</p>
    </div>
  );
}
