var http = require("http")
var fs = require("fs")

function serveStaticFile(messageType, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            messageType.writeHead(500, {"Content-Type": "text/plain"})
            messageType.end("500 - Internal error")
        }
        else {
            messageType.writeHead(responseCode, {"Content-Type":contentType});
            messageType.end(data)
        }
    })
}

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch(path) {
        case "":
            serveStaticFile(res, "/index.html", "text/html") 
            break;
            case "/about":
                serveStaticFile(res, "/about.html", "text/html")
                break;
                case "/img/gallery/{graduation.jpg}":
                    serveStaticFile(res, "/img/gallery/{graduation.jpg}", "image/jpeg")
                    break;
                    case "/img/gallery/{study.jpg}":
                        serveStaticFile(res, "/img/gallery/{study.jpg}", "image/jpeg")
                        break;
                        case "/video/{memes.mp4}":
                            serveStaticFile(res, "/video/students{memes.mp4}", "video/mp4")
                            break;
                        
        default:
            serveStaticFile(res, "/error.html", "text/html", 404) 
            break;
    }
}).listen(3000)

console.log("The server is running on localhost:3000")