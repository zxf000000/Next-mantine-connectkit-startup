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
                    const ecosystem = await prisma.ecosystem.create({
                        data: {
                            name: req.body.name,
                            logo: req.body.logo,
                            homepage: req.body.homepage,
                            chain_id: req.body.chain_id,
                            category_id: req.body.category_id,
                            is_ico: req.body.is_ico,
                            twitter_fans: req.body.twitter_fans,
                            description: req.body.description,
                            financing: req.body.financing,
                            suggestion: req.body.suggestion,
                            user_id: user.id
                        }
                    })
                    res.status(200).json(ecosystem);
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
