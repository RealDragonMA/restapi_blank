import {Controller, POST} from "fastify-decorators";
import S from "fluent-json-schema";
import {FastifyReply, FastifyRequest} from "fastify";
import FirstRoute from "../routes/FirstRoute";

@Controller('/test')
export default class TestController{

    @POST('/first', {
        schema: {
            body: S.object()
                .prop('myProp', S.string().required()),
        }
    })
    public handlerFirst = async(req: FastifyRequest, reply: FastifyReply) => new FirstRoute().run(req, reply);

}