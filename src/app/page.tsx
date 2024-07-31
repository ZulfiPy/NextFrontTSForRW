import Link from "next/link";
import { validateRequest } from "@/lib/auth";

export default async function Home() {
  const { session, user } = await validateRequest();

  return (
    <section className="container flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <p>Welcome, <span className="font-bold underline">{user?.username}</span>!</p>
          <Link href='components'
            className="font-bold bg-blue-700 p-2 rounded-lg mt-2 hover:underline"
          >
            Check the Components
          </Link>
        </>
      ) : (
        <>
          <span>
            If you are not registered, you can
            <Link
              href='register'
              className="font-bold bg-blue-700 p-2 rounded-lg mt-2 inline-block mx-1 hover:underline"
            >
              Register
            </Link>!
          </span>
          <span>
            <Link
              href='sign-in'
              className="font-bold bg-blue-700 p-2 rounded-lg mt-2 inline-block mx-1 hover:underline">
              Sign In
            </Link>
            if you have an account .
          </span>
        </>
      )}
    </section>
  );
}
