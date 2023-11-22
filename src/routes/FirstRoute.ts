import AbstractRoute from "./AbstractRoute";
import {FastifyRequest} from "fastify";

import ReapiReply from "../base/ReapiReply";

export default class FirstRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: ReapiReply): Promise<any> => {

    }

}