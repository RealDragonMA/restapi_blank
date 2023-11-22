import {FastifyReply} from "fastify";

export interface IReapiResponse {
    statusCode?: number,
    error?: boolean,
    data?: any,
    description: string,
    messages?: {
        lang: string,
        message: string
    }[]
}

export default class ReapiReply {

    private readonly reply: FastifyReply;

    constructor(reply: FastifyReply) {
        this.reply = reply;
    }

    public error(response: string | IReapiResponse){
        this.getFastifyReply()
            .code((<IReapiResponse>response).statusCode ?? 400)
            .send({
                statusCode: (<IReapiResponse>response).statusCode ?? 400,
                error: (<IReapiResponse>response).error ?? true,
                data: (<IReapiResponse>response).data ?? [],
                description: (<IReapiResponse>response).description ?? "An error occurred during the query, error unknown.",
                messages: (<IReapiResponse>response).messages ?? []
            })
    }

    public success(response: string | IReapiResponse){
        this.getFastifyReply()
            .code((<IReapiResponse>response).statusCode ?? 200)
            .send({
                statusCode: (<IReapiResponse>response).statusCode ?? 200,
                error: (<IReapiResponse>response).error ?? true,
                data: (<IReapiResponse>response).data ?? [],
                description: (<IReapiResponse>response).description ?? "The request was successful!",
                messages: (<IReapiResponse>response).messages ?? []
            })
    }

    public getFastifyReply(): FastifyReply {
        return this.reply;
    }


}