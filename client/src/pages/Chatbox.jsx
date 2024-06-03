import React, { useState } from "react";
import { socket } from "./GamePage";
import { useRecoilValue } from "recoil";
import { atom_users } from "../App";
import Message from "../components/Message";


const ChatBox = () => {
    const users = useRecoilValue(atom_users);
    const [messagesArr, setMessagesArr] = useState([]);

    socket.on('msgFromServer', (messages) => {
        setMessagesArr([...messages]);
    })

    function sendMessage(){
        const form = document.getElementById('form');
        const message = document.getElementById('messageInput');
        let author = '';
        users.forEach(user => {
            if(user.id == socket.id)
            author = user.username;
        });
        
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if(message.value){
                const msg = {
                    author : author,
                    content: message.value,
                    type: 'message' 
                }
                socket.emit('msgFromClient',msg);
                message.value = '';
            }
        })
    
    }
    return (
        <>
            <div className="h-full w-full p-1 border-2 rounded-lg flex flex-col justify-between bg-white">
                <div className="p-3 overflow-y-scroll overflow-x-hidden">
                    { messagesArr.map((message, index) => <Message key={index} message={message}/>) }
                </div>
                <form id="form" action="" className="flex">
                    <input id="messageInput" className="py-2 px-5 w-full border-2 border-slate-300 rounded-sm" type="text" placeholder="Enter message..."></input>
                    <button className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-sm" onClick={sendMessage}>send</button>
                </form>
            </div>
        </>
    )
}
export default ChatBox;