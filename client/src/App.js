import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// import { set } from '../../server/app';
// import e from 'express';

function App() {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInterval( async () => {
      const { data } = await axios.get('/messages')
      setMessages(data)
    }, 1000);
    let randomNumber = (Math.floor(Math.random()*2000)+1)
    setUser(`#Guest${randomNumber}`)
  },[])

const postMessage = async (e) => {
  e.preventDefault()
  await axios.post('/messages', {
    body: inputValue,
    user: user
  })
  setInputValue('')
}

  return (
    <div>
      <form  onSubmit={postMessage}>
        <input type="text" required={true} id="messageInput" value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}>
        </input>
        <button id="sendButton" type="submit">Send</button>
      </form>
      <input id="changeUserInput" value={user} onChange={(e) => {setUser(e.target.value)}}></input>

      <div className="messagesContainer">
        {messages.map((message, index) => (
          <div key={index} className={message.user === user ? 'my-msg msg' : 'other-msg msg'}><strong>{message.user}</strong>: {message.body}</div>
        ))}
      </div>

    </div>
  );
}

export default App;
