module.exports = function(results, node, RED) {
    const msgs = [];
    for(let i = 0 ; i < node.sensors.length ; i++) {
        msgs[i] = {
            sensor: node.sensors[i].name,
            payload: []
        };
    }
    //error output
    msgs.push(null);

    results.forEach(function(result) {
        const dt = new Date(`${result['Date']}T${result['Time']}.000Z`);
        for(let i = 0 ; i < node.sensors.length ; i++) {
            if(result.hasOwnProperty(node.sensors[i].name)) {
                msgs[i].payload.push({
                    value: result[node.sensors[i].name],
                    crodeonId: result['ID'],
                    datetime: dt
                });
            }
        }
    });

    //status
    node.status({fill:"green",shape:"dot",text:`${RED._('sensor.results')}: ${results.length}`});
    //send msg to next node.
    node.send(msgs);
}