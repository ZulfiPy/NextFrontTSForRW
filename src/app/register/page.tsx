import RegisterForm from "@/components/RegisterForm";
import { validateRequest } from "@/lib/auth";

const RegisterPage = async () => {
    const { session } = await validateRequest();

    return (
        <section className="container flex flex-col items-center justify-center min-h-screen">
            {!session ?
                <RegisterForm /> :
                <p>
                    You are signed in, this page is only available for non-authenticated users!
                </p>
            }
        </section>
    )
}

export default RegisterPage;