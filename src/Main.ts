import {Logger} from "tslog";
import WebServer from "../api/WebServer";

class Main {

    private readonly webserver: WebServer;
    private readonly logger: Logger;

    constructor() {

        this.logger = new Logger({
            displayFilePath: "hidden",
            displayFunctionName: false,
            prefix: ["RAPI |"],
            overwriteConsole: true,
            dateTimeTimezone: "Europe/Paris",
            dateTimePattern: "day/month/year hour:minute:second.millisecond",
        });

        this.webserver = new WebServer({
            fastify: {
                port: 80,
                middlewares: [
                    {
                        import: import("@fastify/cors"),
                        config: {
                            origin: "*",
                        },
                    },{
                        import: import('fastify-socket.io'),
                        config: {
                            cors: {
                                origin: "*",
                                credentials: true
                            }
                        }
                    },
                ],
                options: {
                    controllers: {
                        directory: "./controllers",
                        mask: /\.Controller\./,
                    },
                }
            },
            mongo: {
                uri: "xxx",
                database: "skiclub",
                options: {
                    strictQuery: true
                }
            }
        }, this.logger);


    }

    public async start() {
        await this.webserver.start();
    }

    public getWebServer(): WebServer {
        return this.webserver;
    }

    public getLogger(): Logger {
        return this.logger;
    }

}

export default new Main();
