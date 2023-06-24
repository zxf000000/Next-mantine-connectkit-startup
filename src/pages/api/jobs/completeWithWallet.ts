import {NextApiHandler} from "next";
import {siweServer} from "@/utils/siweServer";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    const {jobId, walletId} = req.body;
    switch (req.method) {
        case 'POST':
            try {
                const {address} = await siweServer.getSession(req, res);
                const user = await prisma.user.findFirst({
                    where: {
                        address
                    }
                })
                if (user) {
                    const job = await prisma.jobDone.create({
                        data: {
                            walletId: walletId,
                            jobId: jobId,
                        }
                    })
                    res.status(200).json(job);
                } else {
                    res.status(404).end();
                }
            } catch (e) {
                res.status(400).end();
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
