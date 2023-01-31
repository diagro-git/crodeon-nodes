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
                var result = response.data;
                if(result[config.sensor] !== undefined) {
                    const strDateTime = `${result['Date']}T${result['Time']}.000Z`;
                    msg.payload = result[config.sensor];
                    msg.datetime = new Date(strDateTime);
                    msg.crodeonId = result['ID'];
                    msg.sensorHasValue = true;
                    
                    node.status({fill:"green",shape:"dot",text:`value: ${msg.payload}`});
                } else {
                    node.status({fill:"yellow",shape:"ring",text:`Sensor ${config.sensor} not found.`});
                    msg.payload = `Sensor ${config.sensor} not found.`;
                    msg.sensorHasValue = false;
                }

                //send msg to next node.
                node.send(msg);
            })
            .catch(function(error) {
                const response = error.response;

                //node status is error
                node.status({fill:"red",shape:"ring",text:response});

                //send msg to next node.
                msg.sensorHasValue = false;
                msg.payload = error;
                msg.error = error;
                node.send(msg);
            });
        });
    }
	
    RED.nodes.registerType("sensor",CrodeonSensor);
}