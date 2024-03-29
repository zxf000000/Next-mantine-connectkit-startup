import { FunctionComponent, ComponentProps } from 'react';
import { SIWEProvider } from 'connectkit';
import type { IncomingMessage, ServerResponse } from 'http';
import { getIronSession, IronSession, IronSessionOptions } from 'iron-session';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { generateNonce, SiweMessage } from 'siwe';
import {PrismaClient} from "@prisma/client";
import {getNonce} from "get-nonce";
const prisma = new PrismaClient();

type NextServerSIWEConfig = {
    session?: Partial<IronSessionOptions>;
};
type NextClientSIWEConfig = {
    apiRoutePrefix: string;
    statement?: string;
};

type NextSIWESession<TSessionData extends Object = {}> = IronSession &
    TSessionData & {
    nonce?: string;
    address?: string;
    chainId?: number;
};

type NextSIWEProviderProps = Omit<
    ComponentProps<typeof SIWEProvider>,
    | 'getNonce'
    | 'createMessage'
    | 'verifyMessage'
    | 'getSession'
    | 'signOut'
    | 'data'
    | 'signIn'
    | 'status'
    | 'resetStatus'
>;

type ConfigureServerSIWEResult<TSessionData extends Object = {}> = {
    apiRouteHandler: NextApiHandler;
    getSession: (
        req: IncomingMessage,
        res: ServerResponse
    ) => Promise<NextSIWESession<TSessionData>>;
};

const getSession = async <TSessionData extends Object = {}>(
    req: IncomingMessage,
    res: any, // ServerResponse<IncomingMessage>,
    sessionConfig: IronSessionOptions
) => {
    const session = (await getIronSession(
        req,
        res,
        sessionConfig
    )) as NextSIWESession<TSessionData>;
    return session;
};

const logoutRoute = async (
    req: NextApiRequest,
    res: NextApiResponse<void>,
    sessionConfig: IronSessionOptions
) => {
    switch (req.method) {
        case 'GET':
            const session = await getSession(req, res, sessionConfig);
            session.destroy();
            res.status(200).end();
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const nonceRoute = async (
    req: NextApiRequest,
    res: NextApiResponse<string>,
    sessionConfig: IronSessionOptions
) => {
    switch (req.method) {
        case 'GET':
            const session = await getSession(req, res, sessionConfig);
            if (!session.nonce) {
                session.nonce = generateNonce();
                await session.save();
            }
            res.send(session.nonce);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const sessionRoute = async (
    req: NextApiRequest,
    res: NextApiResponse<{ address?: string; chainId?: number }>,
    sessionConfig: IronSessionOptions
) => {
    switch (req.method) {
        case 'GET':
            const { address, chainId } = await getSession(req, res, sessionConfig);
            res.send({ address, chainId });
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const verifyRoute = async (
    req: NextApiRequest,
    res: NextApiResponse<void>,
    sessionConfig: IronSessionOptions
) => {
    switch (req.method) {
        case 'POST':
            try {
                const session = await getSession(req, res, sessionConfig);
                const { message, signature } = req.body;
                const siweMessage = new SiweMessage(message);
                // const {data: fields} = await siweMessage.verify({
                //     signature: signature,
                //     domain: req.url,
                //     nonce: siweMessage.nonce,
                // })
                const fields = await siweMessage.validate(signature);
                if (fields.nonce !== session.nonce) {
                    return res.status(422).end('Invalid nonce.');
                }
                session.address = fields.address;
                session.chainId = fields.chainId;
                // Create user
                let user = await prisma.user.findFirst({
                    where: {
                        address: fields.address
                    }
                })
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            address: fields.address,
                        }
                    });
                }
                console.log("user", user);
                await session.save();
                res.status(200).end();
            } catch (error) {
                res.status(400).end(String(error));
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const envVar = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
};

export const configureServerSideSIWE = <TSessionData extends Object = {}>({
                                                                              session: { cookieName, password, cookieOptions, ...otherSessionOptions } = {},
                                                                          }: NextServerSIWEConfig): ConfigureServerSIWEResult<TSessionData> => {
    const sessionConfig: IronSessionOptions = {
        cookieName: cookieName ?? 'connectkit-next-siwe',
        password: password ?? envVar('SESSION_SECRET'),
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
            ...(cookieOptions ?? {}),
        },
        ...otherSessionOptions,
    };

    const apiRouteHandler: NextApiHandler = async (req, res) => {
        if (!(req.query.route instanceof Array)) {
            throw new Error(
                'Catch-all query param `route` not found. SIWE API page should be named `[...route].ts` and within your `pages/api` directory.'
            );
        }

        const route = req.query.route.join('/');
        switch (route) {
            case 'nonce':
                return await nonceRoute(req, res, sessionConfig);
            case 'verify':
                return await verifyRoute(req, res, sessionConfig);
            case 'session':
                return await sessionRoute(req, res, sessionConfig);
            case 'logout':
                return await logoutRoute(req, res, sessionConfig);
            default:
                return res.status(404).end();
        }
    };

    return {
        apiRouteHandler,
        getSession: async (req: IncomingMessage, res: ServerResponse) =>
            await getSession<TSessionData>(req, res, sessionConfig),
    };
};
