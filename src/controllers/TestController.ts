import {Controller, GET} from "fastify-decorators";
import S from "fluent-json-schema";
import {FastifyReply, FastifyRequest} from "fastify";
import FirstRoute from "../routes/FirstRoute";

@Controller('/test')
export default class TestController{

    @GET('/first', {
        schema: {
        }
    })
    public handlerFirst = async(req: FastifyRequest, reply: FastifyReply) => new FirstRoute().run(req, reply);

}