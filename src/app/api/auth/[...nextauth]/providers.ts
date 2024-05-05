import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/MongoDbConn";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const providers = [
    CredentialsProvider({
        credentials: {
            username: {
                label: 'Username',
                type: 'text',
                placeholder: "Enter a username"
            },
            password: {
                label: 'Password',
                type: 'password',
                placeholder: 'Enter your COOL password'
            }
        },
        async authorize(credentials, req) {
            if (!credentials) return null;
            const { username, password } = credentials;
            try {
                await connectDB();
                const user = await User.findOne({ username });

                if (!user) return null;

                const comparedPwd = await bcrypt.compare(password, user.password);
                if (!comparedPwd) return null;

                return user;
            } catch (error) {
                console.log('error occurred while logging in', error);
                return null;
            }
        }
    })
]