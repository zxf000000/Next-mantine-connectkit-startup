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
                    const account = await prisma.socialAccout.update({
                        where: {
                          id: req.body.id
                        },
                        data: {
                            fp_number: req.body.fp_number,
                            phone: req.body.phone,
                            country: req.body.country,
                            password: req.body.password,
                            gmail: req.body.gmail,
                            verifier: req.body.verifier,
                            assist_email: req.body.assist_email,
                            twitter: req.body.twitter,
                            discord_token: req.body.discord_token,
                            username: req.body.username,
                            ip: req.body.ip,
                        }
                    })
                    res.status(200).json(account);
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
