import "sst/node/config";
declare module "sst/node/config" {
  export interface ConfigTypes {
    APP: string;
    STAGE: string;
  }
}import "sst/node/function";
declare module "sst/node/function" {
  export interface FunctionResources {
    "ExampleLambda": {
      functionName: string;
    }
  }
}