var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/optionsForServerSide";
import Link from "next/link";
export default function Home() {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield getServerSession(authOptions);
        return (<section className="container flex flex-col items-center justify-center min-h-screen">
      {(session === null || session === void 0 ? void 0 : session.user) ? (<>
          <p>Welcome, <span className="font-bold underline">{session === null || session === void 0 ? void 0 : session.user.username}</span>!</p>
          <Link href='components' className="font-bold bg-blue-700 p-2 rounded-lg mt-2 hover:underline">
            Check the Components
          </Link>
        </>) : (<>
          <span>
            If you are not registered, you can
            <Link href='register' className="font-bold bg-blue-700 p-2 rounded-lg mt-2 inline-block mx-1 hover:underline">
              Register
            </Link>.
          </span>
          <span>
            <Link href='sign-in' className="font-bold bg-blue-700 p-2 rounded-lg mt-2 inline-block mx-1 hover:underline">
              Sign in
            </Link>
            if you have an account .
          </span>
        </>)}
    </section>);
    });
}
