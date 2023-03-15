import S from "fluent-json-schema";
import {FastifyReply} from "fastify";

export interface ISensibleErrorSchema {
    statusCode: number;
    error: string;
    messages?: {
        lang: string;
        message: string
    }[]
}

export default () =>
    S.object()
        .prop("statusCode", S.number().required())
        .prop("error", S.string().required())
        .prop("messages", S.array().items(
            S.object()
                .prop("lang", S.string().required())
                .prop("message", S.string().required())
        ))

/**
 * Send an error response
 * @param reply - The reply of your route
 * @param sensibleError - The options of your error
 */
export function replyError(reply: FastifyReply, sensibleError: ISensibleErrorSchema){
    reply.code(sensibleError.statusCode).send(sensibleError);
}
