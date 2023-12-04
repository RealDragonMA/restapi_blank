import Fastify, {FastifyInstance} from "fastify";
import {bootstrap} from "fastify-decorators";
import {resolve} from "path";
import {Logger} from "tslog";
import {IMiddleware, IWebServer} from "./interfaces/IAPI";
import MongoManager from "./MongoManager";

export default class WebServer {

    private readonly options: IWebServer;
    private readonly logger: Logger;

    private readonly server: FastifyInstance;
    private mongoManager?: MongoManager;

    constructor(option: IWebServer, logger: Logger) {
        this.options = option;
        this.server = Fastify({ logger: true });
        this.logger = logger;
    }

    public async start(): Promise<void> {
        this.registerMiddlewares();
        this.registerControllers();
        this.listen();
        if (this.options.mongo && !this.options.mongo.enable) {
            this.mongoManager = new MongoManager(this.options.mongo, this.logger);
            await this.mongoManager.connect();
        }
    }

    public registerMiddlewares(): void {
        this.options.fastify.middlewares?.forEach((middleware) => this.server.register(middleware.import, middleware.config));
    }

    public registerControllers(): void {
        this.server.register(bootstrap, {
            directory: resolve(__dirname, "..", "src", this.options.fastify.options.controllers.directory),
            mask: this.options.fastify.options.controllers.mask,
        });
    }

    public listen(): void {
        this.server.listen({port: this.options.fastify.port ?? 80, host: this.options.fastify.host ?? '0.0.0.0'}, (err, address) => {
            if (err) throw err;
            this.logger.info("The server was successfully started on : " + address);
        });
    }

    public get(): FastifyInstance {
        return this.server;
    }

    public getMongoManager(): MongoManager | undefined {
        return this.mongoManager;
    }

    public getSocket(){
        //@ts-ignore
        return this.server.io;
    }

}
