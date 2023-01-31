module.exports = function(RED) {
    function CrodeonReporter(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.id = config.id;
    }
	
    RED.nodes.registerType("reporter",CrodeonReporter);
}