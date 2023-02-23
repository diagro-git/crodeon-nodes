const axios = require('axios');
const error = require('./error');
const single = require('./result/single');
const multiple = require('./result/multiple');

module.exports = function(url, node) {
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
        if(Array.isArray(response.data)) {
            multiple(response.data, node);
        } else {
            single(response.data, node);
        }
    })
    .catch(function(response) {
        error(response, node);
    });
}