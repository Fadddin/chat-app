import { useEffect, useMemo, useState } from 'react'
import './App.css'
// import Message from './components/Message'
import { io } from 'socket.io-client'


function App() {
  // console.log('App component rendered');
  // const MemoizedApp = React.memo(App);


  // const socket = useMemo(()=> io("http://localhost:3000"),[]);
  const socket = useMemo(() => io("http://localhost:3000", { transports: ["websocket"] }), []);


  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [socketId, setSocketId] = useState('')
  const [messages, setMessages] = useState([])



  useEffect(() => {
    console.log('Effect running');
  
    const connectHandler = () => {
      setSocketId(socket.id);
      console.log("Connected", socket.id);
    };
  
    const receiveMessageHandler = (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
  
    const welcomeHandler = (s) => {
      console.log(s);
    };
  
    // Attach event listeners
    socket.on("connect", connectHandler);
    socket.on("receive-message", receiveMessageHandler);
    socket.on("welcome", welcomeHandler);
  
    return () => {
      console.log('Effect cleanup');
      // Remove event listeners on cleanup
      socket.off("connect", connectHandler);
      socket.off("receive-message", receiveMessageHandler);
      socket.off("welcome", welcomeHandler);
  
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, [socket]);
  

  

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', message);
    socket.emit("message", {message , room})

    setMessage("")
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    // console.log('Room entered:', room);
    // socket.emit("message", message)

    setRoom("")
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setMessage(e.target.value);
  };


  return (
    <div >
      {/* <Message/> */}
      <div>
        {socketId}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <input type="text" value={message} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={handleRoomSubmit}>
          <label>
            Room:
            <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
          </label>
          <button type="submit">enter</button>
        </form>
      </div>

      <div>
        {messages.map((m,i) => (
          <div key={i}>
            {m}
          </div>
        ))}
      </div>
    </div>
  )
}


export default App
