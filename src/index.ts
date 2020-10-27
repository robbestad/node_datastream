import * as JSONStream from "JSONStream";
import * as es from "event-stream";
import * as fs from "fs";
import * as path from "path";

const parser = async () => {
    let file = path.resolve(__dirname, "../data.json");
    let inspect = require("util").inspect;
    return fs
        .createReadStream(file)
        .pipe(JSONStream.parse("*"))
        .pipe(es.map(function (data: any, cb: Function) {
            cb(null
                , (data.userId === 5 ? inspect(data) : ""));
        }))
        .pipe(process.stdout);
};

parser()
