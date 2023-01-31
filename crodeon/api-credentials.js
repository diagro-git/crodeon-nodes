module.exports = function(RED) {
    function CrodeonApiCredentials(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.api_key = this.credentials.api_key;
        this.username = this.credentials.username;
        this.password = this.credentials.password;
    }
	
    RED.nodes.registerType("api-credentials",CrodeonApiCredentials, {
        credentials: {
            api_key: {type: 'text'},
            username: {type: 'text'},
            password: {type: 'password'}
        }
    });
}