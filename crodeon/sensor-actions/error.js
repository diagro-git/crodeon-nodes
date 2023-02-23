module.exports = function(response, node) {
    let status = response.hasOwnProperty('code') ? response.code : 'Error unknown!';
    let payload = response.hasOwnProperty('message') ? response.message : 'Error unknown!';

    //node status is error
    node.status({fill:"red", shape:"ring", text:status});

    //msgs
    const msgs = [];
    for(let i = 0 ; i < node.sensors.length ; i++) {
        msgs[i] = [];
    }
    msgs.push({
        payload: payload,
        error: response
    });

    //send msg to next node.
    node.send(msgs);
}