import React, {useState, useEffect} from 'react';
import axios from 'axios';



const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(()=>{
        subscribe();
    },[])

    const subscribe = async (e)=>{
        try{
            //Получаем сообщение, вызывая событие, которое вернёт его нам
            const {data} = await axios.get('http://localhost:5000/get-messages');
            //Добавялем его к другим (старым сообщениям)
            setMessages(prev=>[data, ...prev]);
            //Заново подписывается
            await subscribe();
        }catch (e){
            //Если время истелко (или другая ошибка) - заново подписываемся
            setTimeout(()=>{
                subscribe()
            },500)
        }
    }

    const sendMessage = async (e)=>{
        //Запрос на отпрвку сообщения
        e.preventDefault();
        let result = await axios.post('http://localhost:5000/new-messages', {"message": value, "id":Date.now()})
        console.log(result);
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
                            {message.message}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default LongPulling;