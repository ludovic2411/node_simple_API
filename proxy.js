//Load HTTP module
const http = require("http");
//Load URL module
const url = require('url');
const hostname = '10.19.66.6 ';
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  var name="world";

  if(reqUrl.pathname=='/sample' && req.method==='GET'){

    if (reqUrl.query.name) {
      name = reqUrl.query.name
    }
    var response = {
      "text": "Hello " + name
    };

    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  }
  else if (reqUrl.pathname=='/post' && req.method==='POST') {

    var body='';

    req.on('data',(chunk)=>{
      body+=chunk;
    }).on('end',()=>{
      postBody = JSON.parse(body);
      if (postBody.value=="Ludo") {
        var response={
          "text":"Welcome master!"
        }
      }else {
        var response={
          "text":"Welcome dear guest!"
        }
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    });

  }
  else {
    var response={
      "text":"invalid route"
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  }
});



//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
