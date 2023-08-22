import Fastify, {FastifyInstance} from "fastify";
import {bootstrap} from "fastify-decorators";
import {resolve} from "path";
import Main from "../Main";

interface IWebserver {
    port: number;
    middlewares?: IMiddleware[];
}

interface IMiddleware<T = {}> {
    import: any;
    config?: T;
}

export default class Webserver {

    private readonly port: number;
    private readonly server: FastifyInstance;
    private readonly middlewares: IMiddleware[];

    constructor(option: IWebserver) {
        this.port = option.port;
        this.server = Fastify({ logger: true });
        this.middlewares = option.middlewares ?? [];
    }

    public start() {
        return new Promise<void>((success) => {

            this.middlewares.forEach((middleware) => {
                this.server.register(middleware.import, middleware.config);
            });

            this.server.register(bootstrap, {
                // Specify directory with our controllers
                directory: resolve(__dirname, "..", `controllers`),
                // Specify mask to match only our controllers
                mask: /Controller\./,
            });

            this.server.listen({port: this.port, host: '0.0.0.0'}, (err, address) => {
                if (err) throw err;
                Main.getLogger().info("The server was successfully started on : " + address);
                success();
            });
        });
    }

    public addMiddleware<T = {}>(middleware: IMiddleware): this {
        this.middlewares.push(middleware);
        return this;
    }

    public getServer(): FastifyInstance {
        return this.server;
    }

}
