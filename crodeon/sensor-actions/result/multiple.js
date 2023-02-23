module.exports = function(results, node) {
    const msgs = [];
    for(let i = 0 ; i < node.sensors.length ; i++) {
        msgs[i] = [];
    }
    //error output
    msgs.push(null);

    results.forEach(function(result) {
        const dt = new Date(`${result['Date']}T${result['Time']}.000Z`);
        for(let i = 0 ; i < node.sensors.length ; i++) {
            if(result.hasOwnProperty(node.sensors[i].name)) {
                msgs[i].push({
                    sensor: node.sensors[i].name,
                    payload: result[node.sensors[i].name],
                    crodeonId: result['ID'],
                    datetime: dt
                });
            } else {
                msgs[i].push(null);
            }
        }
    });

    //status
    node.status({fill:"green",shape:"dot",text:`Results: ${results.length}`});
    //send msg to next node.
    node.send(msgs);
}