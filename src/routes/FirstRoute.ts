import AbstractRoute from "./AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";
import {replyError} from "../schema/SensibleErrorSchema";
import {replySuccess} from "../schema/SensibleSuccessSchema";

export default class FirstRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const {myProp} = <{myProp: string}>req.body;

        if(myProp === "error"){
            replyError(reply, { statusCode: 400, error: 'You pass an error (error test) !' });
            return;
        }

        replySuccess(reply, { statusCode: 200, success: "It's a success !", data: {myProp}});

    }

}