import tracer from 'dd-trace';
tracer.init();
tracer.use("http", {});
import { datadog } from 'datadog-lambda-js';

// submit a custom span named "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
});

const ddHandler = async (event) => {
    // submit a custom span
    const sandwich = tracer.trace('hello.world', () => {
        console.log('Hello, World!');
    });

    await sleep(100);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from example Lambda!')
    };
    return response;
};

export const handler = datadog(ddHandler);
