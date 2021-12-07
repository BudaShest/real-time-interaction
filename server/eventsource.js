//Events source - второй способ
const express = require('express');
const cors = require('cors');
const events = require('events'); //станд. модуль ноды для управления событиями
const PORT = 5000;

//Создаём эмиттер для того, что мы могли подписываться, регисрирывать и вызывать события
const emitter = new events.EventEmitter();
const app = express();



app.use(cors());
app.use(express.json());

app.get('/connect',(req, res)=>{
    res.writeHead(200,{ //Необходимые заголовки для Event Source
        'Connection':'keep-alive', //Не закрывать соединение
        'Content-Type':'text/event-stream', //Тип контента - стрим
        'Cache-Control':'no-cache' //Не кэшировать
    })

    //Подписываемя на событие, которое может отрабатывать множ-во раз(on)
    //т.к соединение открыто бесконенчо
    emitter.on('newMessage', (message)=>{
        //В таком способе соощения должны быть отрпавленны с помощью след. шаблона
        res.write(`data: ${JSON.stringify(message)} \n\n`)
    })
});

app.post('/new-messages', (req,res)=>{
    const message = req.body;
    emitter.emit('newMessage', message);
    res.status(200)
});

app.listen(PORT, ()=>{
    console.log('Server has been started on post ' + PORT);
});