const http = require('http');                                              //import hhtp                                                    
const fs = require('fs');                                                  //import file system

const server = http.createServer((req,res)=>{                              //creating server with req(request) and res(response)
    fs.readFile('login.html',function(err,data){
        res.writeHead(200,{'Content-type' : 'text/html'});
        res.write(data);                                                   //display html page
    });

    const url= req.url;                                                    
    const method =req.method;
    if( url === '/home' && method === 'POST'){
        let body = '' ;                                                   //creating empty string body
        req.on('data',(chuck)=>{
            body += chuck;                                                //now body =username=karthik&password=4036
        });
        req.on('end',()=>{                                                //splitting the string to get username and password
            const userinput = body.split('&');
            let username =userinput[0].split('=')[1];
            let password =userinput[1].split('=')[1];
            if(username == "karthik" && password == "4036"){              //checking if userinput is correct

                fs.readFile('home.html',function(err,data){               // display home page html
                    res.writeHead(200,{'Content-type' : 'text/html'});
                    res.write(data)
                    res.end()
                });
            }
            else{
                res.end("Wrong Password")
            }
        })
    }
});
server.listen(8080)