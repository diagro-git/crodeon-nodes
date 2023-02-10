module.exports = function(RED) {
    function CrodeonReporter(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.id = config.id;
        this.sensors = config.sensors;
    }
	
    RED.nodes.registerType("reporter",CrodeonReporter);
}