import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/optionsForServerSide";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="container flex flex-col items-center justify-center min-h-screen">
      {session?.user ? (
        <>
          Welcome, {session?.user.username}!
          <Link href='components'
            className="bg-blue-700 p-2 rounded-lg mt-2"
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
              className="bg-blue-700 p-2 rounded-lg mt-2 inline-block mx-1"
            >
              Register
            </Link>.
          </span>
          <span>
            <Link
              href='sign-in'
              className="bg-blue-700 p-2 rounded-lg mt-2 inline-block mx-1">
              Sign in
            </Link>
            if you have an account .
          </span>
        </>
      )}
    </section>
  );
}
