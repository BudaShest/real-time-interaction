import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";

const WebSockets = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');


    const connect = (e)=>{
        e.preventDefault();
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = ()=>{
            //Слушатель для поключения
            setConnected(true);
            const message = {
                event:'connection',
                username,
                id:Date.now()
            }
            //Отправим сообщение на сервер
            socket.current.send(JSON.stringify(message));
            console.log('Подключение установленно');
        }

        socket.current.onmessage = (e)=>{
            //Слушатель для получения сообщения
            const message = JSON.parse(e.data);
            setMessages(prev=>[message, ...prev])
        }

        socket.current.onclose = ()=>{
            //Слушатель на закрытие соединения
        }

        socket.current.onerror = ()=>{
            //Слушатель при возникновении ошибки
        }
    }

    const sendMessage = async (e)=>{
        //Запрос на отпрвку сообщения
        e.preventDefault();
        const message = {
            username,
            message: value,
            id:Date.now(),
            event: 'message'
        }
        //Отправим сообщение на сервер
        socket.current.send(JSON.stringify(message));
        setValue('');
    }

    if(!connected){
        return(
        <form action="" style={{backgroundColor:"lightgrey"}} className="column is-two-fifths">
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input value={username} onChange={e=>setUsername(e.target.value)} type="text" placeholder="Введите ваше имя"/>
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button onClick={connect} className="button is-link">Войти</button>
                </div>
            </div>
        </form>
        )
    }

    return (
        <div className="container" style={{padding:30}}>
            <form action="" style={{backgroundColor:"lightgrey"}} className="column is-two-fifths">
                <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                        <textarea value={value} onChange={(e)=>setValue(e.target.value)} className="textarea" placeholder="Textarea"></textarea>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={sendMessage} className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </form>
            <div className="messages">
                {
                    messages.map(message=>
                        <div className="message column is-full" key={message.id} style={{border:"2px solid teal", padding:20}}>
                            {
                                message.event === 'connection'?
                                    <div>Пользователь {message.username} подключился</div>:
                                    <div>{message.username} . {message.message}</div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default WebSockets;