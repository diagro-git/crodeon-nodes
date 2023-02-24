const _ = require('./sensor-action');

module.exports = function(RED, node, msg) {
    let lastDays = node.lastDays;

    if(node.lastDaysType === 'msg') {
        lastDays = msg[lastDays];
    }
    
    const url = `https://api.crodeon.com/api/v1/datadays/id/${node.reporter.id}/days/${lastDays}`;

    _(url, node, RED);
}