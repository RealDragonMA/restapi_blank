import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import Main from "../Main";

export default function authorizedOnly(): (req: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => any {

    return async (req: FastifyRequest, reply: FastifyReply) => {

        const {authorization: authHeader} = req.headers;

        if(!authHeader) return reply.unauthorized('Not authorized !');

        try {
            const payload = Main.getWebServer().getServer().jwt.verify(authHeader)
        } catch (e) {
            reply.forbidden((<Error>e).message);
        }

    }
}