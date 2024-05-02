import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/MongoDbConn";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
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
    ],
    callbacks: {
        async signIn({ user, account, credentials }) {
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.roles = user.roles;
                token.name = `${user.firstName} ${user.lastName}`;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            const user = await User.findOne({ email: session.user?.email });
            if (session?.user) {
                session.user.id = user._id.toString();
                session.user.username = user.username;
                session.user.name = `${user.firstName} ${user.lastName}`;
                session.user.roles = user.roles;
            }
            return session;
        },
        async redirect({ baseUrl }) {
            return baseUrl;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 4
    },
    jwt: {
        maxAge: 60 * 60 * 4,
        encode: async ({ token, secret }) => {
            if (token) {
                const newToken = jwt.sign(token, secret, { algorithm: 'HS256' });
                return newToken;
            } else {
                throw new Error('Token is undefined, cannot encode undefined token');
            }
        },
        decode: async ({ token, secret }) => {
            if (token) {
                const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
                return decoded as JWT;
            } else {
                throw new Error('Token is undefined, cannot decode undefined token.');
            }
        }
    },
}