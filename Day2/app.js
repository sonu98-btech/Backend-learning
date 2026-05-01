const Express = require('express');
const app = Express();

app.get('/', function(req,res){
    res.send('Hello World');
})
app.get('/about', (req,res)=>{
    res.send('This is about page');
})
app.listen(3000);