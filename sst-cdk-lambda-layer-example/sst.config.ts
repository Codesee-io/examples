import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack"

export default {
  config(_input) {
    return {
      name: "my-sst-app",
      region: "us-east-2",
    };
  },
  stacks(app) {
    app.stack(ExampleStack)
  },
} satisfies SSTConfig;
