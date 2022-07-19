//Module natif node.js
const http = require('http')
const fs = require('fs');
//creation d'un serveur http
const server = http.createServer((req, res) => {

    const {url, method} = req;
    //Routing manuel
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write(`<body>
                        <form action="/message" method="post">
                            <input type="text" name="message"> 
                            <button type="submit">Send</button>
                        </form>
                    </body>`);
        res.write('</html>');
        res.end();
    }
    else if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            //console.log(chunk);
            body.push(chunk);
        }).on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
            writeFile("body.txt", parsedBody)
        }).on('error', (err) => {
            console.log(err);
        }); 
    }
})

server.listen(3030, () => {
    console.log('Server started');
});

function writeFile(fileName, data){
    fs.writeFile(fileName, data, (err) => {
        if(err) throw err;
        console.log('The file has been saved!');
    });
}