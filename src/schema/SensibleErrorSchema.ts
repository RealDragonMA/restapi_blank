import S from "fluent-json-schema";
import { FastifyReply } from "fastify";

export default (description: string) =>
    S.object()
        .prop("statusCode", S.number().required())
        .prop("error", S.string().required()).description(description)

export function replyError(reply: FastifyReply, statusCode: number, error: string){
    reply.code(statusCode).send({ statusCode, error});
}
