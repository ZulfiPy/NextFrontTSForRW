var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        authorize(credentials, req) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!credentials)
                    return null;
                const { username, password } = credentials;
                try {
                    yield connectDB();
                    const user = yield User.findOne({ username });
                    if (!user)
                        return null;
                    const comparedPwd = yield bcrypt.compare(password, user.password);
                    if (!comparedPwd)
                        return null;
                    return user;
                }
                catch (error) {
                    console.log('error occurred while logging in', error);
                    return null;
                }
            });
        }
    })
];
