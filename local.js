const http = require("http");
console.log(`hello from local server`);
const data = [
    {id:01,text:'text1'},
    {id:02,text:'text2'},
    {id:03,text:'text3'},
    {id:04,text:'text4'},
    {id:05,text:'text5'},
]
 const server = http.createServer((req, res) => {
 const {method, url} = req;
 let body= [];
 req.on('data', chunk=>{
     body.push(chunk);
 })
 .on('end',()=>{
     body = Buffer.concat(body).toString();

     let status = 404;
     const response = {
         success : false,
         data : null
     }

     if(method==='GET' && url==='/'){
        response.status = 200,
         response.message='All Data Success',
         response.success = true,
         response.data=data
     }
     if(method==='POST' && url==='/new'){
        console.log(`req Recieved`)
        const {id, text} = JSON.parse(body);
        // console.log(`req Recieved======`,body)

        if(!id && !text){
            response.success = false,
            response.status = 400,
            response.message = 'Not Valid Data'
        }else
        response.success = true,
        response.data = {id,text},
        response.message = 'Data Added Successfully'
        data.push({id,text});
        
     }
     res.end(JSON.stringify(response));
 })
 });
 const PORT = 5000;
 server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

