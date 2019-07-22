const express = require('express')
const app = express()
const port = 80

const deviceCount = 1;
const lightName = 'FakeHue';
const macAddress = require('os').networkInterfaces().eth0[0].mac;

var state = []; // light states

app.use( ( req, res, next ) => {
    console.log( 'REQUEST: ' + req.method + ' ' + req.url );
    next();
    //res.send( "OK" );
} );

app.get( '/detect', ( req, res ) => {
    let resp = `{"hue": "bulb","lights": ${deviceCount},"name": "${lightName}","modelid": "FakeHue","mac": "${macAddress}"}`;
    console.log( 'Detect - returning ' + resp );
    res.send( resp );
} );

app.get( '/get', ( req, res ) => {
    let light = req.query.light;
    let resp = `{"on": ${state[light] ? "true" : "false"}}`;
    console.log( `Get state of light ${light}, returning ${resp}` );
    res.send( resp );
} );

app.get( '/set', ( req, res ) => {
    let light = req.query.light;
    let newState = req.query.on == 'True' || req.query.on == 'true';
    state[ light ] = newState;
    let resp = `OK, state:${state[light] ? 'true' : 'false'}`;
    console.log( `Set light ${light} ${newState ? 'on' : 'off'}, returning ${resp}` );
    res.send( resp );
} );

app.listen(port, () => console.log(`fakehue listening on port ${port}`));
