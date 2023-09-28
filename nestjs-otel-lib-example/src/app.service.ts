import { Injectable } from "@nestjs/common";
import { get } from "http";

@Injectable()
export class AppService {
  getIndex(): string {
    // make a sample http get request to codesee.io to see on it on the CodeSee Service Map
    get("http://codesee.io", (res) => {
      res.on("data", (chunk) => {
        console.log(res.statusCode);
      });
      res.on("end", () => {
        console.log("done with http request to codesee.io");
      });
    });

    return "Go to https://app.codesee.io/service-maps Service Map to see traces / visualization!";
  }
}
