var axios = require('axios');

module.exports = function(RED) {
    function CrodeonSensor(config) {
        RED.nodes.createNode(this,config);
        this.api_credentials = RED.nodes.getNode(config.api_credentials);
        this.reporter = RED.nodes.getNode(config.reporter);
        var node = this;
        
        node.on('input', function(msg) {
            //get the last values
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
                //if response doesn't contain the sensor name, error "unknown sensor"
                const result = response.data;
                const msgs = [];
                const dt = new Date(`${result['Date']}T${result['Time']}.000Z`);
                for(let i = 0 ; i < config.sensors.length ; i++) {
                    if(result.hasOwnProperty(config.sensors[i].name)) {
                        msgs[i] = {
                            sensor: config.sensors[i].name,
                            payload: result[config.sensors[i].name],
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
                for(let i = 0 ; i < config.sensors.length ; i++) {
                    msgs[i] = null;
                }
                msgs.push({
                    payload: payload,
                    error: error
                });

                //send msg to next node.
                node.send(msgs);
            });
        });
    }
	
    RED.nodes.registerType("sensor",CrodeonSensor);
}