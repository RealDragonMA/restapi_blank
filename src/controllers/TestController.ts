import {Controller, GET} from "fastify-decorators";
import S from "fluent-json-schema";
import {FastifyReply, FastifyRequest} from "fastify";
import FirstRoute from "../routes/FirstRoute";
import ReapiReply from "../base/ReapiReply";

@Controller('/test')
export default class TestController{

    @GET('/first', {
        schema: {
            body: S.object()
                .prop('myProp', S.string().required()),
        }
    })
    public handlerFirst = async(req: FastifyRequest, reply: FastifyReply) => new FirstRoute().run(req, new ReapiReply(reply));

}