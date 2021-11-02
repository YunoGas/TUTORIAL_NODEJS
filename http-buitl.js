const http = require('http')
const { log } = require('console')
const { writeFile } = require('fs')

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

function startProxyServer(port) {
    const requestHandler = (request, response) => {
        let cache1 = []; let cache2 = [];
        data_log = (JSON.stringify('request')+JSON.stringify(':') + JSON.stringify(request, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache1.indexOf(value) !== -1) {
                    // Duplicate reference found, discard key
                    return;
                }
                // Store value in our collection
                cache1.push(value);
            }
            return value;
        }) +',\n\"response\":' +JSON.stringify(response, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache2.indexOf(value) !== -1) {
                    // Duplicate reference found, discard key
                    return;
                }
                // Store value in our collection
                cache2.push(value);
            }
            return value;
        })  )


        writeFile('./logger.json', data_log, { flag: "a" }, (err, res) => { if (err) { log(err); return } log(res) });

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
            JSON.stringify({
                path: request.url
            })
        );
    };
    //////////
    const server = http.createServer(requestHandler);
    //////////
    server.listen(port, err => {
        if (err) {
            return log("something bad happened", err);
        }
    });
    return server;
}

startProxyServer(3123);
startProxyServer(3122);