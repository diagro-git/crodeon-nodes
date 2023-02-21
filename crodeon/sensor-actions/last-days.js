var axios = require('axios');

module.exports = function(RED, node, msg) {
    let lastDays = node.lastDays;
    if(node.lastDaysType === 'msg') {
        lastDays = msg[lastDays];
    }
    const url = `https://api.crodeon.com/api/v1/datadays/id/${node.reporter.id}/days/${lastDays}`;

    axios.interceptors.request.use(function (config) {
        node.status({fill:"yellow",shape:"dot",text:'Bezig...'});
        return config;
      }, function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(function (response) {
        node.status({fill:"yellow",shape:"dot",text:'Verwerken...'});
        return response;
        }, function (error) {
        return Promise.reject(error);
        }
    );

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
        const results = response.data;
        const msgs = [];
        for(let i = 0 ; i < node.sensors.length ; i++) {
            msgs[i] = [];
        }
        //error output
        msgs.push(null);

        results.forEach(function(result) {
            const dt = new Date(`${result['Date']}T${result['Time']}.000Z`);
            for(let i = 0 ; i < node.sensors.length ; i++) {
                if(result.hasOwnProperty(node.sensors[i].name)) {
                    msgs[i].push({
                        sensor: node.sensors[i].name,
                        payload: result[node.sensors[i].name],
                        crodeonId: result['ID'],
                        datetime: dt
                    });
                } else {
                    msgs[i].push(null);
                }
            }
        });

        //status
        node.status({fill:"green",shape:"dot",text:`Results: ${results.length}`});
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
            msgs[i] = [];
        }
        msgs.push({
            payload: payload,
            error: error
        });

        //send msg to next node.
        node.send(msgs);
    });
}