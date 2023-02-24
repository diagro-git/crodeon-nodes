const axios = require('axios');
const error = require('./error');
const single = require('./result/single');
const multiple = require('./result/multiple');

module.exports = function(url, node, RED) {
    axios.interceptors.request.use(function (config) {
        if(node.id === config.env.node_id) {
            node.status({fill:"yellow",shape:"dot",text: RED._('sensor.pending')});
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(function (response) {
            if(node.id === response.config.env.node_id) {
                node.status({fill:"yellow",shape:"dot",text: RED._('sensor.processing')});
            }
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
        },
        env: {
            node_id: node.id
        }
    })
    .then(function(response) {
        if(Array.isArray(response.data)) {
            multiple(response.data, node, RED);
        } else {
            single(response.data, node, RED);
        }
    })
    .catch(function(response) {
        error(response, node, RED);
    });
}