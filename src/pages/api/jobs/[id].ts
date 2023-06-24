import {NextApiHandler} from "next";
import {siweServer} from "@/utils/siweServer";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    const {id} = req.query;
    switch (req.method) {
        case 'GET':
            const {address} = await siweServer.getSession(req, res);
            const user = await prisma.user.findFirst({
                where: {
                    address
                }
            })
            if (user) {
                const jobs = await prisma.job.findFirst({
                    where: {
                        userId: user.id,
                        id: Number(id as string),
                    },
                    include: {
                        ecosystem: true,
                        network: true,
                    }
                });
                res.status(200).json(jobs);
            } else {
                res.status(200).json([]);
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
