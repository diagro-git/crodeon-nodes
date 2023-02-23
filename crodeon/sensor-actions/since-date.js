const _ = require('./sensor-action');

module.exports = function(RED, node, msg) {
    let sinceIsoDate = node.sinceIsoDate;

    if(node.sinceIsoDateType === 'msg') {
        sinceIsoDate = msg[sinceIsoDate];
    }

    let date = new Date(sinceIsoDate);
    date = new Date(date.toUTCString());
    let sinceTimestamp = Math.round(date.getTime() / 1000);

    const url = `https://api.crodeon.com/api/v1/datasincedate/id/${node.reporter.id}/T/${sinceTimestamp}`;

    _(url, node);
}