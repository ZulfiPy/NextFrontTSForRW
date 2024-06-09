var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { providers } from "./providers";
import jwt from "jsonwebtoken";
export const authOptions = {
    providers,
    callbacks: {
        signIn(_a) {
            return __awaiter(this, arguments, void 0, function* ({ user, account, credentials }) {
                return true;
            });
        },
        jwt(_a) {
            return __awaiter(this, arguments, void 0, function* ({ token, user, session }) {
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
                    };
                }
                const currentDate = (new Date()).toISOString();
                const tokenExpDate = token.expiresAt;
                if (currentDate > tokenExpDate) {
                    console.log('old token creating new token');
                    const newIatUnix = Math.floor(Date.now() / 1000);
                    const newExpUnix = Math.floor(Date.now() / 1000) + (60 * 60 * 4);
                    token.iat = newIatUnix;
                    token.exp = newExpUnix;
                    token.expiresAt = new Date(newExpUnix * 1000);
                }
                return token;
            });
        },
        session(_a) {
            return __awaiter(this, arguments, void 0, function* ({ session, token }) {
                if ((session === null || session === void 0 ? void 0 : session.user) && token.user) {
                    session.user = token.user;
                }
                return session;
            });
        },
        redirect(_a) {
            return __awaiter(this, arguments, void 0, function* ({ baseUrl }) {
                return baseUrl;
            });
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 4
    },
    jwt: {
        maxAge: 60 * 60 * 4,
        encode: (_a) => __awaiter(void 0, [_a], void 0, function* ({ token, secret }) {
            if (token) {
                const newToken = jwt.sign(token, secret, { algorithm: 'HS256' });
                return newToken;
            }
            else {
                throw new Error('Token is undefined, cannot encode undefined token');
            }
        }),
        decode: (_b) => __awaiter(void 0, [_b], void 0, function* ({ token, secret }) {
            if (token) {
                const decoded = jwt.decode(token);
                return decoded;
            }
            else {
                throw new Error('Token is undefined, cannot decode undefined token.');
            }
        })
    },
};
