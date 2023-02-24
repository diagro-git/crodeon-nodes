const axios = require('axios');

module.exports = function(RED) {
    function RelaisReader(config) {
        RED.nodes.createNode(this,config);
        this.api_credentials = RED.nodes.getNode(config.api_credentials);
        this.reporter = RED.nodes.getNode(config.reporter);
        this.relaisOutput = config.relaisOutput;
        var node = this;
        
        node.on('input', function(msg) {
            axios.interceptors.request.use(function (config) {
                node.status({fill:"yellow",shape:"dot",text:'Pending...'});
                return config;
              }, function (error) {
                return Promise.reject(error);
              }
            );
        
            axios.interceptors.response.use(function (response) {
                    node.status({fill:"yellow",shape:"dot",text:'Processing...'});
                    return response;
                }, function (error) {
                    return Promise.reject(error);
                }
            );

            let url = `https://api.crodeon.com/api/v1/getoutputvalue/id/${node.reporter.id}/output/${node.relaisOutput}`;
        
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
                let relaisValue = parseInt(response.data.replaceAll('"', ''));
                //status
                node.status({fill:"green",shape:"dot",text:`value: ${relaisValue}`});
                //send msg to next node.
                node.send([{'payload' : relaisValue}]);
            })
            .catch(function(response) {
                let status = response.hasOwnProperty('code') ? response.code : 'Error unknown!';
                let payload = response.hasOwnProperty('message') ? response.message : 'Error unknown!';

                //node status is error
                node.status({fill:"red", shape:"ring", text:status});

                node.send([{
                    payload: payload,
                    error: response
                }]);
            });
        });
    }
	
    RED.nodes.registerType("relais-reader",RelaisReader);
}