<p align="center">
  <img src="https://user-images.githubusercontent.com/6877485/210876437-1ee419a6-64ea-4be9-a715-8014bf4c9039.png" alt="Jeebby" />
</p>

# What is Jeebby?

The name Jeebby doesn't have a meaning. It's just a random name for this project.
But what is Jeebby? It's a tool that let novice IT people to run simple programs on their IOT devices.
The user buys an IOT device, buys sensors but wants to run a custom program. The user has to read manuals, learn tools and languages and then start writting/composing it's little program. This is good for IT minded people, but not the common person.
Jeebby is the tool to deploy and manage the programs the users wants to connect with their IOT. In the background they deploy a Node-RED flow with their own parameters. If they want, they can open their program in Node-RED and extend, modify, debug, ... it.

<p align="center">
  <img src="https://cdn.shopify.com/s/files/1/0515/0765/8911/files/Crodeon_logo.png?v=1662384911&width=500" alt="Crodeon" />
</p>

# What is Crodeon?

Website: <a href="https://www.crodeon.com">www.crodeon.com</a>
Crodeon is a Belgian IOT manufactor. With it's unique device, called Reporter, it's easy to plug-and-play with different sensors. Read more on their website.

# Node-RED nodes

Jeebby developed some Node-RED nodes that use the Crodeon API.

## Sensor
![image](https://user-images.githubusercontent.com/6877485/222129403-ea63ee6c-f201-4b33-a9a1-addaa83be6d1.png)

Read the value(s) of the selected sensor(s). There are 4 ways to read values: last value, since a specific ID, since last date or last days.

## Relais-reader
![image](https://user-images.githubusercontent.com/6877485/222129559-0be3b8d8-8c59-4660-b05c-add6d4aebd5c.png)

Read the value of the selected relais output.

## Relais-writer
![image](https://user-images.githubusercontent.com/6877485/222129699-1ba688c4-541c-4b55-a71c-3b594b841f8c.png)

Writes the value of `msg.payload` to the selected relais output.

## Statusses
When one of the three Crodeon nodes are triggered, it performs a request to the Crodeon API. The state of the request is shown on the node itself.

### Pending/Processing
![image](https://user-images.githubusercontent.com/6877485/222130110-53cb400e-6b31-43ea-aee9-454662cd475b.png)

This tells the user that the node is performing it's request and is processing the response.

### Green status
![image](https://user-images.githubusercontent.com/6877485/222130196-c828fd87-b180-4f96-a288-8b933d99ccc8.png)

When it's green, the Crodeon API was successfull and the result is send to the next node. Depending on what node, a status message is set.

### Red status
![image](https://user-images.githubusercontent.com/6877485/222130433-36bb6517-35ae-401f-afda-cfcf659d3149.png)

The Crodeon API returned an error. The error response is send in the `msg` object.

## Error
Whenever an error occurrs, the `msg` object contains the error message and the error response object from Axios. In below you see what output you can expect from an error response.

![image](https://user-images.githubusercontent.com/6877485/222130981-4e134112-760b-42ce-abd0-2214b9edeae5.png)

```json
{"payload":"Request failed with status code 401","error":{"message":"Request failed with status code 401","name":"AxiosError","stack":"AxiosError: Request failed with status code 401\n    at settle (C:\\Users\\stijn\\.node-red\\node_modules\\axios\\dist\\node\\axios.cjs:1900:12)\n    at IncomingMessage.handleStreamEnd (C:\\Users\\stijn\\.node-red\\node_modules\\axios\\dist\\node\\axios.cjs:2952:11)\n    at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1334:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)","config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"adapter":["xhr","http"],"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{"Blob":null,"node_id":"e3de5d10783c245c"},"headers":{"Accept":"application/json, text/plain, */*","User-Agent":"node-red","Content-Type":"application/json","X-API-KEY":"VcwE6jV9T0ySKB5LZ4xvDEGry5YVtPojH0s6f7mW","Accept-Encoding":"gzip, compress, deflate, br"},"auth":{"username":"demo","password":"Hmbg1W2a0L8Frfzi"},"method":"get","url":"https://api.crodeon.com/api/v1/getoutputvalue/id/1316/output/101"},"code":"ERR_BAD_REQUEST","status":401},"_msgid":"8e9c3721ef7c3297"}
```
