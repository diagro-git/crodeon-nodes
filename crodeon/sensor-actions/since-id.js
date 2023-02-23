const _ = require('./sensor-action');

module.exports = function(RED, node, msg) {
    let sinceId = node.sinceId;

    if(node.sinceIdType === 'msg') {
        sinceId = msg[sinceId];
    }

    const url = `https://api.crodeon.com/api/v1/datasinceid/id/${node.reporter.id}/sinceid/${sinceId}`;

    _(url, node);
}