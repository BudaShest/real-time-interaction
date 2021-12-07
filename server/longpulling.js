//Long pulling - первый способ
const express = require('express');
const cors = require('cors');
const events = require('events'); //станд. модуль ноды для управления событиями
const PORT = 5000;


const app = express();

//Создаём эмиттер для того, что мы могли подписываться, регисрирывать и вызывать события
const emitter = new events.EventEmitter();

app.use(cors());
app.use(express.json());

app.get('/get-messages',(req, res)=>{
    //Пользователь отправляет гет-запрос, но мы не возвращаем ему ответ. Мы подписываемся на событие
    //и ждём (далее см роут /new-messages)

    //Регистрируем событие(once) нового сообщения, чтобы уведомить всех остальных участников чата о том, что есть новое сообщение
    emitter.once('newMessage', (message)=>{
        res.json(message)
    })
});

app.post('/new-messages', (req,res)=>{
    const message = req.body;
    console.log(req.body);
    //После того, как кто-то отправил сообщение мы вызываем событие(emit) newMessage и передаём туда сообщение
    emitter.emit('newMessage', message);
    res.status(200).end();
});

app.listen(PORT, ()=>{
    console.log('Server has been started on post ' + PORT);
});