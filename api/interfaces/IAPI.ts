import {MongooseOptions} from "mongoose";

export interface IMongoManager {
    enable?: boolean;
    database?: string;
    uri: string;
    options?: {
        [key in keyof MongooseOptions]?: MongooseOptions[key];
    }
}

export interface IFastifyOptions {
    port?: number,
    host?: string,
    middlewares?: IMiddleware[];
    options: {
        controllers: {
            directory: string;
            mask: RegExp;
        }
    }
}

export interface IWebServer {
    fastify: IFastifyOptions
    mongo?: IMongoManager;
}

export interface IMiddleware<T = {}> {
    import: any;
    config?: T;
}