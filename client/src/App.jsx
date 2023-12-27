import io from "socket.io-client"
const socket = io("/")
import { useState, useEffect } from 'react'

const App = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messageInput = document.getElementById("messageInput")
  console.log(messages, "messages");
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessages([...messages, message])
    socket.emit("message", message)
    messageInput.value = ""
  }
  
  useEffect(() => {
    socket.on("message", receiveMessage)
    return () => {
      socket.off("message", receiveMessage)
    }
  }, [])
  
  const receiveMessage = (message) => {
    setMessages((state) => [...state, message])
  }
  return (
    <div>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input id="messageInput" type="text" placeholder='Send a message'
        onChange={(e) => setMessage(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  )
}

export default App