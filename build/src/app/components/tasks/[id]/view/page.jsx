'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import ViewTaskCard from "@/components/ViewTaskCard";
import { getOneTask } from "@/lib/backendRequests";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ViewOneTaskPage = ({ params }) => {
    const { id } = params;
    const [task, setTask] = useState();
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        function fetchOneTask() {
            return __awaiter(this, void 0, void 0, function* () {
                if (session === null || session === void 0 ? void 0 : session.user) {
                    const username = session.user.username;
                    const response = yield getOneTask(id, username);
                    if (response.status === 200 && response.data) {
                        setTask(response.data);
                        setLoading(false);
                    }
                }
            });
        }
        fetchOneTask();
    }, [id, session]);
    return (<section className="container flex flex-col items-center justify-center min-h-screen">
            {loading ?
            (<Spinner loading={loading}/>) : (task && <ViewTaskCard task={task}/>)}
            <Button type="button" className="mt-6 font-bold" onClick={() => router.back()}>
                Go back
            </Button>
        </section>);
};
export default ViewOneTaskPage;
