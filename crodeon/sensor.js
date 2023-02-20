var latest = require('./sensor-actions/latest');
var sinceId = require('./sensor-actions/since-id');

module.exports = function(RED) {
    function CrodeonSensor(config) {
        RED.nodes.createNode(this,config);
        this.api_credentials = RED.nodes.getNode(config.api_credentials);
        this.reporter = RED.nodes.getNode(config.reporter);
        this.sensors = config.sensors;
        this.action = config.action;
        this.sinceId = config.sinceId;
        var node = this;
        
        node.on('input', function(msg) {
            if(node.action === 'latest') {
                latest(RED, node, msg);
            } else if(node.action === 'sinceId') {
                sinceId(RED, node, msg);
            }
        });
    }
	
    RED.nodes.registerType("sensor",CrodeonSensor);
}