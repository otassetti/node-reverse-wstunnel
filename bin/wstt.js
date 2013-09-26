#!/usr/bin/env node

(function() {
  var argv, client, host, localport, optimist, port, server, wsHost, wst, _, _ref;

  _ = require("under_score");

  wst = require("../lib/wst");

  optimist = require('optimist').usage("Run websocket tunnel server or client.\n  To run server: wstunnel -s 8080\n  To run client: wstunnel -tunnel localport:host:port ws://wshost:wsport\nNow connecting to localhsot:localport is same as connecting to host:port").string("s").string("t").alias('t', "tunnel").describe('s', 'run as server, specify listen port').describe('tunnel', 'run as tunnel client, specify localport:host:port');

  argv = optimist.argv;

  if (_.size(argv) === 2) {
    return console.log(optimist.help());
  }

  if (argv.s) {
    server = new wst.server;
    server.start(argv.s);
  } else if (argv.t) {
    client = new wst.client;
    wsHost = _.last(argv._);
    _ref = argv.t.split(":"), localport = _ref[0], host = _ref[1], port = _ref[2];
    client.start(localport, wsHost, "" + host + ":" + port);
  } else {
    return console.log(optimist.help());
  }

}).call(this);