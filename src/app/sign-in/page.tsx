import SignInForm from "@/components/SignInForm";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";

const SignInPage = async () => {
    const { session } = await validateRequest();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            {!session ?
                <SignInForm /> :
                <>
                    <p>You are signed in.</p>
                    <Link href='components'
                        className="font-bold bg-blue-700 p-2 rounded-lg mt-2 hover:underline"
                    >
                        Check the Components
                    </Link>
                </>
            }

        </section>
    )
}

export default SignInPage;