import Webserver from "./base/Webserver";
import {Logger} from "tslog";

class Main {

    private readonly webserver: Webserver;
    private readonly logger: Logger;

    constructor() {
        this.webserver = new Webserver({ port: 80 });

        this.logger = new Logger({
            displayFilePath: "hidden",
            displayFunctionName: false,
            prefix: ["RAPI |"],
            overwriteConsole: true,
            dateTimeTimezone: "Europe/Paris",
            dateTimePattern: "day/month/year hour:minute:second.millisecond",
        });

    }

    public async start() {
        await this.webserver.start();
    }

    public getWebServer(): Webserver {
        return this.webserver;
    }

    public getLogger(): Logger {
        return this.logger;
    }

}

export default new Main();
