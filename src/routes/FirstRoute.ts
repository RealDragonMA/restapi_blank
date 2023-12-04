import AbstractRoute from "../../api/abstract/AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";

export default class FirstRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

    }

}