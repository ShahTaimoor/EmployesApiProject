const http = require('http')


const employess = [
    {id:1,name:'Taimoor'},
    {id:2,name:'A'},
]

const requestHandler = (req,res)=>{
     const {method,url} = req
     const parts = url.split('/')
     const id = parts[2]
    
     //!  Get all employess
      if(method === 'GET' && url === '/employess'){
           res.writeHead(200,{'contentType':'application/json'})
    res.end(JSON.stringify(employess))
      }

       //!  Get single employe
       else if (method === 'GET' && parts[1]==='employess' && id){
        const employe = employess.find((emp)=> emp.id === parseInt(id));
        if (employe) {
             res.writeHead(200,{'contentType':'application/json'})
    res.end(JSON.stringify(employess))
        } else{
             res.writeHead(200,{'contentType':'application/json'})
    res.end(JSON.stringify({message:'Employe Not Found'}))
        }
       }

    //    ! Create new employe

    else if (method === 'POST' && url === '/employess'){
        let body = ''
        // ? Listen to the eveent of making post reques
        req.on('data',(chunk)=>{
             body += chunk 
        })
        // send res 
        req.on('end',()=>{
            const newEmploye = JSON.parse(body)
            employess.push(newEmploye)
             res.writeHead(200,{'contentType':'application/json'})
    res.end(JSON.stringify({newEmploye,employess}))
        })
    }

}

const server = http.createServer(requestHandler) 
const PORT =3000
server.listen(PORT,()=>{
    console.log(`The Server Is Running ${PORT}`);
})
