module.exports = function(result, node, RED) {
    const msgs = [];
    const dt = new Date(`${result['Date']}T${result['Time']}.000Z`);
    for(let i = 0 ; i < node.sensors.length ; i++) {
        if(result.hasOwnProperty(node.sensors[i].name)) {
            msgs[i] = {
                sensor: node.sensors[i].name,
                payload: {
                    value: result[node.sensors[i].name],
                    crodeonId: result['ID'],
                    datetime: dt
                }
            };
        } else {
            msgs[i] = null;
        }
    }
    msgs.push(null);

    //status
    node.status({fill:"green",shape:"dot",text:`${RED._('sensor.value')}: ${result['ID']}`});
    //send msg to next node.
    node.send(msgs);
}