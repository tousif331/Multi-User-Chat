import React, { useEffect } from "react"
import { useState } from "react";
import './chat.css';
import {io} from 'socket.io-client';
import { useParams } from "react-router-dom";

const Chat = () => {

    const [socket, setSocket] = useState(io('http://localhost:5000', {autoConnect: false}))
    const [name, setName] = useState("")
    const {username} = useParams();
    const [userList, setUserList] = useState([])

    const fetchUsers = async () => {
      const res = await fetch('http://localhost:5000/user/getall');
      const data = await res.json();  
      const filUsers = data.filter(user => user.name.toLocaleLowerCase() != username);
      setUserList(filUsers);
      if(filUsers.length)
      setName(filUsers[0].name)
    }

    useEffect(() => {
    socket.connect();
    fetchUsers();
    socket.emit('register', username.toLocaleLowerCase())
    }, [])

    socket.on('recmsg', (chatMsg) => {
        setMessageList( [ ...messageList, chatMsg ] );
    })
    

    const [messageList, setMessageList] = useState([]);

    const [msgText, setMsgText] = useState("");

    const addMessage = () => {
        let obj = { text : msgText, sent: true, sentOn: new Date(), rec : name.toLocaleLowerCase(), sentBy: username };
        socket.emit('sendmsg', obj)
        // messageList.push(obj);
        setMessageList( [ ...messageList, obj ] );
        setMsgText("");
        
    }

    const displayChat = () => {
        return messageList.map( (msg) => (
            <div>
            <div className={ msg.sent ? "bubble-sent" : 'bubble-rec' }>
                <p className="chat-text">{msg.text}</p>
            </div>
            {/* <p className="m-0" style={{fontSize: '10px'}}>{msg.sentBy}</p> */}
            </div>
        ))
    }

  return (
    <section >
        <div className="container py-5" >
          <select className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}>
              {
                userList.map((user) => (
                  <option value={user.name}>{user.name}</option>
                ))
              }
          </select>
            <div className="form-outline">
                <input type="text"  className="form-control"onChange={e => setName(e.target.value)} />
                <label class="form-label" for="form12">Example label</label>
            </div>
        
      <div className="card">

        <div className="card-header">
          <h3 className="text-center">My Chat App</h3>
        </div>

        <div className="card-body chat-area">
            {displayChat()}
        </div>
        
        <div className="card-footer d-flex">

          <input type="text" className="form-control" value={msgText} onChange={ (e) => { setMsgText(e.target.value) } } />

          <button disabled={!Boolean(msgText)} className="btn btn-primary" onClick={addMessage}>
            <i class="fas fa-paper-plane"></i>
          </button>

        </div>
      </div>
    </div>
    </section>
  )
}

export default Chat;
