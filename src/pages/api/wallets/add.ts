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
                    const wallet = prisma.wallet.create({
                        data: {
                            fp_number: req.body.fp_number,
                            address: req.body.address,
                            mnemonic: req.body.mnemonic,
                            p_key: req.body.p_key,
                            user_id: user.id,
                            mm_pwd: req.body.mm_pwd,
                        }
                    })
                    res.status(200).json(wallet);
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
