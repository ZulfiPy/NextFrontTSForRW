import { NextApiRequest, NextApiResponse } from "next";
import auth from "./options";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET' || req.method === 'POST') {
        return await auth(req, res);
    }

    res.status(405).end();
}

export { handler as GET, handler as POST }