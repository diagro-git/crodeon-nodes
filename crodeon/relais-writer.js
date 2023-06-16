const axios = require('axios');

module.exports = function(RED) {
    function CrodeonRelaisWriter(config) {
        RED.nodes.createNode(this,config);
        this.api_credentials = RED.nodes.getNode(config.api_credentials);
        this.reporter = RED.nodes.getNode(config.reporter);
        this.relaisOutput = config.relaisOutput;
        var node = this;
        
        node.on('input', function(msg, send, done) {
            if(msg.payload != 1 && msg.payload != 0) {
                node.status({fill:"red", shape:"ring", text: RED._('relaisWriter.bad_payload')});
                node.send([msg]);
                return;
            }

            axios.interceptors.request.use(function (config) {
                if(node.id === config.env.node_id) {
                    node.status({fill:"blue",shape:"dot",text:RED._('crodeonRelaisWriter.pending')});
                }
                return config;
              }, function (error) {
                return Promise.reject(error);
              }
            );
        
            axios.interceptors.response.use(function (response) {
                    if(node.id === response.config.env.node_id) {
                        node.status({fill:"blue",shape:"dot",text:RED._('crodeonRelaisWriter.processing')});
                    }
                    return response;
                }, function (error) {
                    return Promise.reject(error);
                }
            );

            let url = `https://api.crodeon.com/api/v1/setoutputvalue/id/${node.reporter.id}/output/${node.relaisOutput}/value/${msg.payload}`;
        
            axios.get(url, {
                headers: {
                    "User-Agent": "node-red",
                    "Content-Type": "application/json",
                    "X-API-KEY": node.api_credentials.api_key
                },
                auth: {
                    username: node.api_credentials.username,
                    password: node.api_credentials.password
                },
                env: {
                    node_id: node.id
                }
            })
            .then(function(response) {
                //status
                node.status({fill:"green",shape:"dot",text:`${RED._('crodeonRelaisWriter.value')}: ${relaisValue}`});
                //send msg to next node.
                send([msg]);
                done();
            })
            .catch(function(response) {
                let status = response.hasOwnProperty('code') ? response.code : RED._('crodeonRelaisWriter.error_unknown');
                let payload = response.hasOwnProperty('message') ? response.message : RED._('crodeonRelaisWriter.error_unknown');

                //node status is error
                node.status({fill:"red", shape:"ring", text:status});

                done([{
                    payload: payload,
                    error: response
                }]);
            });
        });
    }
	
    RED.nodes.registerType("crodeon-relais-writer",CrodeonRelaisWriter);
}