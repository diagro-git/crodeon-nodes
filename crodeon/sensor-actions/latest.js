const _ = require('./sensor-action');

module.exports = function(RED, node, msg) {
    const url = `https://api.crodeon.com/api/v1/datalatest/id/${node.reporter.id}`;

    _(url, node, RED);
}