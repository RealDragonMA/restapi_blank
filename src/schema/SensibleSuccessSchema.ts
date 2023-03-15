import S from "fluent-json-schema";
import {FastifyReply} from "fastify";

export interface ISensibleSuccessSchema {
    statusCode: number;
    success: string;
    data?: any
    messages?: {
        lang: string;
        message: string
    }[]
}

export default () =>
    S.object()
        .prop("statusCode", S.number().required())
        .prop("success", S.string().required())
        .prop("data")
        .prop("messages", S.array().items(
            S.object()
                .prop("lang", S.string().required())
                .prop("message", S.string().required())
        ))

/**
 * Send an error response
 * @param reply - The reply of your route
 * @param sensibleSuccess - The option of your success
 */
export function replySuccess(reply: FastifyReply, sensibleSuccess: ISensibleSuccessSchema){
    reply.code(sensibleSuccess.statusCode).send(sensibleSuccess);
}
