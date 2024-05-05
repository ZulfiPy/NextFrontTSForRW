import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { providers } from "./providers";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers,
        callbacks: {
            async signIn({ user, account, credentials }) {
                return true;
            },
            async jwt({ token, user, session }) {
                if (user) {
                    const expUnix = Math.floor(Date.now() / 1000) + (60 * 60 * 4);
                    token = {
                        "user": {
                            name: `${user.firstName} ${user.lastName}`,
                            username: user.username,
                            id: token.sub,
                            roles: user.roles,
                        },
                        expiresAt: new Date(expUnix * 1000),
                        exp: expUnix
                    }
                }

                const currentDate = (new Date()).toISOString();
                const tokenExpDate = token.expiresAt as string;

                if (currentDate > tokenExpDate) {
                    console.log('old token creating new token');
                    const newIatUnix = Math.floor(Date.now() / 1000);
                    const newExpUnix = Math.floor(Date.now() / 1000) + (60 * 60 * 4);
                    token.iat = newIatUnix;
                    token.exp = newExpUnix;
                    token.expiresAt = new Date(newExpUnix * 1000);
                }
                return token
            },
            async session({ session, token }) {
                if (session?.user && token.user) {
                    session.user = token.user;
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
                    const decoded = jwt.decode(token);
                    return decoded as JWT;
                } else {
                    throw new Error('Token is undefined, cannot decode undefined token.');
                }
            }
        },
    })
}