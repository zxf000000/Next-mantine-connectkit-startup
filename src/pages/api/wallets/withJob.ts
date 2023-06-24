import {NextApiHandler} from "next";
import {siweServer} from "@/utils/siweServer";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    const {jobId} = req.query;
    switch (req.method) {
        case 'GET':
            const {address} = await siweServer.getSession(req, res);
            const user = await prisma.user.findFirst({
                where: {
                    address
                }
            })
            if (user) {
                const completedWallets = await prisma.job.findUnique({
                    where: {
                        id: Number(jobId)
                    },
                    select: {
                        doneWallets: true,
                    }
                })
                const wallets = await prisma.wallet.findMany({
                    where: {
                        user_id: user?.id,
                    }
                });
                console.log(completedWallets);
                // const result = wallets.map((item) => {
                //     return {...item, complete: completedWallets?.doneWallets.includes({
                //             id: item.id
                //         })}
                // })
                res.status(200).json(wallets);
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
