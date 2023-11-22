import {FastifyReply, FastifyRequest} from "fastify";
import ReapiReply from "../base/ReapiReply";

export default abstract class AbstractRoute {
    public abstract run(req: FastifyRequest, reply: FastifyReply | ReapiReply): Promise<string | Record<string, any> | any[]>;
}
