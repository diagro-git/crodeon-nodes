module.exports = function(response, node, RED) {
    let status = response.hasOwnProperty('code') ? response.code : RED._('sensor.error_unknown');
    let payload = response.hasOwnProperty('message') ? response.message : RED._('sensor.error_unknown');

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