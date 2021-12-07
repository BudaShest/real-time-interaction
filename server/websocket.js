//Websocket - третий способ
//Сначала импортируем ws (для работы с веб сокетами)
const ws = require('ws');

//Создаём сервер для вебсокета
const wss = new ws.Server({
    port: 5000,

},()=>console.log('WS server has been started on port 5000'))

//Подисываемя на событие подключение
//(Когда кинет подключится к веб-сокет серверу)
wss.on('connection', function connection(ws){
    //ws - одно подключение конкретного пользователя
    ws.on('message', function (message){ //Подписываемся на событие, когда появится новое сообщение
        message = JSON.parse(message);
        switch (message.event){
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

//Функция широковещательной рассылки
function broadcastMessage(message){
    //Отправляем сообщение всем клиентам, что сейчас подключены
    wss.clients.forEach(client=>{
        client.send(JSON.stringify(message))
    })
}