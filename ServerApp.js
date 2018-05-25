/*
 * Server App
 * 2016.09.08
 * Mds Project
 * kermit
 */

var connection = require('./Connection.js');
var sql = connection.con();

var tcpServer = require('net').createServer();
var httpServer = require('http').createServer();
var io = require('socket.io')(httpServer);
var inspect = require('util').inspect;

var tcpPort = 3001;
var httpPort = 3000;

httpServer.listen(httpPort, function(){
        console.log("Android Server Start");
});

tcpServer.listen(tcpPort, function(){
        console.log("Cleint Server Start");
});

// Android
io.on('connection', function(socket){
        console.log("Android Connection");

        socket.on('start',function(data){
                console.log(data);
                sql.query("SELECT pos FROM product", function(err, rows, cols){
                        console.log("rows "+inspect(rows));
                        if(err){
                                throw err;
                        }
                        for(idx in rows){
                                console.log("rows "+inspect(rows));
                                socket.emit('jsonrows', rows[idx]);
                        }
                });
        });

        socket.on('2', function(data){
                console.log("GO");
                console.log(inspect(data));

                tcpServer.on('connection', function(socket1){
                        console.log("Kiba move");
                        socket1.on('close', function(){
                                console.log("Client Disconnted.");
                        });
                        socket1.write(inspect(data));
                });
        });
});

//Client
tcpServer.on('connection', function(socket){
        console.log("Client Connection");

        socket.on('close', function(){
                console.log("Client Disconnted.");
                socket.destroy();
        });

                sql.query("SELECT vfrom, vto, vdist FROM nodeinfo;", function(err, rows){
                        if(err){
                                throw err;
                        }
                        console.log("nodeinfo Query start");
                        socket.write(inspect(rows));
                        console.log("Query End");
                 });
});
