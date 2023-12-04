import mongoose, {connect, Connection, MongooseOptions} from "mongoose";
import {Logger} from "tslog";
import {IMongoManager} from "./interfaces/IAPI";

export default class MongoManager {

    private readonly options: IMongoManager;
    private readonly logger: Logger;

    private mongo?: Connection;

    constructor(options: IMongoManager, logger: Logger) {
        this.logger = logger;
        this.options = options;
    }


    public async connect() {
        try {
            for (const key in this.options.options) {
                mongoose.set(key as keyof MongooseOptions, this.options.options[key as keyof MongooseOptions]);
            }
            this.mongo = (await connect(this.options.uri)).connection
            if (this.options.database) this.mongo?.useDb(this.options.database)
            this.logger.info("Successfully connected to MongoDB !");
        } catch (error) {
            throw new Error("Cannot connect to MongoDB: " + error);
        }
    }

    public getMongo() {
        return this.mongo;
    }

}