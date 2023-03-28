import {NextApiHandler} from "next";
import {siweServer} from "@/utils/siweServer";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
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
                    const chain = await prisma.chain.delete({
                        where: {
                            id: req.body.id
                        },
                    })
                    res.status(201).json(chain);
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
