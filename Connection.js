/*
 * Db Connection js
 * 2016.09.08
 * Mds Project
 * kermit
 */

exports.con = function(){
        var Client = require('mariasql');
        var c = new Client();

        c.connect({
                host : '40.74.134.0',
                port : '3306',
                user : 'root',
                password : 'kermit',
                db : 'mydb'
        });

        c.on('connect', function(){
                console.log('Clinet Connected');
        }).on('error', function(err){
                console.log('Client err : ' + err);
        }).on('close', function(hadError){
                console.log('Clinet Closed');
        });

        return c;
};
