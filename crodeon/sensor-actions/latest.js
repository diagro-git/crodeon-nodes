var axios = require('axios');

module.exports = function(RED, node, msg) {
    const url = `https://api.crodeon.com/api/v1/datalatest/id/${node.reporter.id}`;
    axios.get(url, {
        headers: {
            "User-Agent": "node-red",
            "Content-Type": "application/json",
            "X-API-KEY": node.api_credentials.api_key
        },
        auth: {
            username: node.api_credentials.username,
            password: node.api_credentials.password
        }
    })
    .then(function(response) {
        //node status is ok 
        //msg.payload is value from sensor
        const result = response.data;
        const msgs = [];
        const dt = new Date(`${result['Date']}T${result['Time']}.000Z`);
        for(let i = 0 ; i < node.sensors.length ; i++) {
            if(result.hasOwnProperty(node.sensors[i].name)) {
                msgs[i] = {
                    sensor: node.sensors[i].name,
                    payload: result[node.sensors[i].name],
                    crodeonId: result['ID'],
                    datetime: dt
                };
            } else {
                msgs[i] = null;
            }
        }
        msgs.push(null);

        //status
        node.status({fill:"green",shape:"dot",text:`value: ${result['ID']}`});
        //send msg to next node.
        node.send(msgs);
    })
    .catch(function(error) {
        let status = error.hasOwnProperty('code') ? error.code : 'Error unknown!';
        let payload = error.hasOwnProperty('message') ? error.message : 'Error unknown!';

        //node status is error
        node.status({fill:"red", shape:"ring", text:status});

        //msgs
        const msgs = [];
        for(let i = 0 ; i < node.sensors.length ; i++) {
            msgs[i] = null;
        }
        msgs.push({
            payload: payload,
            error: error
        });

        //send msg to next node.
        node.send(msgs);
    });
}