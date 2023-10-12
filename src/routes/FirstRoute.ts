import AbstractRoute from "./AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";

export default class FirstRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const {myProp} = <{ myProp: string }>req.body;

        if (myProp === "error") {
            reply.code(400).send({statusCode: 400, error: 'You pass an error (error test) !'});
            return;
        }

        reply.code(200).send({statusCode: 200, success: "It's a success !", data: {myProp}});

    }

}