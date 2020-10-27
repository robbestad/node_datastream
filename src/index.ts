import * as JSONStream from "JSONStream";
import * as es from "event-stream";
import * as fs from "fs";
import * as path from "path";

const parser = async () => {
  let file = path.resolve(__dirname, "../data.json");
  let stream = fs
    .createReadStream(file)
    .pipe(JSONStream.parse("*"))
    .pipe(
      es.map(async(data: any, callback: Function) => {
        let out:any = data.userId < 10 ? data : null;
        callback(null, out);
        debugger;
      })
    );
    stream.on("error", (data: any) => console.log("->error: ",data))
    stream.on("data", (data: any) => data && console.log("->",(data)))
    stream.on("finish", () => console.log("stream done"));
    return stream;
};

parser();
